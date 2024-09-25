import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registrar os componentes
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface PopulationData {
  year: number;
  value: number;
}

interface PopulationChartProps {
  data?: PopulationData[];
}

const PopulationChart = ({ data }: PopulationChartProps) => {
  const chartData = {
    labels: data?.map((point) => point.year),
    datasets: [
      {
        label: "Population Over Time",
        data: data?.map((point) => point.value),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div>
      <h2>População ao longo do tempo</h2>
      <Line data={chartData} />
    </div>
  );
};

export default PopulationChart;
