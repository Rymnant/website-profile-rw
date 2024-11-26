import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, CheckCircle } from "lucide-react";
import MapClientWrapper from '@/components/common/MapClientWrapper';

const About = () => {
    return (
        <main className="container mx-auto px-4 py-8 max-w-10xl">
            <div className="mb-12 mt-12 text-left">
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
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe totam repellendus dicta officiis dignissimos. Vitae earum consequatur quis ab asperiores ea sapiente, animi totam voluptatibus expedita dolores maxime soluta nobis?
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus id adipisci sunt et nostrum harum. Pariatur nihil odit sapiente odio distinctio, mollitia cupiditate deleniti ipsum magni cum sint alias earum!
                        </p>
                        <p>
                            Kawasan RW 06 merupakan kawasan hunian dengan jumlah total 4 RT.
                        </p>
                    </div>
                    <div className="relative h-[300px] bg-muted rounded-lg overflow-hidden">
                        {typeof window !== 'undefined' && <MapClientWrapper center={{ lat: -7.8049487, lng: 110.3985003 }} zoom={60} />}
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
                                <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi minima consequuntur hic eligendi veniam, quas velit nulla laborum minus ullam necessitatibus itaque alias atque inventore laudantium nihil officiis, qui ab..</span>
                            </li>
                            <li className="flex gap-2">
                                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                                <span>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum excepturi harum, blanditiis doloribus, autem, accusantium et dicta omnis optio rerum exercitationem itaque porro. Magnam maxime nulla praesentium error qui beatae?</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-4">Misi</h3>
                        <ul className="space-y-4">
                            <li className="flex gap-2">
                                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                                <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. In perferendis suscipit optio excepturi odit, consequatur quos. Quidem dolorem ullam ad nostrum id, aliquam unde maxime, cum animi, rem dicta fugiat!</span>
                            </li>
                            <li className="flex gap-2">
                                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                                <span>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam nesciunt sed voluptatibus fugiat atque, nam unde repellendus debitis ipsum placeat autem possimus odit voluptate nulla earum accusamus nemo quae quis..</span>
                            </li>
                            <li className="flex gap-2">
                                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                                <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore voluptas eos inventore blanditiis quas, quaerat mollitia magni unde quo neque accusamus, qui ipsum nemo itaque illum deleniti odio fuga. Eius?</span>
                            </li>
                        </ul>
                    </div>
                </CardContent>
            </Card>
        </main>
    );
}

export default About;