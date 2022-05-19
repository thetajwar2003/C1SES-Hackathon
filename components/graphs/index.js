import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export { default as Options } from './Options';

export default ReactApexChart;
