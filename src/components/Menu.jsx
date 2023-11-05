
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import Instagram from '/public/instagram.png'

const MenuLink = ({text, url, isActive}) => {
    let menuLinkClasses = "mr-2 px-5 py-5 text-slate-400 hover:bg-slate-700 block transition hover:text-slate-200"
    if (isActive) {
        menuLinkClasses = `${menuLinkClasses} bg-gradient-to-t from-slate-700 from-0% via-50% to-transparent text-white`
    }
    return  <a href={url} className={menuLinkClasses}>{text}</a>
}

MenuLink.propTypes = {
    text: PropTypes.string,
    url: PropTypes.string,
    isActive: PropTypes.bool
};


const Menu = () => {
    const location = useLocation()
    return <div className="bg-slate-800 px-5 flex items-center">
        <MenuLink url="/" text="Home" isActive={location.pathname === '/'} />
        <MenuLink url="/team" text="Team" isActive={location.pathname === '/team'} />
        <MenuLink url="/historie" text="Historie" isActive={location.pathname === '/historie'} />
        <MenuLink url="/ranking" text="Ranking" isActive={location.pathname === '/ranking'} />
        <div className="ml-auto">
            <a href="https://www.instagram.com/team_germany_bb/" target="_blank" rel="noreferrer">
                <img src={Instagram} className='w-6 opacity-80 hover:opacity-100 transition' />
            </a>
        </div>
    </div>
}

export default Menu