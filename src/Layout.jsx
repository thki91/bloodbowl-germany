import Header from './components/Header'
import Menu from './components/Menu'
import PropTypes from 'prop-types';

const Layout = ({children}) =>{
  return (
    <>
      <Menu />
      <Header />
      <div className="p-10 max-w-[1400px] mx-auto mb-10">
        {children}
      </div>
    </>
  )
}

Layout.propTypes ={
    children: PropTypes.node
}

export default Layout
