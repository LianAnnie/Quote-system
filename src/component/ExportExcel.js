import ExcelJs from "exceljs";
import { ExportButton } from "./StyleComponent";
import PropTypes from "prop-types";

function ExportExcel({ data }) {
    function exportDataToExcel() {
        const workbook = new ExcelJs.Workbook();
        const sheet = workbook.addWorksheet("analysisData");

        sheet.addTable({
            name: "firstAnalysisData",
            ref: "A1",
            columns: [
                { name: "分析日期" },
                { name: "分析有效日期" },
                { name: "產品編號" },
                { name: "系列" },
                { name: "分析數量" },
                { name: "總成本" },
                { name: "幣別" },
            ],
            rows: [
                [
                    data.parentData.date,
                    data.parentData.valid,
                    data.parentData.id.join(""),
                    data.parentData.group,
                    data.parentData.quoteQty,
                    data.parentData.sum,
                    data.parentData.currency,
                ],
            ],
        });
        sheet.addTable({
            name: "firstAnalysisData",
            ref: "A3",
            columns: [{ name: "期望單價" }, { name: "對應利潤率(%)" }],
            rows: [
                [
                    data.parentData.expectedPrice,
                    data.parentData.caculatedMargin,
                ],
            ],
        });
        sheet.addTable({
            name: "firstAnalysisData",
            ref: "A5",
            columns: [{ name: "對應單價" }, { name: "期望利潤率(%)" }],
            rows: [
                [
                    data.parentData.caculatedPrice,
                    data.parentData.expoectedMargin,
                ],
            ],
        });
        sheet.addTable({
            name: "firstAnalysisData",
            ref: "A7",
            columns: [
                { name: "零件編號" },
                { name: "使用量" },
                { name: "單位" },
                { name: "零件報價數量" },
                { name: "單價" },
                { name: "幣別" },
                { name: "交期" },
                { name: "報價有效日期" },
                { name: "廠商編號" },
            ],
            rows: data.childData.map(e => [
                e.idP,
                e.qty,
                e.unit,
                e.inquiryQty,
                e.price,
                e.currency,
                e.leadTime,
                e.valid,
                e.idF,
            ]),
        });
        workbook.xlsx.writeBuffer().then(content => {
            const link = document.createElement("a");
            const blobData = new Blob([content], {
                type: "application/vnd.ms-excel;charset=utf-8;",
            });
            link.download = `analysus${new Date().toISOString()}.xlsx`;
            link.href = URL.createObjectURL(blobData);
            link.click();
        });
    }

    return (
        <ExportButton
            sx={{ fontSize: 50 }}
            onClick={() => exportDataToExcel()}
        />
    );
}

ExportExcel.propTypes = {
    data: PropTypes.object.isRequired,
};

export default ExportExcel;
