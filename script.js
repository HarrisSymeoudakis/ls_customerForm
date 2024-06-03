document.getElementById('newAddressBtn').addEventListener('click', function() {
    // Example data for a new address (replace with actual data)
    const addressTypes = 'Home';
    const countryId = 'USA';
    const zipCode = '12345';
    const city = 'New York';
    const linesValue = '123 Main St';

    const addressItem = document.createElement('div');
        addressItem.classList.add('row');

        const addressItemCol = document.createElement('div');
        addressItemCol.classList.add( 'col-md-6');

        const cardContainer = document.createElement('div');
        cardContainer.classList.add('bg-white', 'card', 'addresses-item', 'mb-4', 'border', 'shadow-sm');

        const goldMembersContainer = document.createElement('div');
        goldMembersContainer.classList.add('gold-members', 'p-4');

        const mediaContainer = document.createElement('div');
        mediaContainer.classList.add('media');

        const iconContainer = document.createElement('div');
        iconContainer.classList.add('mr-3');
        iconContainer.innerHTML = '<i class="icofont-ui-home icofont-3x"></i>';

        const mediaBody = document.createElement('div');
        mediaBody.classList.add('media-body');

        const title = document.createElement('h6');
        title.classList.add('mb-1', 'address-title');
        title.textContent = addressTypes;

        const addressInfo = document.createElement('p');
        addressInfo.classList.add('text-black', 'address-info');
        addressInfo.textContent = `${countryId}, ${zipCode}, ${city}, ${linesValue}`;

        const actionsContainer = document.createElement('p');
            actionsContainer.classList.add('mb-0', 'text-black', 'font-weight-bold');
            actionsContainer.innerHTML = `
        <button class="btn btn-primary edit-address-btn"><i class="icofont-ui-edit"></i> EDIT</button>
        <button class="text-danger delete-address-btn"><i class="icofont-ui-delete"></i> DELETE</button>
    `;

        // Append the elements to construct the address box
        mediaBody.appendChild(title);
        mediaBody.appendChild(addressInfo);
        mediaBody.appendChild(actionsContainer);
        mediaContainer.appendChild(iconContainer);
        mediaContainer.appendChild(mediaBody);
        goldMembersContainer.appendChild(mediaContainer);
        cardContainer.appendChild(goldMembersContainer);
        addressItem.appendChild(addressItemCol);
        addressItemCol.appendChild(cardContainer);

        const editButton = addressItem.querySelector('.edit-address-btn');
            editButton.addEventListener('click', handleEditButtonClick);

            const deleteButton = addressItem.querySelector('.delete-address-btn');
    deleteButton.addEventListener('click', handleDeleteButtonClick);


       

        // Append the new address box to the address container
        const addressContainer = document.getElementById('addressContainer');
        addressContainer.appendChild(addressItem);

        reorganizeAddresses();

    });

function handleEditButtonClick(event) {
    // Disable editing for all editable elements except the one clicked
    const allEditableElements = document.querySelectorAll('[contentEditable="true"]');
    allEditableElements.forEach(element => {
        if (element !== event.target.closest('.addresses-item').querySelector('.address-info') &&
            element !== event.target.closest('.addresses-item').querySelector('.address-title')) {
            element.contentEditable = false;
        }
    });

    // Enable address editing for the clicked item
    const addressItem = event.target.closest('.addresses-item');
    const addressInfo = addressItem.querySelector('.address-info');
    const title = addressItem.querySelector('.address-title');

    addressInfo.contentEditable = true;
    title.contentEditable = true;

    addressInfo.focus();
}

function handleAddressContainerClick(event) {
    // Remove border class from all addresses
    const addresses = document.querySelectorAll('.addresses-item');
    addresses.forEach(address => {
        address.classList.remove('border', 'border-primary');
    });

    // Add border class to the clicked address
    const clickedAddress = event.target.closest('.addresses-item');
    if (clickedAddress) {
        clickedAddress.classList.add('border', 'border-primary');
    }
}
function handleDeleteButtonClick(event) {
    const addressItem = event.target.closest('.addresses-item');
    addressItem.remove(); // Remove the entire address item from the DOM
    reorganizeAddresses();
}

