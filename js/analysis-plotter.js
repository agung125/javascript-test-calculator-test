'use strict';

/**
 * Plot result from the beam analysis calculation into a graph
 */
function AnalysisPlotter () {}

AnalysisPlotter.prototype = {
    plot: function (canvasId, equation) {
        const canvas = document.getElementById(canvasId);
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        const numPoints = 100;

        const data = [];
        for (let i = 0; i <= numPoints; i++) {
            const x = (i / numPoints) * width;
            const y = equation(x / width * canvas.width).y;
            data.push({x: x, y: height / 2 - y});
        }

        const chartData = {
            labels: data.map(point => point.x),
            datasets: [{
                label: 'Beam Analysis',
                data: data.map(point => point.y),
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                fill: false,
            }]
        };

        new Chart(ctx, {
            type: 'line',
            data: chartData,
            options: {
                scales: {
                    x: {
                        type: 'linear',
                        position: 'bottom'
                    },
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
};
