import express from "express";
import { 
    getBooksAsync
} from "../controllers/openlibrary.controller.js";

const router = express.Router();

//openlibrary
router.get('/', getBooksAsync);

export default router;