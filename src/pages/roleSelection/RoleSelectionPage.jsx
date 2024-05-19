import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons';
import styles from './RoleSelectionPage.module.scss'; 
import { Link, useNavigate } from 'react-router-dom';

export default function RoleSelectionPage() {
  const navigate = useNavigate()
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      navigate(`/home`);
    }
  }, [navigate]);
  return (
    <div className={styles.mainContainer}>
        <div className={styles.container}>
            <h1>English Education - VR</h1>
            <div className={styles.buttonContainer}>
                <Link to="/student/login" className={styles.button}>
                <FontAwesomeIcon icon={faUser} className={styles.icon}/>
                Öğrenci Girişi
                </Link>
                <Link to='/teacher/login' className={styles.button}>
                <FontAwesomeIcon icon={faChalkboardTeacher} className={styles.icon}/>
                Öğretmen Girişi
                </Link>
            </div>
        </div>
      
    </div>
  );
}
