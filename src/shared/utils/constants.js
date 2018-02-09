/**
 * 定义系统中的常量,集中在此管理
 */

const isProduction = process.env.NODE_ENV === "production";

const ECHARTS_DEFULT_OPTION = {
  tooltip: {
    trigger: "axis",
  },
  legend: {},
  xAxis: {
    type: "category",
  },
  yAxis: [
    {
      type: "value",
      name: "数量",
      nameTextStyle: {
        color: "#000000a6",
      },
      splitLine: { show: false },
    },
    {
      type: "value",
      splitLine: { show: false },
      name: "百分比",
      min: 0,
      max: 100,
      interval: 20,
      axisLabel: {
        formatter: "{value} %",
      },
      nameTextStyle: {
        color: "#000000a6",
      },
    },
  ],
  series: [],
};

export { isProduction, ECHARTS_DEFULT_OPTION };
