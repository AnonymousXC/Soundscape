"use client";
import loginFunc from "@/database/login";
import signUpFunc from "@/database/signUp";
import { Flex, Text, Input, Button, useToast } from "@chakra-ui/react";
import { AuthResponse, AuthTokenResponsePassword } from "@supabase/supabase-js";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

function SignUpPage() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const id = useSearchParams().get("id");
    const toast = useToast();

    return (
        <Flex
            position={"relative"}
            top={0}
            left={0}
            width={"100%"}
            maxW={"100%"}
            background={"background"}
            height={[
                "calc(100vh - 3.875rem - 8.2rem - 3.2rem)",
                "calc(100vh - 6.25rem)",
            ]}
            flexDir={"column"}
            overflowY={"auto"}
            pb={2}>
            <Flex w={"100%"} height={"100%"} flexDir={"column"}>
                <Text
                    color={"primaryText"}
                    fontWeight={"500"}
                    fontSize={"1.2rem"}>
                    Sign Up / Log in
                </Text>
                <Flex
                    flex={1}
                    justifyContent={"center"}
                    alignItems={"center"}
                    flexDir={"column"}>
                    <form
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                            maxWidth: "25rem",
                            width: "100%",
                        }}>
                        {isLogin ? (
                            ""
                        ) : (
                            <Input
                                placeholder="Enter username"
                                onChange={(e) =>
                                    setUsername(e.currentTarget.value)
                                }
                            />
                        )}
                        <Input
                            placeholder="Enter Email"
                            onChange={(e) => setEmail(e.currentTarget.value)}
                            type="email"
                        />
                        <Input
                            placeholder="Enter Password"
                            type="password"
                            onChange={(e) => setPassword(e.currentTarget.value)}
                        />
                        <Button
                            variant={"sidebar"}
                            type="submit"
                            className={"sidebar-active-tab"}
                            justifyContent={"center"}
                            isLoading={loading}
                            w={"100%"}
                            onSubmit={() => {
                                return false;
                            }}
                            onClick={async () => {
                                setLoading(true);
                                if (isLogin === false) {
                                    signUpFunc(
                                        email,
                                        password,
                                        username,
                                        id || ""
                                    ).then((AUTH: string) => {
                                        const data: AuthResponse = JSON.parse(
                                            AUTH || "{}"
                                        );
                                        if (data.error != null) {
                                            toast({
                                                title: "Account creation failed.",
                                                description:
                                                    data.error.code || "",
                                                duration: 4000,
                                                isClosable: false,
                                                status: "error",
                                            });
                                        } else {
                                            toast({
                                                title: "Successful",
                                                description:
                                                    "Account created successfully.",
                                                duration: 4000,
                                                isClosable: false,
                                                status: "success",
                                            });
                                        }
                                        setLoading(false);
                                    });
                                } else {
                                    const loginStat = await loginFunc(
                                        email,
                                        password,
                                        username,
                                        id || ""
                                    );
                                    const loginStatJSON = JSON.parse(
                                        loginStat
                                    ) as AuthTokenResponsePassword;
                                    if (loginStatJSON.error) {
                                        toast({
                                            title: "Login",
                                            description:
                                                "Error logging into account.",
                                            duration: 4000,
                                            isClosable: false,
                                            status: "error",
                                        });
                                    } else if (loginStatJSON.data.user)
                                        toast({
                                            title: "Login",
                                            description:
                                                "Logged in successfully.",
                                            duration: 4000,
                                            isClosable: false,
                                            status: "success",
                                        });
                                    setLoading(false);
                                }
                            }}>
                            Submit
                        </Button>
                    </form>
                    <Button
                        onClick={() => {
                            setIsLogin(!isLogin);
                        }}
                        variant={"unstyled"}
                        fontSize={"0.8rem"}
                        fontWeight={"400"}
                        className="gradient-text"
                        textAlign={"end"}
                        w={"100%"}
                        maxW={"25rem"}>
                        {isLogin ? "Sign Up" : "Login"}
                    </Button>
                </Flex>
            </Flex>
        </Flex>
    );
}

export default SignUpPage;
