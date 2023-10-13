// components/MyLineChart.tsx
'use client';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  PointElement,
  LineElement,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register ChartJS components using ChartJS.register
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
);

// components/MyLineChart.tsx
// ...
ChartJS.register(CategoryScale /* ... */);
// ...
const MyLineChart = () => {
  return (
    <div>
      <Line
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
              backgroundColor: '#4c51bf',
              borderColor: '#4c51bf',
              data: [65, 78, 66, 44, 56, 67, 75],
              fill: false,
            },
            {
              label: String(new Date().getFullYear() - 1),
              fill: false,
              backgroundColor: '#fff',
              borderColor: '#fff',
              data: [40, 68, 86, 74, 56, 60, 87],
            },
          ],
        }}
      />
    </div>
  );
};
export default MyLineChart;
