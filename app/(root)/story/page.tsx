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
        <h2 className="text-2xl font-semibold text-gray-700">By Ope</h2>
        <p>
          We first met in November 2022 at a TLC Vibe, a Christian youth group. I had no idea who he was when his friend introduced us. I thought he was cute, but I didn’t think much of it at the time.
          Six months later, on my birthday, Sunday, May 8th, after church service in Canary Wharf, he tapped my shoulder and said, “I think I know you.” I didn’t remember him, but I was trying to place his face.
          🤔 As we talked, I realized we both worked in tech. I definitely hadn’t seen him in service, so it must have been at the youth group. I asked for his Instagram to stay connected since we were in the same industry. Once I got his Instagram, something clicked.
          💡 I remembered seeing this profile add me a few months ago, but I ignored it because I didn’t know who it was. It dawned on me that he had already added me on social media when we first met, but I didn’t realize it was him. 😲
        </p>
        <p>
          Fast forward, I post book reviews on social media, and he kept asking me about the books I was reading. 📚 It was kind of cute; I thought he was also interested in reading and looking for his next book. Little did I know, he was making excuses to talk to me. 🥰 He kept popping up and commenting on everything I posted online, including our “non-alcoholic gin” joke. 😂 Eventually, he asked me out.
          I said No! Haha. I wasn’t a big fan of dating, so I wanted us to know each other more before considering going on a date. We decided to have a phone call and ended up speaking for hours about our faith, family, friends, and career ambitions. We had so many similar values and came from similar backgrounds. We kept talking for months, and it was pretty fun getting to know each other. 😄
        </p>
        <p>
          After about two months of talking, I invited him to a friend’s BBQ party to check him out. We had fun that evening, really good vibes. 🎉 I think at that point, I knew he was the one I wanted as my husband. 💖 He then asked me on a date, and I said yes. We had never had sushi before, so we went to a nice place to try it together and practiced using chopsticks. 🍣 I liked his spirit of trying new things and not being embarrassed to learn.
        </p>
        <p>
          I remember one time he invited me to his house to cook for me on a date; he lives in flat 29. Coincidentally, I was buying my first flat, and it was also flat 29! 😱 We kept dating and started praying to God for confirmation. We thank God we got just that. 🙏
        </p>
      </div>
    ),
    Tolu: (
      <div>
        <h2 className="text-2xl font-semibold text-gray-700">By Tolu</h2>
        <p>
          Our love story began when we met through a mutual friend at Vibe, TLC&apos;s young adult church meeting. However, it didn&apos;t really take off until six months later when I approached her after a church service and got her Instagram. I slid into her dms by making small comments on her stories, which eventually led to our first call. That call lasted about two hours, during which we talked about our backgrounds, families, faith, and values. I knew she was the one from that conversation, but I needed to be careful and pray about it. After a few dates, we grew even closer, and I discovered what a beautiful, loving, and kind person she is.
        </p>
        <p>
          Following a couple of confirmations from God, we started dating and have been growing stronger ever since.
        </p>
      </div>
    ),
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-col md:flex-row flex-grow">
    {/* Image Section */}
    <section className="relative w-full md:w-1/2 h-64 md:h-auto">
          <Image
            src="/assets/images/whatsapp/222.jpeg" // Replace with your image path
            alt="Welcome Image"
            fill
            style={{ objectFit: 'cover' }}
            quality={100}
            className="z-0"
          />
          <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-20">
            <h3 className="text-3xl md:text-5xl font-bold mt-2">Our story</h3>
          </div>
        </section>
    <div className="container mx-auto px-4 py-8">

      <div className="grid grid-cols-2 gap-4 md:gap-10">
        <div className="space-y-4 text-center">
          <Dialog>
            <DialogTrigger asChild>
              <div>
                <Image
                  src="/assets/images/ikoye/IKYW94.jpg" // Replace with your image path
                  alt="Ope"
                  width={300}
                  height={300}
                  className="mx-auto cursor-pointer border-4 border-gold"
                />
                <Button>Read Ope&apos;s Story</Button>
              </div>
            </DialogTrigger>
            <DialogContent className="max-h-[80vh] overflow-y-auto bg-white">
              <DialogHeader>
                <DialogDescription>{stories.Ope}</DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        <div className="space-y-4 text-center">
          <Dialog>
            <DialogTrigger asChild>
              <div>
                <Image
                  src="/assets/images/ikoye/IKYW7.jpg" // Replace with your image path
                  alt="Tolu"
                  width={300}
                  height={300}
                  className="mx-auto cursor-pointer border-4 border-gold"
                />
                <Button>Read Tolu&apos;s Story</Button>
              </div>
            </DialogTrigger>
            <DialogContent className="max-h-[80vh] overflow-y-auto bg-white">
              <DialogHeader>
                <DialogDescription>{stories.Tolu}</DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
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
    </div>
    
  );
}
