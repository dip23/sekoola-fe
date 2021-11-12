import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import styles from './styles.module.css';
import { scoreCategoryApi } from '../../../configs';
import { clearMessage, timedMessage } from '../../../actions';

import { Alert, Button } from '../../elements';
import { FlatInputText } from '../../fields';
import Table from '../Table/Table';
import { ModalDelete, ModalEdit } from '..';

function PengaturanKognitif() {
  const dispatch = useDispatch();
  const jwtToken = useSelector((state) => state.auth.userData.token);
  const message = useSelector((state) => state.alert.message);

  const [cognitiveData, setCognitiveData] = useState([]);
  const [kategori, setKategori] = useState('');
  const [bobot, setBobot] = useState('');
  const [kkm, setKkm] = useState('');
  const [remainingPercentage, setRemainingPercentage] = useState(100);
  const [loading, setLoading] = useState(false);
  const [postLoading, setPostLoading] = useState(false);

  // for Modals
  const [showModalEdit, setshowModalEdit] = useState(false);
  const [showModalDelete, setshowModalDelete] = useState(false);
  const [dataEdit, setdataEdit] = useState({});
  const [dataDelete, setdataDelete] = useState({});

  // Temp Data, kalo ada API, dihapus
  // const dataKognitif = [
  //   { id: '1', category: 'Tugas', weight: '10%', minimumScore: '80' },
  //   { id: '2', category: 'Kuis', weight: '20%', minimumScore: '80' },
  //   { id: '3', category: 'Ulangan', weight: '20%', minimumScore: '75' },
  //   { id: '4', category: 'UTS', weight: '25%', minimumScore: '70' },
  //   { id: '5', category: 'UAS', weight: '25%', minimumScore: '70' },
  // ];
  // End of Temp Data

  const column = [
    { heading: 'Kategori', value: 'category' },
    { heading: 'Bobot', value: 'weight' },
    { heading: 'KKM', value: 'minimumScore' },
  ];

  // for Modals
  const handleClickEdit = (data) => {
    setshowModalEdit(true);
    setdataEdit(data);
  };

  const handelClickDelete = (data) => {
    setshowModalDelete(true);
    setdataDelete(data);
  };
  // End of for Modals

  // Edit Submit Function + Accessories
  const editInputGroup = [
    { label: 'Kategori', value: 'category' },
    { label: 'Bobot', value: 'weight' },
    { label: 'KKM', value: 'minimumScore' },
  ];
  const handleSubmitEdit = (e) => {
    e.preventDefault();

    // Form Data
    const kategori = e.target.Kategori.value;
    const bobot = e.target.Bobot.value;
    const kkm = e.target.KKM.value;
    const dataForm = {
      type: 'Kognitif',
      category: kategori,
      weight: parseInt(bobot),
      minimumScore: parseInt(kkm),
    };

    dataEdit && setPostLoading(true);
    dataEdit &&
      axios
        .put(`${scoreCategoryApi}/${dataEdit.uuid}`, JSON.stringify(dataForm), {
          headers: {
            'Content-Type': 'application/json',
            auth: jwtToken,
          },
        })
        .then((res) => {
          console.log('res', res);
          setshowModalEdit(false);
          if (res.statusText === 'OK') {
            const editedData = res.data.content;
            editedData.weight = `${editedData.weight}%`;
            // Copy state dataKelas
            let oldData = cognitiveData;

            const editedIndex = oldData.findIndex((data) => {
              return data.uuid === dataEdit.uuid;
            });
            const remains =
              parseInt(remainingPercentage) +
              parseInt(oldData[editedIndex].weight) -
              parseInt(editedData.weight);
            oldData[editedIndex] = editedData;

            setCognitiveData([...oldData]);
            setRemainingPercentage(remains);

            setPostLoading(false);
            dispatch(clearMessage());
            dispatch(timedMessage('success', 'Data telah berhasil diubah!'));
          }
        })
        .catch((err) => {
          console.log(err.message);
          console.log(err.response);
          setshowModalEdit(false);
          setPostLoading(false);
          dispatch(clearMessage());
          dispatch(timedMessage('danger', 'Data gagal diubah.'));
        });
  };
  // End of Edit Submit Function

  // Delete Submit Function
  const handleDeleteScoreConfig = () => {
    dataDelete && setPostLoading(true);

    dataDelete &&
      axios
        .delete(`${scoreCategoryApi}/${dataDelete.uuid}`, {
          headers: {
            'Content-Type': 'application/json',
            auth: jwtToken,
          },
        })
        .then((res) => {
          console.log('res', res);
          setshowModalDelete(false);
          if (res.statusText === 'OK') {
            // Copy state dataKelas
            let oldData = cognitiveData;
            // Cari index data kelas yg dihapus
            const deletedIndex = oldData.findIndex((data) => {
              return data.uuid === dataDelete.uuid;
            });
            const remains =
              parseInt(remainingPercentage) + parseInt(dataDelete.weight);
            // Hapus dgn .splice()
            oldData.splice(deletedIndex, 1);
            setCognitiveData([...oldData]);
            setRemainingPercentage(remains);

            setPostLoading(false);
            setKategori('');
            setBobot('');
            setKkm('');
            dispatch(clearMessage());
            dispatch(timedMessage('success', 'Data telah berhasil dihapus!'));
          }
        })
        .catch((err) => {
          console.log(err.message);
          console.log(err.response);
          setshowModalDelete(false);
          setPostLoading(false);
          setKategori('');
          setBobot('');
          setKkm('');
          dispatch(clearMessage());
          dispatch(timedMessage('danger', 'Data gagal dihapus.'));
        });
  };
  // End of Delete Submit Function

  const _handleSubmitAdd = (e) => {
    e.preventDefault();

    if (remainingPercentage - parseInt(bobot) < 0) {
      dispatch(clearMessage());
      return dispatch(
        timedMessage(
          'warning',
          'Jumlah bobot nilai tidak memenuhi syarat atau >100%.'
        )
      );
    }

    setPostLoading(true);
    const dataForm = {
      type: 'Kognitif',
      category: kategori,
      weight: parseInt(bobot),
      minimumScore: parseInt(kkm),
    };

    axios
      .post(scoreCategoryApi, JSON.stringify(dataForm), {
        headers: {
          'Content-Type': 'application/json',
          auth: jwtToken,
        },
      })
      .then((res) => {
        const newData = res.data.content;
        newData.weight = `${newData.weight}%`;
        dispatch(clearMessage());
        dispatch(timedMessage('success', 'Data telah berhasil ditambahkan!'));
        setPostLoading(false);
        let oldData = cognitiveData;
        oldData.push(newData);
        setCognitiveData([...oldData]);
        setKategori('');
        setBobot('');
        setKkm('');

        const remains =
          parseInt(remainingPercentage) - parseInt(newData.weight);
        setRemainingPercentage(remains); // set bobot tersisa
      })
      .catch((err) => {
        console.log(err.response);
        console.log(err.message);
        setPostLoading(false);
        setKategori('');
        setBobot('');
        setKkm('');
        dispatch(clearMessage());
        if (err.message === 'Network Error')
          return dispatch(timedMessage('danger', err.message));
        dispatch(timedMessage('danger', 'Gagal menambahkan data.'));
      });
  };

  useEffect(() => {
    dispatch(clearMessage());

    // Axios Abort Controller
    const source = axios.CancelToken.source();

    const loadData = async () => {
      try {
        setLoading(true);
        setCognitiveData(null);
        const response = await axios.get(`${scoreCategoryApi}`, {
          headers: {
            'Content-Type': 'application/json',
            auth: jwtToken,
          },
          cancelToken: source.token,
        });
        const data = response.data.content;
        setLoading(false);

        const percentedData = data;
        let percentage = 0;
        percentedData &&
          percentedData.forEach((data) => {
            percentage += parseInt(data.weight);
            data.weight = `${data.weight}%`;
            return data;
          });

        const remains = parseInt(remainingPercentage) - percentage;
        setCognitiveData(percentedData); // set data
        setRemainingPercentage(remains); // set bobot tersisa
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

  return (
    <div className={styles.root}>
      <div className={styles.leftSide}>
        <h2>Kategori Nilai</h2>
        {message && (
          <Alert
            type={message.type}
            message={message.text}
            boldText={message.boldText ? message.boldText : null}
          />
        )}
        <form onSubmit={_handleSubmitAdd}>
          <FlatInputText
            name="kategori"
            label="Kategori"
            type="text"
            value={kategori}
            setParentTextValue={setKategori}
            placeholder="nama kategori"
            required
          />
          <FlatInputText
            name="bobot"
            label="Bobot"
            type="number"
            value={bobot}
            setParentTextValue={setBobot}
            placeholder="bobot nilai"
            required
            min={1}
          />
          <FlatInputText
            name="kkm"
            label="KKM"
            type="number"
            value={kkm}
            setParentTextValue={setKkm}
            placeholder="nilai KKM"
            required
            min={1}
          />
          <Button
            type="submit"
            label="Tambah"
            color="yellow"
            smallBtn
            disabled={postLoading}
          />
        </form>
      </div>
      <div className={styles.rightSide}>
        <Table
          editable
          column={column}
          data={cognitiveData}
          loading={loading}
          postLoading={postLoading}
          onClickEdit={(rowData) => handleClickEdit(rowData)}
          onClickDelete={(rowData) => handelClickDelete(rowData)}
        />
      </div>
      <ModalEdit
        data={dataEdit}
        onClose={() => setshowModalEdit(false)}
        show={showModalEdit}
        title={'Edit Data Kelas'}
        inputGroup={editInputGroup}
        onSubmit={(event) => handleSubmitEdit(event)}
        loading={loading}
        postLoading={postLoading}
      />
      <ModalDelete
        data={dataDelete}
        onClose={() => setshowModalDelete(false)}
        show={showModalDelete}
        title={'Hapus?'}
        onConfirm={handleDeleteScoreConfig}
        postLoading={postLoading}
      />
    </div>
  );
}

export default PengaturanKognitif;
