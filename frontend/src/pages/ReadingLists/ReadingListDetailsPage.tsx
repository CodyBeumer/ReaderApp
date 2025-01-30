import React, { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { Input } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';

type Props = {

}

type ListDetails = {
    listName: string
}

type ListDetailsResponse = {
    success: boolean,
    data: ListDetails
}

type OpenLibraryResponse = {
    docs: OpenLibraryDoc[]
}

type OpenLibraryDoc = {
    author_name: string[],
    first_publish_year: number,
    key: string,
    title: string
}

function ReadingListDetailsPage({}: Props) {
    const { id } = useParams();
    const [listDetails, setListDetails] = useState<ListDetails>();
    const [search, setSearch] = useState<string>('');
    const [searchResults, setSearchResults] = useState<OpenLibraryDoc[]>([]);

    useEffect(() => {
        const getData = async () => {
            const response = await axios.get<ListDetailsResponse>(`http://localhost:5000/api/lists/${id}`);
            console.log('Response data: ', response.data);  // Log the entire response object
            setListDetails(response.data.data); //may need to rewrite controllers
        }

        getData();
    }, []);

    useEffect(() => {
        const searchBooks = async () => {
            const response = await axios.get(`https://openlibrary.org/search.json?title=${search}&fields=title,author_name,first_publish_year,key&limit=5`);

            setSearchResults(response.data.docs)
        }

        if (!!search) {
            searchBooks();
        } else {
            setSearchResults([])
        }
    }, [search])
  
    return (
    <>
    {listDetails?.listName}
    <Input placeholder='Search Title / Author / ISBN' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)} />

    <ul>
        {
            !!search && !!searchResults ? 
                searchResults.map((item) => {
                    return (
                        <li key={item.key}>{item.title}</li>
                    )
                }) : <></>
        }
    </ul>
    </>
  )
}

export default ReadingListDetailsPage