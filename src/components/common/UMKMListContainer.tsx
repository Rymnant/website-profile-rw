'use client'

import { useState, useEffect } from 'react';
import { UMKMList } from '@/components/common/UMKMList';
import { UMKM_ITEMS } from '@/lib/constants';
import { motion } from 'framer-motion';
import { fadeInUp } from "@/lib/utils";

export function UMKMListContainer({
    paramsPromise
}: {
    paramsPromise: Promise<{ id: string[] }>
}) {
    const [currentPage, setCurrentPage] = useState(1);
    const [params, setParams] = useState<{ id: string[] } | null>(null);

    useEffect(() => {
        paramsPromise.then(setParams);
    }, [paramsPromise]);

    if (!params) {
        return <div>Loading...</div>;
    }

    const rtId = params.id?.[0] || UMKM_ITEMS[0].id;
    const umkm = UMKM_ITEMS.find(item => item.id === rtId);

    if (!umkm) {
        return <div>UMKM tidak ditemukan</div>;
    }

    return (
        <motion.div
            initial="initial"
            animate="animate"
            className="container mx-auto px-4 py-8 max-w-10xl"
        >
            <motion.div {...fadeInUp} className="mb-4 mt-4 text-left">
                <h1 className="text-4xl font-bold mb-2">UMKM di {umkm.id.toUpperCase()}</h1>
                <p className="text-muted-foreground">
                    Temukan berbagai UMKM lokal di {umkm.id.toUpperCase()} yang bisa kamu kunjungi
                </p>
            </motion.div>
            <motion.div className="space-y-8">
                <UMKMList
                    umkm={umkm}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    rtId={rtId}
                />
            </motion.div>
        </motion.div>
    );
}