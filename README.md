## Node js class

## Quick test
Run: npm test
\
This will execute the three files and the server will be online for 3 minutes, then it will stop.
## folder
Use homework 1 and homework 2 on this folder or whatever folder you want, just remember homework 2 would delete the folder.
## Homework 1: directoryInspector
This shows files/folders inside a given path. If you do not provide a folder, it will show what is in the current folder
\
example: node directoryInspector.js /path/to/your-folder

## Homework 2: directoryRemover
This deletes all files/folders inside a given path.
\
example: node directoryRemover.js /path/to/your-folder
\
Be extremely careful!!!
## Homework 3: httpServer, public and src

'/': the only method available is GET.
\
GET shows the home page. 
\
\
'/books': the only methods available are GET, POST, DELETE.
\
GET shows the info of example.txt
\
POST adds info to example.txt
\
DELETE cleans example.txt
\
\
'/file-viewer': the only method available is GET.
\
GET shows the content from a specific file located at public/consult/
\
example to make a consult: http://localhost:8088/file-viewer/?name=welcome.txt
\
\
'/server-status': the only method available is GET.
\
GET shows the info of the server

