export default function Star(props) {
  // 来自父文件的 isfilled
  const starIcon = props.isFilled ? "star-filled.png" : "star-empty.png";
  return (
    <img
      src={`../images/${starIcon}`}
      className="card--favorite"
      onClick={props.handleClick} // 来自父文件的function
    />
  );
}
