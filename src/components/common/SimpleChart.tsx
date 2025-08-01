import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

interface ChartData {
  labels: string[];
  datasets: {
    label?: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
  }[];
}

interface ChartProps {
  data: ChartData;
  type: 'bar' | 'pie' | 'line';
  height?: number;
  title?: string;
}

const defaultColors = [
  'hsl(222, 84%, 33%)', // primary
  'hsl(142, 76%, 36%)', // success
  'hsl(32, 95%, 44%)', // warning
  'hsl(0, 84%, 60%)', // destructive
  'hsl(210, 40%, 96%)', // secondary
  'hsl(215, 16%, 47%)', // muted
];

export function SimpleChart({ data, type, height = 300, title }: ChartProps) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'hsl(222, 84%, 5%)',
          font: {
            size: 12
          }
        }
      },
      title: {
        display: !!title,
        text: title,
        color: 'hsl(222, 84%, 5%)',
        font: {
          size: 16,
          weight: 'bold' as const
        }
      },
    },
    scales: type !== 'pie' ? {
      y: {
        beginAtZero: true,
        ticks: {
          color: 'hsl(215, 16%, 47%)'
        },
        grid: {
          color: 'hsl(214, 32%, 91%)'
        }
      },
      x: {
        ticks: {
          color: 'hsl(215, 16%, 47%)'
        },
        grid: {
          color: 'hsl(214, 32%, 91%)'
        }
      }
    } : undefined,
  };

  // Add default colors if not provided
  const enhancedData = {
    ...data,
    datasets: data.datasets.map((dataset, index) => ({
      ...dataset,
      backgroundColor: dataset.backgroundColor || (type === 'pie' ? defaultColors : defaultColors[index % defaultColors.length]),
      borderColor: dataset.borderColor || defaultColors[index % defaultColors.length],
      borderWidth: dataset.borderWidth || (type === 'pie' ? 2 : 1),
    }))
  };

  const chartStyle = { height: `${height}px` };

  switch (type) {
    case 'bar':
      return (
        <div style={chartStyle}>
          <Bar data={enhancedData} options={options} />
        </div>
      );
    case 'pie':
      return (
        <div style={chartStyle}>
          <Pie data={enhancedData} options={options} />
        </div>
      );
    case 'line':
      return (
        <div style={chartStyle}>
          <Line data={enhancedData} options={options} />
        </div>
      );
    default:
      return null;
  }
}