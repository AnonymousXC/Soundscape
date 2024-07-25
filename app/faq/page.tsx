import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Flex,
    Heading,
} from "@chakra-ui/react";

function FAQ() {
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
            <Heading>FAQs</Heading>
            <Accordion width={"100%"} allowToggle variant={"custom"}>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box as="span" flex="1" textAlign="left">
                                What is Music Streaming Website, and how does it
                                work?
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel>
                        Music Streaming Website is a platform that allows you to
                        listen to a vast library of music online. You can
                        explore playlists, albums, and songs from various genres
                        and artists. Simply sign up, search for music, and start
                        streaming instantly.
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box as="span" flex="1" textAlign="left">
                                How often do you update your content?
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel>
                        We update our content regularly to keep it fresh and
                        engaging. New articles, reviews, and features are added
                        weekly to ensure our users have access to the latest
                        information and trends in the music industry.
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box as="span" flex="1" textAlign="left">
                                Can I use your reviews or articles on my own
                                website or blog?
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel>
                        We encourage you to share links to our reviews and
                        articles, but please do not copy and republish our
                        content without permission. For inquiries regarding
                        content usage, please contact us directly.
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box as="span" flex="1" textAlign="left">
                                How can I contact your support team if I have
                                further questions?
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel>
                        You can reach our support team by filling out the
                        contact form on our website. We strive to respond to all
                        inquiries promptly and provide assistance as needed.
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box as="span" flex="1" textAlign="left">
                                Do you have a mobile app for easier access?
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel>
                        Yes, we have a mobile-responsive website that adapts to
                        different screen sizes and devices. You can access our
                        content conveniently from your smartphone or tablet
                        browser.
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box as="span" flex="1" textAlign="left">
                                Are there any membership or subscription fees to
                                access your content?
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel>
                        No, our website is free to access. You can enjoy all our
                        articles, reviews, interviews, and features without any
                        membership or subscription fees.
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box as="span" flex="1" textAlign="left">
                                Do you provide music recommendations or
                                playlists?
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel>
                        Yes, we curate playlists and provide music
                        recommendations based on different genres, moods, and
                        themes. Explore our playlists section to discover new
                        music tailored to your preferences.
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box as="span" flex="1" textAlign="left">
                                Are there age restrictions for accessing your
                                website?
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel>
                        Our website is intended for all audiences, but some
                        content may be more suitable for mature audiences. We
                        recommend parental guidance for younger users accessing
                        certain articles or music reviews.
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box as="span" flex="1" textAlign="left">
                                Are there age restrictions for accessing your
                                website?
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel>
                        Our website is intended for all audiences, but some
                        content may be more suitable for mature audiences. We
                        recommend parental guidance for younger users accessing
                        certain articles or music reviews.
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </Flex>
    );
}

export default FAQ;
