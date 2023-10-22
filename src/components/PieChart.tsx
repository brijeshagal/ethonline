import React, { useEffect } from "react";
import { Doughnut, Pie } from "react-chartjs-2";
import { Chart, ArcElement } from 'chart.js'

type PieChartData = {
    chartData: any
}

function PieChart({ chartData }: PieChartData) {
    const [chartLoaded, setChartLoaded] = React.useState(false);
    Chart.register(ArcElement);
    return (
        <div className="w-[100px] h-[100px]">
            <Doughnut data={{
                datasets: [
                    {
                        data: [30, 70],
                        backgroundColor: [
                            "#F8219F",
                            "rgba(248, 33, 159, 0.2)",
                        ],
                        hoverBackgroundColor: [
                            "#F8219F",
                            "rgba(248, 33, 159, 0.2)",
                        ],
                        borderWidth: 1,
                    },
                ],
            }} />          
        </div>
    );
}

export default PieChart;