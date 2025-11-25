import Navbar from "@/components/Navbar";

export default function AppLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <div className="app-shell">
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
