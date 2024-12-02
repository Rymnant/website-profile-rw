'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { handleFormSubmit } from "@/lib/utils"
import { formSchema } from "@/lib/constants"
import { ContactFormValues } from "@/lib/types"
import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/utils"

export default function Component() {
    const form = useForm<ContactFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            subject: "",
            message: "",
        },
    })

    const onSubmit = form.handleSubmit(handleFormSubmit)

    return (
        <motion.main {...fadeInUp} className="container mx-auto px-4 py-8 max-w-10xl">
            <motion.div {...fadeInUp} className="mb-2 mt-2 text-left">
                <h1 className="text-4xl font-bold mb-2">Hubungi Kami</h1>
                <p className="text-muted-foreground">Hubungi kami jika Anda memiliki pertanyaan, saran dan kritik untuk RW 6 Rejowinangun</p>
            </motion.div>
            <motion.section
                variants={{
                    hidden: { opacity: 0, y: 50, transition: { duration: 0.8, ease: "easeOut" } },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                }}
                className="max-w-2xl mx-auto p-4 mt-5 md:p-6 lg:p-8"
            >
                <Form {...form}>
                    <form onSubmit={onSubmit} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Nama Anda <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input placeholder="Masukkan nama Anda" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="subject"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Perihal <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input placeholder="Isi perihal" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Pesan Anda <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Masukkan pesan Anda secara detail dan jelas untuk memudahkan kami dalam menjawab pertanyaan Anda."
                                            className="min-h-[120px]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="contactMethod"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel>
                                        Bagaimana Anda ingin dihubungi? <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex flex-col space-y-1 sm:flex-row sm:space-x-4 sm:space-y-0"
                                        >
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="email" />
                                                </FormControl>
                                                <FormLabel className="font-normal cursor-pointer">
                                                    Melalui email
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="whatsapp" />
                                                </FormControl>
                                                <FormLabel className="font-normal cursor-pointer">
                                                    Melalui whatsapp
                                                </FormLabel>
                                            </FormItem>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full hover:bg-[#2980b9]">
                            Kirim
                        </Button>
                    </form>
                </Form>
            </motion.section>
        </motion.main>
    )
}