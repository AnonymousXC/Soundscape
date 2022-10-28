import type { NextPage } from 'next'
import {
  Flex,
} from "@chakra-ui/react"
import Head from 'next/head'
import SideBar from '../components/sidebar/SideBar'
import HomeTabMain from '../components/home/HomeMusic'
import Player from '../components/player/Player'
import ContextMenu from '../components/context/contextMenu'


const Home: NextPage = () => {


  return (
    <>
      <Flex
      id="sm-wrapper"
      className="sm-wrapper-cl"
      h={"calc(100vh - 90px)"}
      backgroundColor={"rgba(16, 20, 31, 0.5)"}>
        <Head>
          <title id='win-title'>Soundscape</title>
          <link rel="shortcut icon" href="" type="image/x-icon" id='site-icon' />
        </Head>
          <SideBar />
          <HomeTabMain />
          <ContextMenu />
      </Flex>
      <Player />
    </>
  )
}

export default Home
