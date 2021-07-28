export function ArrowDirection(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "black",
        borderRadius: "55%",
        margin: "0 0.4rem",
      }}
      onClick={onClick}
    />
  );
}
