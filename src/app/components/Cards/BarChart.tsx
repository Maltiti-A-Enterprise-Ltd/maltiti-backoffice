// components/MyLineChart.tsx
'use client';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  PointElement,
  LineElement,
  BarElement,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register ChartJS components using ChartJS.register
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  BarElement,
);

// components/MyLineChart.tsx
// ...
ChartJS.register(CategoryScale /* ... */);
// ...
const BarChart = () => {
  return (
    <div>
      <Bar
        options={{
          maintainAspectRatio: true,
          aspectRatio: 1,
        }}
        data={{
          labels: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
          ],
          datasets: [
            {
              label: String(new Date().getFullYear()),
              backgroundColor: '#ed64a6',
              borderColor: '#ed64a6',
              data: [30, 78, 56, 34, 100, 45, 13],
              barThickness: 8,
            },
            {
              label: String(new Date().getFullYear() - 1),
              backgroundColor: '#4c51bf',
              borderColor: '#4c51bf',
              data: [27, 68, 86, 74, 10, 4, 87],
              barThickness: 8,
            },
          ],
        }}
      />
    </div>
  );
};
export default BarChart;
