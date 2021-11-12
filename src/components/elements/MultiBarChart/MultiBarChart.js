import React from 'react';
import { Bar } from 'react-chartjs-2';

export default function MultiBarChart() {
  return (
    <div>
      <Bar
        data={{
          labels: ['Tugas', 'Kuis', 'Ulangan', 'UTS', 'UAS'],
          datasets: [
            {
              label: "Rata-rata Siswa Lulus",
              data: [40, 30, 25, 35, 20],
              backgroundColor: '#0A3B5C',
              stack: 'Stack 0'
            },
            {
              label: "Rata-rata Siswa Tidak Lulus",
              data: [5, 15, 20, 15, 20],
              backgroundColor: '#FAB81E',
              stack: 'Stack 1'
            },
          ]
        }}
        height={300}
        width={600}
        options={{
          maintainAspectRatio: false,
          responsive: true,
          interaction: {
            intersect: false,
          },
          scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: true
            }
          }
        }}
      />
    </div>
  )
}
