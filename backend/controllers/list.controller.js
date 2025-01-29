export const getListsAsync = async (req, res) => {
    //TODO: Implement pagination and filtering
    try {
        const lists  = await List.find({});
        res.status(200).json({ success: true, data: lists});
    } catch(err) {
        console.error('Error in GET /api/lists: ', err.message);
        res.status(500).json({ success: false, message: 'Server Error'})
    }
}

export const getListAsync = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: 'Invalid Product Id' });
    }

    try {
        const list  = await List.findById(id);
        res.status(200).json({ success: true, data: list});
    } catch(err) {
        console.error('Error in GET /api/lists/:id: ', err.message);
        res.status(500).json({ success: false, message: 'Server Error'})
    }
}

export const postListAsync = async (req, res) => {
    const list = req.body;

    //make sure required fields are filled out
    if (!list.listName) {
        return res.status(400).json({ success: false, message: 'Please provide all fields' });
    }

    //convert body to mongo model
    const listModel = new List(list);

    try {
        await listModel.save();
        res.status(201).json({ success: true, data: listModel});
    } catch (err) {
        console.error('Error in POST /api/lists: ', err.message);
        res.status(500).json({ success: false, message: 'Server Error'})
    }
}

export const patchListAsync = async (req, res) => {
    const { id } = req.params;
    const list = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: 'Invalid Product Id' });
    }

    try {
        const updatedList = await List.findByIdAndUpdate(id, list, { new: true });
        res.status(200).json({ success: true, data: updatedList });
    } catch(err) {
        res.status(500).json({ success: false, message: err.message});
    }
}

export const deleteListAsync = async (req, res) => {
    const {id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: 'Invalid Product Id' });
    }

    try {
        await List.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Product Deleted'})
    } catch (err) {
        console.error('Error in DELETE /api/lists: ', err.message);
        res.status(500).json({ success: false, message: 'Server Error'})
    }
}