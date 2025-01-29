import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import listRoutes from './routes/list.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/lists", listRoutes)

app.get('/api/debug', (req, res) => {
    res.send('Diagnostics Information');
});

app.listen(PORT, () => {
    connectDB();
    console.log(`Server started at http://localhost:${PORT}`);
});