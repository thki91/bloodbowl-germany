export const mapTableMemberLink = (tableData, colIndex) => {
  return tableData?.map((col) => {
    let name = Object.values(col)[colIndex];

    const formatName = (name, replacer = "") => {
      if (typeof name === "string") {
        return name.replace("__", replacer);
      }
      return name;
    };

    name = (
      <a
        href={`https://member.thenaf.net/index.php?module=NAF&type=coachpage&coach=${formatName(
          name
        )}`}
        target="_blank"
        rel="noreferrer"
      >
        {formatName(name, "👑")}
      </a>
    );
    const keyToUpdate = Object.keys(col)[colIndex];
    col[keyToUpdate] = name;
    return col;
  });
};
