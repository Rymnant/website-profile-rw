import React from 'react'
import { organizationMembers } from '@/lib/constants'
import OrganizationMemberCard from '@/components/common/OrganizationMemberCard'

// Komponen utama struktur organisasi
export default function StrukturOrganisasi() {
    return (
        <main className="container mx-auto px-4 py-8 max-w-10xl">
            <div className="mb-12 mt-12 text-left">
                <h1 className="text-4xl font-bold mb-2">Struktur Organisasi RW dan RT Rejowinangun</h1>
                <p className="text-muted-foreground">Berikut adalah struktur organisasi Rukun Warga (RW) dan Rukun Tetangga (RT) di wilayah Rejowinangun.
                Kami berkomitmen untuk melayani dan memajukan komunitas kita bersama.</p>
            </div>
            <section className="py-12 px-4 md:px-6 lg:px-8">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {organizationMembers.map((member, index) => (
                            <OrganizationMemberCard key={index} {...member} />
                        ))}
                    </div>
                </div>
            </section>
        </main>
    )
}