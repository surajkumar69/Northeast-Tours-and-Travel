import Link from "next/link";

export function Header({ variant = "light" }: { variant?: "light" | "dark" }) {
  const textColor = variant === "light" ? "text-white" : "text-stone-900";
  const hoverColor = variant === "light" ? "hover:text-stone-300" : "hover:text-stone-600";
  
  return (
    <header className={`absolute top-0 w-full z-50 px-6 py-8 flex justify-between items-center ${textColor}`}>
      <Link href="/" className="text-xl font-playfair tracking-wider font-semibold">
        NORTHEAST TOURS
      </Link>
      <nav className="hidden md:flex space-x-8 text-sm font-medium tracking-wide">
        <Link href="/tours" className={`${hoverColor} transition-colors`}>JOURNEYS</Link>
        <Link href="/destinations" className={`${hoverColor} transition-colors`}>DESTINATIONS</Link>
        <Link href="/taxis" className={`${hoverColor} transition-colors`}>PRIVATE TRAVEL</Link>
        <Link href="/contact" className={`${hoverColor} transition-colors`}>CONTACT</Link>
      </nav>
    </header>
  );
}
