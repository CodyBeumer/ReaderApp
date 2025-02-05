import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/mongo.config.js';
import listRoutes from './routes/list.route.js';
import openLibraryRoutes from './routes/openlibrary.route.js'
import cors from 'cors'
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json());
app.use(cors({}));
app.use("/api/lists", listRoutes);
app.use("/api/openlibrary", openLibraryRoutes);

app.get('/api/debug', (req, res) => {
    res.send('Diagnostics Information');
});

//server frontend as static files in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    })
}

app.listen(PORT, () => {
    connectDB();
    console.log(`Server started at http://localhost:${PORT}`);
});