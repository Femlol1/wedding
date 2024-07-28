async function appendDataToExcel(data) {
	const accessToken = await getAccessToken();

	const client = Client.init({
		authProvider: (done) => {
			done(null, accessToken);
		},
	});

	const fileId = "0123456789abcdef"; // Replace with your actual file ID

	await client
		.api(
			`/me/drive/items/${fileId}/workbook/worksheets/Sheet1/tables/Table1/rows`
		)
		.post({
			index: null,
			values: [data],
		});
}
