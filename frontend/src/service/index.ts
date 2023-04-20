class Service {
  private BASE_URL = "http://localhost:5000";
  private url: string;

  constructor(url: string) {
    this.url = `${this.BASE_URL}/${url}`;
  }

  async post(data: { [key: string]: string | number | Date }) {
    const response = await fetch(this.url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    });
    if (response.ok) {
      return await response.json();
    }
    return "Error";
  }

  async get() {
    const response = await fetch(this.url);
    if (response.ok) {
      return await response.json();
    }
    return "Error";
  }

  async getById(id: number) {
    const response = await fetch(`${this.url}/${id}`);
    if (response.ok) {
      return await response.json();
    }
    return "Error";
  }

  async removeById(id: number) {
    const response = await fetch(`${this.url}/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      return await response.json();
    }
    return "Error";
  }

  async updateById(id: number, data: { [key: string]: string }) {
    const response = await fetch(`${this.url}/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    });
    if (response.ok) {
      return await response.json();
    }
    return "Error";
  }
}

export default Service;
