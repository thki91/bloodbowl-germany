const DropdownMenu = ({
  image,
  icon,
  items,
  containerClasses,
  iconClasses,
}) => {
  let dropdownContainerClasses = `z-10 opacity-0 group-hover:opacity-100 pointer-events-none min-w-[100px] group-hover:pointer-events-auto transition absolute top-4 pt-3 right-4 ${containerClasses}`;
  return (
    <div className="relative group cursor-pointer">
      {image && (
        <img
          src={image}
          className={`w-6 opacity-80 hover:opacity-100 transition mr-6 ${iconClasses}`}
        />
      )}
      {icon && icon}
      <div className={dropdownContainerClasses}>
        <ul className="bg-stone-700 divide-y divide-stone-600 rounded-lg shadow overflow-hidden !list-none pl-0 bg-opacity-100">
          {items.map((item) => (
            <li key={item.link}>
              <a
                href={item.link}
                target={item.link.startsWith("http") ? "_blank" : "_self"}
                rel="noreferrer"
                className="block px-7 md:px-5 py-3 md:py-2.5 hover:bg-stone-600 transition text-sm text-stone-200 hover:text-stone-100 whitespace-nowrap"
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DropdownMenu;
