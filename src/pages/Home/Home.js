import React from 'react';
import styles from './styles.module.css';
import profile from '../../assets/profile-img.jpg';
import { useSelector } from 'react-redux';
import { MultiBarChart } from '../../components/elements';

export default function Home() {
  const userData = useSelector((state) => state.auth.userData);
  const isGuru = userData.role === "GURU";

  return (
    <div className={styles.root}>
      <h1>Dashboard</h1>
      <div>
        <div className={styles.left}>
          <div className={styles.chart}>
            <p>Grafik Pembelajaran</p>
          </div>
          <div className={styles.chart}>
            <p>Grafik Kelulusan Nilai Siswa</p>
            <MultiBarChart />
          </div>
        </div>
        <div className={styles.right}>
          <div>
            <div className={styles.profileImage}>
              <img src={profile} alt="Profile" />
            </div>
            <div className={styles.profileDesc}>
              <p>{userData.name}</p>
              <p>{userData.email}</p>
            </div>
          </div>
          <div>
            {isGuru ? (
              <>
                <p>Jadwal Harian</p>
              </>
            ) : (
              <>
                <p>Data Sekolah</p>
                <div className={styles.cardDataContainer}>
                  <div className={styles.cardData}>
                    <p>Kelas</p>
                    <p>18</p>
                  </div>
                  <div className={styles.cardData}>
                    <p>Siswa</p>
                    <p>400</p>
                  </div>
                </div>
                <div className={styles.cardDataContainer}>
                  <div className={styles.cardData}>
                    <p>Pelajaran</p>
                    <p>55</p>
                  </div>
                  <div className={styles.cardData}>
                    <p>Guru</p>
                    <p>30</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
