const formats = [
  {
    name: "Aiken",
    description: "Plain-text format for multiple-choice questions.",
    status: "Available now",
    className: "bg-cyan",
  },
  {
    name: "GIFT",
    description: "A flexible text format supported by Moodle.",
    status: "Coming soon",
    className: "bg-yellow",
  },
  {
    name: "Moodle XML",
    description: "Moodle's native format for importing quizzes.",
    status: "Coming soon",
    className: "bg-pink",
  },
];

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
        <p className="mt-5 font-heading font-bold max-w-2xl text-base leading-7 md:text-xl">
          Generate quizzes and export the to a moodle friendly file format
        </p>
      </section>


    </div>
  );
}
