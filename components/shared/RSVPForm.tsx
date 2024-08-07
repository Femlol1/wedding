"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { rsvpFormSchema } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from 'axios';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ToastAction } from "../ui/toast";
import { Toaster } from "../ui/toaster";

export function RSVPForm() {
    const { toast } = useToast();
    const router = useRouter();
    const [showOtherStaying, setShowOtherStaying] = useState(false);

    const form = useForm<z.infer<typeof rsvpFormSchema>>({
        resolver: zodResolver(rsvpFormSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            code: "",
            email: "",
            mobile: "",
            stayingPlace: "At home with family",
            otherStaying: "",
            allergies: "",
            asoEbi: "No",
            relations: "Brides family",
            church: "No",
            reception: "No",
            afterParty: "No",
            rsvp: "No, I decline with regrets.",
        },
    });

    useEffect(() => {
        const subscription = form.watch((value, { name }) => {
            if (name === "stayingPlace") {
                setShowOtherStaying(value.stayingPlace === "Other");
            }
        });
        return () => subscription.unsubscribe();
    }, [form]);

    const onSubmit = async (values: z.infer<typeof rsvpFormSchema>) => {
        toast({
            variant: "default",
            title: "Thank You for sending Your RSVP.",
            description: "Just a sec! We are saving your details.",
        });
        try {
            const response = await axios.post('/api/rsvp', values);
            if (response.data.result === 'error') {
                toast({
                    variant: "destructive",
                    description: response.data.message,
                    action: <ToastAction altText="Try again">Try again</ToastAction>,
                });
            } else {
                toast({
                    variant: "default",
                    title: "Thank You for sending Your RSVP.",
                    description: "Your RSVP has been sent",
                });
                form.reset(); // Reset the form after a successful submission
                // router.push("/story");
            }
        } catch (error: any) { // Cast error to any
            if (error.response?.status === 400) {
                toast({
                    variant: "destructive",
                    title: "Invalid Code",
                    description: "The RSVP code you entered is invalid. Please check your code and try again.",
                    action: <ToastAction altText="Try again">Try again</ToastAction>,
                });
            } else {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "Sorry! There is some issue with the server.",
                    action: <ToastAction altText="Try again">Try again</ToastAction>,
                });
            }
        }
    };

    const isFormValid = form.formState.isValid;

    return (
        <div className="container mx-auto rsvp">
            <div className="text-center mt-4">
                We would greatly appreciate if you could RSVP before 1st November 2024
            </div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 rsvp-form"
                    id="rsvp-form"
                    method="POST"
                >
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl className="form-input-group fa fa-envelope">
                                    <Input placeholder="John" {...field} required />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl className="form-input-group fa fa-envelope">
                                    <Input placeholder="Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="code"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Invite Code</FormLabel>
                                <FormControl className="form-input-group fa fa-envelope">
                                    <Input type="password" placeholder="Enter code" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl className="form-input-group fa fa-envelope">
                                    <Input placeholder="john.doe@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="mobile"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Mobile</FormLabel>
                                <FormControl className="form-input-group fa fa-envelope">
                                    <Input placeholder="+1234567890" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="stayingPlace"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Where will you be staying?</FormLabel>
                                <FormControl className="form-input-group fa fa-envelope">
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select staying place" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white">
                                            <SelectItem value="At home with family">At home with family</SelectItem>
                                            <SelectItem value="Hotel on the Island">Hotel on the Island</SelectItem>
                                            <SelectItem value="Hotel on the Mainland">Hotel on the Mainland</SelectItem>
                                            <SelectItem value="Other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {showOtherStaying && (
                        <FormField
                            control={form.control}
                            name="otherStaying"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>If Other, Please Specify</FormLabel>
                                    <FormControl className="form-input-group fa fa-envelope">
                                        <Input placeholder="Where will you be staying" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}
                    <FormField
                        control={form.control}
                        name="allergies"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Allergies/Dietary Requirements</FormLabel>
                                <FormControl className="form-input-group fa fa-envelope">
                                    <Textarea
                                        placeholder="Please specify any allergies or dietary requirements"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="asoEbi"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Wedding Clothes - Would you like Asoebi?</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex "
                                    >
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="Yes" />
                                            </FormControl>
                                            <FormLabel className="font-normal">Yes</FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="No" />
                                            </FormControl>
                                            <FormLabel className="font-normal">No</FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="church"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Will you attend the church ceremony?</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex"
                                    >
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="Yes" />
                                            </FormControl>
                                            <FormLabel className="font-normal">Yes</FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="No" />
                                            </FormControl>
                                            <FormLabel className="font-normal">No</FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="reception"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Will you attend the reception?</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex"
                                    >
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="Yes" />
                                            </FormControl>
                                            <FormLabel className="font-normal">Yes</FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="No" />
                                            </FormControl>
                                            <FormLabel className="font-normal">No</FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="afterParty"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Will you attend the after party?</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex "
                                    >
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="Yes" />
                                            </FormControl>
                                            <FormLabel className="font-normal">Yes</FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="No" />
                                            </FormControl>
                                            <FormLabel className="font-normal">No</FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="rsvp"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>RSVP</FormLabel>
                                <FormControl className="form-input-group fa fa-envelope">
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="RSVP" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white">
                                            <SelectItem value="Yes, I accept with pleasure.">
                                                Yes, I accept with pleasure.
                                            </SelectItem>
                                            <SelectItem value="No, I decline with regrets.">
                                                No, I decline with regrets.
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Toaster />
                    <Button
                        className="text-white btn-fill font-bold py-2 px-4 rounded-full transition duration-200 align-middle"
                        type="submit"
                        disabled={!isFormValid}
                    >
                        Submit RSVP
                    </Button>
                </form>
            </Form>
        </div>
    );
}
