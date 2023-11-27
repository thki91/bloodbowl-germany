import PropTypes from "prop-types";

const Heading = ({ title, subtitle, centered }) => {
  return (
    <div className={`${centered ? "text-center" : ""}`}>
      {subtitle && (
        <h4 className="font-semibold uppercase tracking-widest text-sm text-stone-700 mb-1">
          {subtitle}
        </h4>
      )}
      <h2 className="text-xl sm:text-2xl mb-5 font-semibold">{title}</h2>
    </div>
  );
};

Heading.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  variant: PropTypes.string,
};

export default Heading;
