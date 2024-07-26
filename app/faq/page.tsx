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
                                How can I sign up for Music Streaming Service?
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel>
                        To sign up, visit our website or download our app from
                        the App Store or Google Play. Click on the &quot;Sign
                        Up&quot; button, enter your email address and create a
                        password, or sign up using your social media account.
                        Follow the prompts to complete your registration.
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box as="span" flex="1" textAlign="left">
                                How do I create and share playlists?
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel>
                        To create a playlist, go to the &quot;Playlists&quot;
                        section, click on &quot;Create Playlist&quot; and add a
                        name and description. You can then add songs to your
                        playlist by browsing or searching for music. To share,
                        simply select the playlist and choose the
                        &quot;Share&quot; option to generate a link or share
                        directly to social media
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box as="span" flex="1" textAlign="left">
                                How do I manage my account settings?
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel>
                        To manage your account settings, log in and navigate to
                        the &quot;Settings&quot; section. Here, you can update
                        your profile information, change your password, adjust
                        notification preferences, and view your subscription
                        details.
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
                                How does Music Streaming Service handle my data
                                and privacy
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel>
                        We take your privacy seriously. We use encryption and
                        other security measures to protect your data. For
                        detailed information on how we handle your personal
                        information, please review our Privacy Policy.
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box as="span" flex="1" textAlign="left">
                                What should I do if I&apos;m experiencing
                                technical issues?
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel>
                        If you encounter technical issues, try restarting the
                        app or clearing your cache. For persistent problems,
                        visit our Help Center or contact our support team via
                        the &quot;Contact Us&quot; page. Provide details about
                        the issue and any error messages you’ve received for
                        quicker assistance.
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </Flex>
    );
}

export default FAQ;
