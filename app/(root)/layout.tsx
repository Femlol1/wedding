import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <div className="flex flex-col">
        <Header/>
        <main className="flex-1 mt-20">{children}</main>
        <Toaster />
        <Footer />
      </div>
    );
  }