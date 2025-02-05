import React from 'react'
import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { 
    Form as BootstrapForm, 
    Overlay as BootstrapOverlay,
    Button as BootstrapButton
} from 'react-bootstrap';

type Props = {}

type OpenLibraryResponse = {
    success: boolean,
    data: OpenLibraryDoc[]
}

type OpenLibraryDoc = {
    author_name: string[],
    first_publish_year: number,
    key: string,
    title: string,
    cover_i: string
}

function Searchbar({}: Props) {
    const [search, setSearch] = useState<string>('');
    const [searchResults, setSearchResults] = useState<OpenLibraryDoc[]>([]);
    const target = useRef(null);

    function getSearchResults() {
        const searchBooks = async () => {
            const url = `http://localhost:5000/api/openlibrary?query=${encodeURIComponent(search)}`;
            const response = await axios.get<OpenLibraryResponse>(url);

            console.log(response.data.data);
            setSearchResults(response.data.data)
        }

        if (!!search) {
            searchBooks();
        } else {
            setSearchResults([])
        }
    }
    
    return (
        <div style={{
            width: '30em'
        }}>
            <BootstrapForm className='w-100 d-flex'>
                <BootstrapForm.Control
                    ref={target}
                    placeholder='Search Title / Author / ISBN'
                    aria-label="Search Title / Author / ISBN"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                        setSearch(e.target.value)
                    }
                    onSubmit={() => { }}
                />
                <BootstrapButton className='w-10' onClick={() => { getSearchResults()}}>Go</BootstrapButton>
                <BootstrapOverlay target={target.current} show={!!searchResults && searchResults.length > 0} placement='bottom-start'>
                    <div style={{
                        width: '30em'
                    }}>
                        <div className='bg-white border w-100'>
                            <ul>
                                    {
                                        !!searchResults && searchResults.length > 0 ? 
                                        searchResults.map((item) => {
                                            return (
                                                <li key={item.key}>
                                                    <a href={`/book/${item.key.replace('/works/', '')}`}>
                                                        <img style={{
                                                            height: '100px',
                                                            width: '60px'
                                                        }} src={`https://covers.openlibrary.org/b/id/${item.cover_i}-L.jpg`}></img>
                                                        <span>{item.title}</span>
                                                    </a>
                                                </li>
                                            )
                                        }) : <>No Results Found</>
                                    }
                            </ul>
                        </div>
                    </div>
                </BootstrapOverlay>
            </BootstrapForm>
        </div>
    )
}

export default Searchbar