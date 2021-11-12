import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './styles.module.css';
import { routes } from '../../../configs/routes';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../../actions';

import LogoSekoola from '../../../assets/logo-sekoola.svg';
import profile from '../../../assets/profile-img.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faChalkboardTeacher,
  faUser,
  faDoorOpen,
  faBook,
  faSignOutAlt,
  faCaretDown,
  faCaretUp,
} from '@fortawesome/free-solid-svg-icons';
import { getDataTingkatan } from '../../../actions/tingkatan/tingkatan';
import { LoadingSpinner } from '../../elements';

export default function PageBase({ children }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { pathname } = useLocation();
  const firstPathName = pathname.split('/')[1];
  const jwtToken = useSelector((state) => state.auth.userData.token);
  const userData = useSelector((state) => state.auth.userData);
  const tingkatanKelas = useSelector((state) => state.tingkatan.tingkatanData);
  const userRole = useSelector((state) => state.auth.userData.role);
  console.log('rendered, PageBase.js');

  const [dropdownSiswa, setDropdownSiswa] = useState(
    firstPathName === 'siswa' ? true : false
  );
  const [dropdownMatpel, setDropdownMatpel] = useState(
    firstPathName === 'mata-pelajaran' ? true : false
  );
  const [rolesSekolah, setRolesSekolah] = useState(true);
  const roleTypes = userRole; // nanti bakal ngambil dari data login

  // Temp Data, kalo ada API, dihapus
  // const tingkatanKelas = [
  //   { id: 1, name: 'Kelas 1' },
  //   { id: 2, name: 'Kelas 2' },
  //   { id: 3, name: 'Kelas 3' },
  //   { id: 4, name: 'Kelas 4' },
  //   { id: 5, name: 'Kelas 5' },
  //   { id: 6, name: 'Kelas 6' },
  // ];
  // End of Temp Data

  const navDataSekolah = [
    { name: 'Dashboard', to: routes.HOME(), icon: faHome },
    {
      name: 'Kelas & Siswa',
      to: routes.SISWA(),
      icon: faChalkboardTeacher,
      tingkatanKelas,
    },
    {
      name: 'Mata Pelajaran',
      to: routes.MATPEL(),
      icon: faUser,
      tingkatanKelas,
    },
    { name: 'Guru', to: routes.GURU(), icon: faDoorOpen },
    { name: 'Pengaturan Nilai', to: routes.ATUR_NILAI(), icon: faBook },
    {
      name: 'Manajemen Data',
      to: routes.MANAJEMEN_DATA('tingkatan'),
      icon: faBook,
    },
  ];

  const navDataGuru = [
    { name: 'Dashboard', to: routes.HOME_GURU(), icon: faHome },
    {
      name: 'Kelas 1',
      to: `${routes.KELAS_GURU()}/1`,
      icon: faChalkboardTeacher,
    },
    // { name: 'Pengaturan Nilai', to: routes.ATUR_NILAI(), icon: faBook },
  ];

  const navData = rolesSekolah ? navDataSekolah : navDataGuru;

  const handleDropdown = (nav) => {
    if (nav === 'Kelas & Siswa') {
      if (dropdownSiswa === true) {
        setDropdownSiswa(false);
        return;
      }
      setDropdownSiswa(true);
      setDropdownMatpel(false);
    } else if (nav === 'Mata Pelajaran') {
      if (dropdownMatpel === true) {
        setDropdownMatpel(false);
        return;
      }
      setDropdownSiswa(false);
      setDropdownMatpel(true);
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    history.push(routes.LOGIN());
  };

  useEffect(() => {
    // Axios Abort Controller
    const source = axios.CancelToken.source();

    if (roleTypes === 'GURU') {
      setRolesSekolah(false);
    } else if (roleTypes === 'ADMIN') {
      setRolesSekolah(true);
    }

    if (tingkatanKelas.length === 0) {
      dispatch(getDataTingkatan(jwtToken, source));
    }

    // Cancel request on unmount
    return () => source.cancel();
  }, []);

  return (
    <>
      <aside className={styles.aside}>
        <aside>
          <div>
            <img src={LogoSekoola} alt="logo" />
          </div>
          <div>
            <i onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} />
            </i>
          </div>
        </aside>
        <section className={styles.navContainer}>
          <div className={styles.profile}>
            <div>
              <img alt="profile" src={profile} />
            </div>
            <div>
              <p>{userData.name}</p>
              <p>{userData.email}</p>
            </div>
          </div>
          <nav className={styles.navItem}>
            {navData.map((i, idx) => (
              <NavItem
                key={idx}
                data={i}
                dropdownData={
                  i.name === 'Kelas & Siswa'
                    ? dropdownSiswa
                    : i.name === 'Mata Pelajaran'
                    ? dropdownMatpel
                    : ''
                }
                handleDropdown={handleDropdown}
                pathname={pathname}
                firstPathName={firstPathName}
              />
            ))}
          </nav>
        </section>
      </aside>
      <main className={styles.main}>{children}</main>
    </>
  );
}

export function NavItem(props) {
  const { pathname, firstPathName, data, dropdownData, handleDropdown } = props;
  const getLoading = useSelector((state) => state.tingkatan.getLoading);
  const isActive =
    data.to === pathname.toLowerCase() || firstPathName === data.to.substr(1);
  const navigationLink =
    data.to !== routes.SISWA() && data.to !== routes.MATPEL() ? data.to : '#';

  const tingkatanContainerClasses = [
    styles.tingkatanContainer,
    dropdownData ? styles.dBlock : styles.dNone,
  ].join(' ');

  return (
    <>
      <Link
        className={isActive ? styles.active : ''}
        to={navigationLink}
        onClick={() => handleDropdown(data.name)}
      >
        <div>
          <FontAwesomeIcon icon={data.icon} />
          <p>{data.name}</p>
          {data.tingkatanKelas ? (
            <i>
              <FontAwesomeIcon icon={dropdownData ? faCaretUp : faCaretDown} />
            </i>
          ) : (
            ''
          )}
        </div>
      </Link>
      {data.tingkatanKelas && (
        <div className={tingkatanContainerClasses}>
          <div>
            {getLoading && <LoadingSpinner className={styles.spinner} />}
            {data.tingkatanKelas.length === 0 &&
              getLoading === false &&
              'Belum ada data'}
            {getLoading === false &&
              data.tingkatanKelas.map((tingkatan) => (
                <Link
                  key={tingkatan.id}
                  to={`${data.to}/${tingkatan.id}`}
                  className={
                    `${data.to}/${tingkatan.id}` === pathname.toLowerCase()
                      ? styles.activeSubNav
                      : ''
                  }
                >
                  {tingkatan.name}
                </Link>
              ))}
          </div>
        </div>
      )}
    </>
  );
}
