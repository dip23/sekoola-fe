export const routes = {
  // Admin Sekolah
  HOME: () => {
    return `/`;
  },
  KELAS_GURU: () => {
    return `/kelas`;
  },
  MATPEL_GURU: (kelas, matpel) => {
    return `/kelas/${kelas}?matpel=${matpel}`
  },
  DAFTAR_NILAI: () => {
    return `/list-nilai`;
  },
  JADWAL: () => {
    return `/jadwal`;
  },
  KUSTOM_NILAI: () => {
    return `/kustom-nilai`;
  },
  UPLOAD_NILAI: () => {
    return `/upload-nilai`;
  },
  GURU: () => {
    return `/guru`;
  },
  DETAIL_GURU: (id) => {
    return `/guru?id=${id}`;
  },
  SISWA: () => {
    return `/siswa`;
  },
  DETAIL_SISWA: (idTingkatan, idSiswa) => {
    return `/siswa/${idTingkatan}?siswa=${idSiswa}`;
  },
  MATPEL: () => {
    return `/mata-pelajaran`;
  },
  DETAIL_MATPEL: (idTingkatan, idMatpel) => {
    return `/mata-pelajaran/${idTingkatan}?mata-pelajaran=${idMatpel}`;
  },
  ATUR_NILAI: () => {
    return `/pengaturan-nilai`;
  },
  MANAJEMEN_DATA: () => {
    return `/manage`;
  },
  LOGIN: () => {
    return `/login`;
  },
  REGISTER: () => {
    return `/register`;
  },
  // End of Admin Sekolah

  // Admin Guru
  HOME_GURU: () => {
    return `/`;
  },
  // End of Admin Guru
};
