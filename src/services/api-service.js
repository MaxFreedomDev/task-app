import axios from "axios";

export default class ApiService {
  baseUrl = "https://uxcandy.com/~shapoval/test-task-backend/v2/";
  developer = "?developer=Maxim";

  getInitializedApi(url, method = "get", params = null) {
    return new Promise((resolve, reject) => {
      let form_data = new FormData();
      for (let key in params) {
        form_data.append(key, params[key]);
      }
      let data = method === "get" ? { params } : { data: form_data };
      return axios({
        headers: {
          "Access-Control-Allow-Methods": "*",
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        method,
        baseURL: this.baseUrl,
        url: url + `${this.developer}`,
        ...data,
      })
        .then(({ data }) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  login(payload) {
    return this.getInitializedApi("login", "post", payload);
  }
  tasks(params) {
    return this.getInitializedApi("", "get", { ...params });
  }
  createTask(payload) {
    return this.getInitializedApi("create", "post", payload);
  }
  updateTask(id, payload) {
    return this.getInitializedApi(`edit/${id}`, "post", payload);
  }
}
