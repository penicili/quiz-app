import Link from "next/link";
import type { ReactNode } from "react";
import { env } from "@/lib/env";

function NavLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className={"neo-link"}>
      {children}
    </Link>
  );
}

const Navbar = () => {
  return (
    <header className="bg-gray-700 px-6 py-5 md:px-12 border-b-4 border-b-white">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-6xl items-center justify-between gap-6"
      >
        <Link
          href="/"
          className="font-display text-xl font-black text-offwhite tracking-tight md:text-2xl"
        >
          {env.APP_NAME}
        </Link>

        <div className="flex items-center gap-5 text-sm font-bold md:gap-8">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/quizzes">Create</NavLink>
        </div>
      </nav>
    </header>
  );
};
export default Navbar;
