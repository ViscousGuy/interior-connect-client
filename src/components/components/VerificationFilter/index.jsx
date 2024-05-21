import styles from "./index.module.scss";

const VerificationFilter = ({ setFilterVerified }) => {
  const handleVerificationChange = (verified) => {
    setFilterVerified(verified);
  };

  return (
    <div className={styles.verificationFilter}>
      <h3>Verification</h3>
      <div className={styles.verificationOptions}>
        <div
          className={styles.verificationOption}
          onClick={() => handleVerificationChange(true)}
        >
          Verified
        </div>
        <div
          className={styles.verificationOption}
          onClick={() => handleVerificationChange(false)}
        >
          Not Verified
        </div>
      </div>
    </div>
  );
};

export default VerificationFilter;
