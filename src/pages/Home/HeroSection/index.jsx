import styles from "./index.module.scss";
import Button from "../../../components/components/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

const HeroSection = () => {
  const images = [
    "https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg",
  ];

  return (
    <section className={styles.section}>
      <div className={`${styles.container} main-container`}>
        <div className={styles.content_wrapper}>
          <header className={styles.header}>
            <h1 className={styles.title} style={{ fontWeight: 1000 }}>
              Connecting you
            </h1>
            <h1 className={styles.title} style={{ fontWeight: 1000 }}>
              to your perfect furniture.
            </h1>
          </header>
          <div className={styles.buttons_wrapper}>
            <Button to="/" className={styles.button}>
              Buy Now
            </Button>
          </div>
          <Swiper
            pagination={{
              dynamicBullets: true,
            }}
            modules={[Pagination, Autoplay]}
            autoplay={{ delay: 3000 }}
            className={styles.image}
          >
            {images.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <img src={item} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
