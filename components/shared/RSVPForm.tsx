"use client"

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import MD5 from "crypto-js/md5";
import $ from "jquery";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Define the schema with a placeholder for the code validation
const formSchema = z.object({
    firstName: z.string().min(2, { message: "First Name must be at least 2 characters." }).max(50),
    lastName: z.string().min(2, { message: "Last Name must be at least 2 characters." }).max(50),
    code: z.string().min(1, { message: "Code is required." }), // Removed enum and made it a string
    email: z.string().email({ message: "Please enter a valid email address." }),
    mobile: z.string().min(10, { message: "Please enter a valid mobile number." }),
    stayingPlace: z.enum(["","At home with family", "Hotel Island", "Hotel mainland", "Other"]),
    otherStaying: z.string().optional(),
    allergies: z.string().optional(),
    asoEbi: z.enum(["","Yes", "No"]),
    relations: z.enum(["","Brides family", "Grooms family", "Brides friend", "Grooms friend", "Other"]),    
    church: z.enum(["","Yes", "No"]),
    reception: z.enum(["","Yes", "No"]),
    afterParty: z.enum(["","Yes", "No"]),
    rsvp: z.enum(["","Yes, I accept with pleasure.", "No, I decline with regrets."]),
});

export function RSVPForm() {
    // Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            code: "",
            email: "",
            mobile: "",
            stayingPlace: "",
            otherStaying: "",
            allergies: "",
            asoEbi: "",
            relations: "",
            church:"",
            reception: "",
            afterParty: "",
            rsvp: "",
        },
    });

    const [alert, setAlert] = useState<{ type: string, message: string } | null>(null);

    // Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const hashedCode = MD5(values.code).toString();

        if (hashedCode !== "b0e53b10c1f55ede516b240036b88f40" && hashedCode !== "2ac7f43695eb0479d5846bb38eec59cc") {
            setAlert({ type: "danger", message: "Sorry! Your invite code is incorrect." });
            return;
        }

        const data = values;

        setAlert({ type: "info", message: "Just a sec! We are saving your details." });

        $.post(
            "https://script.google.com/macros/s/AKfycbw2OnhyJWPuuuKjeN2bIhPA5WhtBqEpr5CWUv1N0UYmmtbseCQmsuNIqJxptSxn8fY/exec",
            data
        )
        .done(function (response) {
            if (response.result === "error") {
                setAlert({ type: "danger", message: response.message });
            } else {
                setAlert(null);
                $("#rsvp-modal").modal("show");
            }
        })
        .fail(function () {
            setAlert({ type: "danger", message: "Sorry! There is some issue with the server." });
        });

        console.log(data);
    }

    return (
        <div className="container mx-auto rsvp">
            <p className="text-center mt-4">
                We would greatly appreciate if you could RSVP before 1st November 2024
            </p>
            {alert && (
                <div className={`alert alert-${alert.type}`} role="alert">
                    {alert.message}
                </div>
            )}
            <Form  {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 rsvp-form">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="John" {...field} />
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
                                <FormControl>
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
                                <FormLabel>Code</FormLabel>
                                <FormControl>
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
                                <FormControl>
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
                                <FormControl>
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
                                <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select staying place" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white">
                                            <SelectItem value="At home with family">At home with family</SelectItem>
                                            <SelectItem value="Hotel Island">Hotel Island</SelectItem>
                                            <SelectItem value="Hotel mainland">Hotel mainland</SelectItem>
                                            <SelectItem value="Other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="otherStaying"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Other</FormLabel>
                                <FormControl>
                                    <Input placeholder="Where will you be staying" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="relations"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>How do you know the Bride or Groom?</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select How you know the Bride or Groom" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white">
                                            <SelectItem value="Brides family">Brides family</SelectItem>
                                            <SelectItem value="Grooms family">Grooms family</SelectItem>
                                            <SelectItem value="Brides friend">Brides friend</SelectItem>
                                            <SelectItem value="Grooms friend">Grooms friend</SelectItem>
                                            <SelectItem value="Other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="allergies"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Allergies/Dietary Requirements</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Please specify any allergies or dietary requirements" {...field} />
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
                                <FormLabel>Would you like Asoebi?</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Asoebi preference" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white">
                                            <SelectItem value="Yes">Yes</SelectItem>
                                            <SelectItem value="No">No</SelectItem>
                                        </SelectContent>
                                    </Select>
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
                                <FormLabel>Would you like to go to the church service?</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Yes or no" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white">
                                            <SelectItem value="Yes">Yes</SelectItem>
                                            <SelectItem value="No">No</SelectItem>
                                        </SelectContent>
                                    </Select>
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
                                <FormLabel>Would you like to go to the church?</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Yes or no" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white">
                                            <SelectItem value="Yes">Yes</SelectItem>
                                            <SelectItem value="No">No</SelectItem>
                                        </SelectContent>
                                    </Select>
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
                                <FormLabel>Would you like to go to the after party?</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Yes or no" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white">
                                            <SelectItem value="Yes">Yes</SelectItem>
                                            <SelectItem value="No">No</SelectItem>
                                        </SelectContent>
                                    </Select>
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
                                <FormControl>
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
                    
                    <Button className=" btn-fill font-bold py-2 px-4 rounded block mx-auto mt-2 justify-center" type="submit">Send</Button>
                </form>
            </Form>
        </div>
    );
}
