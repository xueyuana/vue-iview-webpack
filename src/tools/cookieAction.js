/**
 * @Author   : Schoilar
 * @Data     : 2017-05-24  09:58
 * @Describe : cookie相关操作
 */

// 设置cookie
function setCookie(c_name, value, expiremMinutes) {
  var exdate = new Date();
  exdate.setTime(exdate.getTime() + expiremMinutes * 60 * 1000);
  document.cookie = c_name + "=" + escape(value) + ((expiremMinutes == null) ? "" : ";expires=" + exdate.toGMTString());
}

// 读取cookie
function getCookie(c_name) {
  if (document.cookie.length > 0) {
    var c_start = document.cookie.indexOf(c_name + "=");
    if (c_start != -1) {
      c_start = c_start + c_name.length + 1;
      var c_end = document.cookie.indexOf(";", c_start);
      if (c_end == -1)
        c_end = document.cookie.length
      return unescape(document.cookie.substring(c_start, c_end))
    }
  }
  return ""
}

// 删除cookie
function delCookie(c_name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(c_name);
  if (cval != null) {
    document.cookie = c_name + "=" + cval + ";expires=" + exp.toGMTString();
  }
}

// 设置localStroage
function setStroage(key, val) {
  if (key && val) {
    if (typeof val === 'object') {
      window.localStorage.setItem(key, JSON.stringify(val))
    } else {
      window.localStorage.setItem(key, val)
    }
  }
}

// 获取localStroage
function getStroage(key) {
  let val = null
  val = key && JSON.parse(window.localStorage.getItem(key))
  if (val) return val
}

// 获取用户信息
function getUserInfo() {
  let userInfo = {}
  let accountInfo = getCookie('accountInfo')
  if (accountInfo) {
    let index = accountInfo.indexOf("&");
    userInfo.userName = accountInfo.substring(0, index)
    userInfo.passWord = accountInfo.substring(index + 1)
    return userInfo
  } else {
    return {userName: '', passWord: ''}
  }
}

export {
  setCookie,
  getCookie,
  delCookie,
  setStroage,
  getStroage,
  getUserInfo
}