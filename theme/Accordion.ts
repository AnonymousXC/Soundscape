import { accordionAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers(accordionAnatomy.keys);

const custom = definePartsStyle({
    panel: {
        border: "none",
        boxShadow: "none",
        borderColor: "gray.200",
        background: "gray.50",
        roundedBottom: "1rem",

        // Let's also provide dark mode alternatives
        _dark: {
            background: "#ededed",
            color: "#000",
        },
    },
    container: {
        border: "none",
        backgroundColor: "#202020",
        rounded: "1rem",
        my: 6,
    },
});

export const Accordion = defineMultiStyleConfig({
    variants: { custom },
});
