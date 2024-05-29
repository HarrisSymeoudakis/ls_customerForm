fetch('https://ls-customerserver.onrender.com/swagger/customerOrders')
            .then(response => response.json())
            .then(data => {
              console.log(data);
              // Get the tbody element where we want to append the new rows
              const tbody = document.getElementById('ordersTableBody');
              
              // Iterate through each header in the response
              data.forEach((order, index) => {
                  const header = order.header;
                  if (header) {
                      // Create a new row element
                      const newRow = document.createElement('tr');
                      
                      // Create cells and add content
                      newRow.innerHTML = `
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
                      
                      // Append the new row to the tbody
                      tbody.appendChild(newRow);
                  }
              });
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
                
                let finalAddress = data.postalAddresses[0];
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
                document.getElementById('addressConsent').value = finalAddress.addressConsent;
                document.getElementById('addressLine1').value = finalAddress.addressLine1;
                document.getElementById('city').value = finalAddress.city;
                document.getElementById('postalCode').value = finalAddress.postalCode;
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
            var addressConsent = document.getElementById('addressConsent').value;
            var addressLine1 = document.getElementById('addressLine1').value;
            var city = document.getElementById('city').value;
            var postalCode = document.getElementById('postalCode').value;


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
         
            responseData.postalAddresses[0].addressConsent=addressConsent;
            responseData.postalAddresses[0].addressLine1=addressLine1;
            responseData.postalAddresses[0].city =city;
            responseData.postalAddresses[0].postalCode=postalCode;

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
   
