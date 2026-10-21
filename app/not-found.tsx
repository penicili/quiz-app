import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center">
      <div className="w-full max-w-xl border-4 border-ink bg-white p-8 text-center shadow-hard md:p-12">
        <p className="mb-4 text-sm font-black uppercase tracking-[0.2em] text-pink">
          Error 404
        </p>

        <h1 className="mb-4 text-4xl font-black tracking-tight md:text-6xl">
          Page not found
        </h1>

        <p className="mb-8 text-base leading-7 md:text-lg">
          The page you are looking for does not exist or may have been moved.
        </p>

        <Link
          href="/"
          className="neo-btn"
        >
          Return to home
        </Link>
      </div>
    </section>
  );
}
