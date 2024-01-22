'use client'
import {
    Flex, 
    Img, 
    Input,
    InputGroup,
    InputLeftElement,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { KeyboardEvent, useState } from 'react';

function SearchBar() {

    const router = useRouter()
    const [ query, setQuery ] = useState<string>('')


    const handleSearch = (e : KeyboardEvent<HTMLInputElement>) => {
        if(e.code == 'Enter' || e.keyCode === 0)
        {
            let url = new URL(`${ location.protocol + "//" + location.hostname + location.pathname}` + `${ location.href.split('?')[1] ? '?' + location.href.split('?')[1] : ''}`)
            if(url.searchParams.get('query'))
            {
                url.searchParams.set('query', query)
                router.replace(url.toString())
            }
            else {
                url.searchParams.append('query', query)
                router.replace(url.toString())
            }
        }
    }

    const handleInput = (e : KeyboardEvent<HTMLInputElement>) => {
        setQuery(e.currentTarget.value)
    }

    return (
        <Flex width={'100%'} maxWidth={'100%'} maxHeight={'2.8rem'}>
            <InputGroup>
                <InputLeftElement height={'2.8rem'} pl={'0.5rem'}>
                    <Img src='../icons/Search.svg' width={'1.25rem'} height={'auto'} />
                </InputLeftElement>
                <Input placeholder='Search Music, Artist, Genre' width={'100%'} height={'2.8rem'}rounded={'40px'} boxShadow={'none !important'} backgroundColor={'rgba(65,65,65,0.65)'} border={'none'} color={'primaryText'} _placeholder={{ color: 'primaryText' }} pl={'3rem'} 
                onKeyDown={handleSearch} onInput={handleInput} />
            </InputGroup>
        </Flex>
    )
}

export default SearchBar;