import {
    Container,
    Main,
    Section,
    Title,
    Border,
} from "./component/StyleComponent";
import { useState, useEffect } from "react";
import data from "./utils/data";
import api from "./utils/firebaseApi";
import HighchartsReact from "highcharts-react-official";
let Highcharts = require("highcharts/highmaps.js");
let topojson = require("@highcharts/map-collection/custom/world.topo.json");

function Overview({ signOut }) {
    const [mapData, setMapData] = useState([]);

    useEffect(() => {
        getListFromFirebase();
    }, []);

    async function getListFromFirebase() {
        const firebaseData = await api.getCompleteCollection("order");
        const mapData = firebaseData.map(e => {
            console.log(data.exchangeData[e.currency]);
            return [
                e.id[0].slice(1, 3).toLowerCase(),
                Number(e.qty) * Number(e.price),
                Number(data.exchangeData[e.currency.split(",")[0]]),
            ];
        });
        console.log(mapData);
        setMapData(sumOrderPrice(mapData));
    }

    function sumOrderPrice(parameterData) {
        if (parameterData !== undefined) {
            if (parameterData.length > 0) {
                const country = parameterData.map(e => e[0]);
                const countryWithUniqueness = [...new Set(country)];
                const orderSum = countryWithUniqueness.map(e =>
                    Math.floor(
                        parameterData
                            .filter(m => m[0] === e)
                            .reduce((sum, n) => sum + n[1] / n[2], 0),
                    ),
                );
                const mapData = countryWithUniqueness.map((e, index) => [
                    e,
                    orderSum[index],
                ]);
                console.log(mapData);
                return mapData;
            }
        }
    }

    const options = {
        chart: {
            map: topojson,
        },
        title: {
            text: "銷售概覽",
        },
        mapNavigation: {
            enabled: true,
            buttonOptions: {
                verticalAlign: "bottom",
            },
        },
        colorAxis: {
            min: 0,
        },
        series: [
            {
                data: mapData,
                name: "sales",
                states: {
                    hover: {
                        color: "#BADA55",
                    },
                },
                dataLabels: {
                    enabled: true,
                    format: "{point.name}",
                },
            },
        ],
    };

    return (
        <Container>
            <Main>
                <Section>
                    <Title>銷售概覽</Title>
                    <Border>
                        <HighchartsReact
                            highcharts={Highcharts}
                            constructorType={"mapChart"}
                            options={options}
                        />
                    </Border>
                </Section>
            </Main>
        </Container>
    );
}
export default Overview;
