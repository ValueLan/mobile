import axios from 'axios';

export default {
  REQUEST(url, method = 'GET', body, params, header, assigns)  {
    return axios({
      method: method,
      url: url,
      data: body,
      headers: header,
      params: params
    });
  },
  GET(url, body, header, assigns) {
    return this.REQUEST(url, 'GET', body, header, assigns);
  },
  POST(url, body, header, assigns) {
    if(body) body = JSON.stringify(body);
    return this.REQUEST(url, 'POST', body, header, assigns);
  },
  PUT(url, body, header, assigns) {
    if(body) body = JSON.stringify(body);
    return this.REQUEST(url, 'PUT', body, header, assigns);
  },
  DELETE(url, body, header, assigns) {
    if(body) body = JSON.stringify(body);
    return this.REQUEST(url, 'DELETE', body, header, assigns);
  }
}
