'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const organizationMembers = [
    { name: 'Name_1', role: 'Role_1', image: '/member-1.jpg' },
    { name: 'Name_2', role: 'Role_2', image: '/member-2.jpg' },
    { name: 'Name_3', role: 'Role_3', image: '/member-3.jpg' },
    { name: 'Name_4', role: 'Role_4', image: '/member-4.jpg' }
  ]

  const populationStats = [
    { label: 'Penduduk', value: 1137 },
    { label: 'Kepala Keluarga', value: 297 },
    { label: 'Laki-Laki', value: 593 },
    { label: 'Perempuan', value: 544 },
  ]

  const galleryImages = [
    { src: '/hero-background_1.png', alt: 'Kegiatan-1' },
    { src: '/hero-background_1.png', alt: 'Kegiatan-2' },
    { src: '/hero-background_1.png', alt: 'Kegiatan-3' },
    { src: '/hero-background_1.png', alt: 'Kegiatan-4' },
    { src: '/hero-background_1.png', alt: 'Kegiatan-5' },
    { src: '/hero-background_1.png', alt: 'Kegiatan-6' }
  ]

  return (
    <div className="min-h-screen" style={{color: 'black'}}>
      <header className={`fixed w-full z-10 transition-colors duration-300 ${isScrolled ? 'bg-white' : 'bg-transparent'}`}>
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Image src="/logo.svg" alt="Logo" width={40} height={40} />
            <span className={`ml-2 font-bold ${isScrolled ? 'text-gray-800' : 'text-white'}`}>RW06 Rejowinganun</span>
          </div>
          <ul className="flex space-x-6">
            {['Beranda', 'Tentang Kami', 'Informasi', 'Berita', 'Hubungi Kami'].map((item, index) => (
              <li key={item}>
                <Link href={`#section-${index}`} className={`${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-gray-300`}>
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main>
        <section id="section-0" className="relative h-screen flex items-center justify-center">
          <Image
            src="/hero-background_2.png"
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

        <section id="section-2" className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-red-600 mb-2">Struktur Organisasi</h2>
            <p className="text-xl mb-8">Struktur Organisasi RW06 Rejowinangun</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {organizationMembers.map((member, index) => (
                <div key={index} className="bg-red-600 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={300}
                    height={300}
                    className="w-full h-80 object-cover"
                  />
                  <div className="p-4 text-white">
                    <h3 className="font-bold text-lg">{member.name}</h3>
                    <p className="text-sm">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link href="/struktur-organisasi" className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700">
                LIHAT STRUKTUR LEBIH LENGKAP
                <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        <section id="section-3" className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-red-600 mb-4">Administrasi Penduduk</h2>
            <p className="text-lg mb-8">
              Sistem digital yang berfungsi mempermudah pengelolaan data dan informasi terkait dengan kependudukan dan pendayagunaannya untuk pelayanan publik yang efektif dan efisien
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
              {populationStats.map((stat, index) => (
                <div key={index} className="flex">
                  <div className="w-1/2 bg-red-500 text-white p-4 flex items-center justify-center text-3xl font-bold">
                    {stat.value}
                  </div>
                  <div className="w-1/2 bg-white border border-gray-200 p-4 flex items-center justify-center text-gray-700">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="section-4" className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-red-600 mb-2">GALERI DESA</h2>
            <p className="text-xl mb-8">Menampilkan kegiatan-kegiatan yang berlangsung di RW06</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {galleryImages.map((image, index) => (
                <div key={index} className="relative h-64 overflow-hidden rounded-lg">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 hover:scale-110"
                  />
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link href="/galeri" className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700">
                LIHAT FOTO LEBIH BANYAK
                <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-red-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center md:items-start">
              <Image src="/logo.svg" alt="Logo" width={80} height={80} />
              <h3 className="text-lg font-bold mt-4">Kelurahan Rejowinangun</h3>
              <p className="text-sm">Kecamatan Kota Gede</p>
              <p className="text-sm">Kota Yogyakarta</p>
              <p className="text-sm">Provinsi Daerah Istimewa Yogyakarta</p>
              <div className="flex space-x-4 mt-4">
                <Link href="#" aria-label="Instagram">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Kontak Desa</h4>
              <p className="mb-2">📞 No.telp</p>
              <p className="mb-2">✉️ Email</p>
              <p className="mb-2">🕒 Jam Kerja</p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Nomor Telepon Penting</h4>
              <p className="mb-2">Nama/Pekerjaan</p>
              <p className="mb-2">No. telp</p>
              <p className="mb-2">Nama/Pekerjaan</p>
              <p className="mb-2">No. telp</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-red-500 text-center">
            <p>KKN UAD Alternatif Tematik MBKM 93</p>
          </div>
        </div>
      </footer>
    </div>
  )
}