"use client";

import Gallery from "@/components/shared/Gallery";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiChevronRight } from "react-icons/fi";

type StoryKey = 'Ope' | 'Tolu';

export default function OurStory() {
  const [selectedStory, setSelectedStory] = useState<StoryKey | null>(null);

  const handleStorySelect = (story: StoryKey) => {
    setSelectedStory(story);
  };

  const stories: Record<StoryKey, JSX.Element> = {
    Ope: (
      <div>
        <div className="relative">
        <Image
                src="/assets/images/OurStoryPage/OpeStoryClose.jpg" // Replace with your image path
                alt="Ope"
                width={150}
                height={150}
                className="border-4 border-primary flex-shrink-0 transition-transform duration-300 transform hover:scale-110 rounded-full"
              />
              </div>
        <h2 className="text-2xl font-semibold text-gray-700">By Ope</h2>
        <p>
        We first met in November 2022 at a TLC Vibe Christian youth group. I didn’t recognize him at the time, though I thought he was cute. Six months later, on my birthday, May 8th, after church in Canary Wharf, he tapped my shoulder and said, “I think I know you.” I didn’t remember him, but as we talked, I realized we both worked in tech. I asked for his Instagram to stay connected, and it clicked—I had ignored his profile request months earlier. 😲
        </p>
        <p>
        He started commenting on my book reviews online, which I thought was cute and showed interest in reading. 🥰 He kept finding reasons to talk to me and eventually asked me out. I said no initially, as I wanted to get to know him better first. We had long phone conversations about our values and ambitions, discovering many similarities. 😄
        </p>
        <p>
        After two months, I invited him to a friend’s BBQ, and we had great vibes. 🎉 I knew he could be the one. He then asked me on a date, and I said yes. We went for sushi, and I admired his eagerness to try new things. 🍣
        </p>
        <p>
        On another date, he cooked for me at his flat—number 29. Coincidentally, I was buying my first flat, also number 29! 😱 We continued dating, prayed for confirmation, and realised that the period I began praying for my husband in 2021 was the same time he left Nigeria for London. We’re grateful for the confirmation we received. 🙏
        </p>
        <br/>
        <Image
                src="/assets/images/OurStoryPage/OpeStoryBottom.jpg" // Replace with your image path
                alt="ope buttom picture"
                width={450}
                height={450}
                className="border-4 border-primary flex-shrink-0 transition-transform duration-300 transform hover:scale-110"
              />
      </div>
    ),
    Tolu: (
      <div>
        <div className=" container relative">
        <Image
                src="/assets/images/OurStoryPage/ToluStoryClose.jpg" // Replace with your image path
                alt="Tolu"
                width={150}
                height={150}
                className="border-4 border-primary flex-shrink-0 transition-transform duration-300 transform hover:scale-110 rounded-full"
              />
              </div>
        <h2 className="text-2xl font-semibold text-gray-700">By Tolu</h2>
        <p>
          Our love story began when we met through a mutual friend at Vibe, TLC&apos;s young adult church meeting. However, it didn&apos;t really take off until six months later when I approached her after a church service and got her Instagram. I slid into her dms by making small comments on her stories, which eventually led to our first call. That call lasted about two hours, during which we talked about our backgrounds, families, faith, and values. I knew she was the one from that conversation, but I needed to be careful and pray about it.After a few dates, we grew even closer, and I discovered what a beautiful, loving, and kind person she is.
        </p>
        <p>
          Following a couple of confirmations from God, we started dating and have been growing stronger ever since.
        </p>
        <br/>
        <Image
                src="/assets/images/OurStoryPage/ToluStoryButtom.jpg" // Replace with your image path
                alt="tolu buttom picture"
                width={450}
                height={450}
                className="border-4 border-primary flex-shrink-0 transition-transform duration-300 transform hover:scale-110"
              />
      </div>
    ),
  };

  return (
      <div className="flex flex-col md:flex-col md:mt-20">
        {/* Image Section */}
        <section className="relative w-full h-64 ">
          <Image
            src="/assets/images/OurStoryPage/2S6A1507.jpg" // Replace with your image path
            alt="Welcome Image"
            fill
            style={{ objectFit: 'cover' }}
            priority={true} // {false} | {true}
            quality={100}
    
            className="z-0"
          />
          <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-20">
            <h3 className="text-3xl md:text-5xl font-bold mt-2">Our Story</h3>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10">
            {/* Ope's Story */}

            <div className="flex items-start gap-4">
              <Image
                src="/assets/images/OurStoryPage/OpeStoryClose.jpg" // Replace with your image path
                alt="Ope"
                width={150}
                height={150}
                className="border-4 border-primary flex-shrink-0 transition-transform duration-300 transform hover:scale-110 rounded-full"
              />
              <div className="flex flex-col justify-between">
              <div className=" text-xl flex font-bold flex-row">Ope&rsquo;s Story</div>

                <p className="text-gray-700 line-clamp-3">
                  We first met in November 2022 at a TLC Vibe, a Christian youth group...
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Link className="mt-2 text-primary-500 hover:text-primary-700" href={""}>Read More</Link>
                  </DialogTrigger>
                  <DialogContent className="max-h-[80vh] overflow-y-auto bg-white">
                  <DialogTitle className="DialogTitle"></DialogTitle>
                    <DialogHeader>
                      <DialogDescription>{stories.Ope}</DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Tolu's Story */}
            <div className="flex items-start gap-4">
              <Image
                src="/assets/images/OurStoryPage/ToluStoryClose.jpg" // Replace with your image path
                alt="Tolu"
                width={150}
                height={150}
                className="border-4 border-primary flex-shrink-0 transition-transform duration-300 transform hover:scale-110 rounded-full"
              />
              <div className="flex flex-col justify-between">
              <div className=" text-xl flex font-bold flex-row">Tolu&rsquo;s Story</div>

                <p className="text-gray-700 line-clamp-3">
                  Our love story began when we met through a mutual friend at Vibe, TLC&rsquo;s young adult church meeting...
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Link className="mt-2 text-primary-500 hover:text-primary-700" href={""}>Read More</Link>
                  </DialogTrigger>
                  
                  <DialogContent className="max-h-[80vh] overflow-y-auto bg-white">
                  <DialogTitle></DialogTitle>
                    <DialogHeader>
                      <DialogDescription>{stories.Tolu}</DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
          {/* Proposal Video Section */}
          <section className="mt-10">
            <div className="wrapper h3-bold text-center">THE PROPOSAL</div>
            <div className="flex justify-center mt-4">
              <video
                width="800"
                controls
                className="border-4 border-primary rounded-lg shadow-lg"
              >
                <source src="/assets/videos/PROPOSALREEL1.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </section>

          <section className="mt-10">
            <div className="wrapper h3-bold text-center">GALLERY</div>
            <Gallery />
          </section>
          
          <section className="fixed bottom-4 right-4 z-20">
            <Link href="/gifts">
              <Button className="w-12 h-12 text-white btn-fill font-bold py-2 px-3 rounded-full transition duration-200 flex items-center justify-center shadow-lg">
                <FiChevronRight className="text-2xl text-white" />
              </Button>
            </Link>
          </section>
        </div>
      </div>
  );
}
