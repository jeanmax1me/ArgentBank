import express from 'express';
import dotEnv from 'dotenv';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import process from 'process';
// Import the YAML file directly using import
import { load } from 'js-yaml';
import fs from 'fs';
import dbConnection from './database/connection.js';


dotEnv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Load YAML file
const swaggerDocs = load(fs.readFileSync('./server/swagger.yaml', 'utf8'));

// Connect to the database
dbConnection()

// Handle CORS issues
app.use(cors())

// Request payload middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Import userRoutes directly
import userRoutes from './routes/userRoutes.js';
app.use('/api/v1/user', userRoutes);

// API Documentation
if (process.env.NODE_ENV !== 'production') {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.get('/', (req, res, next) => {
  res.send('Hello from my Express server v2!')
})

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
