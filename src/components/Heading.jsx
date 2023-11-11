import PropTypes from "prop-types";

const Heading = ({ title, subtitle, variant }) => {
  if (variant === "with-background") {
    return (
      <div className="bg-red-600 rounded-sm px-2 py-1.5 text-white w-auto">
        {subtitle && (
          <h4 className="font-semibold uppercase tracking-widest text-sm text-zinc-200">
            {subtitle}
          </h4>
        )}
        <h2 className="text-2xl font-semibold">{title}</h2>
      </div>
    );
  }

  return (
    <>
      {subtitle && (
        <h4 className="font-semibold uppercase tracking-widest text-sm text-zinc-700 mb-1">
          {subtitle}
        </h4>
      )}
      <h2 className="text-xl sm:text-2xl font-semibold mb-5">{title}</h2>
    </>
  );
};

Heading.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  variant: PropTypes.string,
};

export default Heading;
