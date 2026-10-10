BCA PDF LINKS
=============

BCA PDFs are now hosted on Google Drive. The website reads each share URL
from src/data/bcaNotes.js; no PDF binaries are needed in this folder.

TO ADD OR UPDATE A UNIT:
1. Upload the PDF to Google Drive.
2. Set General access to "Anyone with the link" and permission to Viewer.
3. Copy the share URL into the matching unit's driveUrl in src/data/bcaNotes.js.
4. Deploy the website. The available-unit count and View PDF link update from
   the configured URLs.

To publish a new unit later, replace its driveUrl: null with the new share URL.
Keep the unit number and subject slug unchanged.
