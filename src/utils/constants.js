/**
 * Date              Author           Des
 *----------------------------------------------
 * 18-3-22           gongtiexin       常量
 * */
const browserRedirect = () => {
  const sUserAgent = navigator.userAgent.toLowerCase();
  const bIsIpad = sUserAgent.match(/ipad/i) === "ipad";
  const bIsIphoneOs = sUserAgent.match(/iphone os/i) === "iphone os";
  const bIsMidp = sUserAgent.match(/midp/i) === "midp";
  const bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) === "rv:1.2.3.4";
  const bIsUc = sUserAgent.match(/ucweb/i) === "ucweb";
  const bIsAndroid = sUserAgent.match(/android/i) === "android";
  const bIsCE = sUserAgent.match(/windows ce/i) === "windows ce";
  const bIsWM = sUserAgent.match(/windows mobile/i) === "windows mobile";
  if (
    bIsIpad ||
    bIsIphoneOs ||
    bIsMidp ||
    bIsUc7 ||
    bIsUc ||
    bIsAndroid ||
    bIsCE ||
    bIsWM
  ) {
    // phone
    console.log("phone");
  } else {
    // pc
    console.log("pc");
  }
};

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
