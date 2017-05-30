/**
 * 邮箱地址格式校验
 * @param   { String }      str     邮箱地址
 * @returns { Boolean }
 */
function isEmail(str) {
  let reg = /^([a-zA-Z0-9_\.\-]{1,25})+@([a-zA-Z0-9_\-\.]{1,20})+(\.([a-zA-Z0-9_\-\.]{1,10}))$/;
  return reg.test(str);
}

/**
 * 国内手机号校验
 * @param str
 * @returns {boolean}
 */
function isMobile(str) {
  let reg = /^(1{1})+([2-9]{1})+(\d{9})$/;
  return reg.test(str) && str.length === 11;
}

/**
 * 验证是否为空
 * @param  str
 * @return {String}
 */
function isEmpty(str) {
  return str === null || typeof str === "undefined" || str.trim() === "" ? true : false;
};

/**
 * 去空白符
 * @param  str
 * @return {String}
 */
function trim (str) {
    return str.replace(/^\s+|\s+$/g, '');
}
export { isEmail, isMobile, isEmpty, trim };
