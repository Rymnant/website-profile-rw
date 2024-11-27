import { UMKMListContainer } from '@/components/common/UMKMListContainer';
import { UMKM_ITEMS } from '@/lib/constants';

export async function generateStaticParams() {
    return UMKM_ITEMS.map(item => ({
        id: [item.id]
    }));
}

export default function UMKMDetailPage({
    params: paramsPromise
}: {
    params: Promise<{ id: string[] }>
}) {
    return <UMKMListContainer paramsPromise={paramsPromise} />;
}