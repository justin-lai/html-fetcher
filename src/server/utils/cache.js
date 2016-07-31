export default class Cache {
  constructor(name, client) {
    this.name = name;
    this.client = client;
  }

  set(data) {
    this.client.set(this.name, data);
  }

  get(callback) {
    this.client.get(this.name, callback);   
  }
}