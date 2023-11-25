export const mapTableMemberLink = (tableData, colIndex) => {
  return [...tableData]?.map((col) => {
    let name = Object.values(col)[colIndex];
    const nameIsString = typeof name === "string";

    const formatName = (name) => {
      return name.replace("__", "👑").replace("*", "🌐");
    };

    if (nameIsString) {
      name = (
        <a
          href={`https://member.thenaf.net/index.php?module=NAF&type=coachpage&coach=${name
            .replace("__", "")
            .replace("*", "")}`}
          target="_blank"
          rel="noreferrer"
        >
          {formatName(name)}
        </a>
      );
    }

    const keyToUpdate = Object.keys(col)[colIndex];
    col[keyToUpdate] = name;
    return col;
  });
};
