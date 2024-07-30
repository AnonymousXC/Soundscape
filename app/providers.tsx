"use client";

import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "@/theme/theme";
import { useEffect, useState } from "react";

export function CKProviders({ children }: { children: React.ReactNode }) {
    const [isReactNative, setReactNative] = useState(false);

    useEffect(() => {
        if (window.ReactNativeWebView) setReactNative(true);
    }, []);

    return (
        <ChakraProvider
            theme={theme}
            toastOptions={{
                defaultOptions: {
                    position: isReactNative ? "top" : "bottom",
                },
            }}>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            {children}
        </ChakraProvider>
    );
}
