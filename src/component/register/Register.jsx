import React, { useState } from 'react';
import styles from './Register.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register } from '../../features/auth/authService';

export default function Register({isTeacher}) {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    TC: 0,
    password: '',
    email: '',
    passwordAgain: '',
    teacherId: '',
    isTeacher
  });

  const [isLoading, setIsLoading] = useState(false)


  const { password, passwordAgain, teacherId, name, surname, TC, email } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const navigate = useNavigate();
  const onSubmit = async(e) => {
    e.preventDefault();
    if(password !== passwordAgain){
      toast.error("Şifreler eşleşmiyor.")
      return;
    }
    const userData = {
      password,
      teacherId,
      email,
      TC,
      fullName: name+" "+surname,
      isTeacher
    };
    try {
      setIsLoading(true)
      const response = await register(JSON.stringify(userData));
      const result = await response.json()
      if (!response.ok) {
          throw new Error(result.message);
      }
      toast.success(result.message)
      navigate(isTeacher ? "/teacher/login" : "/student/login")
    } catch (error) {
      toast.error(error.message);
    }
    setIsLoading(false)
    
  };

  

  return (
      <div className={styles.container}>
      {isLoading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.loadingSpinner}></div>
        </div>
      )}
        <h1>{isTeacher ? "Öğretmen " : "Öğrenci "}Kaydı</h1>
        <div className={styles.formContainer}>
          <form onSubmit={onSubmit}>
          <div className={styles.formGroup}>
              <label htmlFor="TC">TC Kimlik No:</label>
              <input
                type="number"
                id="TC"
                name="TC"
                placeholder="TC Kimlik No"
                value={TC}
                onChange={onChange}
                required
              />
            </div>
            <div className={styles.fullName}>
            <div className={styles.formGroup}>
                <label htmlFor="name">İsim:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="İsim"
                  value={name}
                  onChange={onChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="Soyad">Soyad:</label>
                <input
                  type="text"
                  id="surname"
                  name="surname"
                  placeholder="Soyad"
                  value={surname}
                  onChange={onChange}
                  required
                />
              </div>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">{isTeacher || "Veli "}E-mail:</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={onChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="password">Şifre:</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Şifre"
                value={password}
                onChange={onChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="passwordAgain">Tekrar Şifre:</label>
              <input
                type="password"
                id="passwordAgain"
                name="passwordAgain"
                placeholder="Şifre"
                value={passwordAgain}
                onChange={onChange}
                required
              />
            </div>
            {
              isTeacher ||
              <div className={styles.formGroup}>
              <label htmlFor="teacherId">Öğretmen ID (Öğretmeninizden isteyiniz):</label>
              <input
                type="text"
                id="teacherId"
                name="teacherId"
                placeholder="Öğretmen ID"
                value={teacherId}
                onChange={onChange}
                required
              />
              <p style={{color: 'white', fontWeight: 'bold', fontSize: "10px", textAlign: "left"}}>Örnek: 6c98df34-3f97-4519-b60f-4919e5371306</p>
            </div>
            }
            
            <button type="submit" className={styles.loginButton}>
              Kayıt Ol
            </button>
          </form>
        </div>
        <div className={styles.footerText}>
          Zaten Hesabın var mı?
          <Link to={isTeacher ? "/teacher/login" :"/student/login"}>Giriş Yap</Link>
        </div>
      </div>
  );
}
