export default function Header() {
  return (
    <header className="px-5">
      <div className="mx-auto container h-20 flex items-center justify-between">
        <img
          src="/logo.png"
          alt="cuvette"
          width={165}
          height={43}
          loading="eager"
        />
        <a
          href="#"
          className="font-medium text-[28px] text-[#576474] hover:underline"
        >
          Contact
        </a>
      </div>
    </header>
  );
}
