document.getElementById('saveChangesBtn').addEventListener('click', function() {
    // Get the current values from the form
    var customerId = document.getElementById('customerId').value;
    var firstName = document.getElementById('firstName').value;
    var lastName = document.getElementById('lastName').value;
    var birthdate = document.getElementById('birthdate').value;
    var gender = document.getElementById('gender').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var phonetype = document.getElementById('phonetype').value;
    var addressConsent = document.getElementById('addressConsent').value;
    var addressLine1 = document.getElementById('addressLine1').value;
    var city = document.getElementById('city').value;
    var postalCode = document.getElementById('postalCode').value;

    // Additional information fields
    var connectedSalesperson = document.getElementById('usrfieldConnectedSalesperson').value;
    var middleName = document.getElementById('usrfieldMiddleName').value;
    var salutation = document.getElementById('usrfieldSalutation').value;
    var academicTitle = document.getElementById('usrfieldAcademicTitile').value;
    var nobilityTitle = document.getElementById('usrfieldNobilityTitle').value;
    var nameAddition = document.getElementById('usrfieldNameAddition').value;
    var profession = document.getElementById('usrfieldProfession').value;
    var closestStore = document.getElementById('usrfieldClosestStore').value;

    const birthdateParts = birthdate.split("/");

    // Log the captured data to the console (for debugging)
    console.log({
        customerId,
        firstName,
        lastName,
        birthdate,
        gender,
        email,
        phone,
        phonetype,
        addressConsent,
        addressLine1,
        city,
        postalCode,
        connectedSalesperson,
        middleName,
        salutation,
        academicTitle,
        nobilityTitle,
        nameAddition,
        profession,
        closestStore
    });

    // Patch for general Information
    const url = `https://ls-customerserver.onrender.com/api/customers/v2/${customerId}`;

    const jsonBody = {
        "id": customerId,
        "properties": {
            "externalReference": "",
            "closed": false,
            "creationStoreIdentifier": {
                "id": "DE01",
                "externalReference": "DE01WIL"
            },
            "taxExcluded": false,
            "fictitious": false,
            "languageId": "UK",
            "nationalityId": "GRC",  // Make sure this value fits your case
            "prospect": false,
            "usualStoreIdentifier": {
                "id": "DE01",
                "externalReference": "DE01WIL"
            },
            "userFields": [
                { "id": 2, "valueType": "CaracterString", "value": { "text": middleName } },
                { "id": 3, "valueType": "CaracterString", "value": { "text": salutation } },
                { "id": 4, "valueType": "CaracterString", "value": { "text": academicTitle } },
                { "id": 5, "valueType": "CaracterString", "value": { "text": nobilityTitle } },
                { "id": 6, "valueType": "CaracterString", "value": { "text": nameAddition } },
                { "id": 7, "valueType": "CaracterString", "value": { "text": profession } },
                { "id": 8, "valueType": "CaracterString", "value": { "text": closestStore } }
            ],
            "individual": {
                "alternateFirstName": "",
                "alternateLastName": "",
                "firstName": firstName,
                "lastName": lastName,
                "gender": gender,
                "titleId": "1",  // Verify if this is needed
                "birthDate": {
                    "day": birthdateParts[1],
                    "month": birthdateParts[0],
                    "year": birthdateParts[2]
                },
                "communication": {
                    "mailing": true,
                    "emailing": true,
                    "emailRecovery": true,
                    "emails": [
                        {
                            "id": 2,
                            "value": email,
                            "validity": "Valid",
                            "optin": "AskCustomer"
                        }
                    ],
                    "phones": [
                        {
                            "type": phonetype,
                            "value": phone,
                            "validity": "Valid",
                            "optin": "AskCustomer"
                        }
                    ]
                }
            },
            "address": {
                "city": city,
                "countryId": "GRC",  // Verify if this is correct
                "notAtThisAddress": true,
                "optinPostal": "AskCustomer",
                "lines": [
                    {
                        "id": "1",
                        "value": addressLine1
                    }
                ],
                "zipCode": postalCode
            }
        }
    };

    console.log(jsonBody);

    fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_ACCESS_TOKEN'  // Replace with the actual token if needed
        },
        body: JSON.stringify(jsonBody)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error in PATCH request: ' + response.statusText);
        }
    })
    .then(data => {
        console.log('Success:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
