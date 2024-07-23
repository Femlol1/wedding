import Image from "next/image"
import Link from "next/link"
import MobileNav from "./MobileNav"
import NavItems from "./NavItems"

const Header = () => {
  return (
    <header className="w-full border-b">
        <div className="flex wrapper items-center justify-between w-full">
            <Link href={"/"} className="w-36">
            <Image src={"/assets/images/logo.png"} width={60} height={38}
            alt="KunlesGamesNight logo"/>
            </Link>
                <nav className="hidden md:flex md:flex-grow justify-center">
                    <NavItems />
                </nav>
            <div className="flex w-32 justify-end gap-3">

                    <MobileNav />
            </div>
        </div>
    </header>
  )
}

export default Header