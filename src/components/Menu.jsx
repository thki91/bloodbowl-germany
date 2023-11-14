import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import Instagram from "../assets/instagram.png";
import Discord from "../assets/discord.png";
import LinkIcon from "../assets/linkIcon.png";
import Logo from "../assets/logo.png";
import { useScrollDirection } from "../hooks/useScrollDirection";
import DropdownMenu from "./DropdownMenu";

const MenuLink = ({ text, url, isActive }) => {
  let menuLinkClasses =
    "px-6 h-full text-zinc-300 hover:bg-zinc-700 block transition hover:text-zinc-200 flex items-center hidden sm:flex";
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

const dropdownMenuLinks = [
  {
    text: "Deutsche BB Community",
    link: "http://dbbcev.de/joomla/index.php/forum/index",
  },
  { text: "Eurobowl", link: "http://www.eurobowl.eu" },
  { text: "The Naf", link: "https://www.thenaf.net/" },
];

const dropdownMenuMobile = [
  {
    text: "Home",
    link: "/",
  },
  {
    text: "Historie",
    link: "/historie",
  },
  {
    text: "News",
    link: "/news",
  },
];

const dropdownDiscordLinks = [
  { text: "DBBC eV Discord Server", link: "https://discord.gg/dPuEY35v42" },
  { text: "Berlin Open Discord Server", link: "https://discord.gg/dXG9KcNR" },
  { text: "Eurobowl Discord Server", link: "https://discord.gg/NnH3yXFm" },
  { text: "NAF Discord Server", link: "https://discord.gg/8EwNFD5r" },
];

const Menu = () => {
  const location = useLocation();
  const { scrollDirection, scrollPosition } = useScrollDirection();
  const isScrollingDown = scrollDirection === "down";

  let headerClasses =
    "sm:bg-zinc-800 flex items-center absolute sm:fixed duration-600 top-0 z-30 w-full h-[70px] transition-[transform]";

  if (isScrollingDown) {
    headerClasses = `${headerClasses} transform sm:-translate-y-[70px]`;
  }

  if (!isScrollingDown && scrollPosition > 70) {
    headerClasses = `${headerClasses} !fixed bg-zinc-800`;
  }

  return (
    <div className={headerClasses}>
      <div className="sm:hidden pl-6">
        <DropdownMenu
          icon={
            <div className="hamburger mt-1">
              <div class="hamburger-bar1"></div>
              <div class="hamburger-bar2"></div>
              <div class="hamburger-bar3"></div>
            </div>
          }
          items={dropdownMenuMobile}
          containerClasses="!left-0 !top-7"
          iconClasses="!w-10 !h-auto ml-4"
        />
      </div>
      <div className="flex-shrink-0 h-full">
        <MenuLink
          url="/"
          text={
            <img
              src={Logo}
              className="w-10 h-auto hover:scale-105 transition"
            />
          }
          isActive={location.pathname === "/" && !location.hash}
        />
      </div>
      <MenuLink
        url="/historie"
        text="Historie"
        isActive={location.pathname === "/historie"}
      />
      <MenuLink
        url="/news"
        text="News"
        isActive={location.pathname === "/news"}
      />
      <div className="ml-auto flex items-center">
        <DropdownMenu image={LinkIcon} items={dropdownMenuLinks} />
        <DropdownMenu image={Discord} items={dropdownDiscordLinks} />
        <a
          href="https://www.instagram.com/team_germany_bb/"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={Instagram}
            className="w-5 opacity-80 hover:opacity-100 transition mr-4"
            alt="Instagram"
          />
        </a>
      </div>
    </div>
  );
};

export default Menu;
