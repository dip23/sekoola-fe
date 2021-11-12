import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { registGuruApi } from '../../../configs';

import { clearMessage, timedMessage } from '../../../actions';
import { Alert, Button } from '../../elements';
import {
  FlatInputDropdown,
  FlatInputText,
  TimePickerInput,
} from '../../fields';

function ManajemenGuru() {
  const dispatch = useDispatch();
  const jwtToken = useSelector((state) => state.auth.userData.token);
  const message = useSelector((state) => state.alert.message);

  const [name, setName] = useState('');
  const [nip, setNip] = useState('');
  const [email, setEmail] = useState('');
  const [tingkatan, setTingkatan] = useState([]);
  const [kelas, setKelas] = useState([]);
  const [matpel, setMatpel] = useState([]);
  const [hari, setHari] = useState([]);
  const [waktu, setWaktu] = useState([]);
  const [countMatpel, setCountMatpel] = useState(1);
  const [warning, setWarning] = useState(false);
  const [postLoading, setPostLoading] = useState(false);

  // Temp Data, kalo ada API, dihapus
  const listTingkatan = [
    { id: 1, nama: 'Kelas 1' },
    { id: 2, nama: 'Kelas 2' },
    { id: 3, nama: 'Kelas 3' },
    { id: 4, nama: 'Kelas 4' },
    { id: 5, nama: 'Kelas 5' },
    { id: 6, nama: 'Kelas 6' },
  ];

  const listKelas = [
    { id: 1, nama: 'Kelas 1A' },
    { id: 2, nama: 'Kelas 1B' },
    { id: 3, nama: 'Kelas 1C' },
  ];

  const listMatpel = [
    { id: 1, nama: 'Matematika' },
    { id: 2, nama: 'Bahasa Inggris' },
    { id: 3, nama: 'Bahasa Indonesia' },
  ];

  const listHari = [
    { id: 1, nama: 'Senin' },
    { id: 2, nama: 'Selasa' },
    { id: 3, nama: 'Rabu' },
    { id: 4, nama: 'Kamis' },
    { id: 5, nama: 'Jumat' },
    { id: 6, nama: 'Sabtu' },
    { id: 7, nama: 'Minggu' },
  ];
  // End of Temp Data

  const _handleTambahMatpel = (e) => {
    e.preventDefault();
    if (!warning) {
      matpel[countMatpel - 1]
        ? setCountMatpel(countMatpel + 1)
        : setWarning(true);

      setTimeout(() => {
        setWarning(false);
      }, 5000);
    }
  };

  const handleSetTingkatan = (count, value) => {
    count -= 1;
    const data = tingkatan;
    data[count] = value;
    setTingkatan([...data]);
  };

  const handleSetKelas = (count, value) => {
    count -= 1;
    const data = kelas;
    data[count] = value;
    setKelas([...data]);
  };

  const handleSetMatpel = (count, value) => {
    count -= 1;
    const data = matpel;
    data[count] = value;
    setMatpel([...data]);
  };

  const handleSetHari = (count, value) => {
    count -= 1;
    const data = hari;
    data[count] = value;
    setHari([...data]);
  };

  const handleSetWaktu = (count, value) => {
    count -= 1;
    const data = waktu;
    data[count] = value;
    console.log(data);
    setWaktu([...data]);
  };

  const _handleSubmit = (e) => {
    e.preventDefault();

    const dataForm = {
      name,
      email,
      password: 'password',
      NIP: nip,
      schoolId: 1,
    };

    setPostLoading(true);
    axios
      .post(registGuruApi, JSON.stringify(dataForm), {
        headers: {
          'Content-Type': 'application/json',
          auth: jwtToken,
        },
      })
      .then((res) => {
        const newTeacher = res.data.content.user;
        console.log(res);
        dispatch(clearMessage());
        dispatch(
          timedMessage(
            'success',
            'telah berhasil ditambahkan!',
            newTeacher.name
          )
        );
        setPostLoading(false);
        // let dataKelasLama = dataKelas;
        // dataKelasLama.push(dataKelasBaru);
        // setDataKelas([...dataKelasLama]);
        setName('');
        setNip('');
        setEmail('');
      })
      .catch((err) => {
        console.log(err.response);
        console.log(err.message);
        setPostLoading(false);
        dispatch(clearMessage());
        if (err.message === 'Network Error')
          return dispatch(timedMessage('danger', err.message));
        dispatch(timedMessage('danger', 'Gagal menambahkan guru.'));
        setName('');
        setNip('');
        setEmail('');
      });
  };

  useEffect(() => {
    const abortController = new AbortController();

    return () => {
      console.log('I am in cleanup function');
      abortController.abort();
    };
  }, []);

  return (
    <div className={styles.root}>
      {message && (
        <Alert
          type={message.type}
          message={message.text}
          boldText={message.boldText ? message.boldText : null}
        />
      )}
      <form onSubmit={_handleSubmit}>
        <FlatInputText
          name="nama"
          label="Nama"
          type="text"
          value={name}
          setParentTextValue={setName}
          placeholder="nama"
          required
        />
        <FlatInputText
          name="nip"
          label="NIP"
          type="text"
          value={nip}
          setParentTextValue={setNip}
          placeholder="nip"
          required
        />
        <FlatInputText
          name="email"
          label="Email"
          type="email"
          value={email}
          setParentTextValue={setEmail}
          placeholder="contoh@email.co.id"
          required
        />
        <AddMatpel
          countMatpel={countMatpel}
          listTingkatan={listTingkatan}
          listKelas={listKelas}
          listMatpel={listMatpel}
          listHari={listHari}
          handleSetTingkatan={handleSetTingkatan}
          handleSetKelas={handleSetKelas}
          handleSetMatpel={handleSetMatpel}
          handleSetHari={handleSetHari}
          handleSetWaktu={handleSetWaktu}
          kelas={kelas}
          tingkatan={tingkatan}
          matpel={matpel}
          hari={hari}
        />
        <span
          tabIndex="0"
          className={styles.adder}
          onClick={(e) => _handleTambahMatpel(e)}
          onKeyPress={(e) => {
            (e.code === 'Space') | (e.code === 'Enter') &&
              _handleTambahMatpel(e);
          }}
        >
          + Tambah Mata Pelajaran
        </span>
        {warning && (
          <span className={styles.warning}>
            Mohon lengkapi dahulu data Mata Pelajaran {countMatpel}.
          </span>
        )}
        <Button
          type="submit"
          label="Tambah"
          color="yellow"
          smallBtn
          disabled={postLoading}
        />
      </form>
    </div>
  );
}

