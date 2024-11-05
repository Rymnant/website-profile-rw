import { Hero } from "@/app/components/homepage/sections/hero";
import { Message } from "@/app/components/homepage/sections/message";
import { Organization } from "@/app/components/homepage/sections/organization";
import { Administration } from "@/app/components/homepage/sections/administration";
import { Gallery } from '@/app/components/homepage/sections/gallery';

export default function Home() {
    return (
        <main>
            <Hero />
            <Message />
            <Organization />
            <Administration />
            <Gallery />
        </main>
    )
}