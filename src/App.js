import React, { useEffect } from "react";
import Plotly from "plotly.js-basic-dist";
import styled from "styled-components";
import data from "./data.json";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  text-transform: none;
`;

export default function SalesAndInventoryPenetrationChart(props) {
  const { title, lineColor, labeled } = props;
  let chart = React.createRef();
  const createChart = () => {
    const {
      salesPenetration = [],
      inventoryPenetration = [],
      timePeriod = []
    } = data || {};

    const salesPenetrationPlot = {
      x: timePeriod,
      y: salesPenetration,
      text: inventoryPenetration,
      type: "scatter",
      name: "Sales Penetration",
      mode: "lines",
      marker: {
        color: "#0c92e0",
        line: {
          width: 0
        }
      },
      hovertemplate:
        "<b>%{x}</b><br><br>" +
        "Sales Penetration: %{y:.2f}%<br>" +
        "Inventory Penetration: %{text:,.2f}%" +
        "<extra></extra>"
    };

    const inventoryPenetrationPlot = {
      x: timePeriod,
      y: inventoryPenetration,
      type: "scatter",
      mode: "lines",
      name: "Inventory Penetration",
      yaxis: "y2",
      hoverinfo: "skip",
      marker: {
        color: "#0c92e0"
      },
      line: {
        dash: "dot",
        width: 2
      }
    };

    const plot = [salesPenetrationPlot, inventoryPenetrationPlot];

    const rangeSlider = labeled
      ? {
          autorange: true,
          rangeslider: {
            range: [timePeriod[0], timePeriod[timePeriod.length - 1]]
          }
        }
      : {};

    const labeledLayout = labeled
      ? {
          title,
          showlegend: true,
          legend: {
            orientation: "h",
            yanchor: "bottom",
            xanchor: "center",
            y: 1.05,
            x: 0.5,
            font: {
              size: 12,
              color: "#6D6C6C",
              family: "Rubik, sans-serif"
            }
          },
          margin: {
            pad: 0,
            r: 120,
            l: 100,
            t: title ? 100 : 0,
            b: 20
          }
        }
      : {
          margin: {
            pad: 0,
            r: 0,
            l: 0,
            t: 0,
            b: 0
          }
        };

    const layout = {
      ...labeledLayout,
      showlegend: labeled,
      font: {
        family: "Rubik, sans-serif"
      },
      hoverlabel: { bgcolor: "rgba(0,0,0,0.7)" },
      hovermode: "closest",
      plot_bgcolor: "#fbfbfb",
      paper_bgcolor: "#fbfbfb",
      yaxis: {
        title: labeled
          ? {
              text: "Sales Penetration",
              standoff: 10,
              font: {
                size: 14,
                color: "#585858"
              }
            }
          : null,
        tickfont: { size: 12 },
        ticksuffix: "%",
        showticklabels: labeled,
        showgrid: false,
        zeroline: labeled,
        showline: labeled,
        linecolor: lineColor,
        linewidth: 2,
        tickwidth: labeled ? 1.5 : 0,
        ticklen: labeled ? 10 : 0,
        tickcolor: lineColor
      },
      yaxis2: {
        title: labeled
          ? {
              text: "Inventory Penetration",
              standoff: 20,
              font: {
                size: 14,
                color: "#585858"
              }
            }
          : null,
        tickfont: { size: 12 },
        ticksuffix: "%",
        showticklabels: labeled,
        showgrid: false,
        zeroline: labeled,
        showline: labeled,
        linecolor: lineColor,
        overlaying: "y",
        side: "right",
        linewidth: 2,
        tickwidth: labeled ? 1.5 : 0,
        ticklen: labeled ? 10 : 0,
        tickcolor: lineColor
      },
      xaxis: {
        showticklabels: true,
        tickwidth: 1,
        showgrid: false,
        showline: labeled,
        linecolor: lineColor,
        linewidth: 2,
        zeroline: false,
        tickfont: { size: 12 },
        ...rangeSlider
      }
    };
    const config = {
      displayModeBar: false,
      displaylogo: false,
      responsive: true
    };
    Plotly.newPlot(chart, { data: plot, layout, config });
  };

  useEffect(() => {
    createChart();
  }, []);

  return <Container ref={chartRef => (chart = chartRef)} />;
}

SalesAndInventoryPenetrationChart.defaultProps = {
  data: {},
  lineColor: "#aaaaaa",
  labeled: true,
  delay: false // This prop allows delaying the chart rendering
};
