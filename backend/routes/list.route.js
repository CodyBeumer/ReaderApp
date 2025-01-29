import express from "express";
import mongoose from "mongoose";
import List from '../models/list.model.js';
import { 
    getListsAsync, 
    getListAsync,
    postListAsync,
    patchListAsync, 
    deleteListAsync
} from "../controllers/list.controller.js";

const router = express.Router();

//lists
router.get('/api/lists', getListsAsync);

router.get('/:id', getListAsync);

router.post('/', postListAsync);

router.patch('/:id', patchListAsync);

router.delete('/:id', deleteListAsync);

export default router;