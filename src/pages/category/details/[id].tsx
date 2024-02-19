import {useRouter} from "next/router";
import axios from "axios";
import React, {useEffect, useState} from "react";


const testData = {
  website: "Test Title",
  phone: "65462476452",
  degree: "Test Degree",
  name: "Test name",
}
const DetailsCategory = (props: { id: any }) => {
  const {id} = props;
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

  function formatDate(dateString: any) {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return dateString; // Geçersiz bir tarihse orijinal dizgiyi döndür
    }
    const year = date.getFullYear();
    const month = (1 + date.getMonth()).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  return (
    <div style={{ position: "relative" }}>
      <img src={data.image} alt="Afiş" height={850} width={650} style={{ display: "block", margin: "0 auto" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, zIndex: 100 }}>
        {data.logo && (
          <img src={data.logo} alt="Logo" height={140} width={140} />
        )}
        <div>
          <p>{testData.name}</p>
          <p>{testData.degree}</p>
        </div>
      </div>
      <div style={{ position: "absolute", bottom: "20px", textAlign: "center", width: "100%", zIndex: 100 }}>
        <p>Website: {testData.website}</p>
        <p>Phone: {testData.phone}</p>
      </div>
    </div>
  );
};

export const getServerSideProps = async (context: any) => {
  const {id} = context.query;

  return {
    props: {
      id,
    },
  };
};

export default DetailsCategory;
