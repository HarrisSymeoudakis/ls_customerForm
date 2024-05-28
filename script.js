
        // Declare response variable using let
        let responseData;
        let callbackURL;

        // Fetch data from server and populate the form
        fetch('https://ls-customerserver.onrender.com/latest')
            .then(response => response.json())
            .then(data => {
                callbackURL = data.callbackUrl;
                delete data.callbackUrl;
                responseData = data;
                let birthdate = data.birthMonth + "" +data.birthDay+ ""+ data.birthYear;
                let gender = data.gender;
                let customerAddressInfo =data.postalAddresses[0];
                let finalAddress = customerAddressInfo.addressConsent + "" +customerAddressInfo.addressLine1 +""+customerAddressInfo.city +""+customerAddressInfo.postalCode; 
                let phone = data.phones[0].phone;
                let phonetype = data.phones[0].phoneType;
                console.log(birthdate , gender ,finalAddress,phone,phonetype);
                document.getElementById('customerId').value = data.customerId;
                document.getElementById('name').value = data.firstName;
                document.getElementById('lastName').value = data.lastName;
                document.getElementById('email').value = data.emails[0].email; // Assuming you have an input field with id 'email' for email
            })
            .catch(error => console.error('Error fetching data:', error));

        // Add event listener to the "Save changes" button
        document.getElementById('saveChangesBtn').addEventListener('click', function() {
            // Get the current values from the form
            var customerId = document.getElementById('customerId').value;
            var name = document.getElementById('name').value;
            var email = document.getElementById('email').value;
            var lastName = document.getElementById('lastName').value;

            // Update the data
            responseData.customerId = customerId;
            responseData.firstName = name;
            responseData.emails[0].email = email;
            responseData.lastName = lastName;

            // Log the updated response to the console
            console.log('Updated response:', responseData);

            // If you need to send this data to a server, you would use a method like fetch or XMLHttpRequest here
            console.log('callbackURL:', callbackURL);
            fetch('https://ls-customerserver.onrender.com/returning', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(responseData)
            }).then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            }).catch((error) => {
                console.error('Error:', error);
            });
        });
   
