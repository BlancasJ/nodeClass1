const { readFile, appendFile, writeFile, serverStatus } = require('./fs_functions');

const home = async (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  const html = await readFile('./public/index.html', 'utf-8');
  response.write(html);
  response.end();
};

const books = async (request, response) => {
  const path = './public/example.txt';
  if (request.method === 'GET'){
    response.writeHead(200, { 'Content-Type': 'text/txt' });
    const html = await readFile(path, 'utf-8');
    response.write(html);
    response.end();
  } else if (request.method === "POST") {
    let body = '';
    request.on("data", function (chunk) {
      body += chunk;
    });
    request.on("end", async () => {
      response.writeHead(201, { "Content-Type": "text/html" });
      await appendFile(path, body);
      response.end(body);
    });
  } else if(request.method === 'DELETE'){
    response.writeHead(205, { "Content-Type": "text/html" });
    await writeFile(path, ''); 
    response.end();
  }
};

const status = async (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(JSON.stringify(serverStatus));
  response.end();
};


const notFound = async (request, response) => {
  response.writeHead(404, { 'Content-Type': 'text/html' });
  const html = await readFile('./public/404.html', 'utf-8');
  response.write(html);
  response.end();
};

module.exports = {
  home,
  books,
  notFound,
  status,
}
