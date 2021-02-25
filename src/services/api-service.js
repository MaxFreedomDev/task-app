import axios from "axios";

export default class ApiService {
  baseUrl = "https://uxcandy.com/~shapoval/test-task-backend/v2/";
  developer = "?developer=Maxim";
  getInitializedApi(url, method = "get", params = {}) {
    return new Promise((resolve, reject) => {
      let data = method === "get" ? { params } : { data: params };
      if (method === "get") {
        data = params;
      } else {
        let form_data = new FormData();
        for (let key in params) {
          form_data.append(key, params[key]);
        }
        data = form_data;
      }
      return axios({
        headers: {
          "Content-Type": "multipart/form-data",
          processData: false,
          dataType: "json",
          crossDomain: "true",
          mimeType: "multipart/form-data",
        },
        method,
        baseURL: this.baseUrl,
        url: url + `${this.developer}`,
        data: method === "get" ? { ...data } : data,
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
}
