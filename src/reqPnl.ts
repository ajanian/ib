import { LoDashStatic } from "lodash";

const _: LoDashStatic = require('lodash');
const chalk = require('chalk');

var ib = new (require('.'))({
    // clientId: 0,
    // host: '127.0.0.1',
    port: 4001
}).on('error', function (err) {
    console.error(chalk.red(err.message));
}).on('result', function (event, args) {
    if (!_.includes(['pnl'], event)) {
        console.log('%s %s', chalk.yellow(event + ':'), JSON.stringify(args));
    }
}).on('pnl', function (reqId, dailyPnl) {
    console.log(dailyPnl);
});

ib.connect();

ib.reqPnl(123456, 'U1234567', null);
