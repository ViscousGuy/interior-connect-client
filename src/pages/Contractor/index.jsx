import { useNavigate } from "react-router";
import styles from "./index.module.scss";
import ContractorCard from "../../components/components/ContractorCard";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getContractors } from "../../features/contractor/contractorSlice";
import { useEffect, useState } from "react";
import { navData } from "../../data/navItems";
import Spinner from "../../components/components/Spinner";
import Button from "../../components/components/Button";
import { MdArrowBack } from "react-icons/md";
import { BiSearch } from "react-icons/bi";

const Contractor = () => {
  const { contractors, isLoading } = useAppSelector(
    (state) => state.contractor
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredContractors, setFilteredContractors] = useState([]);

  useEffect(() => {
    dispatch(getContractors());
  }, [dispatch]);

  useEffect(() => {
    const filterContractors = () => {
      const filtered = contractors.filter(
        (contractor) =>
          contractor.firstname
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          contractor.lastname
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          contractor.pincode.includes(searchQuery) ||
          `${contractor.firstname.toLowerCase()} ${contractor.lastname.toLowerCase()}`.includes(
            searchQuery.toLowerCase()
          )
      );
      setFilteredContractors(filtered);
    };

    filterContractors();
  }, [searchQuery, contractors]);

  if (isLoading) return <Spinner />;

  return (
    <div className={`${styles.container} main-container`}>
      <div className={styles.titleContainer}>
        <Button className={styles.iconContainer} onClick={() => navigate(-1)}>
          <MdArrowBack className={styles.icon} />
        </Button>
        <div className={styles.title}>
          {navData.find((item) => item.value === "contractors").name}
        </div>
      </div>
      <div className={styles.searchContainer}>
        <BiSearch className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search Contractors by name or pincode"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
      </div>
      <div className={styles.contractorList}>
        {filteredContractors.map((contractor) => (
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
