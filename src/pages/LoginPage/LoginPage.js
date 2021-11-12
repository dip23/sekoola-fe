import React, { useState } from 'react';
import styles from './styles.module.css';
import { Link, useHistory } from 'react-router-dom';
import { routes } from '../../configs/routes';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearError } from '../../actions';

import image1 from '../../assets/login-register/img1.png';
import image2 from '../../assets/login-register/img2.png';
import { InputField } from '../../components/fields';
import { Alert, Button } from '../../components/elements';
import { useEffect } from 'react';

export default function LoginPage() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  const message = useSelector((state) => state.alert.message);
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Pengujian database (fetch) api/token
    const dataUser = {
      email,
      password,
    };

    const request = await dispatch(loginUser(dataUser));
    if (request === 'success') {
      history.push(routes.HOME());
      console.log('LOGIN SUCCESS');
    }
  };

  useEffect(() => {
    // Clear Error Message from authReducer
    dispatch(clearError());
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.leftSide}>
        <img src={image1} alt="logo sekoola" />
        <img src={image2} alt=" " />
      </div>
      <div className={styles.rightSide}>
        <div>
          <h1>
            Selamat Datang di
            <br />
            <span>Sekoola</span>
          </h1>
          <p className={error ? styles.shortMargin : ''}>
            One Stop Solution untuk Digitalisasi Sekolah di Indonesia
          </p>
          {error && <Alert type="danger" message={error} />}
          {message && <Alert type={message.type} message={message.text} />}
          <form onSubmit={(e) => handleSubmit(e)}>
            <InputField
              type="email"
              name="email"
              label="Email"
              placeholder="cth. admin@email.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
            <InputField
              type="password"
              name="password"
              label="Kata Sandi"
              placeholder="Min. 8 karakter"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
            <Button
              type="submit"
              label="MASUK"
              color="yellow"
              blockBtn
              disabled={loading}
            />
            <p>
              Belum punya akun? Daftar{' '}
              <Link to={routes.REGISTER()}>disini</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
