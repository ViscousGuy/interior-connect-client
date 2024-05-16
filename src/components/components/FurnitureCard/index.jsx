import { useState } from "react";
import styles from "./index.module.scss";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAppDispatch } from "../../../app/hooks";
import { CgShoppingBag } from "react-icons/cg";
import Button from "../Button";
import Spinner from "../Spinner";
const FurnitureCard = ({ id, title, price, description, image, slug }) => {
  const dispatch = useAppDispatch();
  const [isLoadingFurniture, setIsLoadingFurniture] = useState(false);
  const addToCartHandler = () => {
    setIsLoadingFurniture(true);
    console.log("add to cart");
    setIsLoadingFurniture(false);
  };

  return (
    <motion.div
      id={title}
      key={id}
      tabIndex={id}
      whileHover={{ cursor: "pointer" }}
      whileTap={{ cursor: "grabbing" }}
      transition={{
        ease: "easeInOut",
        duration: 0.4,
      }}
    >
      <div className={styles.productItem}>
        <div className={styles.productPic}>
          <Link to={`/furnitures/${slug}`}>
            <img src={image} alt={title} />
          </Link>
        </div>
      </div>
      <div className={styles.productDetailsContainer}>
        <Link
          to={`/furnitures/${slug}`}
          className={styles.productDetailsWrapper}
        >
          <div className={styles.productDetails}>
            <div className={styles.productTitle}>
              <div>{title}</div>
            </div>
            <div style={{ fontWeight: "500" }} className={styles.productTitle}>
              {description.slice(0, -1)}
            </div>
            <div className={styles.productPrice}>₹{price}</div>
          </div>
        </Link>
        <motion.div
          key={id}
          whileHover={{ zoom: 1.2 }}
          style={{ height: "100%" }}
          onClick={() => addToCartHandler()}
        >
          <Button className={styles.iconCcontainer}>
            {isLoadingFurniture && <Spinner className={"addToCart"} />}
            <CgShoppingBag
              className={`${styles.icon} ${
                isLoadingFurniture && styles.loadingIcon
              }`}
            />
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FurnitureCard;
