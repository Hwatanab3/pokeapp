import { Chart, Filler, Legend, LineElement, PointElement, RadialLinearScale, Tooltip } from 'chart.js'
import { toLineHeight } from 'chart.js/helpers';
import React from 'react'
import { Radar } from 'react-chartjs-2'

const PokeRadar = ({ pokemon }) => {

    const valuePlugin = {
        id: 'valuePlugin',
        afterDatasetsDraw: function (chart, args, options) {
            const ctx = chart.ctx;
            const maxValue = 150;
            chart.data.datasets.forEach((dataset, i) => {
                const meta = chart.getDatasetMeta(i);
                meta.data.forEach((element, index) => {
                    ctx.fillStyle = options.textColor || 'black';
                    ctx.font = options.font || '12px system-ui';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';

                    const value = dataset.data[index];
                    const displayValue = `${value}/${maxValue}`;
                    ctx.fillText(displayValue, element.x, element.y);
                });
            });
        }
    };

    Chart.register(
        RadialLinearScale,
        PointElement,
        LineElement,
        Filler,
        Tooltip,
        Legend,
        valuePlugin,
    );

    const statValue = pokemon?.stats.map(stat => (`${stat.base_stat}`));

    const data = {
        labels: ["Hp", "Att", "Def", "S. Att", "S. Def", "Spd"],
        datasets: [
            {
                label: 'stat',
                data: statValue,
                backgroundColor: "#F10B3150",
                borderColor: '#F10B31',
                borderWidth: 1,
            }
        ]
    }

    const options = {
        plugins: {
            legend: {
                display: false,
            },
            valuePlugin: {
                textColor: '#444444',
                font: '10px system-ui',
                maxValue: 150,
            }
        },
        scales: {
            r: {
                beginAtZero: true,
                min: 0,
                max: 150,
                angleLines: {
                    borderDash: [0, 25, 150],
                    lineWidth: .8,
                    color: '#ababab',
                },
                grid: {
                    lineWidth: .5,
                    color: '#ababab',
                },
                pointLabels: {
                    display: true,
                    font: {
                        size: 9,
                        family: "Pixelify Sans",
                        style: 'normal',
                        weight: 'bold',
                        toLineHeight: 1.2,
                        color: '#444444',
                    },
                    padding: 5
                },
                ticks: {
                    display: false,
                    stepSize: 25,
                    font: {
                        size: 6,
                        backdropColor: 'rgba(0,0,0,0)',
                    }
                },
            },
        }
    }


    return (
        <div className='pokeinfo__radar'>
            <Radar
                data={data}
                options={options}
            />
        </div>
    )
}

export default PokeRadar;