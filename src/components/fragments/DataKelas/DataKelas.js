import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { ModalDelete, ModalEdit, Table } from '..';
import { clearMessage } from '../../../actions';
import { baseClassApi, studentPageApi } from '../../../configs';
import { routes } from '../../../configs/routes';
import { FlatInputDropdown } from '../../fields';
import styles from './styles.module.css';

export default function DataKelas(props) {
  const { column, idTingkatan, dataKelas } = props;
  const history = useHistory();
  const dispatch = useDispatch();
  const jwtToken = useSelector((state) => state.auth.userData.token);

  const [kelas, setKelas] = useState(null);
  const [dataTable, setDataTable] = useState([]);
  const [showModalEdit, setshowModalEdit] = useState(false);
  const [showModalDelete, setshowModalDelete] = useState(false);
  const [dataEdit, setdataEdit] = useState({});
  const [dataDelete, setdataDelete] = useState({});
  const [loading, setLoading] = useState(false);
  const [postLoading, setPostLoading] = useState(false);

  const handleClickRow = (item) =>
    history.push(routes.DETAIL_SISWA(idTingkatan, item.id));

  const handleClickEdit = (data) => {
    setshowModalEdit(true);
    setdataEdit(data);
  };

  const handelClickDelete = (data) => {
    setshowModalDelete(true);
    setdataDelete(data);
  };

  const handleSetDropdown = (val) => {
    setKelas(val);
    // Axios Abort Controller
    const source = axios.CancelToken.source();

    const loadData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${studentPageApi}/${val}`, {
          headers: {
            'Content-Type': 'application/json',
            auth: jwtToken,
          },
          cancelToken: source.token,
        });
        const data = response.data.content.students;
        setDataTable(data);
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
  };

  // Edit Submit Function + Accessories
  const editInputGroup = [
    { label: 'Nama', value: 'name' },
    { label: 'NISN', value: 'NISN' },
  ];
  const handleSubmitEdit = (e) => {
    e.preventDefault();

    // Form Data
    const name = e.target.Nama.value;
    const nisn = e.target.NISN.value;
    const dataForm = {
      name,
      nisn,
      classId: kelas,
    };

    // dataEdit && setPostLoading(true);
    // dataEdit &&
    //   axios
    //     .put(`${baseClassApi}/${dataEdit.id}`, dataForm, {
    //       headers: {
    //         'Content-Type': 'application/json',
    //         auth: jwtToken,
    //       },
    //     })
    //     .then((res) => {
    //       console.log('res', res);
    //       setshowModalEdit(false);
    //       if (res.statusText === 'OK') {
    //         const editedData = res.data.content.class;
    //         // Copy state dataKelas
    //         let dataKelasLama = dataKelas;

    //         const editedIndex = dataKelasLama.findIndex((data) => {
    //           return data.id === dataEdit.id;
    //         });
    //         dataKelasLama[editedIndex] = editedData;
    //         setDataKelas([...dataKelasLama]);

    //         setPostLoading(false);
    //         dispatch(clearMessage());
    //         dispatch(timedMessage('success', 'Data telah berhasil diubah!'));
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err.message);
    //       console.log(err.response);
    //       setshowModalEdit(false);
    //       setPostLoading(false);
    //       dispatch(clearMessage());
    //       dispatch(timedMessage('danger', 'Data gagal diubah.'));
    //     });
  };
  // End of Edit Submit Function

  return (
    <div className={styles.rootDataKelas}>
      <section className={styles.containerKelas}>
        <FlatInputDropdown
          name="kelas"
          label="Pilih"
          options={dataKelas}
          placeholder="Pilih Kelas"
          setParentOptionValue={handleSetDropdown}
        />
        {kelas && (
          <>
            <div>
              <p>
                Jumlah
                <br />
                Siswa
              </p>
              <p>{dataTable ? dataTable.length : 0}</p>
            </div>
            <div>
              <p>Grafik Pembelajaran</p>
            </div>
            <div className={styles.lastContainer}>
              <p>Nilai Tertinggi</p>
              {/* <ol>
                {data[kelas - 1].highestRank &&
                  data[kelas - 1].highestRank.map((i, idx) => (
                    <div key={idx}>
                      <li>{i.name}</li>
                      <span>{i.score}</span>
                    </div>
                  ))}
              </ol> */}
            </div>
          </>
        )}
      </section>
      <section className={styles.table}>
        <Table
          clickable
          column={column}
          editable
          data={dataTable}
          onClick={(rowData) => handleClickRow(rowData)}
          onClickEdit={(rowData) => handleClickEdit(rowData)}
          onClickDelete={(rowData) => handelClickDelete(rowData)}
          loading={loading}
          postLoading={postLoading}
        />
      </section>
      <ModalEdit
        data={dataEdit}
        onClose={() => setshowModalEdit(false)}
        show={showModalEdit}
        title={'Ubah Data Siswa'}
        postLoading={postLoading}
        inputGroup={editInputGroup}
        onSubmit={(event) => handleSubmitEdit(event)}
      />
      <ModalDelete
        data={dataDelete}
        onClose={() => setshowModalDelete(false)}
        show={showModalDelete}
        title={'Hapus?'}
        postLoading={postLoading}
      />
    </div>
  );
}
