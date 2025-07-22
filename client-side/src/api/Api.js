export const BASE_URL = "http://localhost:8000/api";
export const api_url = {
  login: BASE_URL + "/login",
  register: BASE_URL + "/register",
  createProject: BASE_URL + "/projects/add",
  addEmployee: BASE_URL + "/employees/addEmployee",
  employeeFirstLogin: BASE_URL + "/employees/employeeFirstLogin",
  getAllEmployees: BASE_URL + "/employees/all",
  getAllProjects: BASE_URL + "/projects",
  deleteEmployee: BASE_URL + "/employees/deleteEmployee/:teamMemberId",
};

export const Methods = {
  Post: "post",
  Get: "get",
  Put: "put",
  Delete: "delete",
};
