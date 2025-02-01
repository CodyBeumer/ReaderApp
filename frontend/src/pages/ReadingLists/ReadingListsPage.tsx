import { useEffect, useState } from 'react';
import { Box, Button, Container } from '@chakra-ui/react'
import axios from 'axios';
import { useNavigate } from 'react-router';

type List = {
    _id: string,
    listName: String
    __v: number
}

type Response = {
    success: boolean,
    data: List[]
}

type Props = {}

function ReadingListsPage({}: Props) {
    const [lists, setLists] = useState<List[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            const response = await axios.get<Response>('http://localhost:5000/api/lists');
            console.log('Response data: ', response.data);  // Log the entire response object
            setLists(response.data.data); //may need to rewrite controllers
        }

        getData();
    }, []);

    return (
        <>
        <Container marginX={"auto"} minW={"70%"}>
            <Box marginY={5}>
                <a href='/reading-lists/new'>
                    <Button>New List +</Button> 
                </a>
            </Box>
            <table>
                <thead>
                    <tr>
                        <th>List Name</th>
                        <th>Books</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {lists.map((item) => {
                        return (
                            <tr key={item._id}>
                                <td><a href={`/reading-lists/${item._id}`}>{item.listName}</a></td>
                                <td>0</td>
                                <td><Button onClick={() => { navigate(`/reading-lists/${item._id}`)}}>Open</Button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </Container>
        </>
    )
}

export default ReadingListsPage