import React from "react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getSingleFurniture,
  furnitureReset,
} from "../../features/furniture/furnitureSlice";
import styles from "./index.module.scss";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Spinner from "../../components/components/Spinner";

const FurnitureDetail = () => {
  const { furniture, isLoading, isError } = useAppSelector(
    (state) => state.furniture
  );
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeColorId, setActiveColorId] = useState(null);

  const dispatch = useAppDispatch();
  const { slug } = useParams();
  const [isLoadingFurniture, setIsLoadingFurniture] = useState(false);
  const addToCartHandler = () => {
    setIsLoadingFurniture(true);
    console.log("cart clicked");
    setIsLoadingFurniture(false);
  };
  const handleImageClick = (index) => {
    setActiveImageIndex(index);
  };

  const handleSwatchClick = (colorId) => {
    setActiveColorId(colorId);
  };

  useEffect(() => {
    dispatch(getSingleFurniture(slug));
    // Cleanup function to reset the component state
    return () => {
      dispatch(furnitureReset());
    };
  }, [slug, dispatch]);
  const route = [
    { name: "Home", route: "/" },
    { name: "Furnitures", route: "/furnitures" },
    { name: "Furniture Details", route: `/furnitures/${slug}` },
  ];
  if (isLoading) return <Spinner />;
  if (isError)
    return (
      <div className={styles.errorWrapper}>
        <div className={styles.errorContainer}>
          <h2 className={styles.errorTitle}>Error</h2>
          <p className={styles.errorMessage}>Error fetching furniture data</p>
          <Link to="/furnitures" className={styles.errorLink}>
            Go to Furnitures Page
          </Link>
        </div>
      </div>
    );

  const activeImage = furniture?.FurnitureImage?.[activeImageIndex]?.ImagePath; // Optional chaining and indexing

  return (
    <section className={styles.section}>
      <div className={`${styles.container} main-container`}>
        <p className={styles.section_title_bottom}>
          {route?.map((item, index) => (
            <React.Fragment key={index}>
              <Link to={item.route}>{item.name}</Link>
              {index < 2 && <span>&nbsp;&gt;&nbsp;</span>}
            </React.Fragment>
          ))}
        </p>
        <div className={styles.productContainer}>
          <div className={styles.productImageContainer}>
            {isLoading ? (
              <Spinner />
            ) : (
              <>
                {/* Main Image Display */}
                {activeImage && (
                  <img
                    src={activeImage}
                    className={styles.image}
                    alt={furniture?.Name}
                  />
                )}

                {/* Thumbnails (Optional) */}
                {furniture?.FurnitureImage?.length > 1 && (
                  <div className={styles.thumbnailContainer}>
                    {furniture.FurnitureImage.map((image, index) => (
                      <img
                        key={index}
                        src={image.ImagePath}
                        alt={`${furniture?.Name} - Thumbnail ${index + 1}`}
                        onClick={() => handleImageClick(index)}
                        className={`${styles.thumbnail} ${
                          index === activeImageIndex
                            ? styles.activeThumbnail
                            : ""
                        }`}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
          <div className={styles.productDetailsContainer}>
            <div className={styles.titleContainer}>
              <div className={styles.title}>{furniture.Name}</div>
              <div className={styles.subHeading}>{furniture.Description}</div>
            </div>
            {/* Contractor Section */}
            {furniture.Contractor && (
              <div className={styles.contractorSection}>
                <div className={styles.title}>Crafted by:</div>
                <Link
                  to={`/contractors/${furniture.Contractor.Slug}`}
                  className={styles.contractorName}
                >
                  {furniture.Contractor.Firstname}{" "}
                  {furniture.Contractor.Lastname}
                </Link>
              </div>
            )}

            <div className={styles.sizeContainer}>
              <div className={styles.title}>Color(s):</div>
              <div className={styles.categories}>
                <div className={styles.swatchContainer}>
                  {" "}
                  {/* Use new container */}
                  {furniture.FurnitureColor?.map((item, index) => (
                    <div
                      key={index}
                      className={`${styles.colorSwatch} ${
                        activeColorId === item.Color.Id
                          ? styles.activeSwatch
                          : ""
                      }`}
                      style={{ backgroundColor: item.Color.Name.toLowerCase() }} // Set background color
                      onClick={() => handleSwatchClick(item.Color.Id)}
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.priceContainer}>
              <div className={styles.title}>Price:</div>
              <div className={styles.price}>₹{furniture.Price}</div>
            </div>
            {/* Tags Section */}
            {furniture && furniture.FurnitureType && furniture.RoomType && (
              <div className={styles.tagsSection}>
                {/* Furniture Type Tag */}
                <div className={styles.tagGroup}>
                  <span className={styles.tagLabel}>Furniture Type:</span>
                  <div className={`${styles.tag} ${styles.tagFurnitureType}`}>
                    {furniture.FurnitureType.Name}
                  </div>
                </div>

                {/* Room Type Tag */}
                <div className={styles.tagGroup}>
                  <span className={styles.tagLabel}>Room Type:</span>
                  <div className={`${styles.tag} ${styles.tagRoomType}`}>
                    {furniture.RoomType.Name}
                  </div>
                </div>
              </div>
            )}

            <div className={styles.addToCartContainer}>
              <div
                className={styles.addToCart}
                onClick={() => addToCartHandler()}
              >
                {isLoadingFurniture ? (
                  <Spinner className={"addToCartSm"} />
                ) : (
                  "Buy Now"
                )}
              </div>
              <Link to={`/furnitures`} className={styles.continueShopping}>
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FurnitureDetail;
