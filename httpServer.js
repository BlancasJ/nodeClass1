const http = require('http');
const handler = require('./src/handlers')

const route = (path) => {
  const routes = {
    '/': handler.home,
    '/books': handler.books,
    '/file-viewer': handler.fileViewer,
    '/server-status': handler.status,
  }

  if(routes[path]){
    return routes[path];
  }
  return handler.notFound;
};

function checkURL(url) {
  let newUrl = url.split('?')[0];
  if(newUrl.endsWith('/') && newUrl.length > 1) return newUrl.slice(0, -1);
  return newUrl;
}

const server = http.createServer( (request, response) => {
  const { url } = request;
  const newURL = checkURL(url);
  const myRoute = route(newURL);
  return myRoute(request, response);
});

// Port
const PORT = process.env.APP_PORT || 8088;
server.listen(PORT, () => console.log(`Working at port ${PORT}`));
