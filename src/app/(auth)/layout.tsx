import { ModeToggle } from "@/components/custom/strickmode";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div>
          <ModeToggle />
            <h1 className="text-red-500">Auth Layout</h1>
            {children}
        </div>
    );
  }
  