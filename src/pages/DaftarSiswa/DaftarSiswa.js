import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles.module.css';

import { Toast } from '../../components/elements';
import {
  ContainerPages,
  DataKelas,
  DetailSiswa,
  ModalAddKelas,
  ModalSiswa,
} from '../../components/fragments';
import { clearMessage, setMessage } from '../../actions';
import axios from 'axios';
import { baseClassApi } from '../../configs';

export default function DaftarSiswa() {
  const { idTingkatan } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const searchParams = new URLSearchParams(location.search);
  const jwtToken = useSelector((state) => state.auth.userData.token);
  const tingkatanKelas = useSelector((state) => state.tingkatan.tingkatanData);
  const message = useSelector((state) => state.alert.message);

  const [dataKelas, setDataKelas] = useState([]);
  const [showModalAddKelas, setshowModalAddKelas] = useState(false);
  const [showModalAddSiswa, setshowModalAddSiswa] = useState(false);
  const [showToast, setShowToast] = useState(false);
  // const [showToastSiswa, setshowToastSiswa] = useState(false);
  const [selectedTab, setSelectedTab] = useState({ activeTab: 1 });
  const [loading, setLoading] = useState(false);
  const [postLoading, setPostLoading] = useState(false);

  const uuid = searchParams.get('siswa');

  const column = [
    { heading: 'Nama Siswa', value: 'name' },
    { heading: 'NISN', value: 'NISN' },
  ];

  // Temp Data, kalo ada API, dihapus
  // const dataSiswa = [
  //   { id: '1', nama: 'Difa Bagas Maulana', nisn: '99938726411' },
  //   { id: '2', nama: 'Nazmi M. Abkary', nisn: '99938726411' },
  //   { id: '3', nama: "Adipati Ma'ruf Alamsyah", nisn: '99938726411' },
  //   { id: '4', nama: 'Rep', nisn: '99938726411' },
  //   { id: '5', nama: 'Batari', nisn: '99938726411' },
  //   { id: '6', nama: 'Bagas', nisn: '99938726411' },
  //   { id: '7', nama: 'Putra', nisn: '99938726411' },
  //   { id: '8', nama: 'Maulana', nisn: '99938726411' },
  //   { id: '9', nama: 'Abkary', nisn: '99938726411' },
  //   { id: '10', nama: 'Firmansyah', nisn: '99938726411' },
  // ];

  // const dataKelas = [
  //   {
  //     id: 1,
  //     nama: 'Kelas 1A',
  //     jumlahSiswa: 25,
  //     highestRank: [
  //       { name: 'Difa Bagasputra M', score: 100 },
  //       { name: 'Rahma Batari', score: 100 },
  //       { name: 'Nazmi Muhammad A', score: 90 },
  //     ],
  //     dataTable: dataSiswa,
  //   },
  //   {
  //     id: 2,
  //     nama: 'Kelas 1B',
  //     jumlahSiswa: 15,
  //     highestRank: [
  //       { name: 'Rahma Batari', score: 100 },
  //       { name: 'Nazmi', score: 90 },
  //       { name: 'Adipati', score: 80 },
  //     ],
  //     dataTable: dataSiswa,
  //   },
  //   {
  //     id: 3,
  //     nama: 'Kelas 1C',
  //     jumlahSiswa: 10,
  //     highestRank: [
  //       { name: 'Rep', score: 90 },
  //       { name: 'Adipati', score: 80 },
  //       { name: 'Nazmi Muhammad A', score: 70 },
  //     ],
  //     dataTable: dataSiswa,
  //   },
  // ];

  const tabItem = [{ tabTitle: 'Detail Kelas' }];

  const ChildComponent = () => {
    switch (selectedTab.activeTab) {
      // case 1:
      //   return 'Semua Kelas';
      case 1:
        return (
          <DataKelas
            column={column}
            idTingkatan={idTingkatan}
            dataKelas={dataKelas}
          />
        );
      default:
        return (
          <DataKelas
            column={column}
            idTingkatan={idTingkatan}
            dataKelas={dataKelas}
          />
        );
    }
  };

  const dataDropdown = [
    { value: 'Kelas', handleClickItem: () => setshowModalAddKelas(true) },
    { value: 'Siswa', handleClickItem: () => setshowModalAddSiswa(true) },
  ];

  // const tingkatanKelas = [
  //   { id: 1, name: 'Kelas 1' },
  //   { id: 2, name: 'Kelas 2' },
  //   { id: 3, name: 'Kelas 3' },
  //   { id: 4, name: 'Kelas 4' },
  //   { id: 5, name: 'Kelas 5' },
  //   { id: 6, name: 'Kelas 6' },
  // ];
  // End of Temp Data

  // get Nama Tingkat
  const namaTingkat =
    tingkatanKelas.length !== 0
      ? tingkatanKelas.find((data) => {
        return data.id === parseInt(idTingkatan);
      }).name
      : '-';

  // const handleShowToast = () => {
  //   setshowToastKelas(true);
  // };

  // const handleCloseModalSiswa = () => {
  //   setshowModalAddSiswa(false);
  //   // setshowToastSiswa(true);
  // };

  const handleSubmitAddClass = (e) => {
    e.preventDefault();

    setPostLoading(true);

    const name = e.target.kelas.value;
    const dataForm = {
      name,
      gradeId: parseInt(idTingkatan),
    };

    axios
      .post(baseClassApi, JSON.stringify(dataForm), {
        headers: {
          'Content-Type': 'application/json',
          auth: jwtToken,
        },
      })
      .then((res) => {
        const dataKelasBaru = res.data.content.class;
        dispatch(clearMessage());
        dispatch(
          setMessage('success', 'Data kelas telah berhasil ditambahkan!')
        );
        setPostLoading(false);
        setshowModalAddKelas(false);
        setShowToast(true);
        let dataKelasLama = dataKelas;
        dataKelasLama.push(dataKelasBaru);
        setDataKelas([...dataKelasLama]);
      })
      .catch((err) => {
        console.log(err.response);
        console.log(err.message);
        setPostLoading(false);
        setshowModalAddKelas(false);
        setShowToast(true);
        dispatch(clearMessage());
        if (err.message === 'Network Error')
          return dispatch(setMessage('danger', err.message));
        dispatch(setMessage('danger', 'Gagal menambahkan data.'));
      });
  };

  useEffect(() => {
    dispatch(clearMessage());

    // Axios Abort Controller
    const source = axios.CancelToken.source();

    const loadData = async () => {
      try {
        setLoading(true);
        setDataKelas(null);
        const response = await axios.get(`${baseClassApi}/${idTingkatan}`, {
          headers: {
            'Content-Type': 'application/json',
            auth: jwtToken,
          },
          cancelToken: source.token,
        });
        const data = response.data.content.classes;
        setDataKelas(data);
        setLoading(false);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('fetch aborted.');
        } else {
          console.log(error.message);
          console.log(error.res);
          setLoading(false);
        }
      }
    };
    loadData();

    // Cancel request
    return () => source.cancel();
  }, [idTingkatan]);

  if (location.search === `?siswa=${uuid}`) {
    return <DetailSiswa />;
  }

  return (
    <div className={styles.root}>
      <ContainerPages
        dataDropdown={dataDropdown}
        title={`Data Kelas : ${namaTingkat}`}
        listItem={tabItem}
        listView={true}
        setSelectedParentTab={setSelectedTab}
      >
        <ChildComponent />
      </ContainerPages>
      <ModalAddKelas
        show={showModalAddKelas}
        onClose={() => setshowModalAddKelas(false)}
        namaTingkat={namaTingkat}
        onSubmit={handleSubmitAddClass}
      />
      <ModalSiswa
        show={showModalAddSiswa}
        options={dataKelas}
        onClose={() => setshowModalAddSiswa(false)}
        namaTingkat={namaTingkat}
      />
      <Toast
        show={showToast}
        onClose={() => {
          setShowToast(false);
          dispatch(clearMessage());
        }}
        title={message ? message.text : ''}
      />
      {/* <Toast
        show={showToastSiswa}
        onClose={() => setshowToastSiswa(false)}
        title="Data Siswa Berhasil Ditambahkan"
      /> */}
    </div>
  );
}
