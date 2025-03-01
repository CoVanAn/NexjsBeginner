export default function Part2Page({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div>
            <h1 className="text-red-700">Part 2</h1>
            {children}
        </div>
    );
  }