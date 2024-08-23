const GeneratedPhrase = ({ color, children, onClick }) => {
  return (
    <span
      onClick={onClick}
      style={{
        backgroundColor: color,
      }}
      className="relative font-[600] text-sm text-black rounded-md px-2 break-words cursor-pointer"
    >
      {children}
    </span>
  );
};

export default GeneratedPhrase;
