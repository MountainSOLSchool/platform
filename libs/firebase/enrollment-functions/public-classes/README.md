# public-classes

`GET /publicClasses`: the classes open for registration in every semester available to enroll, with public fields only (name, days, time, dates, grades, location, price, description, full or not). No rosters, student IDs, enrolled counts, instructors or email content.

Meant for server-to-server readers such as the mountainsol.org Afterschool Classes page, so unlike `Functions.endpoint` it does not require an allowed `Origin` header. Responses are cacheable for 10 minutes at the CDN.
