// pages/category/details/detailsCategory.tsx

import { useRouter } from "next/router";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./detailsCategory.module.css";

const DetailsCategory = (props: { id: any }) => {
  const { id } = props;
  const router = useRouter();
  const [data, setData] = useState<any>({});

  // Statik veriler
  const staticData = {
    website: "wwww.com",
    phone: "65462476452",
    degree: "Test Degree",
    name: "Test name",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/category/${id}`);
        setData(response.data[0]);
      } catch (error) {
        console.error("Kategori alınırken bir hata oluştu:", error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  return (
    <div className={styles.container}>
      {data.image && (
        <div className={styles.imageContainer}>
          <img className={styles.image} src={data.image} alt="Afiş" />
          <div className={styles.textContainer}>
            {data.logo && (
              <div style={{ marginRight: 10 }}>
                <img src={data.logo} alt="Logo" height={120} width={120} />
              </div>
            )} 
            <div>

            <div  style={{ display: "flex", flexDirection: "row" }}>
              <p className={styles.center}> {staticData.website}</p>
              <p className={styles.center1}> {staticData.phone}</p>
            </div>
            </div>
            
            <div >
              <div>
              <svg className={styles.cizgi} width="50%" height="2">
                <line x1="0" y1="3" x2="100%" y2="0" stroke="white" strokeWidth="2" />
              </svg>
                <p className={styles.right}> {staticData.degree}</p>
                <svg className={styles.cizgi1} width="50%" height="2">
                <line x1="0" y1="0" x2="100%" y2="20" stroke="white" strokeWidth="2" />
              </svg>
                <p className={styles.right1}> {staticData.name}</p>
              </div>
              
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
};

export const getServerSideProps = async (context: any) => {
  const { id } = context.query;

  return {
    props: {
      id,
    },
  };
};

export default DetailsCategory;
