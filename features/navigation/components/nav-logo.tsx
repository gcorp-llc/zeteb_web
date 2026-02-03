import Link from "next/link";

export const NavLogo = () => (
  <Link href="/" className="flex items-center gap-2 transition-transform active:scale-95">
    {/* لوگو با استایل گرادینت مشابه فایل لاراول */}
    <span className="text-3xl font-black tracking-tighter bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
      ZETEB
    </span>
  </Link>
);