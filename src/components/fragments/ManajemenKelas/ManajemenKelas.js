import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './styles.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { clearMessage, timedMessage } from '../../../actions';
import { baseClassApi } from '../../../configs/api/endpoints';

import { Alert, Button } from '../../elements';
import { FlatInputRadio, FlatInputText } from '../../fields';
import Table from '../Table/Table';
import { ModalDelete, ModalEdit } from '..';

function ManajemenKelas() {
  const dispatch = useDispatch();
  const dataTingkatan = useSelector((state) => state.tingkatan.tingkatanData);
  const jwtToken = useSelector((state) => state.auth.userData.token);
  const message = useSelector((state) => state.alert.message);
  const [name, setName] = useState('');
  // const [urutan, setUrutan] = useState(null);
  const [tingkatanId, setTingkatanId] = useState(
    dataTingkatan.length !== 0 ? dataTingkatan[0].id : ''
  );
  const [dataKelas, setDataKelas] = useState(null);
  const [loading, setLoading] = useState(false);
  const [postLoading, setPostLoading] = useState(false);

  // for Modals
  const [showModalEdit, setshowModalEdit] = useState(false);
  const [showModalDelete, setshowModalDelete] = useState(false);
  const [dataEdit, setdataEdit] = useState({});
  const [dataDelete, setdataDelete] = useState({});
  // End of for Modals

  // console.log(dataTingkatan);
  // console.log(tingkatan);

  // Temp Data, kalo ada API, dihapus
  // const dataTingkatan = [
  //   { id: 1, name: 'Kelas 1' },
  //   { id: 2, name: 'Kelas 2' },
  //   { id: 3, name: 'Kelas 3' },
  //   { id: 4, name: 'Kelas 4' },
  //   { id: 5, name: 'Kelas 5' },
  //   { id: 6, name: 'Kelas 6' },
  // ];

  // const dataKelas = [
  //   { kelas: 'Kelas 1A' },
  //   { kelas: 'Kelas 1B' },
  //   { kelas: 'Kelas 1C' },
  // ];
  // End of Temp Data

  // get Nama Tingkat
  const namaTingkat =
    dataTingkatan.length !== 0
      ? dataTingkatan.find((data) => {
          return data.id === tingkatanId;
        }).name
      : '-';

  const column = [{ heading: namaTingkat, value: 'name' }];

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
  const editInputGroup = [{ label: 'Nama', value: 'name' }];
  const handleSubmitEdit = (e) => {
    e.preventDefault();

    // Form Data
    const name = e.target.Nama.value;
    const dataForm = {
      name,
      gradeId: tingkatanId,
    };

    dataEdit && setPostLoading(true);
    dataEdit &&
      axios
        .put(`${baseClassApi}/${dataEdit.id}`, dataForm, {
          headers: {
            'Content-Type': 'application/json',
            auth: jwtToken,
          },
        })
        .then((res) => {
          console.log('res', res);
          setshowModalEdit(false);
          if (res.statusText === 'OK') {
            const editedData = res.data.content.class;
            // Copy state dataKelas
            let dataKelasLama = dataKelas;

            const editedIndex = dataKelasLama.findIndex((data) => {
              return data.id === dataEdit.id;
            });
            dataKelasLama[editedIndex] = editedData;
            setDataKelas([...dataKelasLama]);

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
  const handleDeleteTingkatan = () => {
    dataDelete && setPostLoading(true);

    dataDelete &&
      axios
        .delete(`${baseClassApi}/${dataDelete.id}`, {
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
            let dataKelasLama = dataKelas;
            // Cari index data kelas yg dihapus
            const deletedIndex = dataKelasLama.findIndex((data) => {
              return data.id === dataDelete.id;
            });
            // Hapus dgn .splice()
            dataKelasLama.splice(deletedIndex, 1);
            setDataKelas([...dataKelasLama]);

            setPostLoading(false);
            dispatch(clearMessage());
            dispatch(timedMessage('success', 'Data telah berhasil dihapus!'));
          }
        })
        .catch((err) => {
          console.log(err.message);
          console.log(err.response);
          setshowModalDelete(false);
          setPostLoading(false);
          dispatch(clearMessage());
          dispatch(timedMessage('danger', 'Data gagal dihapus.'));
        });
  };
  // End of Delete Submit Function

  const handleSubmit = (e) => {
    e.preventDefault();

    setPostLoading(true);
    const dataForm = {
      name,
      gradeId: tingkatanId,
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
        dispatch(timedMessage('success', 'Data telah berhasil ditambahkan!'));
        setPostLoading(false);
        let dataKelasLama = dataKelas;
        dataKelasLama.push(dataKelasBaru);
        setDataKelas([...dataKelasLama]);
        setName('');
      })
      .catch((err) => {
        console.log(err.response);
        console.log(err.message);
        setPostLoading(false);
        dispatch(clearMessage());
        if (err.message === 'Network Error')
          return dispatch(timedMessage('danger', err.message));
        dispatch(timedMessage('danger', 'Gagal menambahkan data.'));
        setName('');
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
        const response = await axios.get(`${baseClassApi}/${tingkatanId}`, {
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
  }, [tingkatanId]);

  return (
    <div className={styles.root}>
      <div className={styles.leftSide}>
        {message && <Alert type={message.type} message={message.text} />}
        <form onSubmit={(e) => handleSubmit(e)}>
          <FlatInputRadio
            name="tingkatan"
            label="Tingkatan"
            required
            setParentCurrentValue={setTingkatanId}
            inputValues={dataTingkatan}
          />
          <FlatInputText
            name="nama"
            label="Nama"
            type="text"
            value={name}
            setParentTextValue={setName}
            required
          />
          <Button
            type="submit"
            label="Tambah"
            color="yellow"
            smallBtn
            disabled={postLoading || loading}
          />
        </form>
      </div>
      <div className={styles.rightSide}>
        <Table
          editable
          column={column}
          orderedHead={true}
          data={dataKelas}
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
        onConfirm={handleDeleteTingkatan}
        postLoading={postLoading}
      />
    </div>
  );
}

export default ManajemenKelas;
