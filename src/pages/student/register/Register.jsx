import React, { useEffect }  from 'react';
import Register from '../../../component/register/Register';
import styles from "./Register.module.scss"
import { useNavigate } from 'react-router-dom';

export default function StudentRegister() {
  const navigate = useNavigate()
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      navigate("home");
    }
  }, [navigate]);
  return (
    <div className={styles.mainContainer}>

      <Register isTeacher={false}/>
    </div>
  )
}
