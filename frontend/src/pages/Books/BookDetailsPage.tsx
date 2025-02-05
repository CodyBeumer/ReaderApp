import { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import axios from 'axios';

type Props = {}

type BookDetails = {
    title: string,
    description: string
}

function BookDetailsPage({}: Props) {
    const { id } = useParams();
    const [bookDetails, setBookDetails] = useState<BookDetails>({
        title: '',
        description: ''
    });

    //sample book for testing OL45804W
    useEffect(() => {
        const getBook = async () => {
            const response = await axios.get<BookDetails>(`https://openlibrary.org/works/${id}.json`);

            setBookDetails(response.data);
        }

        getBook();
    });

    return (
        <>
            <div>{bookDetails.title}</div>
            <div>{bookDetails.description}</div>
        </>
    )
}

export default BookDetailsPage