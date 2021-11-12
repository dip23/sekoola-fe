import './App.css';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { routes } from './configs/routes';

import { PageBase, PrivateRoute } from './components/layout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Admin Sekolah
const Home = React.lazy(() => import('./pages/Home'));
const Guru = React.lazy(() => import('./pages/DaftarGuru'));
const Siswa = React.lazy(() => import('./pages/DaftarSiswa'));
const MataPelajaran = React.lazy(() => import('./pages/MataPelajaran'));
const AturNilai = React.lazy(() => import('./pages/AturNilai'));
const ManageData = React.lazy(() => import('./pages/ManajemenData'));
// const KelasGuru = React.lazy(() => import('./pages/DaftarKelas')); // <--Jangan Lupa Hapus Dif
// import Home from './pages/Home';
// import Guru from './pages/DaftarGuru';
// import Siswa from './pages/DaftarSiswa';
// import MataPelajaran from './pages/MataPelajaran';
// import AturNilai from './pages/AturNilai';
// import ManageData from './pages/ManajemenData';

// Admin Guru
const HomeGuru = React.lazy(() => import('./pages/HomeGuru'));
const KelasGuru = React.lazy(() => import('./pages/KelasGuru'));

function App() {
  const userRole = useSelector((state) => state.auth.userData.role);

  console.log('rendered, App.js');

  return (
    <div className="App">
      <Suspense fallback={<div />}>
        <Router>
          <Switch>
            <PrivateRoute component={LoginPage} exact path={routes.LOGIN()} />
            <PrivateRoute
              component={RegisterPage}
              exact
              path={routes.REGISTER()}
            />
            <PageBase>
              {userRole === 'ADMIN' ? (
                <>
                  <PrivateRoute
                    component={Home}
                    exact
                    path={routes.HOME()}
                    authenticated
                  />
                  {/* <PrivateRoute <--- Jangan Lupa Dihapus Dif
                    component={KelasGuru}
                    exact
                    path={routes.KELAS_GURU()}
                    authenticated
                  />*/}
                  <PrivateRoute
                    component={Guru}
                    exact
                    path={routes.GURU()}
                    authenticated
                  />
                  <PrivateRoute
                    component={Siswa}
                    path={`${routes.SISWA()}/:idTingkatan`}
                    authenticated
                  />
                  <PrivateRoute
                    component={AturNilai}
                    exact
                    path={routes.ATUR_NILAI()}
                    authenticated
                  />
                  <PrivateRoute
                    component={MataPelajaran}
                    path={`${routes.MATPEL()}/:idTingkatan`}
                    authenticated
                  />
                  <PrivateRoute
                    component={ManageData}
                    exact
                    path={routes.MANAJEMEN_DATA()}
                    authenticated
                  />
                </>
              ) : userRole === 'GURU' ? (
                <>
                  <PrivateRoute
                    component={Home}
                    exact
                    path={routes.HOME_GURU()}
                    authenticated
                  />
                  <PrivateRoute
                    component={KelasGuru}
                    exact
                    path={`${routes.KELAS_GURU()}/:idKelas`}
                    authenticated
                  />
                </>
              ) : (
                '404 Page'
              )}
            </PageBase>
          </Switch>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
