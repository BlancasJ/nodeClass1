const fs = require('fs');
const os = require('os');

// function to read file content
const readFile = (path, codi) => {
  return fs.promises.readFile(path, codi)
  .catch((err) => {throw err})
  .then((data) => data);
};

// function to append data into a file
const appendFile = (path, data) => {
  return fs.promises.appendFile(path, data)
  .catch((err) => {throw err})
  .then((data) => data=true);
};

// function to overwrite new data
const writeFile = (path, data) => {
  return fs.promises.writeFile(path, data)
  .catch((err) => {throw err})
  .then((data) => data=true);
};

// object
const serverStatus = {
  hostname: os.hostname(),
  cpusAvailable: os.cpus().length,
  architecture: os.arch(),
  uptime: (function(){
    let sec = os.uptime();
    let min = sec/60;
    let hour = min/60;

    sec = Math.floor(sec) % 60;
    min = Math.floor(min) % 60;
    hour = Math.floor(hour) % 60;

    return `${hour}:${min}:${sec}`;
  })(),
  userinfo: os.userInfo(),
  memoryAvailable: `${os.freemem()/1024} kB`,
};

module.exports = {
  readFile,
  appendFile,
  writeFile,
  serverStatus,
}
