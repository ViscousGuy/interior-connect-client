import { useNavigate } from "react-router";
import styles from "./index.module.scss";
import ContractorCard from "../../components/components/ContractorCard";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  contractorReset,
  getContractors,
} from "../../features/contractor/contractorSlice";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { navData } from "../../data/navItems";
import Spinner from "../../components/components/Spinner";
import Button from "../../components/components/Button";
import { MdArrowBack } from "react-icons/md";
import { BiSearch } from "react-icons/bi";
import VerificationFilter from "../../components/components/VerificationFilter";

const Contractor = () => {
  const { contractors, isLoading, isError } = useAppSelector(
    (state) => state.contractor
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredContractors, setFilteredContractors] = useState([]);
  const [filterVerified, setFilterVerified] = useState(null);

  const resetFilters = () => {
    setSearchQuery("");
    setFilterVerified(null);
    setFilteredContractors(contractors);
  };

  useEffect(() => {
    dispatch(getContractors());
    // Cleanup function to reset the component state
    return () => {
      dispatch(contractorReset());
    };
  }, [dispatch]);

  useEffect(() => {
    const filterContractors = () => {
      let filtered = contractors.filter(
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

      if (filterVerified !== null) {
        filtered = filtered.filter(
          (contractor) => contractor.verified === filterVerified
        );
      }

      setFilteredContractors(filtered);
    };

    filterContractors();
  }, [searchQuery, contractors, filterVerified]);

  if (isLoading) return <Spinner />;
  if (isError)
    return (
      <div className={styles.errorWrapper}>
        <div className={styles.errorContainer}>
          <h2 className={styles.errorTitle}>Error</h2>
          <p className={styles.errorMessage}>Error fetching Contractors data</p>
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

      <div className={styles.mainContent}>
        <div className={styles.sidebar}>
          <div className={styles.filterLabel}>Filter(s)</div>
          <VerificationFilter setFilterVerified={setFilterVerified} />
          <div className={styles.resetFilter} onClick={resetFilters}>
            Reset
          </div>
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
    </div>
  );
};

export default Contractor;
