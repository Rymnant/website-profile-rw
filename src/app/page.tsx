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
    { src: '/gallery-1.jpg', alt: 'Kegiatan-1' },
    { src: '/gallery-2.jpg', alt: 'Kegiatan-2' },
    { src: '/gallery-3.jpg', alt: 'Kegiatan-3' },
    { src: '/gallery-4.jpg', alt: 'Kegiatan-4' },
    { src: '/gallery-5.jpg', alt: 'Kegiatan-5' },
    { src: '/gallery-6.jpg', alt: 'Kegiatan-6' }
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
            {['Beranda', 'Tentang Kami', 'Informasi', 'Berita', 'Hubungi Kami'].map((item) => (
              <li key={item}>
                <Link href="#" className={`${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-gray-300`}>
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main>
        <section className="relative h-screen flex items-center justify-center">
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

        <section className="py-16 bg-gray-100">
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

        <section className="py-16 bg-gray-100">
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

        <section className="py-16 bg-gray-100">
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

        <section className="py-16 bg-gray-100">
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center md:items-start">
              <Image src="/logo.svg" alt="Desa Kersik Logo" width={80} height={80} />
              <h3 className="text-lg font-bold mt-4">Desa Kersik</h3>
              <p className="text-sm">Kecamatan Marang Kayu</p>
              <p className="text-sm">Kabupaten Kutai Kartanegara</p>
              <p className="text-sm">Provinsi Kalimantan Timur</p>
              <div className="flex space-x-4 mt-4">
                <Link href="#" aria-label="Facebook">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </Link>
                <Link href="#" aria-label="Instagram">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </Link>
                <Link href="#" aria-label="Twitter">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>
                <Link href="#" aria-label="YouTube">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                  </svg>
                </Link>
                <Link href="#" aria-label="TikTok">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3V0Z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Kontak Desa</h4>
              <p className="mb-2">📞 082150208664</p>
              <p className="mb-2">✉️ kersik.marangkayu@kukarkab.go.id</p>
              <p className="mb-2">🕒 Senin - Kamis (08.00 - 15.00) & Jum'at (08.00 - 11.00)</p>
              <p>🏠 Jalan Langaseng Dusun Empang RT.003</p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Nomor Telepon Penting</h4>
              <p className="mb-2">Jumaadi/Kades Kersik</p>
              <p className="mb-2">081242368478</p>
              <p className="mb-2">Yayan/Ambulan Kersik</p>
              <p>085392095123</p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Jejaring</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="hover:underline">Website Kemendesa</Link></li>
                <li><Link href="#" className="hover:underline">Website Kemendagri</Link></li>
                <li><Link href="#" className="hover:underline">Website Kabupaten Kutai Kartanegara</Link></li>
                <li><Link href="#" className="hover:underline">Cek DPT Online</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-red-500 text-center">
            <p>&copy; 2024 Powered by PT Digital Desa Indonesia</p>
          </div>
        </div>
      </footer>
    </div>
  )
}