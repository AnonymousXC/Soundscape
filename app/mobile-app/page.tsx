import { Button, Flex, Heading, Tooltip } from "@chakra-ui/react";
import Image from "next/image";

function MobilePage() {
    return (
        <Flex
            position={"relative"}
            top={0}
            left={0}
            width={"100%"}
            px={12}
            my={6}
            flexDir={"column"}
            gap={6}
            background={"background"}
            height={"calc(100vh - 6.25rem)"}>
            <Heading size={"lg"} mt={4}>
                Download mobile app
            </Heading>
            <Flex
                alignSelf={"center"}
                gap={8}
                top={"50%"}
                position={"absolute"}
                transform={"translate(0%, -50%)"}
                flexDirection={"column"}>
                <Flex gap={2} flexDirection={"column"}>
                    <Tooltip label="Coming soon..." placement="top">
                        <Image
                            src={"/icons/download-icons/Google Play light.svg"}
                            width={250}
                            height={250}
                            alt="play store"
                        />
                    </Tooltip>
                    <Button
                        width={250}
                        _hover={{
                            backgroundImage:
                                "linear-gradient(to right, #b5179e, #7209b7) !important",
                            color: "#fff !important",
                            fill: "white",
                        }}>
                        Download for Android
                    </Button>
                </Flex>
                <Flex gap={2} flexDirection={"column"}>
                    <Tooltip label="Coming soon..." placement="top">
                        <Image
                            src={"/icons/download-icons/Apple Store light.svg"}
                            width={240}
                            height={240}
                            alt="play store"
                        />
                    </Tooltip>

                    <Button
                        width={250}
                        _hover={{
                            backgroundImage:
                                "linear-gradient(to right, #b5179e, #7209b7) !important",
                            color: "#fff !important",
                            fill: "white",
                        }}>
                        Download for Apple
                    </Button>
                </Flex>
            </Flex>
        </Flex>
    );
}

export default MobilePage;
