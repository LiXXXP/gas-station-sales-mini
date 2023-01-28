//引入请求方法
import http from './http'


// 小程序登录接口
export function postLogin(params: object) {
  return http.post('/gas/v1/MiniUserSignUpAndSignIn', params)
}
// 加油站列表
export function gasStation(params: object) {
  return http.post('/gas/v1/MiniGasStationListInquiry', params)
}
// 筛选条件
export function MiniGasStationRegionInquiry(params: object) {
  return http.post('/gas/v1/MiniGasStationRegionInquiry', params)
}
// 站点搜索列表
export function CorrectionListInquiry(params: object) {
  return http.post('/gas/v1/MiniGasStationRegionInquiry', params)
}
// 站点详情
export function MiniGasStationInquiry(params: object) {
  return http.post('/gas/v1/MiniGasStationInquiry', params)
}
// 站点列表查询
export function MiniGasStationCorrectionListInquiry(params: object) {
  return http.post('/gas/v1/MiniGasStationCorrectionListInquiry', params)
}
// 获取标签
export function MiniTagListInquiry(params: object) {
  return http.post('/gas/v1/MiniTagListInquiry', params)
}
 