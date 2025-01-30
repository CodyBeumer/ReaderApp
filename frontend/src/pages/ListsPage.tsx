import React from 'react'
import { useEffect, useState } from 'react';
import { Stack, Grid, CardFooter, HStack, Box, Button, Container, Flex, Heading, Card, CardBody, Text, Image, GridItem} from '@chakra-ui/react'
import axios from 'axios';

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

function ListsPage({}: Props) {
    const [lists, setLists] = useState<List[]>([])
    useEffect(() => {
        const getData = async () => {
            const response = await axios.get<Response>('http://localhost:5000/api/lists');
            console.log('Response data: ', response.data);  // Log the entire response object
            setLists(response.data.data); //may need to rewrite controllers
        }

        getData();
    }, []);

    useEffect(() => {
        console.log('Lists: ', lists);
    }, [lists]); // This will log whenever 'lists' state changes.

  return (
    <>
    <Container marginX={"auto"} minW={"70%"}>
        <Box marginY={5}>
            <Button>New List +</Button> 
        </Box>
        <Grid templateColumns='repeat(2, 1fr)' gap={6}>
            {lists.map((list) => {
                return (
                    <GridItem key={list._id} w={"100%"}>
                        <Card
                            direction={{ base: 'column', sm: 'row' }}
                            overflow='hidden'
                            variant='outline'
                        >
                            <Image
                                objectFit='cover'
                                h={"300px"}
                                w={"200px"}
                                src='https://i.thriftbooks.com/api/imagehandler/m/67DE77D7454F547B6E089C6ED609ACD21A8E3991.jpeg'
                                alt='Caffe Latte'
                            />

                            <Stack>
                                <CardBody>
                                <Heading size='md'>{list.listName}</Heading>
                                </CardBody>

                                <CardFooter>
                                <Button variant='solid' colorScheme='blue'>
                                    View List
                                </Button>
                                </CardFooter>
                            </Stack>
                        </Card>
                    </GridItem>
                )
            })}
        </Grid>
    </Container>
    </>
  )
}

export default ListsPage