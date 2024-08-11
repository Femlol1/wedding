
import { z } from "zod";

export const userLinks = [
  {
    label: 'Home',
    route: '/',
  },
  {
    label: 'Welcome',
    route: '/home',
  },
  {
    label: 'RSVP',
    route: '/rsvp',
  },
  {
    label: "Our story",
    route: '/story',
  },
  // {
  //   label: 'Events',
  //   route: '/events',
  // },
  {
    label: 'Gifts',
    route: '/gifts',
  },
  {
    label: 'Guest',
    route: '/guest',
  },
  {
    label: 'Lagos T&A',
    route: '/travel',
  },
  {
    label: 'FAQ',
    route: '/faq',
  },
  // {
  //   label: 'Gallery',
  //   route: '/gallery',
  // },
  
  

  
];

export const adminLinks = [
  {
    label: 'Dashboard',
    route: '/dashboard',
  },
  {
    label: 'Rsvps',
    route: '/allRsvps',
  },
  {
    label: 'Scannner',
    route: '/scanner',
  },
 
];
export const events = [
  {
    time: "11am - 1:30pm",
    title: "Church Ceremony",//ceremoney should be untop
    location: "Foursquare Gospel Church, Lekki Headquarters",
    icon: "/assets/icons/church.png",//church icon
    heading:" ",
    description: " ",
    gmap: "https://maps.app.goo.gl/ecTwa2JodZuKdjsc6"
  },
  {
    time: "2:30pm",
    title: "Reception",
    location: "The Monarch Event Centre",
    icon: "/assets/icons/dance.png",//
    heading:" ",
    description: " ",
    gmap: "https://maps.app.goo.gl/NnAmnLHLcRkqQaDX8"
  },
  {
    time: "7pm",
    title: "After Party",
    location: "The Monarch Event Centre",
    icon: "/assets/icons/disco-light.png",//
    heading:" ",
    description: " ",
    gmap: "https://maps.app.goo.gl/NnAmnLHLcRkqQaDX8"
  }
];
export const rsvpFormSchema = z.object({
  firstName: z
      .string()
      .min(2, { message: "First Name must be at least 2 characters." })
      .max(50),
  lastName: z
      .string()
      .min(2, { message: "Last Name must be at least 2 characters." })
      .max(50),
  code: z.string().min(1, { message: "Code is required." }), // Removed enum and made it a string
  email: z.string().email({ message: "Please enter a valid email address." }),
  mobile: z.string().min(10, { message: "Please enter a valid mobile number." }),
  stayingPlace: z.enum([
      "At home with family",
      "Hotel on the Island",
      "Hotel on the Mainland",
      "Other",
  ]),
  otherStaying: z.string().optional(),
  allergies: z.string().optional(),
  asoEbi: z.enum(["Yes", "No"]),
  relations: z.enum([
      "Brides family",
      "Grooms family",
      "Brides friend",
      "Grooms friend",
      "Other",
  ]),
  church: z.union([z.enum(["Yes", "No"]), z.undefined()]),
  reception: z.union([z.enum(["Yes", "No"]), z.undefined()]),
  afterParty: z.union([z.enum(["Yes", "No"]), z.undefined()]),
  rsvp: z.enum(["Yes, I accept with pleasure.", "No, I decline with regrets."]),
});
