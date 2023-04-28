export default async function () {
	const server = (await import('../../../src/config')).server;

	const _server = server.listen(process.env.TEST_PORT, () => {
		console.log(`[TEST] Server listening on ${process.env.TEST_PORT}`);
	});

	await new Promise((resolve) => {
		_server.on('listening', resolve);
	});

	return async () => {
		_server.close();
		console.log('Closing test server');
	};
}
