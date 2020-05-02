const cluster = require('cluster');
const http = require('http');
const numCpus = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`Master process id: ${process.pid}`);
  for (let i = 0; i < numCpus; i++) {
    cluster.fork();
  }
  cluster.on('exit', (worker, code, signal) => {
    console.log(`${worker.process.pid} is closed`);
    cluster.fork();
  });
} else {
  http.createServer((req, res) => {
    res.write('<h1>Hello Node.js</h1>');
    res.end('<p>Hello Cluster!</p>');
    setTimeout(() => {
      process.exit(1);
    })
  }).listen(8080);
  
  console.log(`${process.pid} worker is running`);
}