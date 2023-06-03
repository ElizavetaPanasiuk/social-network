import Cookies from 'js-cookie';

const CONTENT_TYPE = 'application/json;charset=utf-8';

type Options = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers: {
    Authorization: string;
    'Content-Type'?: string;
  };
  body?: FormData | string;
};

class Service {
  private BASE_URL = import.meta.env.VITE_API_URL;
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
    return response.json().then((error) => {
      throw new Error(error.message);
    });
  }

  async post(data: { [key: string]: string | number | Date } | FormData, url = '') {
    const options: Options = {
      method: 'POST',
      body: data instanceof FormData ? data : JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    };

    if (!(data instanceof FormData)) {
      options.headers['Content-Type'] = CONTENT_TYPE;
    }

    const response = await fetch(`${this.url}${url}`, options);
    return this.handleResponse(response);
  }

  async get(queryOptions: { [key: string]: string | number } = {}, url = '') {
    const response = await fetch(`${this.url}${url}${this.transformSearchQueryToString(queryOptions)}`, {
      headers: {
        'Content-Type': CONTENT_TYPE,
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    });
    return this.handleResponse(response);
  }

  async getById(id: number, url = '') {
    const response = await fetch(`${this.url}${url}/${id}`, {
      headers: {
        'Content-Type': CONTENT_TYPE,
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    });
    return this.handleResponse(response);
  }

  async removeById(id: number, url = '') {
    const options: Options = {
      method: 'DELETE',
      headers: {
        'Content-Type': CONTENT_TYPE,
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    };
    const response = await fetch(`${this.url}${url}/${id}`, options);
    return this.handleResponse(response);
  }

  async remove(data: { [key: string]: string | number }, url = '') {
    const options: Options = {
      method: 'DELETE',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': CONTENT_TYPE,
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    };
    const response = await fetch(`${this.url}${url}`, options);
    return this.handleResponse(response);
  }

  async updateById(id: number, data: { [key: string]: string } | FormData = {}, url = '') {
    const options: Options = {
      method: 'PUT',
      body: data instanceof FormData ? data : JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    };

    if (!(data instanceof FormData)) {
      options.headers['Content-Type'] = CONTENT_TYPE;
    }

    const response = await fetch(`${this.url}${url}/${id}`, options);
    return this.handleResponse(response);
  }
}

export default Service;
