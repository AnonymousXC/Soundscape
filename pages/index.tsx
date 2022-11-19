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
import MobileBar from '../components/sidebar/mobileBottomBar'
import { useEffect } from 'react'


const Home: NextPage = () => {

  const currBR = useBreakpoint()
  const isMobile = currBR === "sm" || currBR === "base" ? true : false

  useEffect(() => {
    document.documentElement.style.setProperty("--mobile-height", `${window.innerHeight}px`)
    window.addEventListener("resize", (e) => {
      document.documentElement.style.setProperty("--mobile-height", `${window.innerHeight}px`)
    })
  }, [])


  return (
    <>
      <Flex
      id="sm-wrapper"
      className="sm-wrapper-cl"
      h={isMobile === true ? "calc(100vh - calc(100vh - 100%))" : "calc(100vh - 90px)"}
      w={isMobile === true ? "100vw" : ""}
      backgroundColor={"rgba(16, 20, 31, 0.5)"}
      direction={isMobile === true ? "column" : "initial"}>
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
            </>
          }
      </Flex>
      <Player />
      { isMobile === true && <MobileBar /> }
    </>
  )
}

export default Home