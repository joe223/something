/**
 * 格式化日期，根据传入的标准时间 返回字符串
 * eg： formate ( 1471518478117 ) === "2016-8-18 19:08:58"
 * eg： formate ( 1471518478117, "/", ",", "-" ) === "2016/8/18,19-08-58"
 * @param n
 * @param date          {{ date }}              default "-"         not required
 * @param split         {{ split }}             default " "         not required
 * @param hour          {{ String }}            default ":"         not required
 * @returns {string}
 */
function formate ( n = (+new Date()), date = "-", split = " ", hour = ":" ) {
    let time = checkData( n ); // 修改时间格式为毫秒
    return time.getFullYear() + date + fixNumber( time.getMonth() + 1, 2 ) + date + fixNumber( time.getDate(), 2 ) + split + fixNumber( time.getHours(), 2 ) + hour + fixNumber( time.getMinutes(), 2 ) + hour + fixNumber( time.getSeconds(), 2 );
}

/**
 * 根据日期获取年月日,同上，但只是返回 年月日
 * eg: getDate( 1471518478117 ) === "2016-8-18"
 * @param n                 {{ Number | String }} 时间         required
 * @param date              {{ String }}        分割符号        default "-"
 * @returns {string}
 */
function getDate ( n, date = "-") {
    let time = checkData( n ); // 修改时间格式为毫秒
    return time.getFullYear() + date + fixNumber( time.getMonth() + 1, 2 ) + date + fixNumber( time.getDate(), 2 );
}

/**
 * 根据日期获取 时分秒, 同 formate
 * eg: getTime( 1471518478117 ) === "19:08:58"
 * @param n             {{ Number | String }} 时间         required
 * @param t             {{ String }}        分割符号        default ":"
 * @returns {*}
 */
function getTime ( n, t = ":") {
    let time = checkData( n ); // 修改时间格式为毫秒
    return fixNumber( time.getHours(), 2 ) + hour + fixNumber( time.getMinutes(), 2 ) + hour + fixNumber( time.getSeconds(), 2 );

}

/**
 * 根据使用的毫秒数计算总 时分秒
 * eg: D.formateTime( 0000000120000 ) === "00:02:00" （00 小时：02分：00秒）
 * @param n             {{ Number | String }} 时间         required
 * @param t             {{ String }}        分割符号        default ":"
 * @returns {string}
 */
function formateTime( n, t = ":") {
    n /= 1000;
    let hour = Math.floor(n / (60 * 60));
    hour = fixNumber( hour, 2);
    let min = Math.floor((n % (60 * 60)) / (60));
    min = fixNumber( min, 2 );
    let sec = Math.floor(n % (60)) + "";
    sec = fixNumber( sec, 2);
    return "" + hour + t + min + t + sec;
}

/**
 * 时间格式校验
 * @param time 秒／毫秒
 * @returns {Date}
 */
function checkData ( time ) {
    let len = time.toString().length;
    let i = Math.pow( 10, 13 - len );
    if ( len === 13 ) {
        //console.log("传入的时间单位为 毫秒！");
    }else if ( len === 10 ) {
        //console.log("传入的时间单位为 秒！");
    }else {
        throw new Error("请检查时间格式，必须为 秒／毫秒！");
    }
    return new Date( time * i );
}

/**
 * 将数字转成指定长度的字符串，数值前用 0 填充
 * eg：fixNumber( 457, 7, 2 ) == "0457.00"
 * eg：fixNumber( 0.457, 7, 2 ) == "0000.45"
 * eg：fixNumber( 0.457, 7 ) == "0000000"
 * @param str       {{ Number | String }}       传入的参数         required
 * @param len       {{ Number }}                返回的字符串长度    required
 * @param accuracy  {{ Number }}                精度              default      0
 * @returns {string}
 */
function fixNumber ( str, len, accuracy = 0 ) {
    let length = str.toString().length;
    let l = len > length ? len : length;
    if ( str === undefined || len === undefined ) throw new Error("fixNumber 参数错误！");
    if ( typeof str === "string" ) {
        str = Number( str).toFixed( accuracy );
    } else {
        str = str.toFixed( accuracy );
    }
    str = "0000000000000000000000000000" + str;
    return str.substr( -l );
}

/**
 * e是以秒为单位的时间戳（1471518478）
 * time<1分钟  显示刚刚
 * time在1小时内  显示多少分钟前
 * 1个月之后显示为具体日期
 */
function humanTime(e){
  var timestamp = Date.parse(new Date())/1000;
  var time = timestamp - e;
  if (time < 60) {
    return '刚刚';
  }else if (time >= 60 && time < 3600) { //1h以内
    return parseInt(time/60) +'分钟前';
  }else if(3600 <= time && time < (3600 * 24)){ //24h以内
    var hours = parseInt(time / 3600);
    return hours + '小时前';
  }else if((3600 * 24) <= time && time < (3600 * 24 *30)){ //一个月之内
    var day = parseInt(time / (3600 * 24));
    return day + '天前';
  }else{
    return getDate(e * 1000);
  }
}


const D = {};

D.formate = formate;
D.humanTime = humanTime;
D.getTime = getTime;
D.getDate = getDate;
D.formateTime = formateTime;

export default D;
