import { Link } from "react-scroll";

const Footer = () => {
  return (
    <footer className="border-t border-zinc-200 bg-white px-4 py-8 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400 lg:px-6">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 md:flex-row md:items-center">
        <p>© {new Date().getFullYear()} softwer.dev. Custom software for growing businesses.</p>
        <div className="flex gap-5">
          {[
            ["Services", "services"],
            ["Process", "process"],
            ["Contact", "contact"],
          ].map(([label, target]) => (
            <Link key={target} to={target} smooth={true} duration={500} offset={-72} className="cursor-pointer transition hover:text-teal-700 dark:hover:text-teal-300">
              {label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
