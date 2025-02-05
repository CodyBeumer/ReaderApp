import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { 
    Table as BootstrapTable, 
    Button as BootstrapButton, 
    Container as BootstrapContainer 
} from 'react-bootstrap';
import { useLoading } from '@/hooks/useLoading';

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
    const [isLoading, load] = useLoading();
    const navigate = useNavigate();
    const VITE_API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const getLists = async () => {
            const response = await axios.get<Response>(`${VITE_API_URL}/api/lists`);
            console.log('Response data: ', response.data);  // Log the entire response object
            setLists(response.data.data); //may need to rewrite controllers
        }

        load(getLists());
    }, []);

    return (
        <>
            <BootstrapContainer>
                {
                    isLoading ? <>Loading...</> : (
                        <BootstrapTable striped size="sm">
                            <thead>
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
                                                <td><BootstrapButton onClick={() => { navigate(`/reading-lists/${item._id}`)}}>Open</BootstrapButton></td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </thead>
                        </BootstrapTable>
                    )
                }
            </BootstrapContainer>
            

        {/* <Container marginX={"auto"} minW={"70%"}>
            <Box marginY={5}>
                <a href='/reading-lists/new'>
                    <Button>New List +</Button> 
                </a>
            </Box>
            <Table.Root>

            </Table.Root>



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
        </Container> */}
        </>
    )
}

export default ReadingListsPage