import { createServer } from "http";
import { readFile } from "fs";
import path from "path";

const handleIncomingRequest = (request, response) => {
  // request.url contains the portion of the URL after the domain.
  // E.g. for https://ra.co/index.html, request.url would return "/index.html".
  console.log("request url", request.url);

  // "." refers to the Unix filesystem ".", which represents the current directory.
  const filePath = "." + request.url;

  readFile(filePath, (err, content) => {
    if (err) {
      console.error("error reading file", err);
      return;
    }
    //const path = require("path");

    // Set the response code to 200 (i.e. OK)
    let extName = path.extname(filePath);
    let contentType = "text/html";

    switch (extName) {
      case ".css":
        contentType = "text/css";
        break;
      case ".js":
        contentType = "text/javascript";
        break;
      case ".json":
        contentType = "application/json";
        break;
      case ".png":
        contentType = "image/png";
        break;
      case ".jpg":
        contentType = "image/jpg";
        break;
    }
    response.writeHead(200, { "Content-Type": contentType });
    response.writeHeader;
    // Send the response with the file content in utf-8 format
    response.end(content, "utf-8");
  });
};

// Initialise server with request listener function handleIncomingRequest
// https://nodejs.org/api/http.html#http_http_createserver_options_requestlistener
// Use port 3004 by convention.
createServer(handleIncomingRequest).listen(3004);
