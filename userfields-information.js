fetch('https://ls-customerserver.onrender.com/swagger/CustomerUserFields')
	.then(response => response.json())
	.then(data => {
		console.log(data);
		responseData = data;
		const usrFields = data.userFields
		// document.getElementById('usrfieldConnectedSalesperson').value = usrFields[0].value.listElement.value + " - " + usrFields[0].value.listElement.description || "";
		// document.getElementById('usrfieldMiddleName').value = usrFields[1].value.text || "";
		// document.getElementById('usrfieldSalutation').value = usrFields[2].value.text || "";
		// document.getElementById('usrfieldAcademicTitile').value = usrFields[3].value.text || "";
		// document.getElementById('usrfieldNobilityTitle').value = usrFields[4].value.text || "";
		// document.getElementById('usrfieldNameAddition').value = usrFields[5].value.text || "";
		// document.getElementById('usrfieldProfession').value = usrFields[6].value.text || "";
		// document.getElementById('usrfieldClosestStore').value = usrFields[7].value.text || "";

	})
	.catch(error => console.error('Error fetching data:', error));

