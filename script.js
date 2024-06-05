#<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account Settings</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="style.css" />
    <link rel="stylesheet" type="text/css" href="//netdna.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css">
</head>

<body>
    
    <div class="container light-style flex-grow-1 container-p-y">
        <img src="/logo.jpg" alt="Image description" class="top-right-image">
        <h4 class="font-weight-bold py-3 mb-4" style="color: #3c4395">Account settings</h4>
        <div class="card overflow-hidden">
            <div class="row no-gutters row-bordered row-border-light">
                <div class="col-md-3 pt-0">
                    <div class="list-group list-group-flush account-settings-links">
                        <a class="list-group-item list-group-item-action active" data-toggle="list"
                            href="#account-general">General</a>
                        <a class="list-group-item list-group-item-action" data-toggle="list"
                            href="#account-additional-information">Additional Information</a>
                        <a class="list-group-item list-group-item-action" data-toggle="list"
                            href="#account-customer-addresses">Addresses</a>
                        <a class="list-group-item list-group-item-action" data-toggle="list"
                            href="#account-customer-orders">Customer Orders</a>
                        <a class="list-group-item list-group-item-action" data-toggle="list"
                            href="#account-customer-reservations">Customer Reservations</a>
                    </div>
                </div>
                <div class="col-md-9">
                    <div class="tab-content">
                        <div class="tab-pane fade active show" id="account-general">
                            <hr class="border-light m-0">
                            <div class="card-body">
                                <!-- Username occupying half the width -->
                                <div class="form-group row">
                                    <div class="col-md-6">
                                        <label for="customerId" class="form-label">Customer Id</label>
                                        <input type="text" class="form-control" id="customerId" readonly>
                                    </div>
                                </div>
                                <!-- First name and Last name on the same row -->
                                <div class="form-group row">
                                    <div class="col-md-6">
                                        <label for="firstName" class="form-label">First Name</label>
                                        <input type="text" class="form-control" id="firstName">
                                    </div>
                                    <div class="col-md-6">
                                        <label for="lastName" class="form-label">Last Name</label>
                                        <input type="text" class="form-control" id="lastName">
                                    </div>
                                </div>
                                <!-- Birthdate and Gender on the same row -->
                                <div class="form-group row">
                                    <div class="col-md-6">
                                        <label for="birthdate" class="form-label">Birthdate</label>
                                        <input type="text" class="form-control" id="birthdate">
                                    </div>
                                    <div class="col-md-6">
                                        <label for="gender" class="form-label">Gender</label>
                                        <input type="text" class="form-control" id="gender">
                                    </div>
                                </div>
                                <!-- Address and Email as they are -->
                                <div class="form-group row">
                                    <div class="col-md-3">
                                        <label for="addressConsent" class="col-form-label">Consent</label>
                                        <input type="text" class="form-control" id="addressConsent">
                                    </div>
                                    <div class="col-md-3">
                                        <label for="addressLine1" class="col-form-label">Address</label>
                                        <input type="text" class="form-control" id="addressLine1">
                                    </div>
                                    <div class="col-md-3">
                                        <label for="city" class="col-form-label">City</label>
                                        <input type="text" class="form-control" id="city">
                                    </div>
                                    <div class="col-md-3">
                                        <label for="postalCode" class="col-form-label">Postal Code</label>
                                        <input type="text" class="form-control" id="postalCode">
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <div class="col-md-12">
                                        <label for="email" class="form-label">E-mail</label>
                                        <input type="text" class="form-control mb-1" id="email" onblur="validateEmail()">
                                        <div id="message" class="mt-2"></div>
                                        
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-md-6">
                                        <label for="phone" class="form-label">Phone</label>
                                        <input type="text" class="form-control" id="phone">
                                    </div>
                                    <div class="col-md-6">
                                        <label for="phonetype" class="form-label">Phone Type</label>
                                        <input type="text" class="form-control" id="phonetype">
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        
                        <div class="tab-pane fade" id="account-additional-information">
                            <hr class="border-light m-0">
                            <div class="card-body">
                                
                                <div class="form-group row">
                                    <div class="col-md-6">
                                        <label for="usrfieldConnectedSalesperson" class="form-label">Connected Salesperson </label>
                                        <input type="text" class="form-control" id="usrfieldConnectedSalesperson">
                                    </div>
                                    <div class="col-md-6">
                                        <label for="usrfieldMiddleName" class="form-label">Middle Name </label>
                                        <input type="text" class="form-control" id="usrfieldMiddleName">
                                    </div>
                                </div>
                               
                                <div class="form-group row">
                                    <div class="col-md-6">
                                        <label for="usrfieldSalutation" class="form-label">Salutation</label>
                                        <input type="text" class="form-control" id="usrfieldSalutation">
                                    </div>
                                    <div class="col-md-6">
                                        <label for="usrfieldAcademicTitile" class="form-label">Academic Title </label>
                                        <input type="text" class="form-control" id="usrfieldAcademicTitile">
                                    </div>
                                </div>
                                
                                
                                <div class="form-group row">
                                    <div class="col-md-6">
                                        <label for="usrfieldNobilityTitle" class="form-label">Nobility Title </label>
                                        <input type="text" class="form-control" id="usrfieldNobilityTitle">
                                    </div>
                                    <div class="col-md-6">
                                        <label for="usrfieldNameAddition" class="form-label">Name Addition </label>
                                        <input type="text" class="form-control" id="usrfieldNameAddition">
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <div class="col-md-6">
                                        <label for="usrfieldProfession" class="form-label">Profession </label>
                                        <input type="text" class="form-control" id="usrfieldProfession">
                                    </div>
                                    <div class="col-md-6">
                                        <label for="usrfieldClosestStore" class="form-label">Closest Store </label>
                                        <input type="text" class="form-control" id="usrfieldClosestStore">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="account-customer-addresses">
                            
                            <div class="row">
                                <div class="col-md-9">
                                    <div class="osahan-account-page-right shadow-sm bg-white p-4 h-100">
                                        <div class="tab-content" id="myTabContent">
                                            <div class="tab-pane fade  active show" id="addresses" role="tabpanel" aria-labelledby="addresses-tab">
                                                <h4 class="font-weight-bold mt-0 mb-4" style="color:#3c4395;">Manage Addresses</h4>
                                                 <div id="addressContainer">
                                                            <!-- Document dates will be appended here -->
                                                        </div>
                                                <div id="addressesContainer">
                                                            <!-- Document dates will be appended here -->
                                                        </div>
                                                <button id="newAddressBtn" class="btn btn-primary">New Address</button>

                                                </div>
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                        </div>
                        <div class="tab-pane fade" id="account-customer-orders">
                            
                                <div class="row">
                                    <div class="col-lg-12">
                                        <div class="main-box no-header clearfix">
                                            <div class="main-box-body clearfix">
                                                <div class="table-responsive">
                                                    <table class="table user-list">
                                                        <thead>
                                                            <tr>
                                                           
                                                            <th><span>Number</span></th>
                                                            <th class="text-center"><span>Document Date</span></th>
                                                            <th><span>Store</span></th>
                                                            <th><span>Customer</span></th>
                                                            <th><span>Company Name</span></th>
                                                            <th><span>Total qty</span></th>
                                                            <th><span>Tax inc. total Currency</span></th>
                                                            <th><span>Delivery date</span></th>
                                                            <th>&nbsp;</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody id="ordersTableBody">
                                                            <!-- Document dates will be appended here -->
                                                        </tbody>
                                                        
                                                    </table>
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
                    <!-- Dynamic content will be inserted here -->
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
                        <div class="tab-pane fade" id="account-customer-reservations">
                            
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="main-box no-header clearfix">
                                        <div class="main-box-body clearfix">
                                            <div class="table-responsive">
                                                <table class="table user-list">
                                                    <thead>
                                                        <tr>
                                                       
                                                        <th><span>Number</span></th>
                                                        <th class="text-center"><span>Document Date</span></th>
                                                        <th><span>Store</span></th>
                                                        <th><span>Customer</span></th>
                                                        <th><span>Company Name</span></th>
                                                        <th><span>Total qty</span></th>
                                                       
                                                        <th>&nbsp;</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="reservationsTableBody">
                                                        <!-- Document dates will be appended here -->
                                                    </tbody>
                                                    
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                                    </div>
                    </div>
                        <!-- Additional tab panes... -->
                    </div>
                </div>
            </div>
        </div>
        <div class="text-right mt-3">
            <button type="button" class="btn btn-primary" id="saveChangesBtn">Save changes</button>&nbsp;
            <button type="button" class="btn btn-default" id="cancelBtn">Cancel</button>
        </div>
        
    </div>
    <script src="/script.js"></script>
    <script src="/addresses-information.js"></script>
    <script src="/general-information.js"></script>
    <script src="/userfields-information.js"></script>
    
    <script src="/postBackExternalCusForm.js"></script>
    <script src="https://code.jquery.com/jquery-1.10.2.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.0/dist/js/bootstrap.bundle.min.js"></script>
</body>

</html>
