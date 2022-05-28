// require built-in modules
const http = require('http');
const fs = require('fs');
const mime = require('mime-types');

let lookup = mime.lookup; // alias for mime.lookup

const port = 3000;

// when the server is instantiated (created) it is IMMUTABLE
const server = http.createServer(function(req, res)
{
    let path = req.url; // alias for req.url

    if(path === "/" || path === "/home")
    {
        path = "/index.html";
    }

    let mime_type = lookup(path.substring(1));
    console.log(`MIME TYPE: ${mime_type}`);

    // reads a file from the file system
    fs.readFile(__dirname + path, function(err, data)
    {
        // some error exists with the url
        if(err)
        {
            res.writeHead(404); // file does not exist
            console.log(`ERROR: ${err.message}`);
            return res.end(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>ERROR - 404</title>
            </head>
            <body>
                <h1>ERROR - 404 - File Not Found!</h1>
            </body>
            </html>
            `);
        }
        // no error
        res.setHeader("X-Content-Type-Options", "nosniff");
        res.writeHead(200, {'Content-Type': mime_type}); // all ok
        console.log(`Full File Name: ${__dirname}${req.url}`);
        return res.end(data); // outputs the file to the browser
    });
});

server.listen(port, function()
{
    console.log("Server Running at Port: " + port);
});