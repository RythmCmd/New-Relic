Use Case:

Recover deleted dashboards in New Relic

Steps:

1. Get the list of deleted dashboard GUID by executing NRQL : 
   SELECT count(\*) from NrAuditEvent FACET targetId where actionIdentifier ='dashboard.delete' since 1 day ago limit max

2. Save the GUID in a txt file name it as guids.txt
   ( place GUID's one after the other in new line obtained from step 1
   e.g
   MzU1NjM1MXxWSVp8REFTSEJPQVJEfGRhOjE3NjE3MDY
   MzU1NjM1MXxWSVp8REFTSEJPQVJEfGRhOjE2MzIwNTQ )

3. Include 'API_KEY' key and 'GRAPH_API' URL (EU/US) in the script 

4. Node script you can run locally to bring back the deleted dashboards
   (Please make appropriate changes in the script where highlighted, also the system must have node installed)
