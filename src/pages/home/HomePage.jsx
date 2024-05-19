import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styles from './HomePage.module.scss'
import { formatTimeDifference } from '../../utils/dateUtils';
export default function HomePage() {
    const [user, setUser] = useState({})
    const navigate = useNavigate()
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("user")))
        if (!user) {
        navigate("/");
        }
    }, [navigate, user]);

    const contents = [
        "Words",
        "Friends",
        "In The Classroom",
        "Numbers",
        "Colors"
    ]
      
  return (
    <div className={styles.mainContainer}>
        <div className={styles.profile}>
            <img src='/logo.png' alt='logo'/>
            <p>{user?.fullName}</p>
            {user?.isTeacher ||
            <p>Son Giriş Tarihi: {formatTimeDifference(user?.lastLoginDate)}</p>
            }
            {user?.isTeacher &&
            <p>Öğretmen Kimliği: {user.teacherId}</p>
            }
            <button onClick={() => localStorage.removeItem("user")}>Çıkış Yap</button>
        </div>
        <div className={styles.contents}>
            <h1 className={styles.title}>Konular</h1>
            {
                contents.map(content=>(
                    <Link to={`content/${content}`}>{content}</Link>
                ))
            }
        </div>
    </div>
  )
}
