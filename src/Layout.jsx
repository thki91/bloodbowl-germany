import Footer from "./components/Footer";
import Header from "./components/Header";
import Menu from "./components/Menu";
import PropTypes from "prop-types";

const Layout = ({ children }) => {
  return (
    <>
      <Menu />
      <Header />
      <div className="px-4 sm:px-10 mx-auto min-h-[40vh]">{children}</div>
      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
