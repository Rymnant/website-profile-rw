import { Hero } from "@/components/homepage/sections/hero";
import { Message } from "@/components/homepage/sections/message";
import { Organization } from "@/components/homepage/sections/organization";
import { Administration } from "@/components/homepage/sections/administration";
import { Gallery } from '@/components/homepage/sections/gallery';

// Note: Section pindah sini wae

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