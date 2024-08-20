"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { rsvpFormSchema } from "@/constants";
import { db } from '@/lib/firebase';
import { zodResolver } from "@hookform/resolvers/zod";
import axios from 'axios';
import { collection, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Modal from "./Modal";


export function RSVPForm() {
    const { toast } = useToast();
    const router = useRouter();
    const [showOtherStaying, setShowOtherStaying] = useState(false);
    const [showTypeAsoebi, setShowTypeAsoebi] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

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
            asoebiType: "",
            relations: "Brides family",
            church: "No",
            reception: "No",
            afterParty: "No",
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

    useEffect(() => {
        const subscription = form.watch((value, { name }) => {
            if (name === "asoEbi") {
                setShowTypeAsoebi(value.asoEbi === "Yes");
            }
        });
        return () => subscription.unsubscribe();
    }, [form]);

    const checkEmailExists = async (email: string): Promise<boolean> => {
        const q = query(collection(db, "rsvps"), where("email", "==", email));
        const querySnapshot = await getDocs(q);
        return !querySnapshot.empty;
    };

    // const onSubmit = async (values: z.infer<typeof rsvpFormSchema>) => {
    //     toast({
    //         variant: "default",
    //         title: "Thank You for sending Your RSVP.",
    //         description: "Just a sec! We are saving your details.",
    //     });

    //     try {
    //         // Check if email already exists
    //         const emailExists = await checkEmailExists(values.email);
    //         if (emailExists) {
    //             toast({
    //                 variant: "default",
    //                 title: "Duplicate Email",
    //                 description: "This email has already been used to RSVP. Please use a different email.",
    //                 action: <ToastAction altText="Try again">Try again</ToastAction>,
    //             });
    //             return;
    //         }

    //         const response = await axios.post('/api/rsvp', values);
    //         if (response.data.result === 'error') {
    //             toast({
    //                 variant: "default",
    //                 description: response.data.message,
    //                 action: <ToastAction altText="Try again">Try again</ToastAction>,
    //             });
    //         } else {
    //             toast({
    //                 variant: "default",
    //                 title: "Thank You for sending Your RSVP.",
    //                 description: "Your RSVP has been sent",
    //             });
    //             form.reset(); // Reset the form after a successful submission
    //         }
    //     } catch (error: any) { // Cast error to any
    //         if (error.response?.status === 400) {
    //             toast({
    //                 variant: "default",
    //                 title: "Invalid Code",
    //                 description: "The RSVP code you entered is invalid. Please check your code and try again.",
    //                 action: <ToastAction altText="Try again">Try again</ToastAction>,
    //             });
    //         } else {
    //             toast({
    //                 variant: "default",
    //                 title: "Uh oh! Something went wrong.",
    //                 description: "Sorry! There is some issue with the server.",
    //                 action: <ToastAction altText="Try again">Try again</ToastAction>,
    //             });
    //         }
    //     }
    // };
    const onSubmit = async (values: z.infer<typeof rsvpFormSchema>) => {
        setIsLoading(true);
        setShowModal(true);

        try {
            // Check if email already exists
            const emailExists = await checkEmailExists(values.email);
            if (emailExists) {
                setModalMessage("This email has already been used to RSVP. Please use a different email.");
                setIsLoading(false);
                return;
            }

            const response = await axios.post('/api/rsvp', values);
            if (response.data.result === 'error') {
                setModalMessage(response.data.message);
            } else {
                setModalMessage("Your RSVP has been sent successfully. You should soon receive a confirmation email with your invite code");
                form.reset(); // Reset the form after a successful submission
            }
        } catch (error: any) { // Cast error to any
            if (error.response?.status === 400) {
                setModalMessage("The RSVP code you entered is invalid. Please check your code and try again.");
            } else {
                setModalMessage("Sorry! There was an issue with the server. Please try again later.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setModalMessage('');
    };


    const isFormValid = form.formState.isValid;

    return (
        <div className="container mx-auto rsvp">
            <div className="text-center text-sm py-4">
                We would greatly appreciate if you could RSVP before 1st Nov 2024
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
                                    <Input placeholder=" " {...field} required />
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
                                    <Input placeholder=" " {...field} />
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
                                    <Input placeholder="Enter code" {...field} />
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
                                    <Input placeholder="" {...field} />
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
                                            <SelectItem value="Recommended Hotel Vintanio">Recommended Hotel Vintanio</SelectItem>
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
                    {showTypeAsoebi && (
                        <FormField
                            control={form.control}
                            name="asoebiType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>If yes, Please Specify Clothes Type</FormLabel>
                                    <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex "
                                    >
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="Male" />
                                            </FormControl>
                                            <FormLabel className="font-normal">Male</FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="Female" />
                                            </FormControl>
                                            <FormLabel className="font-normal">Female</FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}
                    <FormField
                        control={form.control}
                        name="church"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Will you be attending the church ceremony?</FormLabel>
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
                                <FormLabel>Will you be attending the reception?</FormLabel>
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
                                <FormLabel>Will you be attending the after party?</FormLabel>
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
                    {/* <FormField
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
                    /> */}
                    {/* <Toaster /> */}
                    <Button
                        className="text-white btn-fill font-bold py-2 px-4 rounded-full transition duration-200 align-middle"
                        type="submit"
                        disabled={!isFormValid || isLoading}
                    >
                        Submit RSVP
                    </Button>
                </form>
            </Form>
            <Modal
                show={showModal}
                onClose={closeModal}
                title={isLoading ? "Sending RSVP..." : "RSVP Submission"}
                message={modalMessage}
                isLoading={isLoading}
            />
        </div>
    );
}
