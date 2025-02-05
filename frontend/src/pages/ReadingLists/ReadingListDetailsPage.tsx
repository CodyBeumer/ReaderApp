import { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { InputGroup, Button, Form } from 'react-bootstrap';
import { Input } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

type Props = {

}

type ListDetails = {
    _id: string | undefined,
    listName: string
}

type ListDetailsResponse = {
    success: boolean,
    data: ListDetails
}

function ReadingListDetailsPage({}: Props) {
    const { id } = useParams();
    const [state, setState] = useState<ListDetails>({
        _id: id, //default id to route param value
        listName: ""
    });
    const navigate = useNavigate();
    const VITE_API_URL = import.meta.env.VITE_API_URL;

    async function handleSaveButtonClick() {
        if (state._id === 'new') {
            await createListAndNavigate();
        } else {
            await updateList();
        }
    }

    async function createListAndNavigate() {
        return await axios.post(`${VITE_API_URL}/api/lists`, {
            listName: state.listName
        }).then(function (result) {
            //navigate to list on successful save
            navigate(`/reading-lists/${result.data.data._id}`, { replace: true });
        });
    }

    async function updateList() {
        return await axios.patch(`${VITE_API_URL}/api/lists/${state._id}`, state).then(function (result) {
            console.log(result.data);
            setState(result.data.data);
        });
    }

    useEffect(() => {
        const getData = async () => {
            const response = await axios.get<ListDetailsResponse>(`${VITE_API_URL}/api/lists/${id}`);
            setState(response.data.data); //may need to rewrite controllers
        }

        if (state._id != 'new') {
            getData();
        }
    }, []);
  
    return (
    <>
        <InputGroup>
            <InputGroup.Text>List Name</InputGroup.Text>
            <Form.Control 
                placeholder='List Name'
                aria-label="List Name"
                value={state.listName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                    setState(prevState => ({ 
                        ...prevState, 
                        listName: e.target.value
                    })) 
                }
            />
        </InputGroup>
        <Button onClick={handleSaveButtonClick}>Save</Button>
    </>
  )
}

export default ReadingListDetailsPage