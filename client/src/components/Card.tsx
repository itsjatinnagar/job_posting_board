type Props = {
  title: string;
  subTitle: string;
  children: React.ReactNode;
};

export default function Card({ title, subTitle, children }: Props) {
  return (
    <div className="gradient-border max-w-[38rem] w-full p-10 bg-white lg:ml-auto">
      <h1 className="font-semibold text-3xl text-black">{title}</h1>
      <p className="font-medium text-foreground/70">{subTitle}</p>
      {children}
    </div>
  );
}
