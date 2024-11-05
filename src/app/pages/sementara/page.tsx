'use client'

import Image from 'next/image'
import Link from 'next/link'

import  HomePage  from '@/app/pages/homepage/pages';

export default function Main() {
  
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

    </div>
  )
}