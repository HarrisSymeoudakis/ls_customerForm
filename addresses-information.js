fetch('https://ls-customerserver.onrender.com/swagger/Addresses ')
	.then(response => response.json())
	.then(data => {
		console.log(data)
		addressesData = data;
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
			cardContainer.classList.add('bg-white', 'card-allo', 'addresses-item', 'mb-4', 'border', 'shadow-sm');

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
			addressInfo.innerHTML = `
                ${address.country.id}, ${address.zipCode}, ${address.city}, ${address.lines[0]?.value || ''}
            `;

			const actionsContainer = document.createElement('p');
			actionsContainer.classList.add('mb-0', 'text-black', 'font-weight-bold');
			actionsContainer.innerHTML = `
        <button class="btn btn-primary edit-address-btn"><i class="icofont-ui-edit"></i> EDIT</button>
        <button class="btn btn-danger delete-address-btn"><i class="icofont-ui-delete"></i> DELETE</button>
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
	addressItemCol.classList.add('col-md-6');

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
        <button class="btn btn-danger delete-address-btn"><i class="icofont-ui-delete"></i> DELETE</button>
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
