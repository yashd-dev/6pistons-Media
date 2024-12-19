import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <div className="fixed top-10 left-0 right-0 flex justify-center z-50">
      <nav className="flex items-center justify-between px-5 md:px-10 py-5 text-foreground bg-black rounded-xl bg-opacity-30 backdrop-blur-md gap-8"> 
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.svg"
            alt="6Piston Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
        </Link>
        <div className="flex items-center gap-8">
          <Link
            href="/#about"
            className="text-xl font-medium hover:text-BrandRed transition-colors duration-300"
          >
            About
          </Link>
          <Link
            href="/#contact"
            className="text-xl font-medium hover:text-BrandRed transition-colors duration-300"
          >
            Contact
          </Link>
        </div>
      </nav>
    </div>
  );
}
