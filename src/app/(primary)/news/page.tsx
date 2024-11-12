'use client';

export default function News() {
    return (
        <main className="container mx-auto px-4 py-8 max-w-10xl">
            <div className="mb-12 mt-12 text-left">
                <h1 className="text-4xl font-bold mb-2">Berita</h1>
                <p className="text-muted-foreground">Baca informasi dan berita terbaru seputar RW6 Rejowinangun</p>
            </div>

            <section className="relative h-screen flex items-center justify-center">
                <div className="relative z-1 text-center text-black px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Hello from News Pages</h1>
                    <p className="text-xl md:text-2xl max-w-3xl mx-auto">
                        This is the News page.
                    </p>
                </div>
            </section>
        </main>
    )
}