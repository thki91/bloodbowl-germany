import { memo } from "react";
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
    "px-6 h-full text-stone-300 hover:bg-stone-700 block transition hover:text-stone-200 flex items-center hidden sm:flex";
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
    text: "Deutsche BB Community Forum",
    link: "http://dbbcev.de/joomla/index.php/forum/deutscher-pavillion",
  },
  { text: "Eurobowl Homepage", link: "http://www.eurobowl.eu/2024/" },
  { text: "The Naf Homepage", link: "https://www.thenaf.net" },
];

const dropdownMenuMobile = [
  {
    text: "Home",
    link: "/",
  },
  {
    text: "News & Blog",
    link: "/news",
  },
  {
    text: "Historie",
    link: "/historie",
  },
  {
    text: "Gallerie",
    link: "/gallerie",
  },
];

const dropdownDiscordLinks = [
  {
    text: "DBBC Discord #Eurobowl",
    link: "https://discord.com/channels/259586290142412800/889188324504404008",
  },
  {
    text: "Berlin Open Discord #Eurobowl",
    link: "https://discord.com/channels/484314766224130050/1159188115437658182",
  },
  {
    text: "Bloodbowl Germany Facebook",
    link: "https://m.facebook.com/groups/1429958430633510/?ref=share",
  },
  {
    text: "NAF Discord #Eurobowl",
    link: "https://discord.com/channels/368441333745975306/1159758186656583742",
  },
  {
    text: "Eurobowl Facebook",
    link: "https://www.facebook.com/groups/435828406479977/?ref=share",
  },
  {
    text: "Eurobowl Discord #General",
    link: "https://discord.com/channels/1021362702700003420/1043193689503174737",
  },
];

const Menu = memo(() => {
  const location = useLocation();
  const { scrollDirection, scrollPosition } = useScrollDirection();
  const isScrollingDown = scrollDirection === "down";

  let headerClasses =
    "sm:bg-stone-800 flex items-center absolute sm:fixed duration-600 top-0 z-30 w-full h-[70px] transition-[transform]";

  if (isScrollingDown) {
    headerClasses = `${headerClasses} transform sm:-translate-y-[70px]`;
  }

  if (!isScrollingDown && scrollPosition > 70) {
    headerClasses = `${headerClasses} !fixed bg-stone-800`;
  }

  return (
    <div className={headerClasses}>
      <div className="sm:hidden pl-6 flex gap-x-6">
        <a href="/">
          <img
            src={Logo}
            className="w-12 h-auto hover:scale-105 transition"
            alt="Feuerfurz Logo"
          />
        </a>
      </div>
      <div className="flex-shrink-0 h-full">
        <MenuLink
          url="/"
          text={
            <img
              src={Logo}
              className="w-12 h-auto hover:scale-105 transition"
              alt="Feuerfurz Logo"
            />
          }
          isActive={location.pathname === "/" && !location.hash}
        />
      </div>
      <MenuLink
        url="/news"
        text="News & Blog"
        isActive={location.pathname === "/news"}
      />
      <MenuLink
        url="/historie"
        text="Historie"
        isActive={location.pathname === "/historie"}
      />
      <MenuLink
        url="/gallerie"
        text="Gallerie"
        isActive={location.pathname === "/gallerie"}
      />
      <div className="ml-auto flex items-center h-full">
        <DropdownMenu
          image={LinkIcon}
          items={dropdownMenuLinks}
          altText="Allgemeine Links"
        />
        <DropdownMenu
          image={Discord}
          items={dropdownDiscordLinks}
          altText="Discord Links"
        />
        <a
          href="https://www.instagram.com/team_germany_bb/"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={Instagram}
            className="w-5 opacity-80 hover:opacity-100 transition sm:mr-4"
            alt="Instagram"
          />
        </a>
        <div className="sm:hidden pl-6 flex gap-x-6 mr-4">
          <DropdownMenu
            icon={
              <div className="hamburger mt-1">
                <div className="hamburger-bar1"></div>
                <div className="hamburger-bar2"></div>
                <div className="hamburger-bar3"></div>
              </div>
            }
            items={dropdownMenuMobile}
            containerClasses="!right-0 !top-7"
            iconClasses="!w-10 !h-auto ml-4"
            altText="Menü"
          />
        </div>
      </div>
    </div>
  );
});

export default Menu;
