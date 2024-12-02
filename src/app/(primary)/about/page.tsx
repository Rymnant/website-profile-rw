'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, CheckCircle } from "lucide-react";
import dynamic from 'next/dynamic';
import { motion } from "framer-motion";
import { fadeInUp, staggerChildren } from "@/lib/utils"

const DynamicMapClientWrapper = dynamic(() => import('@/components/common/MapClientWrapper'), { ssr: false });

export default function About() {
    return (
        <motion.main
            initial="initial"
            animate="animate"
            className="container mx-auto px-4 py-8 max-w-10xl"
        >
            <motion.div {...fadeInUp} className="mb-4 mt-4 text-left">
                <h1 className="text-4xl font-bold mb-2">Profil</h1>
                <p className="text-muted-foreground">Letak geografis serta visi dan misi</p>
            </motion.div>

            <motion.div {...fadeInUp} className="mt-5">
                <Card className="mb-12">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <MapPin className="h-5 w-5" />
                            Letak Geografis
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-2 gap-8">
                        <motion.div
                            className="space-y-4"
                            variants={staggerChildren}
                        >
                            <motion.p variants={fadeInUp}>
                                RW 6 Rejowinangun terletak di wilayah Kelurahan Rejowinangun, Kecamatan Kotagede, Kota Yogyakarta. Secara geografis, kawasan ini berada di sisi tenggara Kota Yogyakarta dan berbatasan dengan beberapa area yang memiliki nilai historis dan budaya tinggi.
                            </motion.p>
                            <motion.p variants={fadeInUp}>
                                Rejowinangun sendiri merupakan salah satu kelurahan yang berada di dekat perbatasan antara Kota Yogyakarta dan Kabupaten Bantul, sehingga RW 6 menjadi bagian dari kawasan transisi antara lingkungan urban dan suburban.
                            </motion.p>
                            <motion.p variants={fadeInUp}>
                                Kawasan RW 06 merupakan salah satu wilayah pemukiman yang terletak di Kelurahan Rejowinangun, dengan struktur administratif yang terdiri dari 4 Rukun Tetangga (RT) di dalamnya.
                            </motion.p>
                            <motion.p variants={fadeInUp}>
                            Setiap RT memiliki karakteristik tersendiri, mencerminkan keragaman aktivitas masyarakat yang menghuni kawasan ini. Wilayah ini didominasi oleh hunian keluarga dengan lingkungan yang rapi dan tertata baik, menciptakan suasana yang nyaman dan harmonis bagi para penduduknya.
                            </motion.p>
                        </motion.div>
                        <motion.div
                            className="relative h-[300px] bg-muted rounded-lg overflow-hidden"
                            variants={fadeInUp}
                        >
                            <DynamicMapClientWrapper center={{ lat: -7.8049487, lng: 110.3985003 }} zoom={60} />
                        </motion.div>
                    </CardContent>
                </Card>
            </motion.div>

            <motion.div {...fadeInUp}>
                <Card>
                    <CardHeader>
                        <CardTitle>Visi dan Misi</CardTitle>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-2 gap-8">
                        <motion.div variants={staggerChildren}>
                            <h3 className="text-xl font-semibold mb-4">Visi</h3>
                            <motion.ul className="space-y-4">
                                <motion.li variants={fadeInUp} className="flex gap-2">
                                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                                    <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi minima consequuntur hic eligendi veniam, quas velit nulla laborum minus ullam necessitatibus itaque alias atque inventore laudantium nihil officiis, qui ab..</span>
                                </motion.li>
                                <motion.li variants={fadeInUp} className="flex gap-2">
                                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                                    <span>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum excepturi harum, blanditiis doloribus, autem, accusantium et dicta omnis optio rerum exercitationem itaque porro. Magnam maxime nulla praesentium error qui beatae?</span>
                                </motion.li>
                            </motion.ul>
                        </motion.div>

                        <motion.div variants={staggerChildren}>
                            <h3 className="text-xl font-semibold mb-4">Misi</h3>
                            <motion.ul className="space-y-4">
                                <motion.li variants={fadeInUp} className="flex gap-2">
                                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                                    <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. In perferendis suscipit optio excepturi odit, consequatur quos. Quidem dolorem ullam ad nostrum id, aliquam unde maxime, cum animi, rem dicta fugiat!</span>
                                </motion.li>
                                <motion.li variants={fadeInUp} className="flex gap-2">
                                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                                    <span>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam nesciunt sed voluptatibus fugiat atque, nam unde repellendus debitis ipsum placeat autem possimus odit voluptate nulla earum accusamus nemo quae quis..</span>
                                </motion.li>
                                <motion.li variants={fadeInUp} className="flex gap-2">
                                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                                    <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore voluptas eos inventore blanditiis quas, quaerat mollitia magni unde quo neque accusamus, qui ipsum nemo itaque illum deleniti odio fuga. Eius?</span>
                                </motion.li>
                            </motion.ul>
                        </motion.div>
                    </CardContent>
                </Card>
            </motion.div>
        </motion.main>
    );
}