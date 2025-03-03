"use client";

import DressCodeModal from "@/components/shared/DressCodeModal";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import Events from "../events/page";

const HomePage: React.FC = () => {
	const [showDressCode, setShowDressCode] = useState(false);
	return (
		<div className="flex flex-col md:flex-col md:mt-20">
			{/* Image Section */}
			<section className="relative w-full h-64 ">
				<Image
					src="/assets/images/WelcomePage/welcomeHeader.jpg" // Replace with your image path
					alt="Welcome Image"
					fill
					style={{ objectFit: "cover" }}
					quality={100}
					className="z-0"
				/>
				<div className="absolute inset-0 bg-black opacity-50 z-10"></div>
				<div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-20">
					<h3 className="text-3xl md:text-5xl font-bold mt-2">Tolu and Ope</h3>
				</div>
			</section>
			{/* Text Section */}
			<section className="flex flex-col items-center justify-center py-10 px-5 bg-white w-full ">
				<h2 className="text-xl font-semibold mb-4 text-center">
					Welcome to Our Wedding Website
				</h2>
				<p className="text-center mb-8">
					Family + Friends,
					<br />
					Thank you for sharing this special moment with us!
					<br />
					We are overjoyed to announce our wedding and delighted to share this
					special journey with our cherished friends and family. This website is
					your one-stop destination for all the details you need to celebrate
					our big day with us.
					<br />
					<br />
					Please note, our wedding is by <strong>INVITE ONLY</strong>. No extra
					guests, please, unless approved by us to maintain a safe, intimate
					celebration.
					<br />
					<>
						Although we love your children, we regretfully{" "}
						<strong>cannot accommodate children</strong> at the venue due to
						restricted numbers
					</>
					<br />
					<br />
					<strong>
						Tolu and Ope Forever <br />
						<u>
							<Link
								className="
            text-primary"
								href={"https://www.instagram.com/explore/tags/TOFOREVER/"}
							>
								#TOforever
							</Link>
						</u>
					</strong>
				</p>
				<div className="flex flex-row items-center space-x-4">
					<Link href="/gifts">
						<Button className="text-white btn-fill font-bold py-6 px-6 rounded-full transition duration-200">
							Gifts
						</Button>
					</Link>
					<Button
						className="text-white btn-fill font-bold py-6 px-6 rounded-full transition duration-200"
						onClick={() => setShowDressCode(true)}
					>
						Dress Code
					</Button>
				</div>
				{showDressCode && (
					<DressCodeModal onClose={() => setShowDressCode(false)} />
				)}
			</section>
			<section className="flex flex-col items-center justify-center py-10 px-5 bg-white w-full">
				<h2 className="text-3xl font-semibold mb-4">Events</h2>
				<Events />
			</section>
			<section className="fixed bottom-4 right-4 z-20">
				<Link href="/story">
					<Button className="w-12 h-12 text-white btn-fill font-bold py-2 px-3 rounded-full transition duration-200 flex items-center justify-center shadow-lg">
						<FiChevronRight className="text-2xl text-white" />
					</Button>
				</Link>
			</section>
		</div>
	);
};

export default HomePage;
