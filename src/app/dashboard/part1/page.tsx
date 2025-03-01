export default function Part1Page({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div>
            <h1 className="text-red-700">Part 1</h1>
            {children}
        </div>
    );
  }
  