export async function makeRequest(
	path: string,
	token: string,
	method = 'GET',
	body = {}
) {
	const response = await fetch(`http://localhost:${process.env.TEST_PORT}${path}`, {
		method: method,
		headers: {
			authorization: token,
		},
		body:
			method.includes('POST') || method.includes('PUT') ? JSON.stringify(body) : null,
	});

	return response;
}
