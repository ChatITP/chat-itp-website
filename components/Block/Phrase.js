export const Phrase = ({ color, children, editing, isSelected, onClick }) => {
  if (editing) {
    if (isSelected) {
      return (
        <span
          onClick={onClick}
          style={{ backgroundColor: color }}
          className="font-medium text-black rounded-md px-2 -mr-2 py-1"
        >
          &nbsp;editing{" "}
        </span>
      );
    } else {
      return (
        <span
          onClick={onClick}
          style={{ backgroundColor: color }}
          className="font-medium text-black rounded-md px-2 -mr-2 py-1"
        >
          &nbsp;{children}{" "}
        </span>
      );
    }
  } else {
    return (
      <span
        onClick={onClick}
        style={{ backgroundColor: color }}
        className="font-medium text-black rounded-md px-2 -mr-2 py-1"
      >
        &nbsp;{children}{" "}
      </span>
    );
  }
};
