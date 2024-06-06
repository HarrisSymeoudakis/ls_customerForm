function showBlankPopup() {
	
			

			// Store the order data globally for easy access
			

			// Calculate total amount for the entire order
			let totalAmount = 0;

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
                                                        <div>
                                                            <div>
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
                                                                                
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                                <div class="cart-body">
                                                                
                                                                <div class="new-line">
                                                                <button class="btn btn-primary">New Line</button>
                                                                </div>
                                                                
                                                                <h4>Tax Inc. Total Amount:</h4>
                                                                <h3>€${totalAmount}</h4>
                                                                </div>
                                                                <div class="cart-footer text-right">
                                                                    
                                                                    <a href="page-checkout.html" class="btn btn-primary my-1">Create Order<i class="ri-arrow-right-line ml-2"></i></a>
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
		
		
}


function showEditablePopup(orderIndex) {
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
                                                        <div>
                                                            <div>
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
                                                                                        <tr id="line-row-${index +1}">
                                                                                            <td>${index +1 }</td>
                                                                                            <td>${line.description}</td>
                                                                                            <td>${quantity}</td>
                                                                                            <td>€${discount}</td>
                                                                                            <td>€${unitPrice.toFixed(2)}</td>
                                                                                            <td>${new Date(line.deliveryDate).toLocaleDateString()}</td>
                                                                                            <td class="text-right">€${total.toFixed(2)}</td>
                                                                                            <td>
                                                                                                <a href="#" class="table-link danger" onclick="confirmDeleteLine(${orderIndex}, ${index+1})">
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
                                                                
                                                                <div class="new-line">
                                                                <button class="btn btn-primary">New Line</button>
                                                                </div>
                                                                
                                                                <h4>Tax Inc. Total Amount:</h4>
                                                                <h3>€${totalAmount}</h4>
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

function showPopup(orderIndex, text) {
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
                                                        <div>
                                                            <div>
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
                                                                                        <tr id="line-row-${index +1}">
                                                                                            <td>${index +1 }</td>
                                                                                            <td>${line.description}</td>
                                                                                            <td>${quantity}</td>
                                                                                            <td>€${discount}</td>
                                                                                            <td>€${unitPrice.toFixed(2)}</td>
                                                                                            <td>${new Date(line.deliveryDate).toLocaleDateString()}</td>
                                                                                            <td class="text-right">€${total.toFixed(2)}</td>
                                                                                            
                                                                                        </tr>
                                                                                    `;
                                                                                }).join('')}
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                                <div class="cart-body">
                                                                <div class="new-line">
                                                               
                                                                </div>
                                                                <h4>Tax Inc. Total Amount:</h4>
                                                                <h3>€${totalAmount}</h4>
                                                                </div>
                                                                <div class="cart-footer text-right">
                                                                    
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
	showEditablePopup(index);

}

function showOrder(index) {
	showPopup(index);

}
function showReservation(index) {
	showPopupReservation(index);

}


function confirmDelete(orderNumber) {
	const confirmation = confirm("Are you sure you want to delete this record?");
	if (confirmation) {
		const ordersData = window.ordersData;
		const orderIndex = ordersData.findIndex(orderLine => orderLine.header.documentKey.number === orderNumber);

		// If the order line is found, remove it
		if (orderIndex !== -1) {
			ordersData.splice(orderIndex, 1);

			// Also remove the corresponding row from the DOM
			const orderRow = document.querySelector(`#order-row-${orderNumber}`);
			if (orderRow) {
				orderRow.remove();
			}
		}
	}

}
function confirmDeleteLine(orderIndex,lineNumber) {
// Find the line index based on the lineNumber
const confirmation = confirm("Are you sure you want to delete this record?");
	if (confirmation) {
		const order = window.ordersData[orderIndex];
const lineIndex = lineNumber - 1; // Adjust for 0-based indexing

if (lineIndex >= 0 && lineIndex < order.lines.length) {
	// Remove the line from the data
	order.lines[lineIndex].unitPrice = 0;

	if (order.lines[lineIndex].discounts && order.lines[lineIndex].discounts.length > 0) {
		order.lines[lineIndex].discounts[0].amount = 0;
	}

	// Remove the line from the DOM
	const lineRow = document.querySelector(`#line-row-${lineNumber}`);
	if (lineRow) {
		lineRow.remove();
	}

	// Recalculate the total amount
	const totalAmount = calculateTotalAmount(order.lines);

	// Update the total amount in the modal
	document.querySelector('#orderModal .cart-body h3').textContent = `€${totalAmount}`;
} else {
	console.error(`Line with No Reference ${lineNumber} not found.`);
}
}
}

