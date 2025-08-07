const Heading = ({ text, className }: { text: string; className?: string }) => (
  <h2
    className={`${className} text-gradient my-5 from-slate-950 to-slate-700 text-center text-4xl font-bold capitalize lg:my-10`}
  >
    {text}
  </h2>
)

export default Heading
