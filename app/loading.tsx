import { Progress } from "@chakra-ui/react";

function Loading() {
    return (
        <Progress
            w={"100%"}
            position={"absolute"}
            top={0}
            left={0}
            isIndeterminate={true}
            height={"3px"}
            zIndex={1001}
            className="sidebar-active-tab"
            colorScheme="black"
        />
    );
}

export default Loading;
