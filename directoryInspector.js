const fs = require('fs');

// function to check if the directory exists and if node has permission
const checkDirectory = (path) => {
  return fs.promises.access(path, fs.constants.R_OK)
  .catch((err) => {throw err})
  .then((data) => data=true);
};

// function to read data inside directory
const readDirectory = (path) => {
  return fs.promises.readdir(path)
  .catch((err) => {throw err})
  .then((fileNames) => fileNames);
};

// function to know if the path given is file or dir
const isFileOrDir = (fileName) => {
  return fs.promises.stat(fileName)
  .catch((err) => {throw err})
  .then((stats) => stats);
};

// function to show the data inside a specific folder
const printFiles = (path, fileNames) => {
  fileNames.map(async (file) => {
    const stats = await isFileOrDir(`${path}/${file}`);
    if(stats.isDirectory()) console.log(`${file}/`);
    if(stats.isFile()) console.log(file);
  });
};

// function in which everything happens
async function main(path){
  if(path === 'undefined'){
    const currentPath = __dirname;
    const data = await readDirectory(currentPath)
    printFiles(currentPath, data);
    
    return;
  }
  const promiseRes = await checkDirectory(path);
  if(promiseRes){
    const data = await readDirectory(path)
    printFiles(path, data);

    return;
  }
}

try{
  // read the path given in node
  const path = String(process.argv.slice(2)[0]);
  // call main function
  main(path);
} catch(err){
  console.log(err);
}
