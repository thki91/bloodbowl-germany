import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import Instagram from "../assets/instagram.png";
import Discord from "../assets/discord.png";
import LinkIcon from "../assets/linkIcon.png";
import Logo from "../assets/logo.png";
import { useScrollDirection } from "../hooks/useScrollDirection";

const MenuLink = ({ text, url, isActive }) => {
  let menuLinkClasses =
    "px-6 h-full text-zinc-300 hover:bg-zinc-700 block transition hover:text-zinc-200 flex items-center";
  if (isActive) {
    menuLinkClasses = `${menuLinkClasses} bg-gradient-to-t from-amber-300 from-0% via-50% to-amber-600 !text-black`;
  }
  return (
    <a href={url} className={menuLinkClasses}>
      {text}
    </a>
  );
};

MenuLink.propTypes = {
  text: PropTypes.node,
  url: PropTypes.string,
  isActive: PropTypes.bool,
};

const DropdownMenu = ({ icon, items }) => {
  return (
    <div className="relative group cursor-pointer">
      <img
        src={icon}
        className="w-6 opacity-80 hover:opacity-100 transition mr-6"
        alt="Discord"
      />
      <div className="opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition absolute top-4 pt-3 right-0">
        <ul className="z-10 bg-zinc-700 divide-y divide-zinc-600 rounded-lg shadow w-48 overflow-hidden">
          {items.map((item) => (
            <li key={item.link}>
              <a
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="block px-4 py-2 hover:bg-zinc-600 transition text-xs text-zinc-200 hover:text-zinc-100"
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const dropdownMenuLinks = [
  {
    text: "Deutsche BB Community",
    link: "http://dbbcev.de/joomla/index.php/forum/index",
  },
  { text: "The Naf", link: "https://www.thenaf.net/" },
];

const dropdownDiscordLinks = [
  { text: "DBBC eV Discord Server", link: "https://discord.gg/dPuEY35v42" },
  { text: "Berlin Open Discord Server", link: "https://discord.gg/dXG9KcNR" },
  { text: "Eurobowl Discord Server", link: "https://discord.gg/NnH3yXFm" },
  { text: "NAF Discord Server", link: "https://discord.gg/8EwNFD5r" },
];

const Menu = () => {
  const location = useLocation();
  const scrollDirection = useScrollDirection();
  const isScrollingDown = scrollDirection === "down";

  let headerClasses =
    "bg-zinc-800 px-1 sm:px-5 flex items-center fixed duration-600 top-0 z-10 w-full h-[70px] transition-[transform]";

  if (isScrollingDown) {
    headerClasses = `${headerClasses} transform -translate-y-[70px]`;
  }

  return (
    <div className={headerClasses}>
      <div className="flex-shrink-0 h-full">
        <MenuLink
          url="/"
          text={
            <img src={Logo} className="w-10 h-10 hover:scale-105 transition" />
          }
          isActive={location.pathname === "/" && !location.hash}
        />
      </div>
      <MenuLink url="/#team" text="Team" isActive={location.hash === "#team"} />
      <MenuLink
        url="/historie"
        text="Historie"
        isActive={location.pathname === "/historie"}
      />
      <MenuLink
        url="/ranking"
        text="Ranking"
        isActive={location.pathname === "/ranking"}
      />
      <div className="ml-auto flex items-center">
        <DropdownMenu icon={LinkIcon} items={dropdownMenuLinks} />
        <DropdownMenu icon={Discord} items={dropdownDiscordLinks} />
        <a
          href="https://www.instagram.com/team_germany_bb/"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={Instagram}
            className="w-5 opacity-80 hover:opacity-100 transition"
            alt="Instagram"
          />
        </a>
      </div>
    </div>
  );
};

export default Menu;
