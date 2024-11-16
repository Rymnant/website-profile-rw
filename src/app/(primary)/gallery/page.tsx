const Gallery = () => {
    return (
        <main className="container mx-auto px-4 py-8 max-w-10xl">
            <div className="mb-12 mt-12 text-left">
                <h1 className="text-4xl font-bold mb-2">Galeri</h1>
                <p className="text-muted-foreground">Lihat galeri foto terbaru seputar RW6 Rejowinangun</p>
            </div>
            <section className="relative h-screen flex items-center justify-center">
                <div className="relative z-1 text-center text-black px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Hello from Gallery Pages</h1>
                    <p className="text-xl md:text-2xl max-w-3xl mx-auto">
                        This is the gallery page.
                    </p>
                </div>
            </section>
        </main>
    )
}

export default Gallery;