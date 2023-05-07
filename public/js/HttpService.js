
class HttpService {
    constructor(headers = {}) {
      this.headers = headers;
      this.baseUrl = window.location.origin;
    }
  
    setHeaders(headers) {
      this.headers = headers;
    }
  
    async get(endpoint, queryParams = {}) {
      const url = new URL(endpoint, this.baseUrl);
      for (const [key, value] of Object.entries(queryParams)) {
        url.searchParams.append(key, value);
      }
      const response = await fetch(url.toString(), { headers: this.headers });
      return response.json();
    }
  
    async post(endpoint, data = {}, queryParams = {}) {
      const url = new URL(endpoint, this.baseUrl);
      for (const [key, value] of Object.entries(queryParams)) {
        url.searchParams.append(key, value);
      }
      const response = await fetch(url.toString(), {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(data),
      });
      return response.json();
    }
  
    async put(endpoint, data = {}, queryParams = {}) {
      const url = new URL(endpoint, this.baseUrl);
      for (const [key, value] of Object.entries(queryParams)) {
        url.searchParams.append(key, value);
      }
      const response = await fetch(url.toString(), {
        method: 'PUT',
        headers: this.headers,
        body: JSON.stringify(data),
      });
      return response.json();
    }
  
    async delete(endpoint, queryParams = {}) {
      const url = new URL(endpoint, this.baseUrl);
      for (const [key, value] of Object.entries(queryParams)) {
        url.searchParams.append(key, value);
      }
      const response = await fetch(url.toString(), {
        method: 'DELETE',
        headers: this.headers,
      });
      return response.json();
    }
  }
  