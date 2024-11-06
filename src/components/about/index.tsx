import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, CheckCircle } from "lucide-react";

// const Map = dynamic(() => import('@/components/common/map'), { 
//     ssr: false,
//     loading: () => <div className="h-[300px] bg-muted rounded-lg" />
// });

export function About() {
    return (
        <main className="container mx-auto px-4 py-8 max-w-10xl">
            <div className="mb-12 text-center">
                <h1 className="text-4xl font-bold mb-2">Profil</h1>
                <p className="text-muted-foreground">Letak geografis serta visi dan misi</p>
            </div>

            <Card className="mb-12">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5" />
                        Letak Geografis
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <p>
                            Kawasan RW 12 terletak di Kelurahan Pegangasaan Dua, Kecamatan Kelapa
                            Gading. Terbentang di lahan seluas 50 hektar, mulai dari blok NB hingga blok
                            NI. Kawasan ini dibatasi oleh batas-batas geografis tertentu.
                        </p>
                        <p>
                            Di sisi Utara dibatasi oleh Jl. Nias Raya. Di sisi Timur dibatasi oleh Jl. Kelapa
                            Lilin Timur dan Kali Betik. Di sisi Barat dibatasi oleh Jl. Raya Gading Indah.
                        </p>
                        <p>
                            Kawasan RW 12 merupakan kawasan hunian dengan jumlah RT (Rukun
                            Tetangga) terbesar yaitu 31 RT.
                        </p>
                    </div>
                    <div className="relative h-[300px] bg-muted rounded-lg overflow-hidden">
                        {/* <Map center={[-6.1544, 106.9136]} zoom={15} /> */}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Visi dan Misi</CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Visi</h3>
                        <ul className="space-y-4">
                            <li className="flex gap-2">
                                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                                <span>Menciptakan lingkungan yang sehat, hijau, aman, tertib, dan serai.</span>
                            </li>
                            <li className="flex gap-2">
                                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                                <span>Melakukan digitalisasi pelayanan kepada warga sebagai pilihan alternatif, seiring dengan perkembangan jaman.</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-4">Misi</h3>
                        <ul className="space-y-4">
                            <li className="flex gap-2">
                                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                                <span>Pengelolaan kebersihan lingkungan secara mandiri yang dilakukan setiap hari.</span>
                            </li>
                            <li className="flex gap-2">
                                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                                <span>Pemasangan CCTV di titik-titik strategis untuk memudahkan pemantauan keamanan wilayah.</span>
                            </li>
                            <li className="flex gap-2">
                                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                                <span>Pengembangan aplikasi untuk memenuhi kebutuhan warga akan pelayanan dan informasi.</span>
                            </li>
                        </ul>
                    </div>
                </CardContent>
            </Card>
        </main>
    );
}