'use client'
import {
    Flex, 
    Img, 
    Input,
    InputGroup,
    InputLeftElement,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { KeyboardEvent } from 'react';

function SearchBar() {

    const router = useRouter()

    const handleInput = (e : KeyboardEvent<HTMLInputElement>) => {
        if(e.code == 'Enter' || e.keyCode === 0)
        {
            if(location.href.indexOf('/search') != -1) return;
            router.replace(`${ location.protocol + "//" + location.hostname + location.pathname + '/search'}` + `${ location.href.split('?')[1] ? '?' + location.href.split('?')[1] : ''}`)
        }
    }

    return (
        <Flex width={'100%'} maxWidth={'100%'} maxHeight={'2.8rem'}>
            <InputGroup>
                <InputLeftElement height={'2.8rem'} pl={'0.5rem'}>
                    <Img src='../icons/Search.svg' width={'1.25rem'} height={'auto'} />
                </InputLeftElement>
                <Input placeholder='Search Music, Artist, Genre' width={'100%'} height={'2.8rem'}rounded={'40px'} boxShadow={'none !important'} backgroundColor={'rgba(65,65,65,0.65)'} border={'none'} color={'primaryText'} _placeholder={{ color: 'primaryText' }} pl={'3rem'} 
                onKeyDown={handleInput} />
            </InputGroup>
        </Flex>
    )
}

export default SearchBar;