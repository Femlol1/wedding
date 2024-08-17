
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
    time: "11:00am - 1:30pm",
    title: "Church Ceremony",//ceremoney should be untop
    location: "Foursquare Gospel Church, Lekki",
    icon: "/assets/icons/church.png",//church icon
    heading:" ",
    description: "Opeoluwa Osibemekun and Toluwanimi Oyediran will be joyfully united in holy matrimony, with a wedding message, hymns, and special prayers marking the beginning of their blessed union. ",
    gmap: "https://maps.app.goo.gl/ecTwa2JodZuKdjsc6"
  },
  {
    time: "02:30pm - 07:00pm",
    title: "Reception",
    location: "The Monarch Event Centre",
    icon: "/assets/icons/dance.png",//
    heading:" ",
    description: "Family and friends will gather to celebrate the newlyweds with joyful festivities, delicious cuisine, and memorable moments in a beautifully decorated setting. ",
    gmap: "https://maps.app.goo.gl/NnAmnLHLcRkqQaDX8"
  },
  {
    time: "07:00pm",
    title: "After Party",
    location: "The Monarch Event Centre",
    icon: "/assets/icons/disco-light.png",//
    heading:" ",
    description: "The celebration will continue where friends can enjoy music, dancing, and more intimate moments with the newlyweds, extending the joy of the day late into the night. ",
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
  asoebiType: z.string().optional(),
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
});
