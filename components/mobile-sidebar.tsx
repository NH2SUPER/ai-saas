"use client"//https://nextjs.org/docs/app/building-your-application/rendering/client-components

import { Menu } from "lucide-react";

import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

import Sidebar from "./sidebar";
import { useEffect, useState } from "react";

interface MobileSidebarProps {
    apiLimitCount: number;
    isPro: boolean;
}

const MobileSidebar = ({
    apiLimitCount = 0,
    isPro = false
}: MobileSidebarProps) => {
    //for fixing the Hydration error when refreshing the page
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <Sheet >
            <SheetTrigger>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
                <Sidebar isPro={isPro} apiLimitCount={apiLimitCount}/>
            </SheetContent>
        </Sheet>
     );
}
 
export default MobileSidebar;