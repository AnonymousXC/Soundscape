import { extendTheme } from "@chakra-ui/react";
import Divider from "./Divider";
import Button from "./Button";

const theme = extendTheme({
    config: {
        initialColorMode: "dark",
        useSystemColorMode: false,
    },
    semanticTokens: {
        colors: {
            background: {
                default: "#eeeeee",
                _dark: "#111111"
            },
            primaryText: {
                default: '#474747',
                _dark: '#B8B8B8'
            },
            secondaryText: {
                default: '#0e0e0e',
                _dark: '#F1F1F1'
            },
            primaryTextRe: {
                default: '#000',
                _dark: '#fff'
            }
        }
    },
    components: {
        Divider,
        Button
    }
})

export default theme