import Song from '@/components/SearchSongBar';
import SearchBar from '@/components/desktop/SongSearchBar';
import { SongResponse } from '@/interfaces/song.interface';
import {
    Flex,
} from '@chakra-ui/react';

const dat : SongResponse = {
    "id": "R35H6BI-",
    "name": "Attention",
    "type": "",
    "album": {
        "id": "16230273",
        "name": "Attention",
        "url": "https://www.jiosaavn.com/album/attention/0nyB8F2NcJI_"
    },
    "year": "2017",
    "releaseDate": "2017-04-21",
    "duration": "211",
    "label": "Artist Partner",
    "primaryArtists": "Charlie Puth",
    "primaryArtistsId": "755042",
    "featuredArtists": "",
    "featuredArtistsId": "",
    "explicitContent": '0',
    "playCount": '79603937',
    "language": "english",
    "hasLyrics": "true",
    "url": "https://www.jiosaavn.com/song/attention/IlteeUJyfh4",
    "copyright": "℗ 2017 Artist Partner Group, Inc.",
    "image": [
        {
            "quality": "50x50",
            "link": "https://c.saavncdn.com/292/Attention-English-2017-20190607043124-50x50.jpg"
        },
        {
            "quality": "150x150",
            "link": "https://c.saavncdn.com/292/Attention-English-2017-20190607043124-150x150.jpg"
        },
        {
            "quality": "500x500",
            "link": "https://c.saavncdn.com/292/Attention-English-2017-20190607043124-500x500.jpg"
        }
    ],
    "downloadUrl": [
        {
            "quality": "12kbps",
            "link": "https://aac.saavncdn.com/292/3688f03d025658b1103cc8b854e1b3ed_12.mp4"
        },
        {
            "quality": "48kbps",
            "link": "https://aac.saavncdn.com/292/3688f03d025658b1103cc8b854e1b3ed_48.mp4"
        },
        {
            "quality": "96kbps",
            "link": "https://aac.saavncdn.com/292/3688f03d025658b1103cc8b854e1b3ed_96.mp4"
        },
        {
            "quality": "160kbps",
            "link": "https://aac.saavncdn.com/292/3688f03d025658b1103cc8b854e1b3ed_160.mp4"
        },
        {
            "quality": "320kbps",
            "link": "https://aac.saavncdn.com/292/3688f03d025658b1103cc8b854e1b3ed_320.mp4"
        }
    ]
}

function Dashboard() {
    return (
        <Flex position={'relative'} top={0} left={0} width={'100%'} background={'background'} height={'calc(100vh - 6.25rem)'} px={'1.25rem'} pt={'1rem'} flexDir={'column'}>
            <SearchBar />
            <Song data={dat} />
        </Flex>
    )
}

export default Dashboard;