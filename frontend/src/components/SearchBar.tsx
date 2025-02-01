import React from 'react'
import { useState, useEffect } from "react";
import { Input } from '@chakra-ui/react';
import axios from 'axios';

type Props = {}

type OpenLibraryResponse = {
    docs: OpenLibraryDoc[]
}

type OpenLibraryDoc = {
    author_name: string[],
    first_publish_year: number,
    key: string,
    title: string
}

function SearchBar({}: Props) {
    const [search, setSearch] = useState<string>('');
    const [searchResults, setSearchResults] = useState<OpenLibraryDoc[]>([]);
    
    useEffect(() => {
        const searchBooks = async () => {
            const response = await axios.get<OpenLibraryResponse>(`https://openlibrary.org/search.json?title=${search}&fields=title,author_name,first_publish_year,key&limit=5`);

            setSearchResults(response.data.docs)
        }

        if (!!search) {
            searchBooks();
        } else {
            setSearchResults([])
        }
    }, [search]);
    
    return (
        <>
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

export default SearchBar