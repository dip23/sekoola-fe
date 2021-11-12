import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import styles from './styles.module.css';
import { routes } from '../../configs/routes';

import { ContainerPages, DetailGuru, Table } from '../../components/fragments';
import { teacherPageApi } from '../../configs';

export default function DaftarGuru() {
  const location = useLocation();
  const history = useHistory();
  const searchParams = new URLSearchParams(location.search);
  const jwtToken = useSelector((state) => state.auth.userData.token);

  const [dataGuruZ, setDataGuru] = useState([]);
  const [loading, setLoading] = useState(false);

  const id = parseInt(searchParams.get('id'));

  const column = [
    { heading: 'Nama Guru', value: 'name' },
    { heading: 'NIP', value: 'NIP' },
    { heading: 'Email', value: 'email' },
  ];

  // // Temp data
  // const dataGuru = [
  //   {
  //     id: '1',
  //     nama: 'Difa Bagasputra M',
  //     nip: '198700',
  //     email: 'adif.maulana@gmail.com',
  //   },
  //   {
  //     id: '2',
  //     nama: 'Nazmi Abkary',
  //     nip: '198700',
  //     email: 'adif.maulana@gmail.com',
  //   },
  //   {
  //     id: '3',
  //     nama: 'Rahma Batari',
  //     nip: '198700',
  //     email: 'adif.maulana@gmail.com',
  //   },
  //   { id: '4', nama: 'Adi', nip: '198700', email: 'adif.maulana@gmail.com' },
  //   { id: '5', nama: 'Rep', nip: '198700', email: 'adif.maulana@gmail.com' },
  //   {
  //     id: '6',
  //     nama: 'Siapa aja',
  //     nip: '198700',
  //     email: 'adif.maulana@gmail.com',
  //   },
  // ];
  // // End of Temp Data

  const handleClickTableRow = (item) =>
    history.push(routes.DETAIL_GURU(item.id));

  useEffect(() => {
    // dispatch(clearMessage());

    // Axios Abort Controller
    const source = axios.CancelToken.source();

    const loadData = async () => {
      try {
        setLoading(true);
        setDataGuru(null);
        const response = await axios.get(`${teacherPageApi}`, {
          headers: {
            'Content-Type': 'application/json',
            auth: jwtToken,
          },
          cancelToken: source.token,
        });
        const data = response.data.content.teachers;
        setDataGuru(data);
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
  }, []);

  const detailDataGuru = dataGuruZ && dataGuruZ.filter((data) => data.id === id);

  console.log(detailDataGuru)

  if (location.search === `?id=${id}`) {
    return <DetailGuru />;
  }

  return (
    <div className={styles.root}>
      <ContainerPages title="Daftar Guru">
        <Table
          clickable
          column={column}
          data={dataGuruZ}
          editable
          onClick={(e) => handleClickTableRow(e)}
          loading={loading}
        />
      </ContainerPages>
    </div>
  );
}
