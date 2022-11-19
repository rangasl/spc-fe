import axios from "axios";
import constants from "../utils/constants.util";

function getAllData(chartId, password = "") {
  const URL =
    constants.API_BASE_URL +
    constants.XMR_CHART_DATA_PATH +
    "/" +
    chartId +
    "?password=" +
    password;
  return axios.get(URL);
}

function getProperties(chartId, password = "") {
  const URL =
    constants.API_BASE_URL +
    constants.XMR_CHART_DATA_PATH +
    "/getproperties";
    return axios.put(URL, {
      chartId
    });
}

function createData(dataList, password = "") {
  const URL =
    constants.API_BASE_URL +
    constants.XMR_CHART_DATA_PATH +
    "/?password=" +
    password;
  return axios.post(URL, dataList);
}

function updateData(chartId, password, dataId, label, value, reference, note) {
  const URL =
    constants.API_BASE_URL +
    constants.XMR_CHART_DATA_PATH +
    "/?password=" +
    password;
  return axios.put(URL, {
    chartId,
    dataId,
    label,
    value,
    reference,
    note
  });
}

function updateProperties(chartId, password,displayCenterLine,displayControlLimits,displayCpk,displayPpk,displayCp,displayPp) {
  const URL =
    constants.API_BASE_URL +
    constants.XMR_CHART_DATA_PATH +
    "/properties?password=" +
    password;
  return axios.put(URL, {
    chartId,
    displayCenterLine,
    displayControlLimits,
    displayCpk,
    displayPpk,
    displayCp,
    displayPp,
    password,
  });
}

function updateMany(chartId, password, dataObjectList,displayControlLimits,displayCenterLine,displayCpk,displayPpk,displayCp,displayPp) {
    displayControlLimits=false
    displayCenterLine=false
    displayCpk=false
    displayPpk=false
    displayCp=false
    displayPp=false
  const URL =
    constants.API_BASE_URL +
    constants.XMR_CHART_DATA_PATH +
    "/many?password=" +
    password;
    console.log(chartId)
  return axios.put(URL, {
    chartId,
    dataObjectList,
    displayControlLimits,
    displayCenterLine,
    displayCpk,
    displayPpk,
    displayCp,
    displayPp
  });
}


function deleteData(chartId, password, dataId) {
  const URL =
    constants.API_BASE_URL +
    constants.XMR_CHART_DATA_PATH +
    "/?password=" +
    password;
  return axios.delete(URL, {
    data: {
      chartId,
      dataId
    }
  });
}

function deleteMany(chartId, password, dataIds) {
  const URL =
    constants.API_BASE_URL +
    constants.XMR_CHART_DATA_PATH +
    "/many?password=" +
    password;
  return axios.delete(URL, {
    data: {
      chartId,
      dataIds
    }
  });
}

const xmrChartDataApi = Object.freeze({
  getAllData,
  getProperties,
  createData,
  updateData,
  updateProperties,
  updateMany,
  deleteData,
  deleteMany
});

export default xmrChartDataApi;
