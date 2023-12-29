"use client";

import * as z from "zod";
import axios from "axios";
import Image from "next/image";

import { Download, ImageIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Empty } from "@/components/empty";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Loader } from "@/components/loader";

import { amountOptions, formSchema, resolutionOptions } from "./constants";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardFooter } from "@/components/ui/card";
import { useProModal } from "@/hooks/use-pro-modal";
import { toast } from "react-hot-toast";


const ImagePage = () => {
    const router = useRouter();
    const [images, setImages] = useState<string[]>([]);
    const proModal = useProModal();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          prompt: "",
          amount: "1",
          resolution: "1024x1024"
        }
      });

    //Loading state
    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setImages([]); 

            const response = await axios.post('/api/image', values);

            //const urls = response.data.map((image: { url: string }) => image.url);

            // Add the single image URL to the images array
            setImages([response.data]);
            form.reset();
        } catch (error: any) {
            //Open Pro Modal
            console.log(error);
            if (error?.response?.status === 403) {
              proModal.onOpen();
            } else {
                toast.error("Something went wrong.");
            }
        } finally {
            router.refresh();
        }
    };

    return ( 
        <div>
            <Heading
                title = "Image Generation"
                description="Make you prompt to vivid image."
                icon = {ImageIcon}
                iconColor = "text-pink-700"
                bgColor="bg-pink-700/10"
            />
            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form}>
                        <form 
                        onSubmit={form.handleSubmit(onSubmit)} 
                        className="
                            rounded-lg 
                            border 
                            w-full 
                            p-4 
                            px-3 
                            md:px-6 
                            focus-within:shadow-sm
                            grid
                            grid-cols-12
                            gap-2
                        "
                        >
                        <FormField
                            name="prompt"
                            render={({ field }) => (
                            <FormItem className="col-span-12 lg:col-span-6">
                                <FormControl className="m-0 p-0">
                                <Input
                                    className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                    disabled={isLoading} 
                                    placeholder="A picture of a unicorn in the space" 
                                    {...field}
                                />
                                </FormControl>
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem className="col-span-12 lg:col-span-2">
                                    <Select 
                                        disabled={isLoading} 
                                        onValueChange={field.onChange} 
                                        value={field.value} 
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue defaultValue={field.value} />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {amountOptions.map((option) => (
                                                <SelectItem 
                                                    key={option.value} 
                                                    value={option.value}
                                                >
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="resolution"
                            render={({ field }) => (
                                <FormItem className="col-span-12 lg:col-span-2">
                                    <Select 
                                        disabled={isLoading} 
                                        onValueChange={field.onChange} 
                                        value={field.value} 
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue defaultValue={field.value} />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                        {resolutionOptions.map((option) => (
                                            <SelectItem 
                                                key={option.value} 
                                                value={option.value}
                                            >
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                        <Button className="col-span-12 lg:col-span-2 w-full" type="submit" disabled={isLoading} size="icon">
                            Generate
                        </Button>
                        </form>
                    </Form>
                </div>
                <div className="space-y-4 mt-4">
                    {isLoading && (
                        <div className="p-4">
                            <Loader />
                        </div>
                    )}
                    {images.length === 0 && !isLoading && (
                        <Empty label="No images generated." />
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
                    {images.map((src) => (
                        <Card key={src} className="rounded-lg overflow-hidden">
                        <div className="relative aspect-square">
                            <Image
                                alt="Image"
                                fill
                                src={src}
                            />
                        </div>
                        <CardFooter className="p-2">
                            <Button onClick={() => window.open(src)} variant="secondary" className="w-full">
                                <Download className="h-4 w-4 mr-2" />
                                Download
                            </Button>
                        </CardFooter>
                        </Card>
                    ))}
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default ImagePage;