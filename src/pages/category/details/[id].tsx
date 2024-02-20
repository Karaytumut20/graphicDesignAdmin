import { useRouter } from "next/router";
import axios from "axios";
import React, { useEffect, useState } from "react";

const testData = {
  website: "Test Title",
  phone: "65462476452",
  degree: "Test Degree",
  name: "Test name",
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
          <img src={data.image} alt="Afiş" height={850} width={650} style={{ display: "block", margin: "0 auto" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, zIndex: 100, padding: "10px", display: "flex", alignItems: "center", justifyContent:'space-between' }}>
            {data.logo && (
              <img src={data.logo} alt="Logo" height={120} width={120} />
            )}
            <div>
              <h4>{testData.website}</h4>
              <p style={{color:data.font_color}}>{testData.phone}</p>
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
