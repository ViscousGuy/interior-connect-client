import styles from "./index.module.scss";

const ColorFilter = ({ colors, selectedColors, setSelectedColors }) => {
  const handleColorChange = (color) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter((c) => c !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };

  return (
    <div className={styles.colorFilter}>
      <h3>Color</h3>
      <div className={styles.colorOptions}>
        {colors.map((color) => (
          <div
            key={color.Id}
            className={`${styles.colorOption} ${
              selectedColors.includes(color.Name) ? styles.selected : ""
            }`}
            onClick={() => handleColorChange(color.Name)}
            style={{ backgroundColor: color.Name.toLowerCase() }}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorFilter;