function confirmDeleteLine(orderIndex, lineNumber) {
	const confirmation = confirm("Are you sure you want to delete this record?");
	if (confirmation) {
		const order = window.ordersData[orderIndex];

		// Find the line index based on the lineNumber
		const lineIndex = lineNumber - 1; // Adjust for 0-based indexing

		if (lineIndex >= 0 && lineIndex < order.lines.length) {
			// Remove the line from the data
			order.lines[lineIndex].unitPrice = 0;

			if (order.lines[lineIndex].discounts && order.lines[lineIndex].discounts.length > 0) {
				order.lines[lineIndex].discounts[0].amount = 0;
			}

			// Remove the line from the DOM
			const lineRow = document.querySelector(`#line-row-${lineNumber}`);
			if (lineRow) {
				lineRow.remove();
			}

			// Recalculate the total amount
			const totalAmount = calculateTotalAmount(order.lines);

			// Update the total amount in the modal
			document.querySelector('#orderModal .cart-body h3').textContent = `€${totalAmount}`;
		} else {
			console.error(`Line with No Reference ${lineNumber} not found.`);
		}
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
	document.querySelector('#orderModal .cart-body h3').textContent = `€${totalAmount}`;
}

function deleteOrder(orderIndex) {
	// Your logic to delete the order from the server or local data

	document.querySelector(`#order-row-${orderIndex}`).remove();

}



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
				
				const newRowOrder= document.createElement('tr');
				newRowOrder.setAttribute("id", "order-row-"+header.documentKey.number);
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
                        <a href="#" class="table-link danger" onclick="confirmDelete(${header.documentKey.number})">
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
 const newButton = document.createElement('button');
newButton.classList.add('btn', 'btn-primary-reversed'); // Add Bootstrap button styles
newButton.textContent = 'New Order';
newButton.onclick = showBlankPopup;
tbodyOrders.appendChild(newButton);
		window.ordersData = data;
	})
	.catch(error => console.error('Error fetching data:', error));

    function showPopupReservation(orderIndex) {
        fetch('https://ls-customerserver.onrender.com/swagger/customerReservations')
            .then(response => response.json())
            .then(data => {
                const order = data[orderIndex];
    
                // Store the order data globally for easy access
                window.ordersData = data;
    
                // Calculate total amount for the entire order
                
                const modalHtml = `
                    <div class="modal fade" id="orderModal" tabindex="-1" role="dialog" aria-labelledby="orderModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lg" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="orderModalLabel">Reservation Details</h5>
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
                                                            <div>
                                                                <div>
                                                                    <div class="cart-container">
                                                                        <div class="cart-head">
                                                                            <div class="table-responsive">
                                                                                <table class="table table-borderless">
                                                                                    <thead>
                                                                                        <tr>
                                                                                            <th scope="col">No Reference</th>
                                                                                            <th scope="col">Description</th>                                               
                                                                                            <th scope="col">Quantity</th>
                                                                                            
                                                                                        </tr>
                                                                                    </thead>
                                                                                    <tbody id="order-lines-tbody">
                                                                                    ${order.lines.map((line, index) => {
                                                                                        const quantity = line.quantity;
                                                                                        
                                                                                        return `
                                                                                            <tr id="line-row-${index +1}">
                                                                                                <td>${index +1 }</td>
                                                                                                <td>${line.description}</td>
                                                                                                <td>${quantity}</td>
                                                                                            </tr>
                                                                                        `;
                                                                                    }).join('')}
                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                    </div>
                                                                    <div class="cart-body">
                                                                    <div class="new-line">
                                                                   
                                                                    </div>
                                                                   
                                                                    </div>
                                                                    <div class="cart-footer text-right">
                                                                        
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

fetch('https://ls-customerserver.onrender.com/swagger/customerReservations')
	.then(response => response.json())
	.then(data => {
		console.log(data);
		const tbodyReservations = document.getElementById('reservationsTableBody');
		
		data.forEach((order, index) => {
			const header = order.header;
			const lines = order.lines || [];

			if (header) {
				// Calculate total quantity and total amount for the order
				let totalQuantity = 0;
				let totalAmount = 0;

				lines.forEach(line => {

					const quantity = line.quantity;
					const unitPrice = line.unitPrice;

					
					const total = (quantity * unitPrice) 

					totalQuantity += quantity
					totalAmount += total;
				});
				const newRowReservation = document.createElement('tr');
				
				newRowReservation.setAttribute("id", "reservation-row-"+index);
				newRowReservation.innerHTML = `
				
                <td>${header.key.number}</td>
                <td>${new Date(header.documentDate).toLocaleDateString()}</td>
                <td>${header.storeId || 'N/A'}</td>
                <td>${header.customer.id}</td>
                <td>${header.customer.lastName}</td>
                <td>${header.totalQuantity}</td>
                
                    <td style="width: 20%;">
                        
                        <a href="#" class="table-link text-warning" onclick="showReservation(${index})">
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


async function searchOrders() {
  // Collecting input values
  const ci = document.getElementById('input1').value;
  const cn = document.getElementById('input2').value;
  const cl = document.getElementById('input3').value;
  const si = document.getElementById('input4').value;
  const on = document.getElementById('input5').value;

  // Building the filter dictionary
  const filters = {};
  if (ci) filters.ci = ci;
  if (cn) filters.cn = cn;
  if (cl) filters.cl = cl;
  if (si) filters.si = si;
  if (on) filters.on = on;

  // Fetching the JSON data
  const response = await fetch('https://ls-allcustomerordersserver.onrender.com/swagger/AllCustomerActiveOrders');
  const orders = await response.json();

  // Filtering the orders based on input values
  const filteredOrders = orders.filter(order => {
    return (!filters.ci || order.header.customer.id.includes(filters.ci)) &&
           (!filters.cn || order.header.customer.firstName.includes(filters.cn)) &&
           (!filters.cl || order.header.customer.lastName.includes(filters.cl)) &&
           (!filters.si || order.header.storeId.includes(filters.si)) &&
           (!filters.on || order.header.documentKey.number.toString().includes(filters.on));
  });

  // Getting unique indexes of the matching orders
  const uniqueIndexes = filteredOrders.map(order => order.header.documentKey.number);

  // Returning or displaying the list of unique indexes
  console.log(uniqueIndexes);
  // Optionally, you can display these indexes in the UI
}

// Clear button functionality
document.getElementById('delete').addEventListener('click', () => {
  document.getElementById('input1').value = '';
  document.getElementById('input2').value = '';
  document.getElementById('input3').value = '';
  document.getElementById('input4').value = '';
  document.getElementById('input5').value = '';
  document.getElementById('input6').value = '';
});

fetch('https://ls-allcustomerordersserver.onrender.com/swagger/AllCustomerActiveOrders')
        .then(response => response.json())
        .then(data => {
            console.log(data);});

function fetchAndDisplayOrders() {
            fetch('https://ls-allcustomerordersserver.onrender.com/swagger/AllCustomerActiveOrders')
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    const tbodyOrders = document.getElementById('customfilteringbody');

                    // Clear the current content of tbodyOrders
                    tbodyOrders.innerHTML = '';

                    // Event listener for the search button
                    document.getElementById('searchButton').addEventListener('click', () => {
                        // Get input fields values to match
                        const customerIdInput = document.getElementById('customerIdInput').value; 
                        const customerNameInput = document.getElementById('customerNameInput').value; 
                        const customerLastNameInput = document.getElementById('customerLastNameInput').value; 
                        const storeIdInput = document.getElementById('storeIdInput').value; 
                        const orderNumberInput = parseInt(document.getElementById('orderNumberInput').value, 10); 

                        // Clear previous results
                        tbodyOrders.innerHTML = '';

                        // Iterate over data and match with input values
                        data.forEach((order, index) => {
                            const header = order.header;
                            const lines = order.lines || [];

                            if (header) {
                                const matches = (
                                    (customerIdInput ? header.customer.id === customerIdInput : true) &&
                                    (customerNameInput ? header.customer.firstName === customerNameInput : true) &&
                                    (customerLastNameInput ? header.customer.lastName === customerLastNameInput : true) &&
                                    (storeIdInput ? header.storeId === storeIdInput : true) &&
                                    (orderNumberInput ? header.documentKey.number === orderNumberInput : true)
                                );

                                if (matches) {
                                    // Calculate total quantity and total amount for the order
                                    let totalQuantity = 0;
                                    let totalAmount = 0;

                                    lines.forEach(line => {
                                        const quantity = line.quantities.quantity;
                                        const unitPrice = line.unitPrice || 0; // Assuming unitPrice is present in the line item

                                        const discount = line.discounts && line.discounts.length > 0 ? line.discounts[0].amount : 0;
                                        const total = (quantity * unitPrice) - discount;

                                        totalQuantity += quantity;
                                        totalAmount += total;
                                    });

                                    // Create a new row for the order
                                    const newRowOrder = document.createElement('tr');
                                    newRowOrder.setAttribute("id", "order-row-" + header.documentKey.number);
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
                                            <a href="#" class="table-link danger" onclick="confirmDelete(${header.documentKey.number})">
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
                            }
                        });
                    });

                    // Store data in a global variable for later use
                    window.ordersData = data;
                })
                .catch(error => console.error('Error fetching data:', error));
        }

        // Call the function to fetch and display orders
        fetchAndDisplayOrders();



