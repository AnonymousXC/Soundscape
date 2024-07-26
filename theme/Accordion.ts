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
        fontWeight: "400",

        _dark: {
            background: "#353535",
            color: "#ededed",
        },
    },
    container: {
        border: "none",
        backgroundColor: "#202020",
        rounded: "1rem",
        my: 6,
        color: "#fff",
        fontWeight: "500",
    },
});

export const Accordion = defineMultiStyleConfig({
    variants: { custom },
});
