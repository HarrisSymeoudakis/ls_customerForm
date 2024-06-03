document.getElementById('saveChangesBtn').addEventListener('click', function() {
	// Get the full URL
	const url = new URL(window.location.href);

	// Get the sessionId from the query parameters
	const sessionId = url.searchParams.get('sessionId');

	 // Define the endpoint for your Node.js server
    const nodeJsEndpoint = 'https://ls-customerserver.onrender.com/api/PostBackExtForm';

    // Make the POST request to your Node.js server
    fetch(nodeJsEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sessionId: sessionId })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        window.location.href = `https://ls-customerserver.onrender.com/PostBackExtForm/redirect?sessionId=${sessionId}`;
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
