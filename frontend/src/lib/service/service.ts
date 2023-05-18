import Cookies from 'js-cookie';

class Service {
  private BASE_URL = 'http://localhost:5000';
  private url: string;

  constructor(url: string) {
    this.url = `${this.BASE_URL}/${url}`;
  }

  private transformSearchQueryToString(query: { [key: string]: string | number }) {
    const params = Object.keys(query).filter((param) => query[param] !== '');
    if (params.length) {
      return `?${params.map((param) => `${param}=${query[param]}`).join('&')}`;
    }
    return '';
  }

  private handleResponse(response: Response) {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  }

  async post(data: { [key: string]: string | number | Date } | FormData, url: string = '') {
    const options: RequestInit = {
      method: 'POST',
      body: data instanceof FormData ? data : JSON.stringify(data),
    };

    if (!(data instanceof FormData)) {
      options.headers = {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${Cookies.get('token')}`,
      };
    }

    const response = await fetch(`${this.url}${url}`, options);
    return this.handleResponse(response);
  }

  async get(queryOptions: { [key: string]: string | number } = {}, url: string = '') {
    const response = await fetch(`${this.url}${url}${this.transformSearchQueryToString(queryOptions)}`, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    });
    return this.handleResponse(response);
  }

  async getById(id: number, url: string = '') {
    const response = await fetch(`${this.url}${url}/${id}`, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    });
    return this.handleResponse(response);
  }

  async removeById(id: number, url: string = '') {
    const response = await fetch(`${this.url}${url}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    });
    return this.handleResponse(response);
  }

  async remove(data: { [key: string]: string | number }, url = '') {
    const response = await fetch(`${this.url}${url}`, {
      method: 'DELETE',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    });
    return this.handleResponse(response);
  }

  async updateById(id: number, data: { [key: string]: string } = {}, url: string = '') {
    const response = await fetch(`${this.url}${url}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    });
    return this.handleResponse(response);
  }
}

export default Service;
