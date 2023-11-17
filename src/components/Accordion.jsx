import { useState } from "react";
import ArrowDownIcon from "./ArrowDownIcon";

const Accordion = ({ title, description, children, isLastItem }) => {
  const [isExpanded, setIsExpanded] = useState();
  return (
    <>
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className={`text-sm sm:text-base font-semibold cursor-pointer flex justify-between items-center -mt-[1px] ${
          children
            ? "bg-stone-300 rounded-md p-2.5"
            : "border-b-stone-200 text-red-600 border-b px-3 py-2.5"
        }`}
      >
        {title}
        <div className={children ? "" : "text-red-600"}>
          {isExpanded ? (
            <ArrowDownIcon className="transform rotate-180 transition-transform origin-center" />
          ) : (
            <ArrowDownIcon />
          )}
        </div>
      </div>
      <div
        className={`bg-stone-100 transition-[max-height] rounded-md ${
          isExpanded ? "max-h-[99%]" : "!max-h-0 overflow-hidden"
        } ${isLastItem && isExpanded ? "pb-2" : "pb-0"}`}
      >
        {description && (
          <div
            dangerouslySetInnerHTML={{ __html: description }}
            className="text-sm md:text-base wrapper-list-decimal p-2.5 pb-0"
          />
        )}

        {children && children}
      </div>
    </>
  );
};

export default Accordion;
