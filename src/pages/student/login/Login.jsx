import React, { useEffect } from 'react';
import styles from './Login.module.scss';
import Login from '../../../component/login/Login';
import { useNavigate } from 'react-router-dom';
export default function StudentLogin() {
  const navigate = useNavigate()
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      navigate(`/home`);
    }
  }, [navigate]);
  return (
    <div className={styles.mainContainer}>
      <Login role={0}/>
    </div>
  );
}
