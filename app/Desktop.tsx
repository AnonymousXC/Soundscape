import Sidebar from "@/components/desktop/Sidebar";
import { CKProviders } from "./providers";
import { ReactNode, Suspense } from "react";
import ActivityBarFallback from "@/components/fallbacks/SidebarFallback";
import ActivityBar from "@/components/desktop/ActivityBar";
import PlayerFallback from "@/components/fallbacks/PlayerFallback";
import Player from "@/components/global/Player";



function Desktop({children} : { children : ReactNode}) {
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
            </CKProviders>
        </>
    )
}


export default Desktop;