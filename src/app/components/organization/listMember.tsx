import { listMember } from "@/app/lib/types"
import Image from 'next/image'
import Link from 'next/link'

type listMemberProps = {
    listMemberData: listMember[]
}

export default function ListMember({listMemberData}: listMemberProps) {
    return (
        <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-red-600 mb-2">Struktur Organisasi</h2>
            <p className="text-xl mb-8">Struktur Organisasi RW06 Rejowinangun</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {listMemberData.map((member, index) => (
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
    )
}