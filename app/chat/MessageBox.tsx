"use client";
import { Button, Flex, Img, Input } from "@chakra-ui/react";
import { UserResponse } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

type Props = {
    socket: Socket | undefined;
    user: UserResponse | undefined;
};

function MessageInputBox({ socket, user }: Props) {
    const [message, setMessage] = useState<string>("");
    const [randomName, setRandomName] = useState<string>("");

    useEffect(() => {
        setRandomName(getRandomName());
    }, []);

    return (
        <Flex
            backgroundColor={"#111111"}
            w={"100%"}
            height={"4.5rem"}
            px={"1.5rem"}
            gap={6}
            boxShadow={"1px 3px 25px rgb(0 0 0 / 0.8)"}
            py={"1rem"}>
            <Input
                rounded={"full"}
                backgroundColor={"rgba(65,65,65,0.65)"}
                border={"none"}
                placeholder="Type Message"
                boxShadow={"none !important"}
                fontWeight={"400"}
                _placeholder={{ color: "#B8B8B" }}
                onChange={(e) => {
                    setMessage(e.currentTarget.value);
                }}
                onKeyDown={(e) => {
                    if (e.code === "Enter") {
                        socket?.emit("global-message-send", {
                            message,
                            username:
                                user?.data.user?.user_metadata.username ||
                                randomName,
                        });
                    }
                }}
            />
            <Flex gap={3}>
                <Button variant={"unstyled"}>
                    <Img src="/icons/smiley.svg" w={"23px"} />
                </Button>
                <Button variant={"unstyled"}>
                    <Img src="/icons/share.svg" w={"23px"} />
                </Button>
                <Button
                    variant={"unstyled"}
                    onClick={() => {
                        socket?.emit("global-message-send", {
                            message,
                            username: user?.data.user?.user_metadata.username,
                        });
                    }}>
                    <Img src="/icons/send.svg" w={"23px"} />
                </Button>
            </Flex>
        </Flex>
    );
}

function getRandomName(): string {
    var nameList = [
        "Time",
        "Past",
        "Future",
        "Dev",
        "Fly",
        "Flying",
        "Soar",
        "Soaring",
        "Power",
        "Falling",
        "Fall",
        "Jump",
        "Cliff",
        "Mountain",
        "Rend",
        "Red",
        "Blue",
        "Green",
        "Yellow",
        "Gold",
        "Demon",
        "Demonic",
        "Panda",
        "Cat",
        "Kitty",
        "Kitten",
        "Zero",
        "Memory",
        "Trooper",
        "XX",
        "Bandit",
        "Fear",
        "Light",
        "Glow",
        "Tread",
        "Deep",
        "Deeper",
        "Deepest",
        "Mine",
        "Your",
        "Worst",
        "Enemy",
        "Hostile",
        "Force",
        "Video",
        "Game",
        "Donkey",
        "Mule",
        "Colt",
        "Cult",
        "Cultist",
        "Magnum",
        "Gun",
        "Assault",
        "Recon",
        "Trap",
        "Trapper",
        "Redeem",
        "Code",
        "Script",
        "Writer",
        "Near",
        "Close",
        "Open",
        "Cube",
        "Circle",
        "Geo",
        "Genome",
        "Germ",
        "Spaz",
        "Shot",
        "Echo",
        "Beta",
        "Alpha",
        "Gamma",
        "Omega",
        "Seal",
        "Squid",
        "Money",
        "Cash",
        "Lord",
        "King",
        "Duke",
        "Rest",
        "Fire",
        "Flame",
        "Morrow",
        "Break",
        "Breaker",
        "Numb",
        "Ice",
        "Cold",
        "Rotten",
        "Sick",
        "Sickly",
        "Janitor",
        "Camel",
        "Rooster",
        "Sand",
        "Desert",
        "Dessert",
        "Hurdle",
        "Racer",
        "Eraser",
        "Erase",
        "Big",
        "Small",
        "Short",
        "Tall",
        "Sith",
        "Bounty",
        "Hunter",
        "Cracked",
        "Broken",
        "Sad",
        "Happy",
        "Joy",
        "Joyful",
        "Crimson",
        "Destiny",
        "Deceit",
        "Lies",
        "Lie",
        "Honest",
        "Destined",
        "Bloxxer",
        "Hawk",
        "Eagle",
        "Hawker",
        "Walker",
        "Zombie",
        "Sarge",
        "Capt",
        "Captain",
        "Punch",
        "One",
        "Two",
        "Uno",
        "Slice",
        "Slash",
        "Melt",
        "Melted",
        "Melting",
        "Fell",
        "Wolf",
        "Hound",
        "Legacy",
        "Sharp",
        "Dead",
        "Mew",
        "Chuckle",
        "Bubba",
        "Bubble",
        "Sandwich",
        "Smasher",
        "Extreme",
        "Multi",
        "Universe",
        "Ultimate",
        "Death",
        "Ready",
        "Monkey",
        "Elevator",
        "Wrench",
        "Grease",
        "Head",
        "Theme",
        "Grand",
        "Cool",
        "Kid",
        "Boy",
        "Girl",
        "Vortex",
        "Paradox",
    ];

    return nameList[Math.floor(Math.random() * nameList.length)];
}

export default MessageInputBox;
