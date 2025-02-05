import axios from 'axios';

export const getBooksAsync = async(req, res) => {
    const query = req.query.query;
    const url = `https://openlibrary.org/search.json?title=${encodeURIComponent(query)}`; //check if this is double encoding the params
    
    try {
        const response = await axios.get(url);
        const books = response.data.docs;

        const booksWithCover = books.filter(book => {
            return  book.cover_i !== undefined && 
                    book.cover_edition_key !== undefined &&
                    book.language !== undefined && 
                    !!book.language.indexOf("eng") !== -1;
        });

        res.status(200).json({ success: true, data: booksWithCover });
    } catch (err) {
        console.error('Error in getBooksAsync', err.message);
        res.status(500).json({ success: false, message: 'Server Error'});
    }
}