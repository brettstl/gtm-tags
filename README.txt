# READMME

## assign GCLID to session
1. Create a session scoped custom dimension called GCLID
1. Create a URL variable called GCLID in URL 34 looking for the Query gclid
1. Craete a first part cookie variable named GCLID 34 that looks for the cooke name gclid
1. Create "Assign GCLID to Cookie 34" tag and have it fire on pageview before your GA page tracker fires
1. Add GCLID 34 as a custom dimesion field in your GA settings variable