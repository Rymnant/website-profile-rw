'use client'

import { useState, useEffect } from 'react';
import { UMKMList } from '@/components/common/UMKMList';
import { UMKM_ITEMS } from '@/lib/constants';

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

    const rtId = params.id[0];
    const umkm = UMKM_ITEMS.find(item => item.id === rtId);

    if (!umkm) {
        return <div>UMKM tidak ditemukan</div>;
    }

    return (
        <UMKMList
            umkm={umkm}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            rtId={rtId}
        />
    );
}