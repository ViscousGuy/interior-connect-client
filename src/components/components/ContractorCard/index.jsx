import { Link } from "react-router-dom";
import styles from "./index.module.scss";
import { motion } from "framer-motion";

const ContractorCard = ({ id, name, city, state, slug }) => {
  return (
    <motion.div
      id={name}
      key={id}
      tabIndex={id}
      whileHover={{ cursor: "pointer" }}
      whileTap={{ cursor: "grabbing" }}
      transition={{
        ease: "easeInOut",
        duration: 0.4,
      }}
    >
      <div className={styles.contractorItem}>
        <Link to={`/contractors/${slug}`} className={styles.contractorDetailsWrapper}>
          <div className={styles.contractorDetails}>
            <div className={styles.contractorName}>{name}</div>
            <div className={styles.contractorLocation}>
              {city}, {state}
            </div>
          </div>
        </Link>
      </div>
    </motion.div>
  );
};

export default ContractorCard;
