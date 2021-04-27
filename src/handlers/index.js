const { readFile, appendFile, writeFile, serverStatus, checkPath } = require('./fs_functions');

const home = async (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  const html = await readFile('./public/index.html', 'utf-8');
  response.write(html);
  response.end();
};

const books = async (request, response) => {
  const path = './public/example.txt';
  if (request.method === 'GET'){
    response.writeHead(200, { 'Content-Type': 'text/html' });
    const html = await readFile(path, 'utf-8');
    response.write(`<p> ${html} </p>`);
    response.end();
  } else if (request.method === "POST") {
    let body = '';
    request.on("data", function (chunk) {
      body += chunk;
    });
    request.on("end", async () => {
      response.writeHead(201, { "Content-Type": "text/html" });
      await appendFile(path, `${body}\n`, 'utf-8');
      response.end(body);
    });
  } else if(request.method === 'DELETE'){
    response.writeHead(205, { "Content-Type": "text/html" });
    await writeFile(path, '', 'utf-8'); 
    response.end();
  }
};

const notFound = async (request, response) => {
  response.writeHead(404, { 'Content-Type': 'text/html' });
  const html = await readFile('./public/404.html', 'utf-8');
  response.write(html);
  response.end();
};

const fileViewer = async (request, response) => {
  ///
  const { url } = request;
  const parameterKey= url.split('?')[1].split('=')[0];
  const parameterValue= url.split('?')[1].split('=')[1];
  if(parameterKey !== 'name'){
    response.writeHead(400, { 'Content-Type': 'text/html' });
    const html = `<h1> Bad Request </h1>`;
    response.write(html);
    response.end();
    return ;
  }
  const path = `./public/consult/${parameterValue}`;
  try {
    await checkPath(path)
    const html = await readFile(path, 'utf-8')
    response.write(`<h1> ${html} </h1>`);
    response.end();
    
  }catch (err){
    response.writeHead(501, { 'Content-Type': 'text/html' });
    const html = `<h1> Not implemented </h1>`;
    response.write(html);
    response.end();
    return ;
  }
};

const status = async (request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(serverStatus));
  response.end();
};

module.exports = {
  home,
  books,
  notFound,
  fileViewer,
  status,
}
