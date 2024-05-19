import React, { useState } from 'react';
import styles from './Login.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login } from '../../features/auth/authService';

export default function Login({ role }) {
  const [formData, setFormData] = useState({
    tcKimlikNo: '', // Corrected field name
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);


  const { tcKimlikNo, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const navigate = useNavigate()
  const onSubmit = async(e) => {
    e.preventDefault();
    if(tcKimlikNo.length !== 11){
      toast.error("TC Kimlik numarası 11 karakterli olmalıdır.")
      return;
    }else if(password === ""){
      console.log(password)
      toast.error("Şifre alanı boş bırakılamaz.")
      return;
    }
    const userData = {
      TC: tcKimlikNo,
      password,
    };
    try {
      setIsLoading(true)
      const response = await login(JSON.stringify(userData));
      const result = await response.json()
      if (!response.ok) {
          throw new Error(result.message);
      }
      localStorage.setItem('user',JSON.stringify(result));
      navigate("/home")
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
      <h1>{role === 0 ? 'Öğrenci ' : 'Öğretmen '}Girişi</h1>
      <div className={styles.formContainer}>
        <form onSubmit={onSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="tcKimlikNo">TC Kimlik No:</label>
            <input
              type="number"
              id="tcKimlikNo"
              name="tcKimlikNo"
              minLength="11"
              maxLength="11"
              placeholder="TC Kimlik No"
              value={tcKimlikNo}
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
          <button type="submit" className={styles.loginButton}>
            Giriş Yap
          </button>
        </form>
        <Link className={styles.forgotPassword} to="/forgotpassword">
          Şifremi Unuttum
        </Link>
        <div className={styles.footerText}>
          Hesabın yok mu?
          <Link to={role === 0 ? '/student/register' : '/teacher/register'}>Kaydol</Link>
        </div>
      </div>
    </div>
  );
}
