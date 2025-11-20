install.packages(c("httr","jsonlite","dplyr","googlesheets4","glue"))

library(jsonlite)

SHEET_ID <- "1JthbhDikF5HbW1ZX53BOuxwhvwBiZxSxbxWBoDZO-pM"
OMDB_KEY <- Sys.getenv("OMDB_KEY") # set as env var
GOOGLE_SA_JSON <- Sys.getenv("GOOGLE_SA_JSON") # base64 or path

get_sa_json_path <- function() {
  if (nzchar(GOOGLE_SA_JSON) && substr(GOOGLE_SA_JSON,1,1)=="{") {
    tmp <- tempfile(fileext = ".json")
    writeLines(GOOGLE_SA_JSON, tmp)
    return(tmp)
  }
  stop("Set GOOGLE_SA_JSON env var")
}
