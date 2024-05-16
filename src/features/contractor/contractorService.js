import axiosConfig from "../../app/axiosConfig";

const getContractors = async () => {
  const response = await axiosConfig.get("contractors");
  return response.data;
};

const getSingleContractor = async (slug) => {
  const response = await axiosConfig.get("contractors/" + slug);

  return response.data;
};


const contractorService = {
    getContractors,
    getSingleContractor
};

export default contractorService;
