"use client"


import { SafeUser } from "@/app/types"
import Container from "../Container"
import Logo from "./Logo"
import Search from "./Search"
import UserMenu from "./UserMenu"
import Categories from "./Categories"


interface NavbarProps {
    session?: SafeUser | null 
}

const Navbar:React.FC<NavbarProps> = ({
    session
}) =>{
    return (
        <div
            className="
               
                w-full 
                bg-white 
                z-10 
                shadow -sm
            "
        >
            <div className="
            py-2
            border-b-[1px]
            ">
                <Container >
                    <div
                        className="
                            flex
                            flex-row
                            justify-between
                            items-center
                        "
                    >
                        <Logo />
                        <Search />
                        <UserMenu session={session}/>
                    </div>
                </Container>
            </div>
            <Categories />
        </div>
    )
}

export default Navbar