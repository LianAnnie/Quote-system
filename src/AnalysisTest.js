import styled from "styled-components";
import { useState, useEffect } from "react";
import api from "./utils/firebaseApi";
import { db } from "./utils/firebase";
import { query, collection, where, getDocs } from "firebase/firestore";
import SideBar from "./SideBar";
import mapData from "./utils/mapData";
// import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
// require("highcharts/modules/map")(Highcharts);
let Highcharts = require("highcharts/highmaps.js");
let topojson = require("@highcharts/map-collection/custom/world.topo.json");

const Container = styled.div`
    text-align: left;
`;
const Main = styled.div`
    margin-left: 300px;
    padding: 50px 2%;
`;
const Cost = styled.div`
    padding: 20px 10%;
`;
const Title = styled.div`
    margin-bottom: 20px;
`;

const Border = styled.div`
    border: solid 1px #000000;
    padding: 20px;
`;

const Table = styled.table`
    border: solid 1px #000000;
    padding: 20px;
`;

const Button = styled.div`
    border: solid 1px #000000;
    width: 70px;
    margin: 5px;
    text-align: center;
    cursor: pointer;
`;
const Th = styled.th`
    padding-right: 20px;
`;

const Td = styled.td`
    padding-right: 50px;
`;
const Flex = styled.div`
    display: flex;
`;

