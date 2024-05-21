import { useNavigate, useParams } from "react-router";
import styles from "./index.module.scss";
import FurnitureCard from "../../components/components/FurnitureCard";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getFurnitures,
  furnitureReset,
} from "../../features/furniture/furnitureSlice";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { navData } from "../../data/navItems";
import Spinner from "../../components/components/Spinner";
// import GoToTop from "../../components/components/GoToTop";
import Button from "../../components/components/Button";
import ColorFilter from "../../components/components/ColorFilter";
import { MdArrowBack } from "react-icons/md";
import { BiSearch } from "react-icons/bi";

const Furniture = () => {
  const { furnitures, isLoading, isError } = useAppSelector(
    (state) => state.furniture
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFurniture, setFilteredFurniture] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedColors, setSelectedColors] = useState([]);

  const sortByPrice = (furnitures, order) => {
    return furnitures.sort((a, b) => {
      if (order === "asc") {
        return a.Price - b.Price;
      } else {
        return b.Price - a.Price;
      }
    });
  };

  const filterByColors = (furnitures, colors) => {
    if (colors.length === 0) {
      return furnitures;
    }

    return furnitures.filter((furniture) => {
      const furnitureColors = furniture.FurnitureColor.map(
        (color) => color.Color.Name
      );
      return colors.every((color) => furnitureColors.includes(color));
    });
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSortOrder("asc");
    setSelectedColors([]);
    setFilteredFurniture(furnitures);
  };

  useEffect(() => {
    dispatch(getFurnitures());
    // Cleanup function to reset the component state
    return () => {
      dispatch(furnitureReset());
    };
  }, [dispatch]);
  useEffect(() => {
    const filterFurniture = () => {
      let filtered = furnitures.filter((furniture) =>
        furniture.Name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      filtered = sortByPrice(filtered, sortOrder);
      filtered = filterByColors(filtered, selectedColors);
      setFilteredFurniture(filtered);
    };

    filterFurniture();
  }, [searchQuery, furnitures, sortOrder, selectedColors]);

  const colors = Array.from(
    new Set(
      furnitures.flatMap((furniture) =>
        furniture.FurnitureColor.map((color) => color.Color)
      )
    )
  ).map((color) => color);

  if (isLoading) return <Spinner />;
  if (isError)
    return (
      <div className={styles.errorWrapper}>
        <div className={styles.errorContainer}>
          <h2 className={styles.errorTitle}>Error</h2>
          <p className={styles.errorMessage}>Error fetching Furnitures data</p>
          <Link to="/" className={styles.errorLink}>
            Go to Home Page
          </Link>
        </div>
      </div>
    );

  return (
    <div className={`${styles.container} main-container`}>
      <div className={styles.titleContainer}>
        <Button className={styles.iconContainer} onClick={() => navigate(-1)}>
          <MdArrowBack className={styles.icon} />
        </Button>
        <div className={styles.title}>
          {navData.find((item) => item.value === "furnitures").name}
        </div>
      </div>
      <div className={styles.searchContainer}>
        <BiSearch className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search Furniture by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
      </div>
      <div className={styles.mainContent}>
        <div className={styles.sidebar}>
          <div className={styles.filterLabel}>Filter(s)</div>
          <div className={styles.sortContainer}>
            <label>Price:</label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="asc">Low</option>
              <option value="desc">High</option>
            </select>
          </div>
          <ColorFilter
            colors={colors}
            selectedColors={selectedColors}
            setSelectedColors={setSelectedColors}
          />
          <div className={styles.resetFilter} onClick={resetFilters}>
            Reset
          </div>
        </div>

        <div className={styles.productList}>
          {filteredFurniture?.map((furniture) => {
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
      </div>
      {/* <GoToTop /> */}
    </div>
  );
};

export default Furniture;
