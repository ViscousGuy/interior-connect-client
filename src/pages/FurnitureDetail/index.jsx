import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getSingleFurniture } from "../../features/furniture/furnitureSlice";
import styles from "./index.module.scss";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Spinner from "../../components/components/Spinner";

const FurnitureDetail = () => {
  const { furniture, isLoading } = useAppSelector((state) => state.furniture);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

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

  useEffect(() => {
    dispatch(getSingleFurniture(slug));
  }, []);
  const route = [
    { name: "Home", route: "/" },
    { name: "Furnitures", route: "/furnitures" },
    { name: "Furniture Details", route: `/furnitures/${slug}` },
  ];
  if (isLoading) return <Spinner />;
  const activeImage = furniture?.FurnitureImage?.[activeImageIndex]?.ImagePath; // Optional chaining and indexing

  return (
    <section className={styles.section}>
      <div className={`${styles.container} main-container`}>
        <p className={styles.section_title_bottom}>
          {route?.map((item, index) => {
            return (
              <Link to={item.route}>
                {item.name}
                {index < 2 && <span>&nbsp;&gt;&nbsp;</span>}
              </Link>
            );
          })}
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
            <div className={styles.sizeContainer}>
              <div className={styles.title}>Color(s):</div>
              <div className={styles.categories}>
                <div className={styles.buttonContainer}>
                  {furniture.FurnitureColor?.map((item) => {
                    return (
                      <div className={styles.button}>
                        <input type="radio" id={item} name="color" />
                        <label className="btn btn-default" htmlFor={item}>
                          {item.Name}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className={styles.priceContainer}>
              <div className={styles.title}>Price:</div>
              <div className={styles.price}>₹{furniture.Price}</div>
            </div>
            <div className={styles.addToCartContainer}>
              <div
                className={styles.addToCart}
                onClick={() => addToCartHandler()}
              >
                {isLoadingFurniture ? (
                  <Spinner className={"addToCartSm"} />
                ) : (
                  "Add to Cart"
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
