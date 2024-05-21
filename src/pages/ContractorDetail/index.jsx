import React from "react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getSingleContractor,
  contractorReset,
} from "../../features/contractor/contractorSlice";
import styles from "./index.module.scss";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Spinner from "../../components/components/Spinner";

const ContractorDetail = () => {
  const { contractor, isLoading, isError } = useAppSelector(
    (state) => state.contractor
  );
  const dispatch = useAppDispatch();
  const { slug } = useParams();

  useEffect(() => {
    dispatch(getSingleContractor(slug));
    // Cleanup function to reset the component state
    return () => {
      dispatch(contractorReset());
    };
  }, [dispatch, slug]);

  if (isLoading) return <Spinner />;
  if (isError)
    return (
      <div className={styles.errorWrapper}>
        <div className={styles.errorContainer}>
          <h2 className={styles.errorTitle}>Error</h2>
          <p className={styles.errorMessage}>Error fetching Contractor data</p>
          <Link to="/contractors" className={styles.errorLink}>
            Go to Contractors Page
          </Link>
        </div>
      </div>
    );

  if (!contractor) return <div>Loading...</div>;
  const route = [
    { name: "Home", route: "/" },
    { name: "Contractors", route: "/contractors" },
    {
      name: `${contractor.firstname} ${contractor.lastname}`,
      route: `/contractors/${slug}`,
    },
  ];

  return (
    <section className={styles.section}>
      <div className={`${styles.container} main-container`}>
        <p className={styles.section_title_bottom}>
          {route?.map((item, index) => (
            <React.Fragment key={index}>
              <Link to={item.route}>{item.name}</Link>
              {index < 2 && <span>&nbsp;&gt;&nbsp;</span>}
            </React.Fragment>
          ))}
        </p>

        <div className={styles.contractorContainer}>
          <div className={styles.contractorImageContainer}>
            {contractor.projects && contractor.projects.length > 0 ? (
              contractor.projects.flatMap((project, projectIndex) =>
                project.images.map((image, imageIndex) => (
                  <img
                    key={`${projectIndex}-${imageIndex}`}
                    className={styles.image}
                    src={image.imagePath}
                    alt={`Project ${project.name}`}
                  />
                ))
              )
            ) : (
              <div className={styles.noFurnitureMessage}>
                No projects available for this contractor.
              </div>
            )}
          </div>
          <div className={styles.contractorDetailsContainer}>
            <div className={styles.nameContainer}>
              <div className={styles.name}>
                {contractor.firstname} {contractor.lastname}
              </div>
            </div>
            <div className={styles.contactContainer}>
              <div className={styles.title}>Contact:</div>
              <div className={styles.contact}>{contractor.mobile}</div>
            </div>
            <div className={styles.addressContainer}>
              <div className={styles.title}>Address:</div>
              <div className={styles.address}>
                {contractor.city}, {contractor.state} - {contractor.pincode}
              </div>
            </div>
            {contractor.projects && contractor.projects.length > 0 && (
              <div className={styles.projectsContainer}>
                <div className={styles.title}>Projects:</div>
                <div className={styles.projects}>
                  {contractor.projects.map((project, index) => (
                    <div key={index} className={styles.project}>
                      <div className={styles.projectName}>{project.name}</div>
                      <div className={styles.projectDescription}>
                        {project.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {contractor.verified ? (
              <div className={styles.verifiedContainer}>
                <div className={`${styles.verifiedLabel} ${styles.verified}`}>
                  Verified
                </div>
              </div>
            ) : (
              <div className={styles.verifiedContainer}>
                <div
                  className={`${styles.verifiedLabel} ${styles.notVerified}`}
                >
                  Not Verified
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContractorDetail;
