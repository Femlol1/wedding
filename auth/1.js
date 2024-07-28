const { ConfidentialClientApplication } = require("@azure/msal-node");
const fetch = require("isomorphic-fetch");

const msalConfig = {
	auth: {
		clientId: "811a1f1d-fbea-4a17-a412-fdb228b197d2",
		authority:
			"https://login.microsoftonline.com/bcd9ddb5-ad1e-4b87-b53e-10d0d11bf62c",
		clientSecret: "tYn8Q~NwdHCpZoSUhxYRoz4suyG5IXi9UZZDGcAF",
	},
};

const cca = new ConfidentialClientApplication(msalConfig);

// Request Token
const tokenRequest = {
	scopes: ["https://graph.microsoft.com/.default"],
};

async function getAccessToken() {
	try {
		const authResult = await cca.acquireTokenByClientCredential(tokenRequest);
		return authResult.accessToken;
	} catch (error) {
		console.error("Error acquiring token:", error);
	}
}

async function listFiles() {
	const accessToken = await getAccessToken();

	if (!accessToken) {
		console.error("No access token could be retrieved");
		return;
	}

	const response = await fetch(
		"https://graph.microsoft.com/v1.0/drive/root/childr",
		{
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		}
	);

	if (!response.ok) {
		const errorBody = await response.json();
		throw new Error(
			`Failed to list files: ${response.statusText} - ${JSON.stringify(
				errorBody
			)}`
		);
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
