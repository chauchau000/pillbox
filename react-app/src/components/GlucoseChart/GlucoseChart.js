import React from 'react'
import Chart from "react-apexcharts";

import './GlucoseChart.css'




function GlucoseChart({ dates, levels }) {


    let options = {
        title: {
            text: "Glucose Chart",
            align: 'center',
            marign: 0,
            style: {
                fontSize: '24px',
                fontWeight: 'bold',
                fontFamily: "Poppins, sans-serif",
                color: '#263238'
            },
            floating: false,

            offsetY: 20,
        },
        chart: {
            id: 'line-chart',
            height: '100%',
            toolbar: {
                show: false
            },
        },
        xaxis: {
            categories: dates,
            axisBorder: {
                show: true
            },
            tickAmount: 20,
            labels: {
                formatter: function (value) {
                    // Format the value to display only the month and date
                    const date = new Date(value);
                    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                },
                offsetY: 8,

            },

        },
        yaxis: {
            labels: {
                show: true,
            },
            axisBorder: {
                show: true
            },
            min: 60,
            max: 270
        },
        colors: ['#1AACAC'],
        stroke: {
            show: true,
            curve: 'smooth',
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
            custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                return '<div class="arrow_box">' +
                    '<span>' + series[seriesIndex][dataPointIndex] + '</span>' +
                    '</div>'
            }
        },
        annotations: {
            yaxis: [
                {
                    y: 90,
                    strokeDashArray: 3,
                    borderColor: "#000000",
                    label: {
                        // borderColor: "rgb(0,0,0,0)",
                        text: "min"
                    }
                },
                {
                    y: 250,
                    strokeDashArray: 3,
                    borderColor: "#000000",
                    label: {
                        // borderColor: "rgb(0,0,0,0)",
                        text: "max"
                    }
                }
            ]
        },


    }

    const series = [
        {
            data: levels
        }
    ]

    // console.log('dates: ', options.xaxis.categories)
    // console.log('levels: ', series)

    return (
        <Chart
            options={options}
            series={series}
            type="line"
            height="100%"
            width="100%"

        />
    )
}

export default GlucoseChart