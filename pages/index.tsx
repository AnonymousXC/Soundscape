import type { NextPage } from 'next'
import {
  Flex,
} from "@chakra-ui/react"
import Head from 'next/head'
import SideBar from '../components/sidebar/SideBar'
import HomeTab from '../components/home/MusicMain'
import Player from '../components/player/Player'


const Home: NextPage = () => {
  return (
    <>
      <Flex
      id="sm-wrapper"
      className="sm-wrapper-cl"
      h={"calc(100vh - 80px)"}>
        <Head>
          <title>Soundscape : Music</title>
        </Head>
        <SideBar />
        <HomeTab />
      </Flex>
      <Player />
    </>
  )
}

export default Home
