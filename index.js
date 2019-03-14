'use strict';

const http = require('http');
const chalk = require('chalk');
const format = require('date-fns/format');
const prettyjson = require('prettyjson');

const server = http.createServer((req, res) => {
	const time = format(new Date(), 'HH:mm:ss');
	console.log(`\n${chalk.blue(time)} - ${chalk.yellow('Request')} ================================`);
	console.log(prettyjson.render({
		url: req.url,
		method: req.method
	}));

	console.log(`\n${chalk.yellow('Headers')}`);
	console.log(prettyjson.render(req.headers));

	let body = '';
	req.on('data', (d) => (body += d.toString()));
	req.on('end', () => {
		if (body) {
			console.log(`\n${chalk.yellow('Body')}`);
			if (req.headers['content-type'] === 'application/json') {
				console.log(prettyjson.render(JSON.parse(body)));
			} else {
				console.log(body);
			}

		}
		console.log('');
		res.statusCode = 200;
		res.end();
	})
});

server.listen(process.env.PORT || 9000, (a) => {
	console.log('Accepting connections on: ' + (process.env.PORT || 9000));
});

