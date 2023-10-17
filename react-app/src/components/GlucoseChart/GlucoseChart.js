import React from 'react'
import Chart from "react-apexcharts";

import './GlucoseChart.css'


function GlucoseChart({ dates, levels }) {

    let options = {
        chart: {
            id: 'line-chart',
            animations: {
                enabled: false
            },
            height: '100%',
            toolbar: {
                show: false
            }
        },
        xaxis: {
            categories: dates,
            labels: {
                show: false,
            },
            axisBorder: {
                show: false
            },
        },
        yaxis: {
            labels: {
                show: false,
            },
            axisBorder: {
                show: false
            },
        },
        colors: '#1AACAC',
        stroke: {
            show: true,
            curve: 'straight',
            width: 1.5,
        },
        grid: {
            show: false
        },
        tooltip: {
            enabled: true,
            marker: {
                show: true
            },
        }

    }

        const series = [
            {
                name: 'levels',
                data: levels
            }
        ]
    


    return (
        <Chart
            options={options}
            series={series}
            type="line"
            width="100%"
            height='400px'
        />
    )
}

export default GlucoseChart