import Image from 'next/image'

export function Message() {
    return (
        <section id="section-1" className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-8 md:space-y-0 md:space-x-8">
              <div className="w-full md:w-1/3 flex justify-center">
                <Image
                  src="/profil-rw.png"
                  alt="Foto Ketua RW"
                  width={300}
                  height={300}
                />
              </div>
              <div className="w-full md:w-2/3">
                <h2 className="text-3xl font-bold text-red-600 mb-4">Sambutan Ketua RW</h2>
                <h3 className="text-2xl font-semibold mb-2">Nama</h3>
                <p className="text-lg font-medium mb-4">Ketua RW06 Rejowinangun</p>
                <p className="mb-4">Salam</p>
                <p className="mb-4">
                  Isi sambutan ketua RW06 Rejowinangun
                </p>
                <p className="mb-4">
                  Ucapan terima kasih atas kunjungan anda di website resmi RW06 Rejowinangun
                </p>
              </div>
            </div>
          </div>
        </section>
    )
}