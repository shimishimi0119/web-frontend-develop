const ROOT_URL = `${process.env.REACT_APP_BACKEND_ROOT_URL}/api`;

export const DATES_URL = `${ROOT_URL}/dates/`;
export const MANUAL_TOOL_EXEC_URL = `${ROOT_URL}/tools/manualexecute`
export const MASTER_LISTS_URL = `${ROOT_URL}/masterlist`;
export const SCHEDULES_URL = `${ROOT_URL}/schedules`;
export const SITES_URL = `${ROOT_URL}/sites`;
export const SOFTWARES_URL = `${ROOT_URL}/softwares`;
export const TOOL_EXEC_URL = `${ROOT_URL}/tools/execute`;
export const KPIVIEW_URL = `${ROOT_URL}/kpi/kpiView`;
export const STATIONVIEW_URL = `${ROOT_URL}/sites/excludesites`;

export const BATCHES_PROGRESSES_URL = `${SITES_URL}/batches_progresses`;
export const SITES_PROGRESSES_URL = `${SITES_URL}/sites_progresses`;
export const WOTS_URL = `${ROOT_URL}/bworks/wots`;
export const PERCENTAGE_PROGRESS_URL = `${SITES_URL}/percentage_progresses`;
