'use client'
import {
    Button,
    Flex, 
    Img, 
    Input,
    InputGroup,
    InputLeftElement,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { KeyboardEvent, useState } from 'react';

function SearchBar({isSearchResultOpen, setQueryParent } : {isSearchResultOpen: boolean, setQueryParent : any}) {

    const router = useRouter()
    const [ query, setQuery ] = useState<string>('')

    const handleInput = (e : KeyboardEvent<HTMLInputElement>) => {
        if(e.code == "Enter" || e.keyCode == 0)
            setQueryParent(query)
        else
            setQuery(e.currentTarget.value)
    }

    return (
        <Flex width={'100%'} maxWidth={'100%'} maxHeight={'2.8rem'}>
            <InputGroup>
                <InputLeftElement height={'2.8rem'} pl={'0.5rem'}>
                    {
                        isSearchResultOpen ? <Img src='../icons/Search.svg' width={'1.25rem'} height={'auto'} /> : 
                        <Button variant={'unstyled'} onClick={() => {
                            setQueryParent("")
                        }}>x</Button>
                    }
                </InputLeftElement>
                <Input placeholder='Search Music, Artist, Genre' width={'100%'} height={'2.8rem'}rounded={'40px'} boxShadow={'none !important'} backgroundColor={'rgba(65,65,65,0.65)'} border={'none'} color={'primaryText'} _placeholder={{ color: 'primaryText' }} pl={'3rem'} 
                onKeyDown={handleInput} />
            </InputGroup>
        </Flex>
    )
}

export default SearchBar;