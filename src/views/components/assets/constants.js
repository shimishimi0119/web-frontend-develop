export const REGION_SET = {
  'D': '北海道',
  'H': '東北',
  'T': '関東',
  'C': '東海',
  'R': '北陸',
  'N': '中国',
  'S': '四国',
  'Q': '九州',
};

export const EXEC_STEP = {
  'PRE_WAIT': '事前作業可（待機中）',
  'PRE': '事前作業（実行中）',
  'PRE_PAUSED': '事前作業（一時停止中）',
  'MAIN_WAIT': 'メイン作業（待機中）',
  'MAIN_RESERVED': 'メイン作業（タイマー起動待ち）',
  'MAIN': 'メイン作業（実行中）',
  'MAIN_PAUSED': 'メイン作業（一時停止中）',
  'POST_WAIT': '事後作業（待機中）',
  'POST': '事後作業（実行中）',
  'POST_PAUSED': '事後作業（一時停止中）',
  'FINISH': '作業完了',
};


export const WORK_TYPE = {
  'DL': 'Download',
  'ACT': 'Activation',
};


export const URL_SET = {
  login: '/login',
  manual: '/manual',
  masterLists: '/master-lists',
  settings: '/settings',
  root: '/',
};