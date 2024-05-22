import styles from "./index.module.scss";

const ColorFilter = ({ colors, selectedColors, setSelectedColors }) => {
  const handleColorChange = (color) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter((c) => c !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };
  const uniqueColors = Array.from(new Set(colors.map((color) => color.Name)));
  return (
    <div className={styles.colorFilter}>
      <h3>Color</h3>
      <div className={styles.colorOptions}>
        {uniqueColors.map((color, index) => (
          <div
            key={index}
            className={`${styles.colorOption} ${
              selectedColors.includes(color) ? styles.selected : ""
            }`}
            onClick={() => handleColorChange(color)}
            style={{
              backgroundColor: color ? color.toLowerCase() : "transparent",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorFilter;
