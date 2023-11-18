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
        <ul className="bg-zinc-700 divide-y divide-zinc-600 rounded-lg shadow overflow-hidden">
          {items.map((item) => (
            <li key={item.link}>
              <a
                href={item.link}
                target={item.link.startsWith("http") ? "_blank" : "_self"}
                rel="noreferrer"
                className="block px-4 py-2 hover:bg-zinc-600 transition text-xs text-zinc-200 hover:text-zinc-100 whitespace-nowrap"
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
