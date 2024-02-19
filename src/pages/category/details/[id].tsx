import { useRouter } from "next/router";
import axios from "axios";
import React, { useEffect, useState } from "react";

const testData = {
  website: "www.test.com",
  phone: "05462476452",
  degree: "Birleşmiş milletler başkanı",
  name: "umut karaytu",
};

const DetailsCategory = (props: { id: any }) => {
  const { id } = props;
  const router = useRouter();
  const [data, setData] = useState<any>({});

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
    <div style={{ position: "relative", textAlign: "center" }}>
      {data.image && (
        <div style={{ position: "relative", display: "inline-block" }}>
          <img
            src={data.image}
            alt="Afiş"
            height={850}
            width={650}
            style={{ display: "block", margin: "0 auto" }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              zIndex: 100,
              padding: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >

              <div style={{ textAlign: "left" }}>
                <p style={{ margin: "0", color: "white" }}>
                  {testData.website}
                </p>
                <p style={{ margin: "0", color: "white" }}>
                  {testData.phone}
                </p>
                
              </div>
              
              

             
              <svg
                width="50%"
                height="2"
                style={{ flex: "1", minWidth: "50px", marginLeft: "10px" }}
              >
                <line
                  x1="0"
                  y1="1"
                  x2="100%"
                  y2="1"
                  stroke="white"
                  strokeWidth="2"
                />
              </svg>
              <div style={{ color: "white", textAlign: "right" }}>
                <p style={{ margin: "0" }}>{testData.degree}</p>
                <p style={{ margin: "0" }}>{testData.name}</p>
              </div>
              
              <svg
                width="10%"
                height="2"
                style={{ flex: "1", minWidth: "50px", marginLeft: "10px" }}
              >
                <line
                  x1="0"
                  y1="1"
                  x2="10%"
                  y2="1"
                  stroke="white"
                  strokeWidth="2"
                />
              </svg>
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
