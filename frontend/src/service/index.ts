import Cookies from "js-cookie";

class Service {
  private BASE_URL = "http://localhost:5000";
  private url: string;

  constructor(url: string) {
    this.url = `${this.BASE_URL}/${url}`;
  }

  async post(data: { [key: string]: string | number | Date } | FormData) {
    const options: RequestInit = {
      method: "POST",
      body: data instanceof FormData ? data : JSON.stringify(data),
    };

    if (!(data instanceof FormData)) {
      options.headers = {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Bearer ${Cookies.get("token")}`,
      };
    }

    const response = await fetch(this.url, options);
    if (response.ok) {
      return await response.json();
    }
    return "Error";
  }

  async get(searchQuery: string) {
    const response = await fetch(`${this.url}${searchQuery}`, {
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    if (response.ok) {
      return await response.json();
    }
    return "Error";
  }

  async getById(id: number) {
    const response = await fetch(`${this.url}/${id}`, {
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    if (response.ok) {
      return await response.json();
    }
    return "Error";
  }

  async removeById(id: number, url: string = "") {
    const response = await fetch(`${this.url}${url}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    if (response.ok) {
      return await response.json();
    }
    return "Error";
  }

  async updateById(
    id: number,
    data: { [key: string]: string } = {},
    url: string = ""
  ) {
    const response = await fetch(`${this.url}${url}/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    if (response.ok) {
      return await response.json();
    }
    return "Error";
  }
}

export default Service;
