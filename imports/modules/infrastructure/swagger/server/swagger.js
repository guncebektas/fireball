import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import swaggerSpec from './swaggerConfig'; // Adjust path if needed
import path from 'path';
import fs from 'fs';
import swaggerUiDist from 'swagger-ui-dist';

// Serve Swagger UI static files
const swaggerUiPath = swaggerUiDist.absolutePath();

// Function to serve static files from Swagger UI
function serveStatic(req, res, next) {
  const filePath = path.join(swaggerUiPath, req.url === '/' ? '/index.html' : req.url);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }

    res.writeHead(200, {
      'Content-Type': getContentType(filePath),
    });

    res.end(data);
  });
}

// Helper function to determine content type
function getContentType(filePath) {
  if (filePath.endsWith('.html')) return 'text/html';
  if (filePath.endsWith('.css')) return 'text/css';
  if (filePath.endsWith('.js')) return 'application/javascript';
  if (filePath.endsWith('.json')) return 'application/json';
  if (filePath.endsWith('.png')) return 'image/png';
  if (filePath.endsWith('.svg')) return 'image/svg+xml';
  return 'text/plain';
}

// Handle /api-docs route to serve Swagger UI
WebApp.connectHandlers.use('/api-docs', serveStatic);

// Serve the Swagger JSON documentation
WebApp.connectHandlers.use('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(swaggerSpec));
});

Meteor.startup(() => {
  console.log('Swagger UI available at http://localhost:3001/api-docs/');
});
