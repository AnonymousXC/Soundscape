import { extendTheme } from "@chakra-ui/react";
import Divider from "./Divider";


const theme = extendTheme({
    config: {
        initialColorMode: "dark",
        useSystemColorMode: false,
    },
    semanticTokens: {
        colors: {
            sidebarBG: {
                default: "#fff",
                _dark: "#111111"
            },
            primaryText: {
                default: '#000',
                _dark: '#B8B8B8'
            },
            secondaryText: {
                default: '#000',
                _dark: '#F1F1F1'
            }
        }
    },
    components: {
        Divider
    }
})

export default theme