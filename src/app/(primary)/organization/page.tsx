'use client'

import React from 'react'
import { ORGANIZATION_MEMBER } from '@/lib/constants'
import OrganizationMemberCard from '@/components/common/OrganizationMemberCard'
import { motion } from 'framer-motion'
import { fadeInUp } from "@/lib/utils"

export default function OrganizationStructure() {
    return (
        <motion.main
            initial="initial"
            animate="animate"
            className="container mx-auto px-4 py-8 max-w-10xl"
        >
            <motion.div
                {...fadeInUp}
                className="mb-12 mt-12 text-left"
            >
                <h1 className="text-4xl font-bold mb-2">Struktur Organisasi RW dan RT Rejowinangun</h1>
                <p className="text-muted-foreground">Berikut adalah struktur organisasi Rukun Warga (RW) dan Rukun Tetangga (RT) di wilayah Rejowinangun.
                Kami berkomitmen untuk melayani dan memajukan komunitas kita bersama.</p>
            </motion.div>
            <section className="py-12 px-4 md:px-6 lg:px-8">
                <motion.div
                    className="container mx-auto"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.1
                            }
                        }
                    }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                        {ORGANIZATION_MEMBER.map((member, index) => (
                            <motion.div
                                key={index}
                                variants={{
                                    hidden: { opacity: 0, y: 50 },
                                    visible: { opacity: 1, y: 0 }
                                }}
                            >
                                <OrganizationMemberCard key={index} {...member} />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>
        </motion.main>
    )
}