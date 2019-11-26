/**
 * 引数で受けとった数値の左側にゼロ埋めする
 * @param {number} number ゼロ埋め対象数値
 * @param {number} length ゼロ埋めしたい数
 * @return {string}
 */
export const zeroPaddingLeft = (number, length = 2) => (
  (Array(length).join('0') + number).slice(-length)
);
