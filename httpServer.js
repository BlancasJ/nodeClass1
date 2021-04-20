const http = require('http');
const handler = require('./src/handlers')

const route = (path) => {
  const routes = {
    '/': handler.home,
    '/books': handler.books,
    '/file-viewer': '',
    '/server-status': handler.status,
  }

  if(routes[path]){
    return routes[path];
  }
  return handler.notFound;
};

const server = http.createServer( (request, response) => {
  const { url, method } = request;
  const myRoute = route(url);
  return myRoute(request, response);
});

// Port
const PORT = process.env.APP_PORT || 8088;
server.listen(PORT, () => console.log(`Working at port ${PORT}`));
