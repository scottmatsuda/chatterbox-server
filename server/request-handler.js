

/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var msg = [];

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept, authorization',
  'access-control-max-age': 10 // Seconds.
};

var requestHandler = function(request, response) {

  var headers = defaultCorsHeaders;
  headers['Content-Type'] = 'application/json';

  var statusCode = 404;

  if (request.url === '/classes/messages') {
    if (request.method === 'POST') {
      let body = '';
      statusCode = 201;
      let noUserName = false;
      let noText = false;
      request.on('data', (chunk) => {
        body += chunk.toString();
      });
      request.on('end', () => {
        let singleMsg = JSON.parse(body);

        if (singleMsg.username === undefined) {
          noUserName = true;
          console.log('noUserName should be true--------', noUserName);
        }
        if (singleMsg.text === undefined) {
          noText = true;
          console.log('noText should be true----------', noText);
        }
        if (noUserName || noText) {
          console.log('AM I ENTERING HERE? ------------------');
          statusCode = 404;
        }

        msg.push(JSON.parse(body));
        response.writeHead(statusCode, headers);
        response.end(JSON.stringify(statusCode));
      });

    } else if (request.method === 'GET') {
      statusCode = 200;
    }
  }

  response.writeHead(statusCode, headers);

  if (request.method === 'GET') {
    response.end(JSON.stringify(msg));
  }
  if (request.method === 'DELETE') {
    response.end(JSON.stringify(statusCode));
  }

};

module.exports.requestHandler = requestHandler;