import express from "express";
import { 
    getListsAsync, 
    getListAsync,
    postListAsync,
    patchListAsync, 
    deleteListAsync
} from "../controllers/list.controller.js";

const router = express.Router();

//lists
router.get('/', getListsAsync);

router.get('/:id', getListAsync);

router.post('/', postListAsync);

router.patch('/:id', patchListAsync);

router.delete('/:id', deleteListAsync);

export default router;