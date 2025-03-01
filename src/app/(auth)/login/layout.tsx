export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div>
            <h1 className="text-red-700">Login Layout</h1>
            {children}
        </div>
    );
  }
  