document.getElementById('saveChangesBtn').addEventListener('click', function() {
	// Get the full URL
	const url = new URL(window.location.href);

	// Get the sessionId from the query parameters
	const sessionId = url.searchParams.get('sessionId');

	// Define the endpoint, including the sessionId in the URL
	const endpoint = `https://retail-services.cegid.cloud/et/pos/pulsarcustomer/externalcustomer/session?sessionId=${sessionId}`;

	// Define the postData object
	const postData = {
		"languageIsoCode": "en",
		"customerId": "DE01000021",
		"firstName": "Harris",
		"lastName": "Symeoudakis",
		"gender": "MALE",
		"titleCode": "1",
		"birthDay": 20,
		"birthMonth": 3,
		"birthYear": 1992,
		"emails": [
			{
				"email": "harris.symeoudakis@gmail.com",
				"emailType": "Main",
				"emailConsent": "DEM",
				"qualityCode": null
			}
		],
		"phones": [
			{
				"phone": "555252",
				"phoneType": "Mobile",
				"phoneConsent": "DEM",
				"qualityCode": null
			}
		],
		"postalAddresses": [
			{
				"addressLine1": "Zoodohou Pigis 6",
				"addressLine2": "",
				"addressLine3": "",
				"addressLine4": null,
				"addressLine5": null,
				"addressLine6": null,
				"addressLine7": null,
				"addressLine8": null,
				"addressLine9": null,
				"city": "Heraklion,Crete",
				"postalCode": "71307",
				"region": "PACA",
				"country": {
					"countryIso2Code": "GR",
					"countryLabel": "Greece"
				},
				"addressConsent": true,
				"qualityCode": null,
				"languageIsoCode": "end"
			}
		]
	};

	// Make the POST request using Fetch API
	fetch(endpoint, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(postData)
	})
	.then(response => response.json())
	.then(data => {
		console.log('Success:', data);
	})
	.catch(error => {
		console.error('Error:', error);
	});
});
