fetch('https://ls-customerserver.onrender.com/swagger/customerOrders')
            .then(response => response.json())
            .then(data => {
                callbackURL = data.callbackUrl;
                console.log(data);
            })
            .catch(error => console.error('Error fetching data:', error));

        
        
        
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
                let birthdate = data.birthMonth + "/" +data.birthDay+ "/"+ data.birthYear;
                let gender = data.gender;
                let customerAddressInfo =data.postalAddresses[0];
                let finalAddress = data.postalAddresses[0].addressConsent + " " +data.postalAddresses[0].addressLine1 +" "+data.postalAddresses[0].city +" "+data.postalAddresses[0].postalCode; 
                let phone = data.phones[0].phone;
                let phonetype = data.phones[0].phoneType;
                console.log(birthdate , gender ,finalAddress,phone,phonetype);
                document.getElementById('customerId').value = data.customerId;
                document.getElementById('firstName').value = data.firstName;
                document.getElementById('lastName').value = data.lastName;
                document.getElementById('birthdate').value = birthdate;
                document.getElementById('gender').value = gender;
                document.getElementById('phone').value = phone;
                document.getElementById('phonetype').value = phonetype;
                document.getElementById('address').value = finalAddress;
                document.getElementById('email').value = data.emails[0].email; // Assuming you have an input field with id 'email' for email
            })
            .catch(error => console.error('Error fetching data:', error));

        // Add event listener to the "Save changes" button
        document.getElementById('saveChangesBtn').addEventListener('click', function() {
            // Get the current values from the form
            var customerId = document.getElementById('customerId').value;
            var firstName = document.getElementById('firstName').value;
            var email = document.getElementById('email').value;
            var lastName = document.getElementById('lastName').value;
            var birthdate = document.getElementById('birthdate').value;
            var gender = document.getElementById('gender').value;
            var phone = document.getElementById('phone').value;
            var phonetype = document.getElementById('phonetype').value;
            var address = document.getElementById('address').value;

            // Update the data
            responseData.customerId = customerId;
            responseData.firstName = firstName;
            responseData.lastName = lastName;
            responseData.emails[0].email = email;
            responseData.gender=gender;
            responseData.phones[0].phone = phone;
            responseData.phones[0].phoneType = phonetype;
            
            const birthDates = birthdate.split("/");

            responseData.birthMonth =birthDates[0];
            responseData.birthDay=birthDates[1];
            responseData.birthYear=birthDates[2];
            
            const addresses = address.split(" ");
            responseData.postalAddresses[0].addressConsent=addresses[0];
            responseData.postalAddresses[0].addressLine1=addresses[1];
            responseData.postalAddresses[0].city =addresses[2];
            responseData.postalAddresses[0].postalCode=addresses[3];

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
   
