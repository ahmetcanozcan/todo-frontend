import axios from 'axios';
axios.defaults.adapter = require('axios/lib/adapters/http'); 
const API_PORT = process.env.VUE_APP_API_PORT || '8901';
const API_HOST = process.env.VUE_APP_API_HOST || 'http://localhost';

export default class TodoClient {
  constructor(port, host = 'http://localhost') {
    this.baseUrl = `${host}:${port}`;
    console.log('created with base url', this.baseUrl);
  }
  withBase(path) {
    return `${this.baseUrl}${path}`;
  }

  async getTodos() {
    const response = await axios.get(this.withBase('/todos'));
    console.log('response here');
    return response.data;
  }

  async addTodo(text) {
    const response = await axios.post(this.withBase('/todos'), {
      text
    });
    return response.data;
  }

  static async getTodos() {
    return await TodoClient.instance.getTodos();
  }

  static async addTodo(text) {
    return await TodoClient.instance.addTodo(text);
  }
}

TodoClient.instance = new TodoClient(API_PORT, API_HOST);
