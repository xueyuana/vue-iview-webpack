/**
 * @Author   : Schoilar
 * @Data     : 2017-06-19  10:41
 * @Describe : 格式化时间戳
 */

/**
 * 时间戳格式化函数
 * @param  {string} format    格式
 * @param  {int}    timestamp 要格式化的时间 默认为当前时间
 * @return {string}           格式化的时间字符串
 */


function formatDate(time) {
//shijianchuo是整数，否则要parseInt转换
  function add0(m){return m<10?'0'+m:m }

  var y = time.getFullYear();
  var m = time.getMonth() + 1;
  var d = time.getDate();
  var h = time.getHours();
  var mm = time.getMinutes();
  var s = time.getSeconds();
  return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
}




export {
  formatDate
}