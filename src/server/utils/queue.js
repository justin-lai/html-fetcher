export default const Queue = (name, client) => {
  this.name = name;
  this.client = client;
  this.timeout = 0;
}

Queue.prototype.push = data => {
  this.client.rpush(this.name, data);
};

Queue.prototype.pop = callback => {
  this.client.blpop(this.name, this.timeout, callback);
};
