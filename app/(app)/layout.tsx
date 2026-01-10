import Navbar from "@/components/Navbar/Navbar";

export default function AppLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <div className="appShell">
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
