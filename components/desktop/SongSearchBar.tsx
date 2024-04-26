'use client'
import {
    Button,
    Flex, 
    Img, 
    Input,
    InputGroup,
    InputLeftElement,
} from '@chakra-ui/react';
import { KeyboardEvent, useState } from 'react';

interface Props {
    setQueryParent: any,
    setResultsVisibilityParent: any,
    isResultsOpen: boolean,
    currentQuery: string,
}

function SearchBar({ setQueryParent, setResultsVisibilityParent, isResultsOpen, currentQuery } : Props) {

    const [ query, setQuery ] = useState<string>('')

    const handleInput = (e : KeyboardEvent<HTMLInputElement>) => {
        if(e.code == "Enter" || e.keyCode == 0)
        {
            setQueryParent(query)
            setResultsVisibilityParent(true)
        }
        else
            setQuery(e.currentTarget.value)
    }

    return (
        <Flex width={'100%'} maxWidth={'100%'} maxHeight={'2.8rem'}>
            <InputGroup>
                <InputLeftElement height={'2.8rem'} pl={'0.5rem'}>
                    {
                        isResultsOpen == false ? <Img src='../icons/Search.svg' width={'1.25rem'} height={'auto'} /> : 
                        <Button variant={'unstyled'} onClick={() => {
                            setResultsVisibilityParent(false)
                        }}>x</Button>
                    }
                </InputLeftElement>
                <Input placeholder='Search Music, Artist, Genre' width={'100%'} height={'2.8rem'}rounded={'40px'} boxShadow={'none !important'} backgroundColor={'rgba(65,65,65,0.65)'} border={'none'} color={'primaryText'} _placeholder={{ color: 'primaryText' }} pl={'3rem'} 
                onKeyDown={handleInput} onFocus={() => {
                    if(currentQuery != "")
                        setResultsVisibilityParent(true)
                }} />
            </InputGroup>
        </Flex>
    )
}

export default SearchBar;