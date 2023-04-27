export async function makeRequest(path: string, token: string) {
	const request = await fetch(`http://localhost:${process.env.PORT}${path}`, {
		method: 'GET',
		headers: {
			authorization: token,
		},
	});

	return request;
}
