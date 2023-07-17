# Backend Structure

1. The client makes a request to the server.
2. The server (index.js) receives the request and sends it to the router (routes folder), depending on the type of request.
3. The router sends the request to a specific controller function.
4. The controller function(s) will then interact with the database (db folder) and send a response back to the client.

To access the data in redis, make sure the instance is running, then run:
1. docker exec -it some-redis bash
2. redis-cli (might have to try a couple times for it to work)
3. keys * (to see all keys)
4. get <key> (to see the value of a key)
