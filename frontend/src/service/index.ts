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
      const json = await response.json();
      return json;
    }
    return "Error";
  }

  async get() {
    const response = await fetch(this.url);
    if (response.ok) {
      const json = await response.json();
      return JSON.parse(json);
    }
    return "Error";
  }
}

export default Service;
