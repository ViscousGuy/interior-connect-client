import axiosConfig from "../../app/axiosConfig";

const getFurnitures = async (page = 1, limit = 10) => {
  const response = await axiosConfig.get(
    `furnitures?page=${page}&limit=${limit}`
  );
  return response.data;
};

const getSingleFurniture = async (slug) => {
  const response = await axiosConfig.get("furnitures/" + slug);

  return response.data;
};

const furnitureService = {
  getFurnitures,
  getSingleFurniture,
};

export default furnitureService;
