import { ModeToggle } from "@/components/custom/strickmode";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    // console.log(process.env.NEXT_PUBLIC_API_URL)
    return (
        <div>
          {/* <ModeToggle /> */}
            {/* <h1 className="text-red-500">Auth Layout</h1> */}
            {children}
        </div>
    );
  }
  