library(httr)
library(jsonlite)
library(dplyr)
library(googlesheets4)

# Load config and utils
source("R/config.R")
source("R/utils.R")

# Authenticate Google Sheets
gs_auth_sa()

# Sheet names
MASTER_SHEET <- "Master_Anime_List"
RESULT_SHEET <- "AniList_Data"

# AniList GraphQL endpoint
ANILIST_URL <- "https://graphql.anilist.co"

# GraphQL query template
query_anilist <- '
query ($search: String) {
  Media(search: $search, type: ANIME) {
    id
    title {
      romaji
      english
      native
    }
    startDate { year month day }
    endDate { year month day }
    episodes
    duration
    genres
    averageScore
    popularity
    format
    status
    studios { nodes { name } }
    siteUrl
  }
}
'

# Read master anime list from Google Sheet
master_list <- read_sheet(SHEET_ID, sheet = MASTER_SHEET)

results <- list()

for (i in 1:nrow(master_list)) {
  anime_title <- master_list$Title[i]
  
  response <- POST(
    url = ANILIST_URL,
    body = list(
      query = query_anilist,
      variables = list(search = anime_title)
    ),
    encode = "json"
  )
  
  if (status_code(response) != 200) {
    warning(paste("Failed to fetch:", anime_title))
    next
  }
  
  content_raw <- content(response, as = "text", encoding = "UTF-8")
  content_json <- fromJSON(content_raw, flatten = TRUE)
  
  media <- content_json$data$Media
  
  if (is.null(media)) next
  
  results[[i]] <- tibble(
    Title = anime_title,
    AniList_ID = media$id,
    Title_Romaji = media$title.romaji,
    Title_English = media$title.english,
    Title_Native = media$title.native,
    Start_Year = media$startDate.year,
    End_Year = media$endDate.year,
    Episodes = media$episodes,
    Duration = media$duration,
    Genres = paste(media$genres, collapse = "|"),
    AverageScore = media$averageScore,
    Popularity = media$popularity,
    Format = media$format,
    Status = media$status,
    Studio = paste(media$studios.nodes$name, collapse = "|"),
    Site_URL = media$siteUrl
  )
  
  Sys.sleep(1)  # prevent rate-limiting
}

# Combine all results
aniList_df <- bind_rows(results)

# Write results to Google Sheet
write_sheet_tab(aniList_df, SHEET_ID, RESULT_SHEET)

cat("AniList data scraped and saved to tab:", RESULT_SHEET, "\n")

