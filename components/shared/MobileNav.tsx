'use client';

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import { useState } from 'react';
import { Separator } from "../ui/separator";
import NavItems from "./NavItems";

const MobileNav = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    return (
        <nav className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger className="align-middle" onClick={handleOpen}>
                    <Image 
                        src={"/assets/icons/menu.svg"}
                        alt="menu"
                        width={24}
                        height={24}
                        className="cursor-pointer"
                    />
                </SheetTrigger>
                <SheetContent className="flex flex-col gap-2 bg-gray md:hidden bg-white">
                    <Image 
                        src={"/assets/images/logo.png"}
                        alt="logo"
                        width={70}
                        height={38}
                    />
                    <Separator className="border border-gray-50" />
                    <NavItems handleClose={handleClose} />
                </SheetContent>
            </Sheet>
        </nav>
    );
}

export default MobileNav;
