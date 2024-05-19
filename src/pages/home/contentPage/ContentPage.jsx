import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './ContentPage.module.scss';
import { content } from '../../../features/course/courseService';
import { toast } from 'react-toastify';
import { formatSeconds } from '../../../utils/formatSeconds';
import { formatTimeDifference } from '../../../utils/dateUtils';

const ContentPage = () => {
  const { contentName } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [gamesWithContent, setGamesWithContent] = useState([]);
  const [studentsWithContent, setStudentsWithContent] = useState([])
  const [studentsWithHighestPoints, setStudentsWithHighestPoints] = useState([])

  console.log(studentsWithHighestPoints)
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
          navigate("/");
          return;
        }
        const data = {
          TC: user.TC
        };
        const response = await content(contentName, JSON.stringify(data));
        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.message);
        }
        setGamesWithContent(result.gamesWithContent)
        setStudentsWithContent(result.studentsWithContent)
        setStudentsWithHighestPoints(result.studentsWithHighestPoints)
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [contentName, navigate]);

  return (
    <div className={styles.contentContainer}>
      {isLoading ? (
        <div className={styles.loadingOverlay}>
          <div className={styles.loadingSpinner}></div>
        </div>
      ) : (
        <>
          <h1>{contentName}</h1>
          <div className={styles.container}>

            <div className={styles.studentsWithContentContainer}>
              <h2>Bölümü Tamamlayan Öğrenciler</h2>
                {
                  studentsWithContent?.length > 0 ?
                  studentsWithContent.map(student => (
                    <span>{student?.fullName}</span>
                  ))
                  :
                  <span>Dersi tamamlayan öğrenci bulunmamaktadır.</span>
                }
            </div>
            <div className={styles.gamesWithContentContainer}>
              <h2>Bölümün Oyun Skorları</h2>
                {
                  gamesWithContent[0]?.gameResult?.length > 0 ?
                  gamesWithContent[0]?.gameResult?.map(student => (
                    <div className={styles.gameResult}>
                      <span>{student?.fullName}</span>
                      {gamesWithContent[0]?.pointType === "Time" ?
                        <span>Süre: {formatSeconds(student.point)}</span>
                        :
                        <span>Skor: {student.point}</span>
                      }
                      <span>{formatTimeDifference(student.date)}</span>
                    </div>
                  ))
                  :
                  <span>Henüz oyunu oynayan öğrenci bulunmamaktadır.</span>
                }
            </div>
            <div className={styles.studentsWithHighestPointsContainer}>
              <h2>En Yüksek Sınav Sonuçları</h2>
                {
                  studentsWithHighestPoints?.length > 0 ?
                  studentsWithHighestPoints.map(student => (
                    <div className={styles.highestPoint}>
                      <span>{student?.fullName}</span>
                      <span>Puan: {student?.maxPoint}</span>
                      <span>{formatTimeDifference(student.date)}</span>
                    </div>
                  ))
                  :
                  <span>Henüz sınava giren öğrenci bulunmamaktadır.</span>
                }
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ContentPage;
