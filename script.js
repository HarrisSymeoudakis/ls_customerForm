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
        document.getElementById('customerId').value = data.customerId;
        document.getElementById('firstName').value = data.firstName; // Changed 'name' to 'firstName' to match your HTML
        document.getElementById('lastName').value = data.lastName;
        document.getElementById('email').value = data.emails[0].email;
    })
    .catch(error => console.error('Error fetching data:', error));

// Add event listener to the "Save changes" button
document.getElementById('saveChangesBtn').addEventListener('click', function() {
    // Get the current values from the form
    var customerId = document.getElementById('customerId').value;
    var firstName = document.getElementById('firstName').value; // Changed 'name' to 'firstName' to match your HTML
    var lastName = document.getElementById('lastName').value;
    var email = document.getElementById('email').value;

    // Update the data
    responseData.customerId = customerId;
    responseData.firstName = firstName;
    responseData.lastName = lastName;
    responseData.emails[0].email = email;

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
