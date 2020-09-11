import Vue from 'vue';
import { post, fetch, patch, put, del, upload, ret2 } from './http'
Vue.prototype.$post = post;
Vue.prototype.$fetch = fetch;
Vue.prototype.$patch = patch;
Vue.prototype.$put = put;
Vue.prototype.$del = del;

//APIURL--测试
const _baseUrl = 'http://58.84.7.20:8081/api/';
const _proxyUserURL = 'http://58.84.7.20:8081/proxyuser/';
const _imgUrl = 'http://api.twnongchang.cn/';

// const _baseUrl='http://api.twnongchang.com/CTLAllAPI/';
// const _imgUrl='http://api.twnongchang.com/';

//返回路径
export const imgUrl = function () {
    return _imgUrl;
};
//返回路径
export const baseUrl = function () {
    return 'http://58.84.7.20:8081/vedio/';
};

//登录方法 -1
// Username：用户名
// Password：密码
export const loginApi = function (json) {
    return Vue.prototype.$post(_baseUrl + 'AppLogin', json, true)
};

// GetGameTable（获取游戏桌信息）-1
// 返回值：
// GameTableList（集合）
// TableName:桌名
// OralTimes:口次
// PersonalRestriction:个人限注 格式(xxxx-xxxx)
// PersonalSpecialCodeLimit：个人特码限注
// IndividualToChildRestriction：个人对子限注
// LimitedPlatform：限台（单位：万）
// List（游戏记录集合 20个数组）
// Num：开奖号码
// DS：单双类型
// export const GetGameTable = function () {
//     return Vue.prototype.$post(_baseUrl + 'GetGameTable')
// };
export const GetGameTable = function () {
    return Vue.prototype.$fetch(_baseUrl + 'GetGameTable')
};

// Withdrawal(提现信息) -1
// Banlance：用户余额
// WithdrawalDQLS：当前流水
// WithdrawalLS：所需流水
// TXZMoney：提现中金额
// YTXMoney：已提现金额
export const Withdrawal = function () {
    return Vue.prototype.$post(_baseUrl + 'Withdrawal')
};

// AddWithdrawal（提交提现） -1
// 参数：
// Name：用户名
// Bankname：银行名
// Zh：支行信息
// Bankno：银行号码
// Money：提现金额
// Tkmm：提款密码
export const AddWithdrawal = function (json) {
    return Vue.prototype.$post(_baseUrl + 'AddWithdrawal', json)
};

// AddRecharge（充值接口） -1
// 参数：
// Name：汇款人姓名（Type等于1的时候传值，不为1传个空字符过来）
// BankName：汇款人银行（Type等于1的时候传值，不为1传个空字符过来）
// BankFS：汇款方式（Type等于1的时候传值，不为1传个空字符过来）
// Type：充值类型1银行卡 2支付宝 3微信
// Money：充值金额
export const AddRecharge = function (json) {
    return Vue.prototype.$post(_baseUrl + 'AddRecharge', json)
};

// UpdatePassWord（修改密码）-1
// Password：旧密码
// Newpassword：新密码
export const UpdatePassWord = function (json) {
    return Vue.prototype.$post(_baseUrl + 'UpdatePassWord', json)
};

// UpdateTKPassWord（修改提款密码） -1
// Password：旧密码
// Newpassword：新密码
export const UpdateTKPassWord = function (json) {
    return Vue.prototype.$post(_baseUrl + 'UpdateTKPassWord', json)
};

// GetVedio（获取视频列表）
// List
// FileName：文件名
// Ss:视频时长
export const GetVedio = function () {
    return Vue.prototype.$post(_baseUrl + 'GetVedio', '', '', '', true)
};

// GetVedioTime（获取视频时间参数）
// DSTime：当前播放进度
// XZTime：距离下注时间 -- 下注时间
export const GetVedioTime = function () {
    return Vue.prototype.$post(_baseUrl + 'GetVedioTime', '', '', '', true)
};

// AddVedio（切换视频请求我）
// 参数：
// VideoName：下个视频名
export const AddVedio = function (json) {
    return Vue.prototype.$post(_baseUrl + 'AddVedio', json, '', '', true)
};

// AddOrder（下注）-1
// 参数
// GameTableId：游戏桌台Id
// PlayType：玩法  （ 1:2|金额,2:2|金额，2:6|金额...这样格式。）
// Money：下注金额 （上面玩法里的总金额）
export const AddOrder = function (json) {
    return Vue.prototype.$post(_baseUrl + 'AddOrder', json)
};

