const fs = require('fs');
const readline = require('readline');

// function to check if the directory exists and if node has permission
const checkPath = (path) => {
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

// function to remove an empty directory
const removeDirectory = (path) => {
  return fs.promises.rmdir(path)
  .catch((err) => {throw err})
  .then((data) => data=true);
};

// function to remove a file
const removeFile = (path) => {
  return fs.promises.unlink(path)
  .catch((err) => {throw err})
  .then((data) => data=true);
};

// function to remove every file/dir in a given path (also the path)
const removeAll = async (path, bool=true, files=0, directories=0) => {
  // read data inside the path
  const data = await readDirectory(path);
  // if data has no length remove the given dir, increase directories variable and return the result
  if(data.length === 0){
    await removeDirectory(path);
    directories += 1;
    return [files, directories];
  }
  // if bool is equal true and data length is greater than 0
  if(bool){
    // tell the user that there is data inside and ask if he/she wants to delete it
    const response = await askQuestion('Directory is not empty, do you want to remove all content? [yes]/no:');
    // if response is different to yes, throw an error
    if(response.toLowerCase() !== 'yes'){
      throw new Error('You declined the operation');
    }
    // else change the value of bool to not ask anymore
    bool = false;
  }
  // file takes all the values inside data
  for(file of data){
    // check whether the file is a file or a dir
    const stats = await isFileOrDir(`${path}/${file}`);
    // if file is a dir call the function with new parameters (bool = false, to avoid asking the user again)
    if(stats.isDirectory()) {
      [files, directories] = await removeAll(`${path}/${file}`, bool, files, directories);
    }
    // if file is a file, remove the file and increase files variable
    else if(stats.isFile()) {
      await removeFile(`${path}/${file}`);
      files += 1;
    }
  }
  // when the files/dirs were removed, remove the directory father, increase directories and return the variables
  await removeDirectory(path);
  directories += 1;
  return [files, directories];
};

// function to ask a question to the user
const askQuestion = (question) => {
  return new Promise((resolve) => {
    const rl = readline.createInterface(process.stdin, process.stdout);
    rl.question(question, (res) => { 
      rl.close(); 
      resolve(res); 
    });
  });
};

// function in which everything happens
async function main(path){
  // in case there is not any given path, throw an error
  if(path === 'undefined'){
    throw new Error('Directory was not assign');
  }
  // check if the given path exists, the checkPath funtion throws an error if not
  const directoryExists = await checkPath(path);
  if(directoryExists){
    // get files and directories removed and show them
    const [files, directories] = await removeAll(path);
    console.log(`done. Removed ${directories} directories, ${files} files`);
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
