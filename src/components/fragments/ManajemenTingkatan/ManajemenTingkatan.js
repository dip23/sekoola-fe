import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles.module.css';
import {
  clearMessage,
  getDataTingkatan,
  postDataTingkatan,
  timedMessage,
  postTingkatanSuccess,
  postTingkatanFailure,
} from '../../../actions';

import { Alert, Button } from '../../elements';
import { FlatInputText } from '../../fields';
import Table from '../Table/Table';
import axios from 'axios';
import { ModalDelete, ModalEdit } from '..';
import { tingkatanApi } from '../../../configs';
import {
  delTingkatanRequest,
  putTingkatanRequest,
} from '../../../actions/tingkatan/tingkatan';

function ManajemenTingkatan() {
  const [name, setName] = useState('');
  // const [urutan, setUrutan] = useState(null);
  const dispatch = useDispatch();
  const jwtToken = useSelector((state) => state.auth.userData.token);
  const dataTingkatan = useSelector((state) => state.tingkatan.tingkatanData);
  const message = useSelector((state) => state.alert.message);
  const getLoading = useSelector((state) => state.tingkatan.getLoading);
  const postLoading = useSelector((state) => state.tingkatan.postLoading);

  // for Modals
  const [showModalEdit, setshowModalEdit] = useState(false);
  const [showModalDelete, setshowModalDelete] = useState(false);
  const [dataEdit, setdataEdit] = useState({});
  const [dataDelete, setdataDelete] = useState({});
  // End of for Modals
  // console.log(dataTingkatan);

  // Temp Data, kalo ada API, dihapus

  // const dataTingkatan = [
  //   { tingkatan: 'Kelas 1' },
  //   { tingkatan: 'Kelas 2' },
  //   { tingkatan: 'Kelas 3' },
  //   { tingkatan: 'Kelas 4' },
  //   { tingkatan: 'Kelas 5' },
  //   { tingkatan: 'Kelas 6' },
  // ];
  // End of Temp Data
  const column = [{ heading: 'Tingkatan', value: 'name' }];

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

    dataEdit && dispatch(putTingkatanRequest());
    dataEdit &&
      axios
        .put(
          `${tingkatanApi}/${dataEdit.id}`,
          { name },
          {
            headers: {
              'Content-Type': 'application/json',
              auth: jwtToken,
            },
          }
        )
        .then((res) => {
          console.log('res', res);
          if (res.statusText === 'OK') {
            const editedData = res.data.content.grade;
            setshowModalEdit(false);

            // Cari index data kelas yg di edit
            const editedIndex = dataTingkatan.findIndex((data) => {
              return data.id === dataEdit.id;
            });
            // Copy dataTingkatan lalu ubah data index tersebut
            const oldTingkatanData = dataTingkatan;
            oldTingkatanData[editedIndex] = editedData;

            // Set State di Reducer
            dispatch(postTingkatanSuccess([...oldTingkatanData]));
            dispatch(clearMessage());
            dispatch(timedMessage('success', 'Data telah berhasil diubah!'));
          }
        })
        .catch((err) => {
          console.log(err.message);
          console.log(err.response);
          setshowModalEdit(false);
          dispatch(postTingkatanFailure());
          dispatch(clearMessage());
          dispatch(timedMessage('danger', 'Data gagal diubah.'));
        });
  };
  // End of Edit Submit Function

  // Delete Submit Function
  const handleDeleteTingkatan = () => {
    dispatch(delTingkatanRequest());

    dataDelete &&
      axios
        .delete(`${tingkatanApi}/${dataDelete.id}`, {
          headers: {
            'Content-Type': 'application/json',
            auth: jwtToken,
          },
        })
        .then((res) => {
          console.log('res', res);
          setshowModalDelete(false);
          if (res.statusText === 'OK') {
            // Cari index data kelas yg dihapus
            const deletedIndex = dataTingkatan.findIndex((data) => {
              return data.id === dataDelete.id;
            });
            // Copy state dataKelas dan hapus dgn .splice()
            dataTingkatan.splice(deletedIndex, 1);

            // Set State di Reducer
            dispatch(postTingkatanSuccess([...dataTingkatan]));
            dispatch(clearMessage());
            dispatch(timedMessage('success', 'Data telah berhasil dihapus!'));
          }
        })
        .catch((err) => {
          console.log(err.message);
          console.log(err.response);
          setshowModalDelete(false);
          dispatch(postTingkatanFailure());
          dispatch(clearMessage());
          dispatch(timedMessage('danger', 'Data gagal dihapus.'));
        });
  };
  // End of Delete Submit Function

  const handleSubmitPost = async (e) => {
    e.preventDefault();

    const dataForm = {
      name,
    };

    const request = await dispatch(postDataTingkatan(dataForm, jwtToken));
    if (request === 'success') {
      setName('');
      dispatch(clearMessage());
      dispatch(timedMessage('success', 'Data telah berhasil ditambahkan!'));
      // dispatch(getDataTingkatan(jwtToken));
    } else if (request === 'failed') {
      setName('');
      dispatch(clearMessage());
      dispatch(timedMessage('danger', 'Gagal menambahkan data.'));
    }
  };

  useEffect(() => {
    dispatch(clearMessage());

    // Axios Abort Controller
    const source = axios.CancelToken.source();

    if (dataTingkatan.length === 0) {
      dispatch(getDataTingkatan(jwtToken, source));
    }

    // Cancel request
    return () => source.cancel();
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.leftSide}>
        {message && <Alert type={message.type} message={message.text} />}
        <form onSubmit={(e) => handleSubmitPost(e)}>
          {/* <FlatInputCounter
            name="urutan"
            label="Urutan"
            required
            setParentCounter={setUrutan}
            maxCounter={4}
            defaultValue={2}
          /> */}
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
            disabled={postLoading}
          />
        </form>
      </div>
      <div className={styles.rightSide}>
        <Table
          editable
          column={column}
          orderedHead={true}
          data={dataTingkatan}
          loading={getLoading}
          postLoading={postLoading}
          onClickEdit={(rowData) => handleClickEdit(rowData)}
          onClickDelete={(rowData) => handelClickDelete(rowData)}
        />
      </div>
      <ModalEdit
        data={dataEdit}
        onClose={() => setshowModalEdit(false)}
        show={showModalEdit}
        title={'Edit Data Tingkatan'}
        inputGroup={editInputGroup}
        onSubmit={(event) => handleSubmitEdit(event)}
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

export default ManajemenTingkatan;
