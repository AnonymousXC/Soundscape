import type { NextPage } from 'next'
import {
  Flex,
  useBreakpoint
} from "@chakra-ui/react"
import Head from 'next/head'
import SideBar from '../components/sidebar/SideBar'
import HomeTabMain from '../components/home/HomeMusic'
import Player from '../components/player/Player'
import ContextMenu from '../components/context/contextMenu'


const Home: NextPage = () => {

  const currBR = useBreakpoint()
  const isMobile = currBR === "sm" || currBR === "base" ? true : false
  


  return (
    <>
      <Flex
      id="sm-wrapper"
      className="sm-wrapper-cl"
      h={isMobile === true ? "calc(100vh - 40px)" : "calc(100vh - 90px)"}
      w={isMobile === true ? "100vw" : ""}
      backgroundColor={"rgba(16, 20, 31, 0.5)"}
      direction={isMobile === true ? "column" : "initial"}>
        <Head>
          <title id='win-title'>Soundscape</title>
          <link rel="shortcut icon" href="" type="image/x-icon" id='site-icon' />
        </Head>
          { isMobile === false &&
          <>
            <SideBar />
            <HomeTabMain />
            <ContextMenu />
          </>
          }
          {
            isMobile === true &&
            <>
              <HomeTabMain />
              <Player />
            </>
          }
      </Flex>
      {
        isMobile === false && <Player />
      }
    </>
  )
}

export default Home
