import React from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js'
type BarChartProp = {
  data: any
};
const BarChart = ({ data }: BarChartProp) => {
  const userData = {
    labels: data.map((ddata: any) => ddata.adId),
    datasets: [
      {
        label: "No of Clicks",
        data: data.map((ddata: any) => String(ddata.data.platformClicks)),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 0,
      },
      {
        label: "No of Impressions",
        data: data.map((ddata: any) => Number(String(ddata.data.platformImpressions))),
        backgroundColor: [
          "rgba(255,255,255,255)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 0,
      }]
  };
  Chart.register(...registerables);
  return (
    <div className='w-[800px] h-[300px]'>
      <Bar data={userData}
        options={{
          plugins: {  // 'legend' now within object 'plugins {}'
            legend: {
              labels: {
                color: "#ffffe0",
              }
            }
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Advertisement Id',
                color: "#ffffe0",
              }
            }
          }
        }} />
    </div>
  )
}

export default BarChart