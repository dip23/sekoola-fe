import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import { clearMessage } from '../../actions';
import {
  ContainerPages,
  DetailMatpel,
  Table,
} from '../../components/fragments';
import { coursePageApi } from '../../configs';
// import { routes } from '../../configs/routes';

export default function MataPelajaran() {
  const { idTingkatan } = useParams();
  const location = useLocation();
  // const history = useHistory();
  const searchParams = new URLSearchParams(location.search);
  const jwtToken = useSelector((state) => state.auth.userData.token);
  const tingkatanKelas = useSelector((state) => state.tingkatan.tingkatanData);
  const dispatch = useDispatch();

  const [dataMatpel, setDataMatpel] = useState(null);
  const [loading, setLoading] = useState(false);

  const matpelId = searchParams.get('mata-pelajaran');

  useEffect(() => {
    dispatch(clearMessage());

    // Axios Abort Controller
    const source = axios.CancelToken.source();

    const loadData = async () => {
      try {
        setLoading(true);
        setDataMatpel(null);
        const response = await axios.get(`${coursePageApi}/${idTingkatan}`, {
          headers: {
            'Content-Type': 'application/json',
            auth: jwtToken,
          },
          cancelToken: source.token,
        });
        const data = response.data.content.courses;
        setDataMatpel(data);
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

  // Temp Data, kalo ada API, dihapus

  // const tingkatanKelas = [
  //   { id: 1, nama: 'Kelas 1' },
  //   { id: 2, nama: 'Kelas 2' },
  //   { id: 3, nama: 'Kelas 3' },
  //   { id: 4, nama: 'Kelas 4' },
  //   { id: 5, nama: 'Kelas 5' },
  //   { id: 6, nama: 'Kelas 6' },
  // ];

  // const dataMatpel = [
  //   { id: '1', matpel: 'Biologi' },
  //   { id: '2', matpel: 'Pendidikan Agama Islam' },
  //   { id: '3', matpel: 'Matematika' },
  //   { id: '6', matpel: 'Fisika' },
  //   { id: '7', matpel: 'Pendidikan Kewarganegaraan' },
  //   { id: '8', matpel: 'Pendidikan Jasmani dan Olahraga' },
  //   { id: '9', matpel: 'Kimia' },
  //   { id: '10', matpel: 'Bimbingan dan Konseling' },
  //   { id: '11', matpel: 'Prakarya' },
  //   { id: '12', matpel: 'Bahasa Indonesia' },
  //   { id: '13', matpel: 'Bahasa Inggris' },
  //   { id: '14', matpel: 'Pendidikan Lingkungan Hidup' },
  // ];
  // End of Temp Data

  // data for table
  const column = [{ heading: 'Mata Pelajaran', value: 'name' }];

  // get Nama Kelas
  const namaTingkat =
    tingkatanKelas.length !== 0
      ? tingkatanKelas.find((data) => {
        return data.id === parseInt(idTingkatan);
      }).name
      : '-';

  if (location.search === `?mata-pelajaran=${matpelId}`) {
    return <DetailMatpel matpelId={matpelId} jwtToken={jwtToken} />;
  }

  // const handleClickRow = (item) => {
  //   history.push(routes.DETAIL_MATPEL(idTingkatan, item.id));
  // };

  return (
    <div>
      <ContainerPages
        title={`Data Mata Pelajaran ${namaTingkat ? namaTingkat : ''}`}
      >
        <Table
          // clickable
          column={column}
          data={dataMatpel}
          // onClick={(rowData) => handleClickRow(rowData)}
          loading={loading}
        />
      </ContainerPages>
    </div>
  );
}
