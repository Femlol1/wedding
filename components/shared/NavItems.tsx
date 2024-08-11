'use client';

import { userLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from 'react';

interface NavItemsProps {
    handleClose: () => void; // Define the type for the handleClose prop
}

const NavItems: FC<NavItemsProps> = ({ handleClose }) => {
    const pathname = usePathname();
    return (
        <ul className="md:flex-between flex w-full flex-full flex-col items-start gap-5 md:flex-row">
            {userLinks.map((link) => {
                const isActive = pathname === link.route;

                return (
                    <li
                        key={link.route}
                        className={`${isActive ? 'text-primary-500' : ''} flex-center p-medium-16 whitespace-nowrap`}
                    >
                        <Link href={link.route} onClick={handleClose}>{link.label}</Link>
                    </li>
                );
            })}
        </ul>
    );
}

export default NavItems;