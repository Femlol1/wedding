const express = require("express");
const bodyParser = require("body-parser");
const { Client } = require("@microsoft/microsoft-graph-client");
const { ConfidentialClientApplication } = require("@azure/msal-node");
require("isomorphic-fetch");
require("dotenv").config();

const app = express();
const port = 3001;

app.use(bodyParser.json());

// MSAL configuration
const msalConfig = {
	auth: {
		clientId: process.env.CLIENT_ID,
		authority: process.env.AUTHORITY,
		clientSecret: process.env.CLIENT_SECRET,
	},
};

const cca = new ConfidentialClientApplication(msalConfig);

const tokenRequest = {
	scopes: ["https://graph.microsoft.com/.default"],
};

async function getAccessToken() {
	const authResult = await cca.acquireTokenByClientCredential(tokenRequest);
	return authResult.accessToken;
}

async function appendDataToExcel(data) {
	const accessToken = await getAccessToken();

	const client = Client.init({
		authProvider: (done) => {
			done(null, accessToken);
		},
	});

	const fileId = "EB26C18E8B2FBB3B!230028"; // Get this ID from OneDrive

	await client
		.api(
			`/me/drive/items/${fileId}/workbook/worksheets/Sheet1/tables/Table1/rows`
		)
		.post({
			index: null,
			values: [data],
		});
}

async function sendEmail(data) {
	const accessToken = await getAccessToken();

	const client = Client.init({
		authProvider: (done) => {
			done(null, accessToken);
		},
	});

	await client.api("/me/sendMail").post({
		message: {
			subject: "RSVP Confirmation",
			body: {
				contentType: "Text",
				content: `Dear ${data.firstName},\n\nThank you for your RSVP.\n\nBest Regards,\nWedding Team`,
			},
			toRecipients: [
				{
					emailAddress: {
						address: data.email,
					},
				},
			],
		},
	});
}

app.post("/api/rsvp", async (req, res) => {
	const data = req.body;

	// Append data to Excel
	try {
		await appendDataToExcel(Object.values(data));
	} catch (error) {
		console.error("Error appending data to Excel:", error);
		res.status(500).send({ status: "error", message: "Failed to save data." });
		return;
	}

	// Send confirmation email
	try {
		await sendEmail(data);
	} catch (error) {
		console.error("Error sending email:", error);
		res.status(500).send({ status: "error", message: "Failed to send email." });
		return;
	}

	res.send({ status: "success" });
});

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}/`);
});
