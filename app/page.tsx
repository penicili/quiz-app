import Link from "next/link";
export default function Home() {
  return (
    <div className="flex flex-col gap-10">
      <section className="md:min-h-screen min-h-1/2 bg-yellow p-8 md:p-12">
        <p className="mb-3 font-display text-sm font-black uppercase tracking-[0.2em] text-pink">
          Quiz tools
        </p>
        <p className="mb-3 font-display text-6xl font-black uppercase tracking-[0.2em] text-black">
          Create Quiz Files for Moodle
        </p>
        <p className="mt-5 font-heading max-w-2xl text-base leading-7 md:text-xl">
          Generate quizzes and export to a moodle friendly file format
        </p>
        <Link className="neo-btn neo-btn--secondary mt-4" href={`/create`}>
          Create New Quiz
        </Link>
      </section>
    </div>
  );
}
