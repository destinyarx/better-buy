import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full border-b bg-white dark:bg-gray-900 dark:text-zinc-50 shadow-sm">
      <div className="flex justify-between p-4">
        <h1 className="text-xl font-bold">BetterBuy</h1>

        <nav className="flex gap-6">
          <Link href="/" className="hover:text-blue-600">
            About
          </Link>

          <Link href="/" className="hover:text-blue-600">
            Examples
          </Link>
        </nav>
      </div>
    </header>
  );
}
