import { Flex, Border, Section } from "./StyleComponent";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import more from "highcharts/highcharts-more";
more(Highcharts);
require("highcharts/modules/solid-gauge")(Highcharts);

function Drawing({ profitMargin, pieData }) {
    console.log(profitMargin, pieData);
    const gaugeOptions = {
        chart: {
            type: "solidgauge",
            width: 300,
        },
        title: null,
        pane: {
            center: ["50%", "85%"],
            size: "100%",
            startAngle: -90,
            endAngle: 90,
            background: {
                backgroundColor:
                    Highcharts.defaultOptions.legend.backgroundColor || "#EEE",
                innerRadius: "60%",
                outerRadius: "100%",
                shape: "arc",
            },
        },

        exporting: {
            enabled: false,
        },

        tooltip: {
            enabled: false,
        },

        // the value axis
        yAxis: {
            stops: [
                [0.1, "#55BF3B"], // green
                [0.5, "#DDDF0D"], // yellow
                [0.9, "#DF5353"], // red
            ],
            lineWidth: 0,
            tickWidth: 0,
            minorTickInterval: null,
            tickAmount: 2,
            title: {
                y: -70,
            },
            labels: {
                y: 16,
            },
        },

        plotOptions: {
            solidgauge: {
                dataLabels: {
                    y: 5,
                    borderWidth: 0,
                    useHTML: true,
                },
            },
        },
        yAxis: {
            min: -100,
            max: 100,
            title: {
                text: "利潤率",
            },
        },
        credits: {
            enabled: false,
        },
        series: [
            {
                name: "利潤率",
                data: [profitMargin],
                dataLabels: {
                    format:
                        '<div style="text-align:center">' +
                        '<span style="font-size:25px">{y}</span><br/>' +
                        '<span style="font-size:12px;opacity:0.4">％</span>' +
                        "</div>",
                },
                tooltip: {
                    valueSuffix: "%",
                },
            },
        ],
    };
    const options = {
        chart: {
            type: "pie", //"pie","column"
            width: 300,
        },
        title: {
            text: "",
        },
        series: [
            {
                allowPointSelect: true,
                size: "60%",
                innerSize: "30%",
                data: pieData,
            },
        ],
    };

    return (
        <Border>
            <HighchartsReact
                highcharts={Highcharts}
                options={gaugeOptions}
                containerProps={{ className: "chart-container" }}
            />

            <HighchartsReact highcharts={Highcharts} options={options} />
        </Border>
    );
}

export default Drawing;
