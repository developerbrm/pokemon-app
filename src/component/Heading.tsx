const Heading = ({ text, className }: { text: string; className?: string }) => (
  <h2
    className={`${className} my-5 text-center text-4xl font-bold text-slate-700 capitalize lg:my-10`}
  >
    {text}
  </h2>
)

export default Heading
