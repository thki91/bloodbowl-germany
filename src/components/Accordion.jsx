import { useState } from "react";
import ArrowDownIcon from "./ArrowDownIcon";

const Accordion = ({ title, description, isLastItem }) => {
  const [isExpanded, setIsExpanded] = useState();
  return (
    <>
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className={`text-sm md:text-base font-semibold cursor-pointer flex justify-between items-center -mt-[1px] bg-stone-300 rounded-md p-2.5 ${
          isExpanded ? " rounded-b-none" : ""
        }`}
      >
        {title}
        <div>
          {isExpanded ? (
            <ArrowDownIcon className="transform rotate-180 transition-transform origin-center" />
          ) : (
            <ArrowDownIcon />
          )}
        </div>
      </div>
      <div
        className={`bg-stone-300 transition-[max-height] rounded-b-md ${
          isExpanded ? "max-h-[99%]" : "!max-h-0 overflow-hidden"
        }`}
      >
        {description && (
          <div
            dangerouslySetInnerHTML={{ __html: description }}
            className="text-sm md:text-base wrapper-list-decimal p-2.5 pb-1"
          />
        )}
      </div>
    </>
  );
};

export default Accordion;
