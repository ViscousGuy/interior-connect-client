import axiosConfig from "../../app/axiosConfig";

const getFurnitures = async () => {
  const response = await axiosConfig.get("furnitures");
  return response.data;
};

const furnitureService = {
  getFurnitures,
};

export default furnitureService;
