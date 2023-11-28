import PropTypes from "prop-types";

const Heading = ({ title, centered, description }) => {
  if (description) {
    description = description.split("\n").map((str) => <p>{str}</p>);
    return (
      <div className="relative flex items-center gap-x-3 justify-center">
        <h2 className="text-xl sm:text-2xl mb-5 font-semibold">{title}</h2>
        <div className="group relative">
          <div className="rounded-full w-4 h-4 flex items-center justify-center text-stone-500 hover:text-stone-600 font-semibold border border-stone-500 text-xs mb-[18px] cursor-pointer hover:border-stone-600 transition">
            i
          </div>
          <div className="opacity-0 pointer-events-none group-hover:opacity-100 absolute -right-0 top-5 bg-stone-700 p-4 rounded-md text-xs text-white transition w-[200px] sm:w-[300px] z-10">
            {description}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={`${centered ? "text-center" : ""}`}>
      <h2 className="text-xl sm:text-2xl mb-5 font-semibold">{title}</h2>
    </div>
  );
};

Heading.propTypes = {
  title: PropTypes.string,
  variant: PropTypes.string,
  centered: PropTypes.bool,
};

export default Heading;
