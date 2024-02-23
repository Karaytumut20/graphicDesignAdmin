import { useRouter } from "next/router";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import styles from "./detailsCategory.module.css";
import { Rnd } from 'react-rnd';
import html2canvas from 'html2canvas';

const DetailsCategory = (props: { id: any }) => {
  const { id } = props;
  const router = useRouter();
  const [data, setData] = useState<any>({});
  const [draggableText, setDraggableText] = useState('Merhaba Dünya!');
  const [rndData, setRndData] = useState({ x: 0, y: 0, width: 320, height: 200 });
  const screenshotRef = useRef(null); // ekran görüntüsünü almak istediğiniz bölüm için yeni bir ref

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

  const handleDragStop = (e: any, d: any) => {
    setRndData({ ...rndData, x: d.x, y: d.y });
  };

  const handleResizeStop = (e: any, direction: any, ref: any, delta: any, position: any) => {
    setRndData({
      ...rndData,
      width: ref.style.width,
      height: ref.style.height,
      ...position,
    });
  };

  const handleDownloadContainer = async () => {
    const screenshotElement = screenshotRef.current;
    const canvas = await html2canvas(screenshotElement, { 
      width: screenshotElement.offsetWidth, 
      height: screenshotElement.offsetHeight,
      allowTaint: true,
      useCORS: true
    });
    const imgURL = canvas.toDataURL("image/png");
    const link = document.createElement('a');
    link.href = imgURL;
    link.download = 'screenshot.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={styles.container}>
      <div ref={screenshotRef}> {/* ekran görüntüsünü almak istediğiniz bölüm */}
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
              <div>
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
        <div>
          <Rnd
            size={{ width: rndData.width, height: rndData.height }}
            position={{ x: rndData.x, y: rndData.y }}
            onDragStop={handleDragStop}
            onResizeStop={handleResizeStop}
          >
            <p>{draggableText}</p>
          </Rnd>
        </div>
      </div>
      <button onClick={handleDownloadContainer}>Ekran Görüntüsünü İndir</button>
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
