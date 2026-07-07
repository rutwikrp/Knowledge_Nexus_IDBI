import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Navbar() {

    return (

        <header className="border-b h-16 flex items-center justify-between px-8 bg-white">

            <h2 className="font-semibold text-xl">

                Internal AI Knowledge Platform

            </h2>

            <Avatar>

                <AvatarFallback>

                    RP

                </AvatarFallback>

            </Avatar>

        </header>

    );

}