// GetOrder(获取游戏记录) -1
// 参数：
// DayType（1今日 2昨天 3一周内）
// 返回值：
// List数组
// OrderId：单号
// GameName:游戏桌名
// JG：结果
// PlayType：玩法，你怎么传给我的我就怎么传给你
// AddTime：下注时间
// JYQMoney：交易前余额
// XZMoney：下注金额
// SY：输赢
// Uid：用户id，这个不用展示，我也返回了而已
export const GetOrder = function (json) {
    return Vue.prototype.$post(_baseUrl + 'GetOrder', json)
};

// GetRecharge(获取充值记录) -1
// 参数：
// DayType（1今日 2昨天 3一周内）
// 返回值：
// List数组
// EndTime：处理时间
// RMoney：充值金额
// AddTime：充值时间
// Status：状态 0提交 1成功 2失败
// RType：充值方式 1银行卡 2支付宝 3微信
// EndTime：处理时间
// BZ：备注
// RName：汇款人姓名
// RBankName：汇款银行
// RBankFS：汇款方式
// UserName：用户名
export const GetRecharge = function (json) {
    return Vue.prototype.$post(_baseUrl + 'GetRecharge', json)
};

// GetWithdrawal（获取提现记录) -1
// 参数：
// DayType（1今日 2昨天 3一周内）
// 返回值：
// List数组
// Banlance:提现金额
// Status:状态 0申请中 1成功 2失败
// AddTime:添加时间
// BZ:备注
// EndTime：处理时间
// BankName：银行名
// BankUserName：银行账户名
// BankZHInfo：支行信息
// BankNo：银行卡号
export const GetWithdrawal = function (json) {
    return Vue.prototype.$post(_baseUrl + 'GetWithdrawal', json)
};


// GetPM:获取排名 -1
// List数组
// Num:排名
// NickName：昵称
// YL：盈利
export const GetPM = function () {
    return Vue.prototype.$post(_baseUrl + 'GetPM')
};

// GetGG：获取公告 -1
export const GetGG = function () {
    return Vue.prototype.$post(_baseUrl + 'GetGG')
};

// QSJ：-1
export const QSJ = function () {
    return Vue.prototype.$post(_baseUrl + 'QSJ', '', '', '', true)
};

// GetKJ：-1
export const GetKJ = function () {
    return Vue.prototype.$post(_baseUrl + 'GetKJ', '', '', '', true)
};

// GetBankInfo 获取银行卡信息 收款方信息
export const GetBankInfo = function () {
    return Vue.prototype.$post(_baseUrl + 'GetBankInfo')
};

/**
 * Register 注册
 * @param {Phone} 手机号 
 * @param {UserName} 账户 
 * @param {PassWord} 密码 
 * @param {YQM} 邀请码
 * @param {SMSCode} 验证码
 */
export const Register = (data) => {
    return Vue.prototype.$post(_baseUrl + 'Register', data)
};

/**
 * Register 获取验证码
 * @param {Phone} 手机号 
 */
export const GetSMS = (data) => {
    return Vue.prototype.$post(_baseUrl + 'GetSMS', data)
};

/**
 * GetZNX 获取小喇叭通知
 */
export const GetZNX = () => {
    return Vue.prototype.$post(_baseUrl + 'GetZNX')
};

/**
 * GetXZTime 获取下注倒计时
 */
export const GetXZTime = () => {
    return Vue.prototype.$post(_baseUrl + 'GetXZTime')
};

/**
 * cd 撤单
 */
export const Revoke = (data) => {
    return Vue.prototype.$post(_baseUrl + 'cd', data)
};

/**
 * GetUserInfo 获取用户信息
 */
export const GetUserInfo = (data) => {
    return Vue.prototype.$post(_baseUrl + 'GetUserInfo', data)
};

/**
 * getkj 获取开奖时间
 * open 最新摇骰子时间
 * ok 二次确认时间
 * first 摇骰子第一个结果
 * second 摇骰子第二个结果
 * startBet 下次开注开始时间
 * endBet 下次开注结束时间
 * nextDraw 下次开奖时间
 * palyTime 播放时长
 * nowSystem 系统时间
 */
export const Kj = (data) => {
    return Vue.prototype.$fetch(_baseUrl + 'getkj', data)
};

/**
 * GetPrizeNo 获取期号
 */
export const getPrizeNo = () => {
    return Vue.prototype.$fetch(_proxyUserURL + 'GetPrizeNo', {});
}








