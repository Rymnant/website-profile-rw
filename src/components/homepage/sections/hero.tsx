import Image from 'next/image'

export function Hero() {
    return (
        <section className="relative h-screen flex items-center justify-center">
            <Image
                src="/img/hero-background_2.png"
                alt="Logo RW 06"
                layout="fill"
                objectFit="cover"
                quality={100}
            />
            <div className="absolute inset-0 bg-black bg-opacity-50" />
            <div className="relative z-1 text-center text-white px-4">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Selamat Datang</h1>
                <p className="text-xl md:text-2xl max-w-3xl mx-auto">
                    Di website resmi RW06 Rejowinangun
                </p>
            </div>
        </section>
    )
}