function AddMatpel(props) {
  const {
    countMatpel,
    listTingkatan,
    listKelas,
    listMatpel,
    listHari,
    handleSetTingkatan,
    handleSetKelas,
    handleSetMatpel,
    handleSetHari,
    handleSetWaktu,
    tingkatan,
    kelas,
    matpel,
  } = props;

  const blockInputTambahMatpel = [];

  // const [startTime, setStartTime] = useState(null);
  // const [endTime, setEndTime] = useState(null);

  for (let count = 1; count <= countMatpel; count++) {
    blockInputTambahMatpel.push(
      <>
        <h2>Mata Pelajaran {count}</h2>
        <FlatInputDropdown
          name="tingkatan"
          label="Tingkatan"
          options={listTingkatan}
          placeholder="Pilih Tingkatan"
          setParentOptionValue={(value) => handleSetTingkatan(count, value)}
        />
        <FlatInputDropdown
          name="kelas"
          label="Kelas"
          options={listKelas}
          placeholder="Pilih Kelas"
          setParentOptionValue={(value) => handleSetKelas(count, value)}
          disabled={tingkatan[count - 1] ? false : true}
        />
        <FlatInputDropdown
          name="matpel"
          label="Mata Pelajaran"
          options={listMatpel}
          placeholder="Pilih Mata Pelajaran"
          setParentOptionValue={(value) => handleSetMatpel(count, value)}
          disabled={kelas[count - 1] ? false : true}
        />
        <FlatInputDropdown
          name="hari"
          label="Hari"
          options={listHari}
          placeholder="Pilih Hari"
          setParentOptionValue={(value) => handleSetHari(count, value)}
          disabled={matpel[count - 1] ? false : true}
        />
        <TimePickerInput
          label="Waktu"
          name="waktu"
          setParentValue={(value) => handleSetWaktu(count, value)}
          disabled={matpel[count - 1] ? false : true}
        />
        <hr />
      </>
    );
  }

  return (
    <>
      {blockInputTambahMatpel.map((item, idx) => (
        <div key={idx}>{item}</div>
      ))}
    </>
  );
}

export default ManajemenGuru;
