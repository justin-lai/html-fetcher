export default class Cache {
  constructor(name, client) {
    this.name = name;
    this.client = client;
  }

  set(data) {
    console.log(this.name);
    this.client.hmset(this.name, data);
  }

  get(callback) {
    this.client.hgetall(this.name, callback);   
  }
}