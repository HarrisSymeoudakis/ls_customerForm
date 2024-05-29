fetch('https://ls-customerserver.onrender.com/swagger/Addresses ')
    .then(response => response.json())
    .then(data => {
        console.log(data);
    });

fetch('https://ls-customerserver.onrender.com/swagger/customerOrders')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // Get the tbody element where we want to append the new rows
        const tbodyOrders = document.getElementById('ordersTableBody');
        const tbodyReservations = document.getElementById('reservationsTableBody');
        // Iterate through each header in the response
        data.forEach((order, index) => {
            const header = order.header;
            if (header) {
                // Create a new row element
                const newRowOrder = document.createElement('tr');
                const newRowReservation = document.createElement('tr');
                // Create cells and add content
                newRowOrder.innerHTML = `
                <td>${header.documentKey.number}</td>
                <td>${new Date(header.documentDate).toLocaleDateString()}</td>
                <td>${header.storeId || 'N/A'}</td>
                <td>${header.customer.id}</td>
                <td>${header.customer.lastName}</td>
                <td>quantity</td>
                <td>tax inc</td>
                <td>${new Date(header.deliveryDate).toLocaleDateString()}</td>
                    <td style="width: 20%;">
                        <a href="#" class="table-link text-warning">
                            <span class="fa-stack">
                                <i class="fa fa-square fa-stack-2x"></i>
                                <i class="fa fa-search-plus fa-stack-1x fa-inverse"></i>
                            </span>
                        </a>
                        <a href="#" class="table-link text-info">
                            <span class="fa-stack">
                                <i class="fa fa-square fa-stack-2x"></i>
                                <i class="fa fa-pencil fa-stack-1x fa-inverse"></i>
                            </span>
                        </a>
                        <a href="#" class="table-link danger">
                            <span class="fa-stack">
                                <i class="fa fa-square fa-stack-2x"></i>
                                <i class="fa fa-trash-o fa-stack-1x fa-inverse"></i>
                            </span>
                        </a>
                    </td>
                `;

                newRowReservation.innerHTML = `
                <td>${header.documentKey.number}</td>
                <td>${new Date(header.documentDate).toLocaleDateString()}</td>
                <td>${header.storeId || 'N/A'}</td>
                <td>${header.customer.id}</td>
                <td>${header.customer.lastName}</td>
                <td>quantity</td>
                <td>tax inc</td>
                <td>${new Date(header.deliveryDate).toLocaleDateString()}</td>
                    <td style="width: 20%;">
                        <a href="#" class="table-link text-warning">
                            <span class="fa-stack">
                                <i class="fa fa-square fa-stack-2x"></i>
                                <i class="fa fa-search-plus fa-stack-1x fa-inverse"></i>
                            </span>
                        </a>
                    
                    </td>
                `;



                // Append the new row to the tbody
                tbodyOrders.appendChild(newRowOrder);
                tbodyReservations.appendChild(newRowReservation);
            }
        });
    })
    .catch(error => console.error('Error fetching data:', error));

let responseData;
let callbackURL;

fetch('https://ls-customerserver.onrender.com/latest')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        callbackURL = data.callbackUrl;
        delete data.callbackUrl;
        responseData = data;

        const birthdate = `${data.birthMonth}/${data.birthDay}/${data.birthYear}`;
        const gender = data.gender;

        const finalAddress = data.postalAddresses[0] || {};
        const phone = data.phones[0]?.phone || "";
        const phonetype = data.phones[0]?.phoneType || "";
        const email = data.emails[0]?.email || "";

        document.getElementById('customerId').value = data.customerId || "";
        document.getElementById('firstName').value = data.firstName || "";
        document.getElementById('lastName').value = data.lastName || "";
        document.getElementById('birthdate').value = birthdate || "";
        document.getElementById('gender').value = gender || "";
        document.getElementById('phone').value = phone;
        document.getElementById('phonetype').value = phonetype;
        document.getElementById('addressConsent').value = finalAddress.addressConsent || "";
        document.getElementById('addressLine1').value = finalAddress.addressLine1 || "";
        document.getElementById('city').value = finalAddress.city || "";
        document.getElementById('postalCode').value = finalAddress.postalCode || "";
        document.getElementById('email').value = email;

        validateEmail();

        const emailField = document.getElementById('email');
        emailField.addEventListener('input', validateEmail);
    })
    .catch(error => console.error('Error fetching data:', error));

document.getElementById('saveChangesBtn').addEventListener('click', function() {
    const customerId = document.getElementById('customerId').value;
    const firstName = document.getElementById('firstName').value;
    const email = document.getElementById('email').value;
    const lastName = document.getElementById('lastName').value;
    const birthdate = document.getElementById('birthdate').value;
    const gender = document.getElementById('gender').value;
    const phone = document.getElementById('phone').value;
    const phonetype = document.getElementById('phonetype').value;
    const address = document.getElementById('address').value;
    const addressConsent = document.getElementById('addressConsent').value;
    const addressLine1 = document.getElementById('addressLine1').value;
    const city = document.getElementById('city').value;
    const postalCode = document.getElementById('postalCode').value;

    responseData.customerId = customerId || "";
    responseData.firstName = firstName || "";
    responseData.lastName = lastName || "";
    responseData.emails[0].email = email || "";
    responseData.gender = gender || "";
    responseData.phones[0].phone = phone || "";
    responseData.phones[0].phoneType = phonetype || "";

    const birthDates = birthdate.split("/");
    responseData.birthMonth = birthDates[0] || "";
    responseData.birthDay = birthDates[1] || "";
    responseData.birthYear = birthDates[2] || "";

    responseData.postalAddresses[0].addressConsent = addressConsent || "";
    responseData.postalAddresses[0].addressLine1 = addressLine1 || "";
    responseData.postalAddresses[0].city = city || "";
    responseData.postalAddresses[0].postalCode = postalCode || "";

    console.log('Updated response:', responseData);
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

function validateEmail() {
    const emailField = document.getElementById('email');
    const email = emailField.value;
    const message = document.getElementById('message');
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,6}$/;

    if (emailPattern.test(email)) {
        message.textContent = "Valid Email Address!!";
        message.style.color = "green";
    } else {
        message.textContent = "Invalid Email Address!!";
        message.style.color = "red";
    }
}

