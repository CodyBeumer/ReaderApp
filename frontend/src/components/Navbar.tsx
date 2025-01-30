import React from 'react'
import { Container, Flex, Text, HStack, Button} from '@chakra-ui/react'
import { Link } from 'react-router'
import { useColorMode } from '@chakra-ui/react'

type Props = {}

function Navbar({}: Props) {
    const {colorMode, toggleColorMode } = useColorMode();
  return (
    <Container maxW={"100vw"} px={4} boxShadow={"md"}>
        <Flex
            h={16}
            alignItems={"center"}
            justifyContent={"space-between"}
            flexDir={{
                base: "column",
                sm: "row"
            }}
        >
            <HStack spacing={5} alignItems={"center"}>
                <Text
                    fontSize={{ base: "22", sm: "28"}}
                    fontWeight={"bold"}
                    textAlign={"center"}
                    bgGradient={"linear(to-l, cyan.400, blue.500)"}
                    bgClip={"text"}
                >
                    <Link to={"/"}>ReaderApp</Link>
                </Text>
                <Link to={"reading-lists"}>Reading Lists</Link>
            </HStack>
            

            <HStack spacing={2} alignItems={"center"}>
                
                <Button onClick={toggleColorMode}>{ colorMode === "light" ?<>Dark</> : <>Light</>}</Button>
            </HStack>
        </Flex>
    </Container>
  )
}

export default Navbar