function AnalysisTest() {
    const [productList, setProductList] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState("");
    const [quotationData, setQuotationData] = useState([]);
    const [selectedQuote, setSelectedQuote] = useState([]);
    const [pieData, setPieData] = useState([["產品名稱", 100]]);
    console.log(mapData);

    useEffect(() => {
        getProductListFromFirebase();
    }, []);

    async function getQutationData(itemIndx) {
        const partList = productList[itemIndx].bomList.map(e => e.id);
        let quotationData = [];
        await Promise.all(
            partList.map(async partId => {
                const q = query(
                    collection(db, "partQuotations"),
                    where("id", "array-contains", partId),
                );
                const data = await getDocs(q);
                data.forEach(itemData => {
                    quotationData.push(itemData.data());
                });
            }),
        );
        //waiting review
        quotationData.map(e => (e.id = e.id.join("")));
        setQuotationData(quotationData);
        // const array = [...Array(quotationData.length)].map(e => e=false);
        // const array = quotationData.map(e => ({[e.id.join('')]: false}))
        // const array = quotationData.map(e => ({'id':e.id.join(''), 'status': false}))
        const array = quotationData.map(e => [e.id, false]);
        const object = Object.fromEntries(array);
        setSelectedQuote(object);
    }
    async function getSelectProductName(itemIndex) {
        const productName = productList[itemIndex].name;
        console.log(productName);
        const setArry = [[productName, 100]];
        setPieData(setArry);
    }
    async function getProductListFromFirebase() {
        const list = await api.getCompleteCollection("products");
        console.log(list);
        setProductList(list);
    }
    function changeSelectedQuoteState(e) {
        const id = e.target.value;
        const newObject = JSON.parse(JSON.stringify(selectedQuote));
        // console.log(newObject[id]);
        newObject[id] = !selectedQuote[id];
        // console.log(newObject[id]);
        setSelectedQuote(newObject);
    }
    function importSelectedQuote() {
        const importData = quotationData.filter(e => selectedQuote[e.id] && e);
        analysisData(importData);
    }
    function analysisData(data) {
        const totalPrice = data.reduce(
            (previousValue, currentValue) => previousValue + currentValue.price,
            0,
        );
        const getDataArray = data.map(e => [
            e.name,
            (e.price / totalPrice) * 100,
        ]);
        setPieData(getDataArray);
    }

    const data = [
        ["gl", 10],
        ["sh", 11],
        ["bu", 12],
        ["lk", 13],
        ["as", 14],
        ["dk", 15],
        ["fo", 16],
        ["gu", 17],
        ["mp", 18],
        ["um", 19],
        ["us", 20],
        ["vi", 21],
        ["ca", 22],
        ["st", 23],
        ["jp", 24],
        ["cv", 25],
        ["dm", 26],
        ["sc", 27],
        ["nz", 28],
        ["ye", 29],
        ["jm", 30],
        ["ws", 31],
        ["om", 32],
        ["in", 33],
        ["vc", 34],
        ["bd", 35],
        ["sb", 36],
        ["lc", 37],
        ["fr", 38],
        ["nr", 39],
        ["no", 40],
        ["fm", 41],
        ["kn", 42],
        ["cn", 43],
        ["bh", 44],
        ["to", 45],
        ["fi", 46],
        ["id", 47],
        ["mu", 48],
        ["se", 49],
        ["tt", 50],
        ["sw", 51],
        ["br", 52],
        ["bs", 53],
        ["pw", 54],
        ["ec", 55],
        ["au", 56],
        ["tv", 57],
        ["mh", 58],
        ["cl", 59],
        ["ki", 60],
        ["ph", 61],
        ["gd", 62],
        ["ee", 63],
        ["ag", 64],
        ["es", 65],
        ["bb", 66],
        ["it", 67],
        ["mt", 68],
        ["mv", 69],
        ["sp", 70],
        ["pg", 71],
        ["vu", 72],
        ["sg", 73],
        ["gb", 74],
        ["cy", 75],
        ["gr", 76],
        ["km", 77],
        ["fj", 78],
        ["ru", 79],
        ["va", 80],
        ["sm", 81],
        ["am", 82],
        ["az", 83],
        ["ls", 84],
        ["tj", 85],
        ["ml", 86],
        ["dz", 87],
        ["tw", 88],
        ["uz", 89],
        ["tz", 90],
        ["ar", 91],
        ["sa", 92],
        ["nl", 93],
        ["ae", 94],
        ["ch", 95],
        ["pt", 96],
        ["my", 97],
        ["pa", 98],
        ["tr", 99],
        ["ir", 100],
        ["ht", 101],
        ["do", 102],
        ["gw", 103],
        ["hr", 104],
        ["th", 105],
        ["mx", 106],
        ["kw", 107],
        ["de", 108],
        ["gq", 109],
        ["cnm", 110],
        ["nc", 111],
        ["ie", 112],
        ["kz", 113],
        ["ge", 114],
        ["pl", 115],
        ["lt", 116],
        ["ug", 117],
        ["cd", 118],
        ["mk", 119],
        ["al", 120],
        ["ng", 121],
        ["cm", 122],
        ["bj", 123],
        ["tl", 124],
        ["tm", 125],
        ["kh", 126],
        ["pe", 127],
        ["mw", 128],
        ["mn", 129],
        ["ao", 130],
        ["mz", 131],
        ["za", 132],
        ["cr", 133],
        ["sv", 134],
        ["bz", 135],
        ["co", 136],
        ["kp", 137],
        ["kr", 138],
        ["gy", 139],
        ["hn", 140],
        ["ga", 141],
        ["ni", 142],
        ["et", 143],
        ["sd", 144],
        ["so", 145],
        ["gh", 146],
        ["ci", 147],
        ["si", 148],
        ["gt", 149],
        ["ba", 150],
        ["jo", 151],
        ["sy", 152],
        ["we", 153],
        ["il", 154],
        ["eg", 155],
        ["zm", 156],
        ["mc", 157],
        ["uy", 158],
        ["rw", 159],
        ["bo", 160],
        ["cg", 161],
        ["eh", 162],
        ["rs", 163],
        ["me", 164],
        ["tg", 165],
        ["mm", 166],
        ["la", 167],
        ["af", 168],
        ["jk", 169],
        ["pk", 170],
        ["bg", 171],
        ["ua", 172],
        ["ro", 173],
        ["qa", 174],
        ["li", 175],
        ["at", 176],
        ["sk", 177],
        ["sz", 178],
        ["hu", 179],
        ["ly", 180],
        ["ne", 181],
        ["lu", 182],
        ["ad", 183],
        ["lr", 184],
        ["sl", 185],
        ["bn", 186],
        ["mr", 187],
        ["be", 188],
        ["iq", 189],
        ["gm", 190],
        ["ma", 191],
        ["td", 192],
        ["kv", 193],
        ["lb", 194],
        ["sx", 195],
        ["dj", 196],
        ["er", 197],
        ["bi", 198],
        ["sn", 199],
        ["gn", 200],
        ["zw", 201],
        ["py", 202],
        ["by", 203],
        ["lv", 204],
        ["bt", 205],
        ["na", 206],
        ["bf", 207],
        ["ss", 208],
        ["cf", 209],
        ["md", 210],
        ["gz", 211],
        ["ke", 212],
        ["bw", 213],
        ["cz", 214],
        ["pr", 215],
        ["tn", 216],
        ["cu", 217],
        ["vn", 218],
        ["mg", 219],
        ["ve", 220],
        ["is", 221],
        ["np", 222],
        ["sr", 223],
        ["kg", 224],
    ];

    const options = {
        chart: {
            map: topojson,
        },
        title: {
            text: "地圖",
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
                data: data,
                name: "Random data",
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

    const options2 = {
        chart: {
            type: "column",
        },
        title: {
            text: "供應商比價",
        },
        xAxis: {
            categories: [50, 200, 500, 1000],
            crosshair: true,
        },
        yAxis: {
            min: 0,
            title: {
                text: "NT",
            },
        },
        tooltip: {
            headerFormat:
                '<span style="font-size:10px">{point.key}</span><table>', //標示廠商
            pointFormat:
                '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
            footerFormat: "</table>",
            shared: true,
            useHTML: true,
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0,
            },
        },
        credits: {
            enabled: false,
        },
        series: [
            {
                name: "Shine",
                data: [150, 80, 70, 50],
            },
            {
                name: "Slite",
                data: [0, 0, 130, 100],
            },
        ],
    };

    const options3 = {
        chart: {
            zoomType: "xy",
        },
        title: {
            text: "產品利潤比",
        },
        xAxis: {
            categories: [2015, 2016, 2017, 2018, 2019, 2020, 2021],
            crosshair: true,
        },
        yAxis: [
            {
                // 第一条Y轴
                labels: {
                    format: "{value} NT",
                    style: {
                        color: Highcharts.getOptions().colors[1],
                    },
                },
                title: {
                    text: "產品單價",
                    style: {
                        color: Highcharts.getOptions().colors[1],
                    },
                },
            },
            {
                // 第二条Y轴
                title: {
                    text: "利潤率",
                    style: {
                        color: Highcharts.getOptions().colors[0],
                    },
                },
                labels: {
                    format: "{value}%",
                    style: {
                        color: Highcharts.getOptions().colors[0],
                    },
                },
                opposite: true,
            },
        ],
        tooltip: {
            shared: true,
        },
        legend: {
            layout: "vertical",
            align: "left",
            x: 120,
            verticalAlign: "top",
            y: 100,
            floating: true,
            backgroundColor:
                (Highcharts.theme && Highcharts.theme.legendBackgroundColor) ||
                "#FFFFFF",
        },
        series: [
            {
                name: "利潤率",
                type: "column",
                yAxis: 1,
                data: [20, 25, 13.2, 15, 20, 22, 24],
                tooltip: {
                    valueSuffix: "%",
                },
            },
            {
                name: "產品單價",
                type: "spline",
                data: [50, 70, 70, 75, 80, 85, 100],
                tooltip: {
                    valueSuffix: "NT",
                },
            },
        ],
    };

    return (
        <Container>
            <SideBar />
            <Main>
                <Cost>
                    <Border>
                        <HighchartsReact
                            highcharts={Highcharts}
                            constructorType={"mapChart"}
                            options={options}
                        />
                    </Border>
                    <Border>
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={options2}
                        />
                    </Border>
                    <Border>
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={options3}
                        />
                    </Border>
                    <Title>成本分析</Title>
                    <select
                        onChange={e => {
                            setSelectedProduct(e.target.value);
                        }}
                        value={selectedProduct}
                    >
                        {selectedProduct === "" && (
                            <option value={0}>請選擇</option>
                        )}
                        {productList &&
                            productList.map((e, index) => (
                                <option key={index} value={index}>
                                    {e.name}
                                </option>
                            ))}
                    </select>
                    <Table>
                        <thead>
                            <tr>
                                <Th>報價單號</Th>
                                <Th>零件名稱</Th>
                                <Th>處理工藝</Th>
                                <Th>零件材質</Th>
                                <Th>表面處理</Th>
                                <Th>報價數量</Th>
                                <Th>零件單位</Th>
                                <Th>零件單價</Th>
                                <Th>貨幣</Th>
                                <Th>供應商</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {quotationData &&
                                quotationData.map(e => (
                                    <tr key={e.id}>
                                        <Td>{e.id}</Td>
                                        <Td>{e.name}</Td>
                                        <Td>{e.type}</Td>
                                        <Td>{e.material}</Td>
                                        <Td>{e.finish}</Td>
                                        <Td>{e.qty}</Td>
                                        <Td>{e.unit}</Td>
                                        <Td>{e.price}</Td>
                                        <Td>{e.currency}</Td>
                                        <Td>{e.company}</Td>
                                        <Td>
                                            <input
                                                type="checkbox"
                                                value={e.id}
                                                onChange={e =>
                                                    changeSelectedQuoteState(e)
                                                }
                                                checked={selectedQuote.value}
                                            />
                                        </Td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                    <Button onClick={() => importSelectedQuote()}>
                        Import
                    </Button>
                </Cost>
            </Main>
        </Container>
    );
}

export default AnalysisTest;
