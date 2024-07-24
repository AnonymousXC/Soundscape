import Sidebar from "@/components/desktop/Sidebar";
import { CKProviders } from "../providers";
import { ReactNode, Suspense } from "react";
import ActivityBarFallback from "@/components/fallbacks/SidebarFallback";
import ActivityBar from "@/components/desktop/ActivityBar";
import PlayerFallback from "@/components/fallbacks/PlayerFallback";
import Player from "@/components/global/Player";
import BottomBar from "@/components/global/MobileBottom";
import { useBreakpoint } from "@chakra-ui/react";

function Desktop({ children }: { children: ReactNode }) {
    const breakpoint = useBreakpoint({ ssr: false });
    console.log(breakpoint);

    return (
        <>
            <CKProviders>
                <Sidebar />
                {children}
                <Suspense fallback={<ActivityBarFallback />}>
                    <ActivityBar />
                </Suspense>
                <Suspense fallback={<PlayerFallback />}>
                    <Player />
                </Suspense>
                <BottomBar />
            </CKProviders>
        </>
    );
}

export default Desktop;