// Function to reorganize addresses into rows of two
// Function to reorganize addresses into rows of two
function reorganizeAddresses() {
    const addressContainer = document.getElementById('addressContainer');
    const addresses = addressContainer.querySelectorAll('.addresses-item');

    // Remove all existing rows
    addressContainer.innerHTML = '';

    let row = null;
    addresses.forEach((address, index) => {
        if (index % 2 === 0) {
            // Create a new row for every even index
            row = document.createElement('div');
            row.classList.add('row');
            addressContainer.appendChild(row);
        }
        // Create a column for the address item
        const col = document.createElement('div');
        col.classList.add('col-md-6');
        col.appendChild(address);
        // Append the column to the current row
        row.appendChild(col);
    });
}


fetch('https://ls-customerserver.onrender.com/swagger/Addresses ')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        addressesData =data;
        // Assuming `addressesData` is the array containing the address information fetched from the server
        const addressContainer = document.getElementById('addressContainer');
        let addressCount = 0; // Initialize the address count
        
        addressesData.forEach((address, index) => {
            if (addressCount % 2 === 0) { // Check if it's time to start a new row
                // Create a new row element
                const row = document.createElement('div');
                row.classList.add('row');
                addressContainer.appendChild(row); // Append the new row to the container
            }
        
            const addressTypes = address.types.length > 1 ? address.types.join(', ') : address.types[0]; // Join multiple types with commas if more than one
        
            // Create elements for the address details
            const addressItem = document.createElement('div');
            addressItem.classList.add('col-md-6');
        
            const cardContainer = document.createElement('div');
            cardContainer.classList.add('bg-white', 'card', 'addresses-item', 'mb-4', 'border', 'shadow-sm');
        
            const goldMembersContainer = document.createElement('div');
            goldMembersContainer.classList.add('gold-members', 'p-4');
        
            const mediaContainer = document.createElement('div');
            mediaContainer.classList.add('media');
        
            const iconContainer = document.createElement('div');
            iconContainer.classList.add('mr-3');
            iconContainer.innerHTML = '<i class="icofont-ui-home icofont-3x"></i>';
        
            const mediaBody = document.createElement('div');
            mediaBody.classList.add('media-body');
        
            const title = document.createElement('h6');
            title.classList.add('mb-1','address-title');
            title.textContent = addressTypes;
        
            const addressInfo = document.createElement('p');
            addressInfo.classList.add('text-black', 'address-info');
            addressInfo.innerHTML = `
                ${address.country.id}, ${address.zipCode}, ${address.city}, ${address.lines[0]?.value || ''}
            `;
        
            const actionsContainer = document.createElement('p');
            actionsContainer.classList.add('mb-0', 'text-black', 'font-weight-bold');
            actionsContainer.innerHTML = `
        <button class="btn btn-primary edit-address-btn"><i class="icofont-ui-edit"></i> EDIT</button>
        <button class="text-danger delete-address-btn"><i class="icofont-ui-delete"></i> DELETE</button>
    `;
        
            // Append elements to construct the address item
            mediaBody.appendChild(title);
            mediaBody.appendChild(addressInfo);
            mediaBody.appendChild(actionsContainer);
            mediaContainer.appendChild(iconContainer);
            mediaContainer.appendChild(mediaBody);
            goldMembersContainer.appendChild(mediaContainer);
            cardContainer.appendChild(goldMembersContainer);
            addressItem.appendChild(cardContainer);
        
            // Append the address item to the current row
            const currentRow = addressContainer.lastChild; // Get the last row
            currentRow.appendChild(addressItem);
        
            const editButton = addressItem.querySelector('.edit-address-btn');
            editButton.addEventListener('click', handleEditButtonClick);

            const deleteButton = addressItem.querySelector('.delete-address-btn');
    deleteButton.addEventListener('click', handleDeleteButtonClick);


            addressCount++; // Increment the address count
        });
        
        addressContainer.addEventListener('click', handleAddressContainerClick);
    });

    fetch('https://ls-customerserver.onrender.com/swagger/customerOrders')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const tbodyOrders = document.getElementById('ordersTableBody');
        
        data.forEach((order, index) => {
            const header = order.header;
            const lines = order.lines || [];
            
            if (header) {
                // Calculate total quantity and total amount for the order
                let totalQuantity = 0;
                let totalAmount = 0;

                lines.forEach(line => {

                    const quantity = line.quantities.quantity;
                    const unitPrice = line.unitPrice;
                    
                    const discount = line.discounts && line.discounts.length > 0 ? line.discounts[0].amount : 0;
                    const total = (quantity * unitPrice) - discount;
                    
                    
                    totalQuantity += quantity
                    totalAmount += total;
                });

                const newRowOrder = document.createElement('tr');
              
                newRowOrder.innerHTML = `
                    <td>${header.documentKey.number}</td>
                    <td>${new Date(header.documentDate).toLocaleDateString()}</td>
                    <td>${header.storeId || 'N/A'}</td>
                    <td>${header.customer.id}</td>
                    <td>${header.customer.lastName}</td>
                    <td>${totalQuantity}</td>
                    <td>${totalAmount.toFixed(2)}</td>
                    <td>${new Date(header.deliveryDate).toLocaleDateString()}</td>
                    <td style="width: 20%;">
                        <a href="#" class="table-link text-warning" onclick="showOrder(${index})">
                            <span class="fa-stack">
                                <i class="fa fa-square fa-stack-2x"></i>
                                <i class="fa fa-search-plus fa-stack-1x fa-inverse"></i>
                            </span>
                        </a>
                        <a href="#" class="table-link text-info" onclick="editOrder(${index})">
                            <span class="fa-stack">
                                <i class="fa fa-square fa-stack-2x"></i>
                                <i class="fa fa-pencil fa-stack-1x fa-inverse"></i>
                            </span>
                        </a>
                        <a href="#" class="table-link danger" onclick="confirmDelete(${index})">
                            <span class="fa-stack">
                                <i class="fa fa-square fa-stack-2x"></i>
                                 <i class="fa fa-trash-o fa-stack-1x fa-inverse"></i>
                            </span>
                        </a>
                    </td>
                `;

                // Append the new row to the tbody
                tbodyOrders.appendChild(newRowOrder);
            }
        });

        window.ordersData = data;
    })
    .catch(error => console.error('Error fetching data:', error));

    
    
    
