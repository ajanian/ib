const _ = require('lodash');
const chalk = require('chalk');
const moment = require('moment');

const ib = new (require('.'))({
  // clientId: 0,
  host: '127.0.0.1',
  port: 4001
}).on('error', function (err) {
  console.error(chalk.red(err.message));
}).on('result', function (event, args) {
  if (!_.includes(['currentTime'], event)) {
    console.log('%s %s', chalk.yellow(event + ':'), JSON.stringify(args));
  }
}).on('currentTime', function (time) {
  console.log(
    '%s %s%s',
    chalk.cyan('[currentTime]'),
    chalk.bold('time='), moment.unix(time).format('YYYY-MM-DD hh:mm:ss A')
  );
});

ib.connect();

const intervalId = setInterval(function () {
  ib.reqCurrentTime();
}, 2000);

// Disconnect after 3 seconds.
setTimeout(function () {
  console.log(chalk.yellow('Stopping requests...'));
  clearInterval(intervalId);
  ib.disconnect();
}, 5000);
