import { useNavigate } from "react-router";
import styles from "./index.module.scss";
import ContractorCard from "../../components/components/ContractorCard";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getContractors } from "../../features/contractor/contractorSlice";
import { useEffect } from "react";
import { navData } from "../../data/navItems";
import Spinner from "../../components/components/Spinner";
import Button from "../../components/components/Button";
import { MdArrowBack } from "react-icons/md";

const Contractor = () => {
  const { contractors, isLoading } = useAppSelector((state) => state.contractor);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getContractors());
  }, [dispatch]);

  if (isLoading) return <Spinner />;

  return (
    <div className={`${styles.container} main-container`}>
      <div className={styles.titleContainer}>
        <Button className={styles.iconContainer} onClick={() => navigate(-1)}>
          <MdArrowBack className={styles.icon} />
        </Button>
        <div className={styles.title}>{navData.find(item => item.value === "contractors").name}</div>
      </div>
      <div className={styles.contractorList}>
        {contractors?.map((contractor) => (
          <ContractorCard
            key={contractor.id}
            id={contractor.id}
            name={`${contractor.firstname} ${contractor.lastname}`}
            city={contractor.city}
            state={contractor.state}
            slug={contractor.slug}
          />
        ))}
      </div>
    </div>
  );
};

export default Contractor;
