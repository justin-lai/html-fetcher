var Queue = function (name, client) {
  this.name = name;
  this.client = client;
  this.timeout = 0;
}

Queue.prototype.push = function (data) {
  this.client.rpush(this.name, data);
};

Queue.prototype.pop = function (callback) {
  this.client.blpop(this.name, this.timeout, callback);
};

module.exports = Queue;
