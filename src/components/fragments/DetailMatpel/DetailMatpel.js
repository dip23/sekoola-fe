import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import styles from './styles.module.css';

import { ContainerPages } from '..';
import { useDispatch, useSelector } from 'react-redux';
import { clearMessage } from '../../../actions';
import axios from 'axios';
import { baseCourseApi } from '../../../configs';

const DetailMatpel = (props) => {
  const { matpelId, jwtToken } = props;
  const { idTingkatan } = useParams();
  const dispatch = useDispatch();
  const tingkatanKelas = useSelector((state) => state.tingkatan.tingkatanData);

  const [detailMatpel, setDetailMatpel] = useState(null);
  const [loading, setLoading] = useState(false);
  // const [postLoading, setPostLoading] = useState(false)

  const listItem = [{ tabTitle: 'Semua Kelas' }, { tabTitle: 'Detail Kelas' }];

  useEffect(() => {
    dispatch(clearMessage());

    // Axios Abort Controller
    const source = axios.CancelToken.source();

    const loadData = async () => {
      try {
        setLoading(true);
        setDetailMatpel(null);
        const response = await axios.get(`${baseCourseApi}/${matpelId}`, {
          headers: {
            'Content-Type': 'application/json',
            auth: jwtToken,
          },
          cancelToken: source.token,
        });
        const data = response.data.content.course;
        setDetailMatpel(data);
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
    if (matpelId) loadData();

    // Cancel request
    return () => source.cancel();
  }, [matpelId]);

  // get Nama Kelas
  const namaTingkat =
    tingkatanKelas.length !== 0
      ? tingkatanKelas.find((data) => {
          return data.id === parseInt(idTingkatan);
        }).name
      : '-';

  return (
    <div>
      {loading && `Loading...`}
      {!loading && (
        <ContainerPages
          title={`${detailMatpel && detailMatpel.name} ${namaTingkat}`}
          listItem={listItem}
        />
      )}
    </div>
  );
};

export default DetailMatpel;
