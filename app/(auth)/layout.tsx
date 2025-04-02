import Navbar from "@/components/common/layout/Navbar";

export default function Layout({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="font-ar-sans">
            <Navbar />

            {children}
        </main>
    );
}