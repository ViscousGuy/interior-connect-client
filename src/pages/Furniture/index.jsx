import { useNavigate, useParams } from "react-router";
import styles from "./index.module.scss";
import FurnitureCard from "../../components/components/FurnitureCard";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getFurnitures } from "../../features/furniture/furnitureSlice";
import { useEffect, useState } from "react";
import { navData } from "../../data/navItems";
import Spinner from "../../components/components/Spinner";
// import GoToTop from "../../components/components/GoToTop";
import Button from "../../components/components/Button";
import { MdArrowBack } from "react-icons/md";

const Furniture = () => {
  const { furnitures, isLoading } = useAppSelector((state) => state.furniture);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getFurnitures());
  }, []);
  if (isLoading) return <Spinner />;
  return (
    <div className={`${styles.container} main-container`}>
      <div className={styles.titleContainer}>
        <Button className={styles.iconContainer} onClick={() => navigate(-1)}>
          <MdArrowBack className={styles.icon} />
        </Button>
        <div className={styles.title}>{navData.find(item => item.value === "furnitures").name}</div>
      </div>
      <div className={styles.productList}>
        {furnitures?.map((furniture) => {
          return (
            <FurnitureCard
              key={furniture.Id}
              id={furniture.Id}
              title={furniture.Name}
              price={furniture.Price}
              description={furniture.Description}
              image={furniture.FurnitureImage[0].ImagePath}
              slug={furniture.Slug}
            />
          );
        })}
      </div>
      {/* <GoToTop /> */}
    </div>
  );
};

export default Furniture;
