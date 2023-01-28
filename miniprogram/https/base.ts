// 当前环境设置
// 环境：dev(开发)、xxx(测试)、xxx(预发布)、release(生产正式)

let baseUrl,
  imgUrl,
  mapUrl,
  base = "dev";

if (base == "dev") {
  baseUrl = "https://dev.api.rongyaomedia.com/api"; // 请求地址
  imgUrl = "https://rongyaomedia-sit.cn-bj.ufileos.com"; // 图片地址
  mapUrl = "https://dev.h5.rongyaomedia.com/#"; // 地图地址
}
if (base == "release") {
  baseUrl = "https://api.rongyaomedia.com/api";
  imgUrl = "https://rongyaomedia.cn-bj.ufileos.com";
  mapUrl = "https://h5.rongyaomedia.com/#"; // 地图地址
}

export default {
  base,
  baseUrl,
  imgUrl,
  mapUrl,
};
