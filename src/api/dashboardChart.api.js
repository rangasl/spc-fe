import axios from "axios";
import constants from "../utils/constants.util";

function getDashboardCharts() {
  const URL = constants.API_BASE_URL + constants.DASHBOARD_CHART_PATH;
  return axios.get(URL);
}

function getDashboardChartById(chartId, password) {
  const URL =
    constants.API_BASE_URL +
    constants.DASHBOARD_CHART_PATH +
    "/" +
    chartId +
    "?password=" +
    password;
  return axios.get(URL);
}

function createDashboardChart(body) {
  const URL = constants.API_BASE_URL + constants.DASHBOARD_CHART_PATH;
  return axios.post(URL, body);
}

function updateDashboardChart(chartId, body) {
  const URL =
    constants.API_BASE_URL + constants.DASHBOARD_CHART_PATH + "/" + chartId;
  return axios.put(URL, body);
}

function deleteDashboardChart(chartId) {
  const URL =
    constants.API_BASE_URL + constants.DASHBOARD_CHART_PATH + "/" + chartId;
  return axios.delete(URL);
}

const dashboardChartApi = Object.freeze({
  getDashboardCharts,
  getDashboardChartById,
  createDashboardChart,
  updateDashboardChart,
  deleteDashboardChart
});

export default dashboardChartApi;
