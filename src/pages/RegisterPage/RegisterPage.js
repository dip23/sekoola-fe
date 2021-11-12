import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../../configs/routes';
import { useHistory } from 'react-router-dom';
import style from './styles.module.css';
import { useDispatch } from 'react-redux';
import {
  clearError,
  clearMessage,
  registerUserSekolah,
  registFailure,
  setMessage,
  timedMessage,
} from '../../actions';

import image1 from '../../assets/login-register/img1.png';
import image2 from '../../assets/login-register/img2.png';
import { Alert, Button } from '../../components/elements';
import { InputField } from '../../components/fields';
import { useSelector } from 'react-redux';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [namaSekolah, setNamaSekolah] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password1 !== password2)
      return dispatch(registFailure('Password does not match'));

    const dataUser = {
      email,
      name: namaSekolah,
      password: password1,
    };

    const request = await dispatch(registerUserSekolah(dataUser));
    if (request === 'success') {
      history.push(routes.LOGIN());
      dispatch(
        timedMessage('success', 'Account registration has been successful!')
      );
    }
  };

  useEffect(() => {
    // Clear Error Message from authReducer
    dispatch(clearError());
  }, []);

  return (
    <div className={style.root}>
      <div className={style.leftSide}>
        <img src={image1} alt="logo sekoola" />
        <img src={image2} alt=" " />
      </div>
      <div className={style.rightSide}>
        <div>
          <h1>
            Pendaftaran akun sebagai
            <br />
            <span>Admin Sekolah</span>
          </h1>
          {error && <Alert type="danger" message={error} />}
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
              type="text"
              name="namaSekolah"
              label="Nama Sekolah"
              placeholder="cth. SMAN 1 Jatinangor"
              required
              value={namaSekolah}
              onChange={(e) => setNamaSekolah(e.target.value)}
              disabled={loading}
            />
            <InputField
              type="password"
              name="password1"
              label="Kata Sandi"
              placeholder="Min. 8 karakter"
              required
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
              disabled={loading}
            />
            <InputField
              type="password"
              name="password2"
              label="Konfirmasi Kata Sandi"
              placeholder="Min. 8 karakter"
              required
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              disabled={loading}
            />
            <Button
              type="submit"
              label="DAFTAR"
              color="yellow"
              blockBtn
              disabled={loading}
            />
            <p>
              Sudah punya akun? Masuk <Link to={routes.LOGIN()}>disini</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
