import mongoose from 'mongoose';

const listSchema = new mongoose.Schema({
    listName: { type: String, required: true }
});

const List = mongoose.model('List', listSchema);

export default List;