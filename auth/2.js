const fetch = require("isomorphic-fetch");
const { getAccessToken } = require("./1"); // Assume auth.js contains the getAccessToken function

async function listFiles() {
	const accessToken = await getAccessToken();

	const response = await fetch(
		"https://graph.microsoft.com/v1.0/me/drive/root/children",
		{
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		}
	);

	if (!response.ok) {
		throw new Error(`Failed to list files: ${response.statusText}`);
	}

	const data = await response.json();
	return data.value;
}

listFiles()
	.then((files) => {
		files.forEach((file) => {
			console.log(`Name: ${file.name}, ID: ${file.id}`);
		});
	})
	.catch((error) => {
		console.error("Error listing files:", error);
	});
