import React, { useEffect, useState, useCallback } from 'react';
import Plotly from 'plotly.js-basic-dist';
import styled from 'styled-components';
import socket from '../utils/socket';

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  text-transform: none;
`;

export default function SalesDataChart() {
  let chart = React.createRef();

  const [sales, setSales] = useState([]);

  const createChart = useCallback(
    (data) => {
      const plot1 = {
        y: data,
        text: data,
        fill: 'tonexty',
        type: 'scatter',
        mode: 'lines',
        line: { shape: 'spline', smoothing: 1.3 }, //Smoothen the line
        marker: {
          color: '#d07aad',
          line: {
            width: 0,
          },
        },
        hovertemplate: `<b>%{text}%</b><extra></extra>`,
      };

      const plot = [plot1];
      const layout = {
        title: 'Market Sales',
        showlegend: false,
        margin: {
          pad: 0,
          r: 120,
          l: 120,
          t: 100,
          b: 20,
        },
        hoverlabel: { bgcolor: 'rgba(0,0,0,0.7)' },
        hovermode: 'closest',
        plot_bgcolor: '#fbfbfb',
        paper_bgcolor: '#fbfbfb',
        yaxis: {
          title: 'Sales percentages',
          tickfont: { size: 12 },
          ticksuffix: '%',
          showticklabels: true,
          showgrid: false,
          zeroline: true,
          showline: true,
          '#555': '#555',
          linewidth: 2,
          tickwidth: 1.5,
          ticklen: 10,
          tickcolor: '#555',
        },
        xaxis: {
          showticklabels: false,
          tickwidth: 0,
          showgrid: false,
          showline: false,
          linewidth: 2,
          zeroline: false,
          tickfont: { size: 12 },
        },
      };
      const config = {
        displayModeBar: false,
        displaylogo: false,
        responsive: true,
      };
      if (data.length < 1) {
        Plotly.newPlot(chart, { data: plot, layout, config });
      } else {
        Plotly.animate(
          chart,
          { data: plot, layout, config },
          {
            transition: {
              duration: 1000,
              easing: 'cubic-in-out',
            },
            frame: {
              duration: 1000,
            },
          },
        );
      }
    },
    [chart],
  );

  useEffect(() => {
    socket.on('sales', (data) => {
      setSales((prevSales) => [...prevSales, data]);
    });
  }, []);

  useEffect(() => {
    createChart(sales);
  }, [sales, createChart]);

  return <Container ref={(chartRef) => (chart = chartRef)} />;
}