function showPopup(orderIndex) {
    fetch('https://ls-customerserver.onrender.com/swagger/customerOrders')
        .then(response => response.json())
        .then(data => {
            const order = data[orderIndex];

            // Store the order data globally for easy access
            window.ordersData = data;

            // Calculate total amount for the entire order
            let totalAmount = calculateTotalAmount(order.lines);

            const modalHtml = `
                <div class="modal fade" id="orderModal" tabindex="-1" role="dialog" aria-labelledby="orderModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="orderModalLabel">Order Details</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class="container">
                                    <div class="contentbar">
                                        <div class="row">
                                            <div class="col-md-12 col-lg-12 col-xl-12">
                                                <div class="card m-b-30">
                                                    <div class="card-header">
                                                        <h5 class="card-title">Cart</h5>
                                                    </div>
                                                    <div class="card-body">
                                                        <div class="row justify-content-center">
                                                            <div class="col-lg-10 col-xl-8">
                                                                <div class="cart-container">
                                                                    <div class="cart-head">
                                                                        <div class="table-responsive">
                                                                            <table class="table table-borderless">
                                                                                <thead>
                                                                                    <tr>
                                                                                        <th scope="col">No Reference</th>
                                                                                        <th scope="col">Description</th>                                               
                                                                                        <th scope="col">Quantity</th>
                                                                                        <th scope="col">Price Discount</th>
                                                                                        <th scope="col">Amount</th>
                                                                                        <th scope="col">Delivery Date</th>
                                                                                        <th scope="col" class="text-right">Total</th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody id="order-lines-tbody">
                                                                                ${order.lines.map((line, index) => {
                                                                                    const quantity = line.quantities.quantity;
                                                                                    const unitPrice = line.unitPrice;
                                                                                    const discount = line.discounts && line.discounts.length > 0 ? line.discounts[0].amount : 0;
                                                                                    const total = (quantity * unitPrice) - discount;
                                                                                    return `
                                                                                        <tr id="line-row-${index}">
                                                                                            <td>${index + 1}</td>
                                                                                            <td>${line.description}</td>
                                                                                            <td>${quantity}</td>
                                                                                            <td>€${discount}</td>
                                                                                            <td>€${unitPrice.toFixed(2)}</td>
                                                                                            <td>${new Date(line.deliveryDate).toLocaleDateString()}</td>
                                                                                            <td class="text-right">€${total.toFixed(2)}</td>
                                                                                            <td>
                                                                                                <a href="#" class="table-link danger" onclick="confirmDeleteLine(${orderIndex}, ${index})">
                                                                                                    <span class="fa-stack">
                                                                                                        <i class="fa fa-square fa-stack-2x"></i>
                                                                                                        <i class="fa fa-trash-o fa-stack-1x fa-inverse"></i>
                                                                                                    </span>
                                                                                                </a>
                                                                                            </td>
                                                                                        </tr>
                                                                                    `;
                                                                                }).join('')}
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                                <div class="cart-body">
                                                                    <div class="row">
                                                                        <div class="col-md-12 order-1 order-lg-2 col-lg-7 col-xl-6">
                                                                            <div class="order-total table-responsive">
                                                                                <table class="table table-borderless text-right">
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td class="f-w-7 font-18"><h4>Tax Inc. Total Amount:</h4></td>
                                                                                            <td class="f-w-7 font-18 amount"><h4>€${totalAmount}</h4></td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="cart-footer text-right">
                                                                    <button type="button" class="btn btn-success my-1"><i class="ri-save-line mr-2"></i>Update Cart</button>
                                                                    <a href="page-checkout.html" class="btn btn-primary my-1">Proceed to Checkout<i class="ri-arrow-right-line ml-2"></i></a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // Remove existing modal if present
            const existingModal = document.getElementById('orderModal');
            if (existingModal) {
                existingModal.parentNode.removeChild(existingModal);
            }

            // Append new modal to body
            document.body.insertAdjacentHTML('beforeend', modalHtml);

            // Show the modal
            $('#orderModal').modal('show');
        })
        .catch(error => console.error('Error fetching data:', error));
}

    
function closePopup() {
    document.getElementById('popupContainer').style.display = 'none';
}

// Placeholder functions for edit and delete
function editOrder(index) {
    showPopup(index);
   
}

function showOrder(index) {
    showPopup(index);
    
}

function confirmDeleteLine(orderIndex, lineIndex) {
    const confirmation = confirm("Are you sure you want to delete this record?");
    if (confirmation) {
        deleteLine(orderIndex, lineIndex);
    }
}


function calculateTotalAmount(lines) {
    let totalAmount = 0;
    lines.forEach(line => {
        const quantity = line.quantities.quantity;
        const unitPrice = line.unitPrice;
        const discount = line.discounts && line.discounts.length > 0 ? line.discounts[0].amount : 0;
        const total = (quantity * unitPrice) - discount;
        totalAmount += total;
    });
    return totalAmount.toFixed(2);
}

function deleteLine(orderIndex, lineIndex) {
    const order = window.ordersData[orderIndex];
    order.lines.splice(lineIndex, 1); // Remove the line from the data

    document.querySelector(`#line-row-${lineIndex}`).remove(); // Remove the line from the DOM

    // Recalculate the total amount
    const totalAmount = calculateTotalAmount(order.lines);

    // Update the total amount in the modal
    document.querySelector('#orderModal .order-total h3').textContent = `€${totalAmount}`;
}

function deleteOrder(orderIndex) {
    // Your logic to delete the order from the server or local data
    
    document.querySelector(`#order-row-${orderIndex}`).remove();

    updateLinesInModal(orderIndex);
        
}

function updateLinesInModal(orderIndex) {
    const order = window.ordersData[orderIndex];
    const tbody = document.querySelector('#orderModal table tbody');
    tbody.innerHTML = ''; // Clear existing rows

    order.lines.forEach((line, index) => {
        const quantity = line.quantities.quantity;
        const unitPrice = line.unitPrice;
        const discount = line.discounts && line.discounts.length > 0 ? line.discounts[0].amount : 0;
        const total = (quantity * unitPrice) - discount;

        const rowHtml = `
            <tr id="line-row-${index}">
                <td>${index + 1}</td>
                <td>${line.description}</td>
                <td>${quantity}</td>
                <td>€${discount}</td>
                <td>€${unitPrice.toFixed(2)}</td>
                <td>${new Date(line.deliveryDate).toLocaleDateString()}</td>
                <td class="text-right">€${total.toFixed(2)}</td>
                <td>
                    <a href="#" class="table-link danger" onclick="confirmDeleteLine(${orderIndex}, ${index})">
                        <span class="fa-stack">
                            <i class="fa fa-square fa-stack-2x"></i>
                            <i class="fa fa-trash-o fa-stack-1x fa-inverse"></i>
                        </span>
                    </a>
                </td>
            </tr>
        `;
        tbody.insertAdjacentHTML('beforeend', rowHtml);
    });
}
    
fetch('https://ls-customerserver.onrender.com/swagger/customerReservations')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const tbodyReservations = document.getElementById('reservationsTableBody');
        data.forEach((order, index) => {
            const header = order.header;
            if (header) {
                // Create a new row element
               
                const newRowReservation = document.createElement('tr');
                // Create cells and add content
                
                newRowReservation.innerHTML = `
                <td>${header.key.number}</td>
                <td>${new Date(header.documentDate).toLocaleDateString()}</td>
                <td>${header.storeId || 'N/A'}</td>
                <td>${header.customer.id}</td>
                <td>${header.customer.lastName}</td>
                <td>${header.totalQuantity}</td>
                <td>tax inc</td>
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
                
                tbodyReservations.appendChild(newRowReservation);
            }
        });
    });
let responseData;
let callbackURL;

fetch('https://ls-customerserver.onrender.com/swagger/CustomerUserFields')
.then(response => response.json())
.then(data => {
    console.log(data);
    responseData = data;
    const usrFields = data.userFields
    document.getElementById('usrfieldConnectedSalesperson').value = usrFields[0].value.listElement.value + " - " +usrFields[0].value.listElement.description|| "";
    document.getElementById('usrfieldMiddleName').value =  usrFields[1].value.text || "";
    document.getElementById('usrfieldSalutation').value = usrFields[2].value.text || "";
    document.getElementById('usrfieldAcademicTitile').value = usrFields[3].value.text || "";
    document.getElementById('usrfieldNobilityTitle').value = usrFields[4].value.text || "";
    document.getElementById('usrfieldNameAddition').value = usrFields[5].value.text || "";
    document.getElementById('usrfieldProfession').value = usrFields[6].value.text || "";
    document.getElementById('usrfieldClosestStore').value = usrFields[7].value.text || "";
    

   
})
.catch(error => console.error('Error fetching data:', error));

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

/* document.getElementById('saveChangesBtn').addEventListener('click', function() {
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
}); */

function validateEmail() {
    const emailField = document.getElementById('email');
    const email = emailField.value;
    const message = document.getElementById('message');
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,6}$/;

    if (emailPattern.test(email)) {
        message.textContent = "Valid Email Address";
        message.style.color = "green";
    } else {
        message.textContent = "Invalid Email Address";
        message.style.color = "red";
    }
}
