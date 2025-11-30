library(googlesheets4)
library(dplyr)

gs_auth_sa <- function() {
  googlesheets4::gs4_auth(path = get_sa_json_path())
}

write_sheet_tab <- function(df, sheet_id, sheet_name) {
  if (!(sheet_name %in% googlesheets4::sheet_names(sheet_id))) {
    googlesheets4::sheet_add(sheet = sheet_id, sheet = sheet_name)
  }
  googlesheets4::write_sheet(df, ss = sheet_id, sheet = sheet_name)
}

append_to_master <- function(df, sheet_id) {
  master_name <- "Master_Anime_List"
  master <- googlesheets4::read_sheet(sheet_id)
  combined <- bind_rows(master, df) %>% distinct(Title, Year, .keep_all=TRUE)
  googlesheets4::write_sheet(combined, ss = sheet_id, sheet = master_name)
}
