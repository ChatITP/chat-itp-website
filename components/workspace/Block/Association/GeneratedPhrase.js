const GeneratedPhrase = ({ color, children, onClick }) => {
  return (
    <span
      onClick={onClick}
      style={{
        backgroundColor: color,
      }}
      className="relative font-medium text-black rounded-md px-2 py-1 break-words cursor-pointer"
    >
      {children}
    </span>
  );
};

export default GeneratedPhrase;
