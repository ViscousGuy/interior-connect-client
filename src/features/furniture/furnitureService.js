import axiosConfig from "../../app/axiosConfig";

const getFurnitures = async () => {
  const response = await axiosConfig.get("furnitures");
  return response.data;
};

const getSingleFurniture = async (slug) => {
  const response = await axiosConfig.get("furnitures/" + slug);

  return response.data;
};


const furnitureService = {
  getFurnitures,
  getSingleFurniture
};

export default furnitureService;
