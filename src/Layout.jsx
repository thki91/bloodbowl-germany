import { useState, useEffect } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Loader from "./components/Loader";
import Menu from "./components/Menu";
import PropTypes from "prop-types";
import { getWithExpiry } from "./helper/localStorage";

const shouldLoad = () => {
  if (!Object.keys(localStorage).length) return true;
  return Object.keys(localStorage).some((key) => {
    return !getWithExpiry(key);
  });
};

const Layout = ({ children }) => {
  const [isLoading, setIsLoading] = useState(shouldLoad());

  useEffect(() => {
    window.setTimeout(() => {
      setIsLoading(false);
    }, [1000]);
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      <Menu />
      <Header />
      <div className="px-4 sm:px-14 lg:px-20 bg-white">{children}</div>
      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
