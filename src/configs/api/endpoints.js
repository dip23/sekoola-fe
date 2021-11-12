// const baseUrl = 'http://localhost:3001';
const baseUrl = 'https://sekoola-backend.herokuapp.com'

export const loginApi = `${baseUrl}/user/login`;
export const registSekolahApi = `${baseUrl}/user/register/sekolah`; // admin sekolah
export const registGuruApi = `${baseUrl}/user/register/guru`; // guru
// export const registGuruApi = `${baseUrl}/admin/dbmanagement/teacher/register`; // guru

// Endpoints Manajemen Database
export const tingkatanApi = `${baseUrl}/admin/dbmanagement/grade`; // grade/tingkatan
export const baseClassApi = `${baseUrl}/admin/dbmanagement/class`; // class/kelas
export const baseCourseApi = `${baseUrl}/admin/dbmanagement/course`; // course/matpel
export const baseStudentApi = `${baseUrl}/admin/dbmanagement/student`; // student

// Endpoints Page
export const studentPageApi = `${baseUrl}/admin/students/class`; // data kelas page
export const coursePageApi = `${baseUrl}/admin/courses/grade`; // matpel page
export const teacherPageApi = `${baseUrl}/admin/teachers`; // daftar guru page

// Score Settings Page
export const scoreCategoryApi = `${baseUrl}/admin/score/config`; // kognitif
export const scoreAspectApi = `${baseUrl}/admin/score/cognitive`; // afektif - aspek penilaian
