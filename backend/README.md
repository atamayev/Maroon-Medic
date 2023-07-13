# Backend Structure

1. The client makes a request to the server.
2. The server (index.js) receives the request and sends it to the router (routes folder), depending on the type of request.
3. The router sends the request to a specific controller function.
4. The controller function(s) will then interact with the database (db folder) and send a response back to the client.
