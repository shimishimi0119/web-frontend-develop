/**
 * 現在日時を年月日時分秒のオブジェクトにして返す
 * @param {number} [date] 現在日時
 * @return {object}
 */
export const parseTime = (date = new Date()) => ({
  year   : date.getFullYear(),
  month  : date.getMonth() + 1,
  date   : date.getDate(),
  hour   : date.getHours(),
  minutes: date.getMinutes(),
  seconds: date.getSeconds(),
});

