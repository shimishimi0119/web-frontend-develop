import axios from 'axios';
import { BATCHES_PROGRESSES_URL, SITES_PROGRESSES_URL, PERCENTAGE_PROGRESS_URL, KPIVIEW_URL, STATIONVIEW_URL} from '../api';


// types
const LOAD_BATCHES = 'PROGRESSES_LOAD_BATCHES';
const LOAD_SITES = 'PROGRESSES_LOAD_SITES';
const LOAD_PERCENTAGE = 'PROGRESSES_LOAD_PERCENTAGE';
const LOAD_KPI = 'PROGRESSES_LOAD_KPI';
const LOAD_STATION = 'PROGRESSES_LOAD_STATION';

export const types = {
  LOAD_BATCHES,
  LOAD_SITES,
  LOAD_PERCENTAGE,
  LOAD_KPI,
  LOAD_STATION,
};


// creators
const loadBatches = scheduleId => async dispatch => {
  const response = await axios.get(
    BATCHES_PROGRESSES_URL,
    { params: { schedule_id: scheduleId } },
  );
  dispatch({
    type: LOAD_BATCHES,
    response,
  });
};

const loadSites = scheduleId => async dispatch => {
  const response = await axios.get(
    SITES_PROGRESSES_URL,
    { params: { schedule_id: scheduleId } },
  );
  dispatch({
    type: LOAD_SITES,
    response,
  });
};

const loadPercentage = scheduleId => async dispatch => {
  const response = await axios.get(
    PERCENTAGE_PROGRESS_URL,
    { params: { schedule_id: scheduleId } },
  );
  dispatch({
    type: LOAD_PERCENTAGE,
    response
  });
}

const loadKpi = scheduleId => async dispatch => {
  const response = await axios.get(
    KPIVIEW_URL,
    { params: { schedule_id: scheduleId } },
  );
  dispatch({
    type: LOAD_KPI,
    response,
  });
};

const loadStation = scheduleId => async dispatch => {
  const response = await axios.get(
    STATIONVIEW_URL,
    { params: { schedule_id: scheduleId } },
  );
  dispatch({
    type: LOAD_STATION,
    response,
  });
};

export const actions = {
  loadBatches,
  loadSites,
  loadPercentage,
  loadKpi,
  loadStation,
};
