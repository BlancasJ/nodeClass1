#!/bin/sh

echo "***************************************************************"
echo "Directory Inspector test using 'folder' as the given directory"
echo "***************************************************************"
timeout 5s node directoryInspector.js folder
sleep 1

echo "***************************************************************"
echo "Copying foler and name it folder2delete"
echo "***************************************************************"
cp -r folder folder2delete
sleep 1

echo "***************************************************************"
echo "Directory Remover test using 'folder2delete' as the given directory"
echo "***************************************************************"
timeout 5s node directoryRemover.js folder2delete
sleep 1

echo "***************************************************************"
echo "kill node"
echo "***************************************************************"
npx kill-port 8088
sleep 1

echo "***************************************************************"
echo "HTTP Server is runing"
echo "***************************************************************"
timeout 180s node httpServer.js

##