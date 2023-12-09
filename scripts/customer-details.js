//import { fetchData } from './functions.js';

// fetching seed data
const customerDatabase = getCustomerData();
const equipmentDatabase = getEquipmentData();
const ownershipDatabase = getOwnershipData();
const repairRequestDatabase = getRepairRequestData();

// retrieves all url parameters to display the right customer and equipments from previous page.
const urlParam = new URLSearchParams(window.location.search);
const newEquipmentName = urlParam.getAll("equipment-name");
const newEquipmentType = urlParam.getAll("equipment-type");
const newEquipmentManufacturer = urlParam.getAll("manufacturer");
const newEquipmentColour = urlParam.getAll("colour");
const newEquipmentModelNumber = urlParam.getAll("model-number");
const serialNumber = urlParam.getAll("serial-number");
const customerId = urlParam.getAll("cid");
const equipmentId = urlParam.getAll("eid");

//Starting invoice number.
let startInvoiceNumber = 1234585;

//Saving created equipment data
let newCreatedEquipmentName = "";
let newCreatedEquipmentManufacturer = "";
let newCreatedEquipmentType = "";
let newCreatedEquipmentColour = "";
let newCreatedEquipmentModelNumber = "";
let newCreatedEquipmentSerialNumber = "";

//Saving created repair request data
let newCreatedInvoiceNumber = "";
let newCreatedInvoiceDate = "";
let newCreatedIssueDescription = "";
let newCreatedInvoiceIsActive = "";
let newCreatedValidWarranty = undefined;

// only runs block if there was a customer passed
if (customerId.length > 0) {

  //retrieves customer and displays details
  let customer = customerDatabase.find(c => c.id == customerId);

  $("#customer-name").show();
  $("#customer-name-equip").show();

  fillCustomer(customer);

  //gives buttons a url with customer id as parameter.
  //$("#add-equipment-btn").attr("href", `../pages/equipment-create.html?cid=${customerId}`);
  $("#update-customer-btn").attr("href", `../pages/customer-update.html?cid=${customerId}`);


  //retrieves owned equipment data
  let ownership = ownershipDatabase.filter(o => o.customerId == customerId);

  //gets select element from html page
  let equipmentList = document.getElementById("equipment-list");
  let repairRequestList = document.getElementById("repair-requests-list");

  // displays equipment customer owns from seed data
  if (ownership.length > 0) {
    ownership.forEach(o => {
      let equipment = equipmentDatabase.find(e => e.id == o.equipmentId);
      addEquipment(equipment.equipmentName, equipment.equipmentType, equipment.modelNumber, o.equipmentId);
    });
  }

  //displays equipment owned that was passed as a parameter from the adding equipment process
  if (equipmentId.length > 0) {
    let newEquipment = equipmentDatabase.find(e => e.id == equipmentId);
    /*let newOwnedEquipment = ownershipDatabase.find(o => {
        return (o.equipmentId == equipmentId && o.customerId == customerId);
    });*/

    addEquipment(newEquipment.equipmentName, newEquipment.equipmentType, newEquipment.modelNumber, newEquipment.id);

  } else if (newEquipmentName.length > 0) {
    addEquipment(newEquipmentName, newEquipmentType, newEquipmentModelNumber);
  }

  //user feedback for if theres nothing in equipment list
  if (equipmentList.options.length == 0) {
    var option = document.createElement('option');
    option.value = "";
    option.text = `Customer has no equipment. Click the button below to add one.`;
    equipmentList.add(option);
    equipmentList.disabled = true;
  }

  //event handler for selecting an option in owned equipment list
  document.getElementById("equipment-list").addEventListener("change", equipmentSelectedEvent);

  document.getElementById("all-repairs-btn").addEventListener("click", function () {
    $("#all-repairs-btn").addClass('active');
    $("#active-repairs-btn").removeClass('active');
    $("#completed-repairs-btn").removeClass('active');
    $("#details-repair-request").prop('disabled', true);
    $("#details-repair-request").css("background-color", "grey");

    if(fillRepairRequestList()){
      noRepairRequestMessage(`No Repair Requests. Click the button below to create one.`);
      $("#all-repairs-btn").prop('disabled', true);
      $("#active-repairs-btn").prop('disabled', true);
      $("#completed-repairs-btn").prop('disabled', true);
    }else{
      $("#repair-requests-list").prop('disabled', false);
    }
  });

  document.getElementById("active-repairs-btn").addEventListener("click", function () {
    $("#all-repairs-btn").removeClass('active');
    $("#active-repairs-btn").addClass('active');
    $("#completed-repairs-btn").removeClass('active');
    $("#details-repair-request").prop('disabled', true);
    $("#details-repair-request").css("background-color", "grey");

    if(fillRepairRequestList(true)){
      noRepairRequestMessage(`No Active Repair Requests.`);
    }else{
      $("#repair-requests-list").prop('disabled', false);
    }
  });

  document.getElementById("completed-repairs-btn").addEventListener("click", function () {
    $("#all-repairs-btn").removeClass('active');
    $("#active-repairs-btn").removeClass('active');
    $("#completed-repairs-btn").addClass('active');
    $("#details-repair-request").prop('disabled', true);
    $("#details-repair-request").css("background-color", "grey");

    if(fillRepairRequestList(false)){
      noRepairRequestMessage(`No Completed Repair Requests.`);
    }else{
      $("#repair-requests-list").prop('disabled', false);
    }
  });

  //event handler for if a repair record was selected from the list
  document.getElementById("repair-requests-list").addEventListener("change", repairRequestSelectedEvent);

  document.getElementById("update-customer-btn").addEventListener("click", function (e) {
    document.getElementById("modal-first-name").value = customer.firstName;
    document.getElementById("modal-last-name").value = customer.lastName;
    document.getElementById("modal-email").value = customer.email;
    document.getElementById("modal-phone").value = customer.phone;
    document.getElementById("modal-address").value = customer.street;
    document.getElementById("modal-city").value = customer.city;
    document.getElementById("modal-province").value = customer.province;
    document.getElementById("modal-postal").value = customer.postalCode;
  });

  document.getElementById("update-customer-modal-btn").addEventListener("click", function (e) {
    let updateCustomerForm = document.getElementById("customer-form");

    if (updateCustomerForm.checkValidity()){
      customer.firstName = document.getElementById("modal-first-name").value;
      customer.lastName = document.getElementById("modal-last-name").value;
      customer.email = document.getElementById("modal-email").value;
      customer.phone = document.getElementById("modal-phone").value;
      customer.street = document.getElementById("modal-address").value;
      customer.city = document.getElementById("modal-city").value;
      customer.province = document.getElementById("modal-province").value;
      customer.postalCode = document.getElementById("modal-postal").value;

      fillCustomer(customer);
      
      showToast("Customer Update", `${customer.firstName} ${customer.lastName}`);
      //alert("Customer has been successfully updated.");

      let customerDetailsModal = document.getElementById('customerDetailsModal');
      let modalInstance = bootstrap.Modal.getInstance(customerDetailsModal);
      modalInstance.hide();
    }else{
      updateCustomerForm.reportValidity();
    }
  });

  document.getElementById("details-equipment-btn").addEventListener("click", function (e) {
    $("#help-equipment-add").hide();
    $("#help-equipment-update").show();
    fillEquipmentInputs();
    toggleDisabledEquipmentForm(true);
    document.getElementById("equipmentModalLabel").innerHTML = "Selected Equipment Details";
    let updateEquipmentButton = document.getElementById("update-equipment-btn");
    updateEquipmentButton.innerHTML = "Update Equipment";
  });

  document.getElementById("add-equipment-btn").addEventListener("click", function (e) {
    $("#help-equipment-add").show();
    $("#help-equipment-update").hide();
    toggleDisabledEquipmentForm(false);
    let addEquipmentButton = document.getElementById("update-equipment-btn");
    document.getElementById("equipmentModalLabel").innerHTML = "Add Equipment";
    addEquipmentButton.innerHTML = "Save";
    resetEquipmentInputs();
  });

  document.getElementById("update-equipment-btn").addEventListener("click", function (e) {
    e.preventDefault;
    let updateEquipmentButton = document.getElementById("update-equipment-btn");
    let updateEquipmentForm = document.getElementById("equipment-form");
    let equipmentModalLabel = document.getElementById("equipmentModalLabel");
    let updateEquipmentButtonContent = updateEquipmentButton.innerHTML;

    if (updateEquipmentButtonContent == "Update Equipment") {
      toggleDisabledEquipmentForm(false);
      updateEquipmentButton.innerHTML = "Save";
    }
    else if (updateEquipmentButtonContent == "Save" && updateEquipmentForm.checkValidity()) {
      toggleDisabledEquipmentForm(true);
      if (equipmentModalLabel.innerHTML == "Add Equipment") {
        let equipmentDetailsModal = document.getElementById('equipmentDetailsModal');
        let modalInstance = bootstrap.Modal.getInstance(equipmentDetailsModal);
        modalInstance.hide();

        newCreatedEquipmentName = document.getElementById("equipment-name").value;
        newCreatedEquipmentManufacturer = document.getElementById("equipment-manufacturer").value;
        newCreatedEquipmentType = document.getElementById("equipment-type").value;
        newCreatedEquipmentColour = document.getElementById("equipment-colour").value;
        newCreatedEquipmentModelNumber = document.getElementById("equipment-model").value;
        newCreatedEquipmentSerialNumber = document.getElementById("equipment-serial").value;

        let equipmentDisabled = document.getElementById("equipment-list").disabled;
        if (equipmentDisabled == true){
          $("#equipment-list").empty();
          $("#equipment-list").prop('disabled', false);
        }

        addEquipment(newCreatedEquipmentName, newCreatedEquipmentType, newCreatedEquipmentModelNumber);

        equipmentList.selectedIndex = equipmentList.options.length - 1;
        equipmentSelectedEvent();

        $("#equipmentConfirmationName").html(newCreatedEquipmentName);
        $("#equipmentConfirmationManufacturer").html(newCreatedEquipmentManufacturer);
        $("#equipmentConfirmationType").html(newCreatedEquipmentType);
        $("#equipmentConfirmationColour").html(newCreatedEquipmentColour);
        $("#equipmentConfirmationModel").html(newCreatedEquipmentModelNumber);
        $("#equipmentConfirmationSerial").html(newCreatedEquipmentSerialNumber);

        let equipmentConfirmationModal = document.getElementById("equipmentConfirmationModal");
        let equipmentConfirmationModalInstance = new bootstrap.Modal(equipmentConfirmationModal);
        equipmentConfirmationModalInstance.show();

        showToast("Equipment Create", newCreatedEquipmentName);
        //alert("This equipment has successfully been created and added to customer.");
      } else {
        updateEquipmentButton.innerHTML = "Update Equipment";
        let updatedEquipmentName = document.getElementById("equipment-name").value;
        showToast("Equipment Update", updatedEquipmentName);
      }
    }
    else {
      updateEquipmentForm.reportValidity();
    }
  });

  document.getElementById("details-repair-request").addEventListener("click", function (e) {
    $("#help-repair-add").hide();
    $("#help-repair-update").show();
    $(".invoice-status-field").show();
    $("#invoice-btn").show();
    let selectedRepairRequest = repairRequestList.options[repairRequestList.selectedIndex].value;
    fillRepairRequestForm(selectedRepairRequest);
    toggleDisabledRepairRequestForm(true);
    document.getElementById("repairRequestModalLabel").innerHTML = "Selected Repair Request Details";
    let updateRepairRequestButton = document.getElementById("update-repair-request-btn");
    updateRepairRequestButton.innerHTML = "Update Repair Request";

    /*
    //IF REPAIR IS SELECTED AND REPAIR REQUEST DETAILS IS CLICKED, INVOICE BUTTON APPEARS (REMOVE DISPLAY:NONE CLASS)
    let invoiceRepairRequestButton = document.getElementById("invoice-repair-request-modal");
    invoiceRepairRequestButton.classList.remove("d-none");
    */
  });

  document.getElementById("create-repair-request").addEventListener("click", function (e) {
    $("#help-repair-add").show();
    $("#help-repair-update").hide();
    $(".invoice-status-field").hide();
    $("#invoice-btn").hide();
    toggleDisabledRepairRequestForm(false);
    let addRepairRequestButton = document.getElementById("update-repair-request-btn");
    document.getElementById("repairRequestModalLabel").innerHTML = "Create Repair Request";
    addRepairRequestButton.innerHTML = "Save";
    resetRepairRequestInputs();
  });

  document.getElementById("update-repair-request-btn").addEventListener("click", function (e) {
    e.preventDefault;
    let updateRepairRequestButton = document.getElementById("update-repair-request-btn");
    let updateRepairRequestForm = document.getElementById("repair-request-form");
    let repairRequestModalLabel = document.getElementById("repairRequestModalLabel");
    let updateRepairRequestButtonContent = updateRepairRequestButton.innerHTML;

    if (updateRepairRequestButtonContent == "Update Repair Request") {
      toggleDisabledRepairRequestForm(false);
      $("#invoice-btn").hide();
      updateRepairRequestButton.innerHTML = "Save";
    }
    else if (updateRepairRequestButtonContent == "Save" && updateRepairRequestForm.checkValidity()) {
      toggleDisabledRepairRequestForm(true);
      if (repairRequestModalLabel.innerHTML == "Create Repair Request") {

        let repairRequestDetailsModal = document.getElementById('repairRequestDetailsModal');
        let modalInstance = bootstrap.Modal.getInstance(repairRequestDetailsModal);
        modalInstance.hide();


        let equipmentList = document.getElementById("equipment-list")
        let selectedEquipment = equipmentList.options[equipmentList.selectedIndex].value;
        let equipmentName = "";

        if (selectedEquipment != 0){
          let equipment = equipmentDatabase.find(e => e.id == selectedEquipment);
          equipmentName = equipment.equipmentName;
        }else{
          equipmentName = newCreatedEquipmentName;
        }

        $("#all-repairs-btn").addClass('active');
        $("#active-repairs-btn").removeClass('active');
        $("#completed-repairs-btn").removeClass('active');

        let repairRequestDisabled = document.getElementById("repair-requests-list").disabled;
        if (repairRequestDisabled == true){
          $("#repair-requests-list").empty();
          $("#repair-requests-list").prop('disabled', false);
        }

        fillRepairRequestList();

        newCreatedInvoiceIsActive = document.getElementById("invoice-status").innerHTML;
        newCreatedInvoiceNumber = document.getElementById("invoice-number").innerHTML;
        newCreatedInvoiceDate = document.getElementById("invoice-date").innerHTML;
        newCreatedIssueDescription = document.getElementById("issue-description").value;
        newCreatedValidWarranty = document.getElementById("valid-warranty").checked;

        addRepairRequest(newCreatedInvoiceNumber, newCreatedInvoiceDate, newCreatedIssueDescription);
        startInvoiceNumber++;

        let repairRequestList = document.getElementById("repair-requests-list");
        repairRequestList.selectedIndex = repairRequestList.options.length - 1;
        repairRequestSelectedEvent();

        $("#repairConfirmationName").html(`${customer.firstName} ${customer.lastName}`);
        $("#repairConfirmationDate").html(newCreatedInvoiceDate);
        $("#repairConfirmationNumber").html(newCreatedInvoiceNumber);
        $("#repairConfirmationEquipment").html(equipmentName);
        $("#repairConfirmationIssue").html(newCreatedIssueDescription);

        let repairRequestConfirmationModal = document.getElementById("repairRequestConfirmationModal");
        let repairRequestConfirmationModalInstance = new bootstrap.Modal(repairRequestConfirmationModal);
        repairRequestConfirmationModalInstance.show();

        showToast("Repair Request Create", equipmentName);
        // alert("The Repair Request has successfully been created and added to customer's equipment.");
      } else {
        updateRepairRequestButton.innerHTML = "Update Repair Request";
        $("#invoice-btn").show();
        let updatedInvoiceNumber = document.getElementById("invoice-number").innerHTML;
        showToast("Repair Request Update", updatedInvoiceNumber);
      }
    }
    else {
      updateRepairRequestForm.reportValidity();
    }
  });

} else {
  //if no customer id passed as parameter, page is blank with user message
  $(`#customer-details`).html("<h2>No customer details found.</h2>");
}

function equipmentSelectedEvent(){
  //hides user feedback message and empties repair list
  $("#repair-requests-list").empty();
  $("#repair-requests").fadeIn();
  $("#all-repairs-btn").prop('disabled', false);
  $("#active-repairs-btn").prop('disabled', false);
  $("#completed-repairs-btn").prop('disabled', false);
  $("#all-repairs-btn").addClass('active');
  $("#active-repairs-btn").removeClass('active');
  $("#completed-repairs-btn").removeClass('active');

  $("#no-repair-requests").hide();
  $("#details-repair-request").prop('disabled', true);
  $("#create-repair-request").prop('disabled', false);
  //$("#details-repair-request").hide();

  //"disables" repair details button
  $("#details-repair-request").css("background-color", "grey");
  $("#create-repair-request").css("background-color", "#236477");

  $("#details-equipment-btn").css("background-color", "#236477"); //gives a look that the button is active by changing back to the site button color
  $('#details-equipment-btn').prop('disabled', false);

  fillEquipmentInputs();


  if(fillRepairRequestList()){
    noRepairRequestMessage(`No Repair Requests. Click the button below to create one.`);
    $("#all-repairs-btn").prop('disabled', true);
    $("#active-repairs-btn").prop('disabled', true);
    $("#completed-repairs-btn").prop('disabled', true);
  }else{
    $("#repair-requests-list").prop('disabled', false);
  }
}

function repairRequestSelectedEvent(){
  $("#details-repair-request").css("background-color", "#236477"); //gives a look that the button is active by changing back to the site button color
  $('#details-repair-request').prop('disabled', false);
}

function showToast(action, item){
  let toast = undefined;
  if(action == "Customer Update"){
    document.getElementById("toast-customer-update-body").innerHTML = `The customer(${item}) has successfully been updated.`;
    const toastContainer = document.getElementById("customerCreateToast")
    toast = new bootstrap.Toast(toastContainer)
  }
  else if(action == "Equipment Create"){
    document.getElementById("toast-equipment-create-body").innerHTML = `A ${item} has successfully been created and added to customer.`;
    const toastContainer = document.getElementById("equipmentCreateToast")
    toast = new bootstrap.Toast(toastContainer);
  }
  else if(action == "Equipment Update"){
    document.getElementById("toast-equipment-update-body").innerHTML = `${item} has successfully been updated.`;
    const toastContainer = document.getElementById("equipmentUpdateToast")
    toast = new bootstrap.Toast(toastContainer)
  }
  else if(action == "Repair Request Create"){
    document.getElementById("toast-repair-request-create-body").innerHTML = `Repair Request for the ${item} has successfully been created.`;
    const toastContainer = document.getElementById("repairRequestCreateToast")
    toast = new bootstrap.Toast(toastContainer);
  }
  else if(action == "Repair Request Update"){
    document.getElementById("toast-repair-request-update-body").innerHTML = `Repair Request #${item} has successfully been updated.`;
    const toastContainer = document.getElementById("repairRequestUpdateToast")
    toast = new bootstrap.Toast(toastContainer)
  }
  toast.show()
}

function fillCustomer(customer){
  $("#customer-name").html(`<b>${customer.firstName} ${customer.lastName}</b>`);
  $("#customer-name-equip").html(`${customer.firstName}'s Equipment`);

  $("#customer-email").html(`${customer.email}`);
  $("#customer-phone").html(`${customer.phone}`);
  $("#customer-street").html(`${customer.street}`);
  $("#customer-city").html(`${customer.city}`);
  $("#customer-province").html(`${customer.province}`);
  $("#customer-postal").html(`${customer.postalCode}`);
}

function fillEquipmentInputs(){
  let equipmentList = document.getElementById("equipment-list")
  let selectedEquipment = equipmentList.options[equipmentList.selectedIndex].value;

  if (selectedEquipment != 0){
    let equipment = equipmentDatabase.find(e => e.id == selectedEquipment);

    document.getElementById("equipment-name").value = equipment.equipmentName;
    document.getElementById("equipment-manufacturer").value = equipment.manufacturer;
    document.getElementById("equipment-type").value = equipment.equipmentType;
    document.getElementById("equipment-colour").value = equipment.colour;
    document.getElementById("equipment-model").value = equipment.modelNumber;
    document.getElementById("equipment-serial").value = equipment.serialNumber;
  }
  else{
    document.getElementById("equipment-name").value = newCreatedEquipmentName;
    document.getElementById("equipment-manufacturer").value = newCreatedEquipmentManufacturer;
    document.getElementById("equipment-type").value = newCreatedEquipmentType;
    document.getElementById("equipment-colour").value = newCreatedEquipmentColour;
    document.getElementById("equipment-model").value = newCreatedEquipmentModelNumber;
    document.getElementById("equipment-serial").value = newCreatedEquipmentSerialNumber;
  }
}

function fillRepairRequestList(activeTab){
  let equipmentList = document.getElementById("equipment-list");
  $("#repair-requests-list").empty();
  let repairRequests = [];

  let selectedEquipment = equipmentList.options[equipmentList.selectedIndex].value;

  let ownership = ownershipDatabase.find(o => o.customerId == customerId && o.equipmentId == selectedEquipment)

  if (ownership != undefined){
    repairRequests = repairRequestDatabase.filter(r => r.ownershipId == ownership.id);

    if(activeTab == true){
      repairRequests = repairRequests.filter(r => r.ownershipId == ownership.id && r.isActive == true);
    }else if(activeTab == false){
      repairRequests = repairRequests.filter(r => r.ownershipId == ownership.id && r.isActive == false);
    }
  }

  if (repairRequests.length > 0){
    repairRequests.forEach(r => {
      addRepairRequest(r.invoiceNumber, r.invoiceDate, r.issueDescription, r.id, r.isActive);
    });
  }else{
    return true;
  }
}

function noRepairRequestMessage(message){
  var option = document.createElement('option');
  option.value = "";
  option.text = message;
  document.getElementById("repair-requests-list").add(option);
  $("#repair-requests-list").prop('disabled', true);
}

function fillRepairRequestForm(id){
  if(id != 0){
    let repairRequest = repairRequestDatabase.find(r => r.id == id);

    document.getElementById("invoice-status").innerHTML = `${repairRequest.isActive == true ? "Active" : "Completed"}`;
    document.getElementById("invoice-date").innerHTML = `${repairRequest.invoiceDate}`;
    document.getElementById("invoice-number").innerHTML = `${repairRequest.invoiceNumber}`;
    document.getElementById("issue-description").value = repairRequest.issueDescription;
    document.getElementById("valid-warranty").checked = repairRequest.hasWarranty;
  }
  else if(id == 0){
    document.getElementById("invoice-status").innerHTML = `Active`;
    document.getElementById("invoice-date").innerHTML = newCreatedInvoiceDate;
    document.getElementById("invoice-number").innerHTML = newCreatedInvoiceNumber;
    document.getElementById("issue-description").value = newCreatedIssueDescription;
    document.getElementById("valid-warranty").checked = newCreatedValidWarranty;
  }
}

function addEquipment(equipmentName, equipmentType, equipmentModel, equipmentId) {
  let equipmentList = document.getElementById("equipment-list");

  var option = document.createElement('option');
  option.value = equipmentId == undefined ? 0 : equipmentId;
  option.text = `(M/N: ${equipmentModel})${equipmentName} - ${equipmentType}`;
  equipmentList.add(option);
}

function addRepairRequest(invoiceNumber, invoiceDate, issueDescription, repairRequestId, isActive) {
  let repairRequestList = document.getElementById("repair-requests-list");

  var option = document.createElement('option')
  option.value = repairRequestId == undefined ? 0 : repairRequestId;
  if (isActive != undefined){
    option.text = `(${isActive == true ? "Active" : "Complete"})${invoiceDate}#${invoiceNumber}: ${issueDescription}`;
  }else{
    option.text = `(Active)${invoiceDate}#${invoiceNumber}: ${issueDescription}`;
  }
  repairRequestList.add(option);
}

function toggleDisabledEquipmentForm(disabled) {
  $("#equipment-name").prop("disabled", disabled);
  $("#equipment-manufacturer").prop("disabled", disabled);
  $("#equipment-type").prop("disabled", disabled);
  $("#equipment-colour").prop("disabled", disabled);
  $("#equipment-model").prop("disabled", disabled);
  $("#equipment-serial").prop("disabled", disabled);
}

function toggleDisabledRepairRequestForm(disabled) {
  $("#issue-description").prop("disabled", disabled);
  $("#valid-warranty").prop("disabled", disabled);
}

function resetEquipmentInputs() {
  document.getElementById("equipment-name").value = "";
  document.getElementById("equipment-manufacturer").value = "";
  document.getElementById("equipment-type").value = "";
  document.getElementById("equipment-colour").value = "";
  document.getElementById("equipment-model").value = "";
  document.getElementById("equipment-serial").value = "";
}

function resetRepairRequestInputs() {
  const currentDate = new Date();
  let year = currentDate.getFullYear();
  let month = currentDate.getMonth() + 1;
  let day = currentDate.getDate();

  let formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

  document.getElementById("invoice-date").innerHTML = formattedDate;
  document.getElementById("invoice-number").innerHTML = startInvoiceNumber + 1;
  document.getElementById("issue-description").value = "";
  document.getElementById("valid-warranty").checked = false;
}

document.addEventListener('DOMContentLoaded', function () {
  let toastHelp = document.getElementById("helpToast");
  let toast = new bootstrap.Toast(toastHelp)
  toast.show();
});


/*
// I found removing any of the jquery broke the page, so I opted to keep it, but just removed its functionality in the site where needed, which was only a few spots. 
document.addEventListener('DOMContentLoaded', function () {
  const activeRepairsBtn = document.getElementById('active-repairs-btn');
  const completedRepairsBtn = document.getElementById('completed-repairs-btn');
  const repairsList = document.getElementById('repair-requests-list');
  const urlParams = new URLSearchParams(window.location.search);
  const customerId = urlParams.get('cid');


  activeRepairsBtn.addEventListener('click', function () {
    populateRepairsList('active');
    $("#details-repair-request").css("background-color", "grey");
    $("#repair-requests-list").prop('disabled', true);
    $("#details-repair-request").prop('disabled', true);
  });

  completedRepairsBtn.addEventListener('click', function () {
    populateRepairsList('completed');
    $("#details-repair-request").css("background-color", "grey");
    $("#repair-requests-list").prop('disabled', true);
    $("#details-repair-request").prop('disabled', true);
  });

  function populateRepairsList(type) {
    repairsList.innerHTML = '';
    let repairsData = type === 'active' ? getActiveRepairs() : getCompletedRepairs();
    console.log(repairsData);

    let filteredRepairs = repairsData.filter(repair => repair.id == customerId);
    console.log("Filtered Repairs:", filteredRepairs);
    if (filteredRepairs.length === 0) {
      repairsList.appendChild(new Option("No repair requests found", ""));
    }

    filteredRepairs.forEach(repair => {
      let optionText = `${repair.equipmentModel} - ${repair.equipmentType} - ${repair.issue} - ${repair.orderDate}`;
      let option = new Option(optionText, repair.id);
      repairsList.appendChild(option);
    });
  }

  function getActiveRepairs() {
    return [
      {
        id: 1,
        name: "John Doe",
        orderDate: "2023-10-08",
        city: "St.Catharines",
        equipmentType: "Lawn Mower",
        equipmentModel: "GlassGlider Pro",
        issue: "Engine won't start"
      },
      {
        id: 2,
        name: "Jane Smith",
        orderDate: "2023-06-10",
        city: "Hamilton",//doubt we need city here, just included it anyways, wont be displayed in select list
        equipmentType: "Lawn Mower",
        equipmentModel: "LeafBlaster 5000",
        issue: "Drive belt snapped"
      },
      {
        id: 3,
        name: "Emily Johnson",
        orderDate: "2023-04-18",
        city: "Mississauga",
        equipmentType: "Snow Blower",
        equipmentModel: "SnowBuster Deluxe",
        issue: "Spark plug malfunction"
      },
      {
        id: 4,
        name: "William Brown",
        orderDate: "2023-02-10",
        city: "Toronto",
        equipmentType: "Pressure Washer",
        equipmentModel: "PressureWasher Pro",
        issue: "Hose connector leak"
      },
      {
        id: 5,
        name: "Olivia White",
        orderDate: "2023--09-25",
        city: "Brampton",
        equipmentType: "Snow Blower",
        equipmentModel: "ProSnow 3000",
        issue: "Fan malfunction"
      },
      {
        id: 6,
        name: "Michael Wilson",
        orderDate: "2023-10-08",
        city: "Waterloo",
        equipmentType: "Chainsaw",
        equipmentModel: "PowerChain x",
        issue: "Chain came off"
      },
      {
        id: 7,
        name: "Sophia Taylor",
        orderDate: "2023-10-12",
        city: "London",
        equipmentType: "Hedge Trimmer",
        equipmentModel: "PowerHedge 300",
        issue: "Blades need sharpening"
      },
      {
        id: 8,
        name: "James Thomas",
        orderDate: "2023-10-29",
        city: "Oshawa",
        equipmentType: "Snow Blower",
        equipmentModel: "SnowBuster Deluxe",
        issue: "Oil leak"
      }
    ];
  }

  function getCompletedRepairs() {
    return [
      {
        id: 1,
        name: "John Doe",
        orderDate: "2023-07-14",
        city: "St.Catharines",
        equipmentType: "Lawn Mower",
        equipmentModel: "GlassGlider Pro",
        issue: "Battery replacement needed"
      },
      {
        id: 2,
        name: "Jane Smith",
        orderDate: "2023-05-22",
        city: "Hamilton, ON",
        equipmentType: "Lawn Mower",
        equipmentModel: "LeafBlaster 5000",
        issue: "Engine won't start"
      },
      {
        id: 3,
        name: "Emily Johnson",
        orderDate: "2023-03-15",
        city: "Mississauga",
        equipmentType: "Chainsaw",
        equipmentModel: "ChainSaw Master",
        issue: "Chain needs tightening"
      },
      {
        id: 4,
        name: "William Brown",
        orderDate: "2023-01-05",
        city: "Toronto",
        equipmentType: "Lawn Mower",
        equipmentModel: "Turfmaster 1500",
        issue: "Blades not spinning"
      },
      {
        id: 5,
        name: "Olivia White",
        orderDate: "2023-08-20",
        city: "Brampton",
        equipmentType: "Leaf Blower",
        equipmentModel: "LeafSweeper Pro",
        issue: "Fan malfunction"
      },
      {
        id: 6,
        name: "Michael Wilson",
        orderDate: "2023-10-01",
        city: "Waterloo",
        equipmentType: "Hedge Trimmer",
        equipmentModel: "Edge Trimmer",
        issue: "Auger not turning"
      },
      {
        id: 7,
        name: "Sophia Taylor",
        orderDate: "2023-10-15",
        city: "London",
        equipmentType: "Lawn Mower",
        equipmentModel: "GlassGlider Pro",
        issue: "Handle broken"
      },

    ];
  }
});

document.getElementById('equipment-list').addEventListener('click', function () {
  $("#repair-requests-list").prop('disabled', false);
});
*/


function getCustomerData() {
  return [
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Doe",
      "email": "johndoe@gmail.com",
      "phone": "(905) 456-7890",
      "street": "123 Main St.",
      "city": "St. Catharines",
      "province": "Ontario",
      "postalCode": "L4K 8F9",
      "fullName": "John Doe"
    },
    {
      "id": 2,
      "firstName": "Jane",
      "lastName": "Smith",
      "email": "janesmith@gmail.com",
      "phone": "(905) 123-4567",
      "street": "456 Elm St.",
      "city": "Hamilton",
      "province": "Ontario",
      "postalCode": "L5T 9K3",
      "fullName": "Jane Smith"
    },
    {
      "id": 3,
      "firstName": "Emily",
      "lastName": "Johnson",
      "email": "emilyj@gmail.com",
      "phone": "(905) 789-0123",
      "street": "789 Maple Ave.",
      "city": "Mississauga",
      "province": "Ontario",
      "postalCode": "L6P 5G7",
      "fullName": "Emily Johnson"
    },
    {
      "id": 4,
      "firstName": "William",
      "lastName": "Brown",
      "email": "williambrown@gmail.com",
      "phone": "(905) 654-3210",
      "street": "101 Oak Dr.",
      "city": "Toronto",
      "province": "Ontario",
      "postalCode": "L7R 2W4",
      "fullName": "William Brown"
    },
    {
      "id": 5,
      "firstName": "Olivia",
      "lastName": "White",
      "email": "oliviawhite@gmail.com",
      "phone": "(905) 876-5432",
      "street": "234 Pine St.",
      "city": "Brampton",
      "province": "Ontario",
      "postalCode": "L8S 3T9",
      "fullName": "Olivia White"
    },
    {
      "id": 6,
      "firstName": "Michael",
      "lastName": "Wilson",
      "email": "michaelwilson@gmail.com",
      "phone": "(905) 678-9056",
      "street": "567 Birch Blvd.",
      "city": "Waterloo",
      "province": "Ontario",
      "postalCode": "L9Z 2X8",
      "fullName": "Michael Wilson"
    },
    {
      "id": 7,
      "firstName": "Sophia",
      "lastName": "Taylor",
      "email": "sophiataylor@gmail.com",
      "phone": "(905) 234-5678",
      "street": "890 Cedar Ln.",
      "city": "London",
      "province": "Ontario",
      "postalCode": "L0A 1B2",
      "fullName": "Sophia Taylor"
    },
    {
      "id": 8,
      "firstName": "James",
      "lastName": "Thomas",
      "email": "jamesthomas@gmail.com",
      "phone": "(905) 987-6543",
      "street": "123 Walnut St.",
      "city": "Oshawa",
      "province": "Ontario",
      "postalCode": "L1T 2Y4",
      "fullName": "James Thomas"

    },
    {
      "id": 9,
      "firstName": "Ava",
      "lastName": "Martin",
      "email": "avamartin@gmail.com",
      "phone": "(905) 432-1987",
      "street": "456 Spruce Ave.",
      "city": "Markham",
      "province": "Ontario",
      "postalCode": "L2E 3F5",
      "fullName": "Ava Martin"
    },
    {
      "id": 10,
      "firstName": "Ethan",
      "lastName": "Miller",
      "email": "ethanmiller@gmail.com",
      "phone": "(905) 321-7654",
      "street": "789 Oak Lane",
      "city": "Kitchener",
      "province": "Ontario",
      "postalCode": "L3M 6N1",
      "fullName": "Ethan Miller"
    },
    {
      "id": 11,
      "firstName": "John",
      "lastName": "Smith",
      "email": "jSmith@gmail.com",
      "phone": "(905) 377-7654",
      "street": "789 Oak Lane",
      "city": "Waterloo",
      "province": "Ontario",
      "postalCode": "L3M 6N1",
      "fullName": "John Smith"
    }
    ,
    {
      "id": 12,
      "firstName": "Kaylee",
      "lastName": "Johnson",
      "email": "johnsonKay@gmail.com",
      "phone": "(905) 367-3345",
      "street": "180 Russel Lane",
      "city": "Niagara Falls",
      "province": "Ontario",
      "postalCode": "L5Q 6F1",
      "fullName": "Kaylee Johnson"
    },
    {
      "id": 13,
      "firstName": "Andrew",
      "lastName": "Blackwell",
      "email": "andrew20@gmail.com",
      "phone": "(289) 663-7654",
      "street": "10 Water Street",
      "city": "St. Catharines",
      "province": "Ontario",
      "postalCode": "L2R 7H7",
      "fullName": "Andrew Blackwell"
    },
    {
      "id": 14,
      "firstName": "James",
      "lastName": "Perez",
      "email": "jPerez@gmail.com",
      "phone": "(289) 402-3133",
      "street": "700 Watertown Street",
      "city": "London",
      "province": "Ontario",
      "postalCode": "N6B 2W6",
      "fullName": "James Perez"
    },
    {
      "id": 15,
      "firstName": "Xander",
      "lastName": "Kohut",
      "email": "xander999@gmail.com",
      "phone": "(289) 407-2132",
      "street": "800 Township Rd",
      "city": "Thorold",
      "province": "Ontario",
      "postalCode": "L2E 4H4",
      "fullName": "Xander Kohut"
    }
    ,
    {
      "id": 16,
      "firstName": "Vladimir",
      "lastName": "Rosolov",
      "email": "vRosolov@gmail.com",
      "phone": "(304) 111-2222",
      "street": "100 Main Street",
      "city": "Toronto",
      "province": "Ontario",
      "postalCode": "L3M 6N1",
      "fullName": "Vladimir Rosolov"
    },
    {
      "id": 17,
      "firstName": "Drake",
      "lastName": "Taylor",
      "email": "dTaylor@gmail.com",
      "phone": "(404) 337-3254",
      "street": "10 Oak Lane",
      "city": "Waterloo",
      "province": "Ontario",
      "postalCode": "L3M 4H4",
      "fullName": "Drake Taylor"
    },
    {
      "id": 18,
      "firstName": "David",
      "lastName": "Bernard",
      "email": "dBernard@gmail.com",
      "phone": "(905) 668-0933",
      "street": "10 Carlton Street",
      "city": "St.Catharines",
      "province": "Ontario",
      "postalCode": "L2R 2L2",
      "fullName": "David Bernard"
    }
  ];
}

function getEquipmentData() {
  return [
    {
      "id": 1,
      "equipmentName": "GrassGlider Pro",
      "equipmentType": "Lawn Mower",
      "serialNumber": "20931890",
      "modelNumber": "A02B",
      "manufacturer": "Pro-Power Canada",
      "colour": "Red"
    },
    {
      "id": 2,
      "equipmentName": "LawnMaster 2000",
      "equipmentType": "Lawn Mower",
      "serialNumber": "987654321",
      "modelNumber": "B05C",
      "manufacturer": "Troy-Bilt",
      "colour": "Green"
    },
    {
      "id": 3,
      "equipmentName": "PowerHedge 300",
      "equipmentType": "Hedge Trimmer",
      "serialNumber": "123456789",
      "modelNumber": "H12D",
      "manufacturer": "HedgeMaster",
      "colour": "Blue"
    },
    {
      "id": 4,
      "equipmentName": "LeafBlaster 5000",
      "equipmentType": "Leaf Blower",
      "serialNumber": "456789123",
      "modelNumber": "L30X",
      "manufacturer": "Toro",
      "colour": "Yellow"
    },
    {
      "id": 5,
      "equipmentName": "SnowBuster Deluxe",
      "equipmentType": "Snow Blower",
      "serialNumber": "987654987",
      "modelNumber": "S08M",
      "manufacturer": "SnowMaster",
      "colour": "White"
    },
    {
      "id": 6,
      "equipmentName": "PressureWasher Pro",
      "equipmentType": "Pressure Washer",
      "serialNumber": "654321789",
      "modelNumber": "P15T",
      "manufacturer": "Pro-Power Canada",
      "colour": "Silver"
    },
    {
      "id": 7,
      "equipmentName": "ChainSaw Master",
      "equipmentType": "Chainsaw",
      "serialNumber": "789123456",
      "modelNumber": "C10R",
      "manufacturer": "Craftsman",
      "colour": "Black"
    },
    {
      "id": 8,
      "equipmentName": "TurfMaster 1500",
      "equipmentType": "Lawn Mower",
      "serialNumber": "876543210",
      "modelNumber": "TM15Z",
      "manufacturer": "Pro-Power Canada",
      "colour": "Red"
    },
    {
      "id": 9,
      "equipmentName": "LeafSweeper Pro",
      "equipmentType": "Leaf Blower",
      "serialNumber": "123789456",
      "modelNumber": "LS20Y",
      "manufacturer": "Toro",
      "colour": "Yellow"
    },
    {
      "id": 10,
      "equipmentName": "EdgeTrimmer X",
      "equipmentType": "Hedge Trimmer",
      "serialNumber": "789456123",
      "modelNumber": "ET10W",
      "manufacturer": "HedgeMaster",
      "colour": "Blue"
    },
    {
      "id": 11,
      "equipmentName": "ProSnow 3000",
      "equipmentType": "Snow Blower",
      "serialNumber": "321654987",
      "modelNumber": "PS30Q",
      "manufacturer": "SnowMaster",
      "colour": "White"
    },
    {
      "id": 12,
      "equipmentName": "PowerChain X",
      "equipmentType": "Chainsaw",
      "serialNumber": "456123789",
      "modelNumber": "PC12K",
      "manufacturer": "Craftsman",
      "colour": "Black"
    },
  ];
}

function getOwnershipData() {
  return [
    {
      "id": 1,
      "customerId": 1,
      "equipmentId": 1,
      "serialNumber": "6S985C78866"
    },
    {
      "id": 2,
      "customerId": 1,
      "equipmentId": 3,
      "serialNumber": "7U942Z45486"
    },
    {
      "id": 3,
      "customerId": 2,
      "equipmentId": 2,
      "serialNumber": "2Z867N46698"
    },
    {
      "id": 4,
      "customerId": 2,
      "equipmentId": 4,
      "serialNumber": "6D247A85967"
    },
    {
      "id": 5,
      "customerId": 3, //Emily - SnowBuster Deluxe
      "equipmentId": 5,
      "serialNumber": "8A979P36869"
    },
    {
      "id": 6,
      "customerId": 9, //removed from Emily(3) and given to Ava(9)
      "equipmentId": 7,
      "serialNumber": "8E445U62644"
    },
    {
      "id": 7,
      "customerId": 4,
      "equipmentId": 6,
      "serialNumber": "5Z935M24736"
    },
    {
      "id": 8,
      "customerId": 4,
      "equipmentId": 8,
      "serialNumber": "7E537T79592"
    },
    {
      "id": 9,
      "customerId": 5,
      "equipmentId": 9,
      "serialNumber": "8S828W84428"
    },
    {
      "id": 10,
      "customerId": 5,
      "equipmentId": 11,
      "serialNumber": "6W727K88322"
    },
    {
      "id": 11,
      "customerId": 6,
      "equipmentId": 10,
      "serialNumber": "6V897N22689"
    },
    {
      "id": 12,
      "customerId": 6,
      "equipmentId": 12,
      "serialNumber": "5J638F23992"
    },
    {
      "id": 13,
      "customerId": 7,
      "equipmentId": 1,
      "serialNumber": "9B475T53372"
    },
    {
      "id": 14,
      "customerId": 7,
      "equipmentId": 3,
      "serialNumber": "6H483T94664"
    },
    {
      "id": 15,
      "customerId": 8,
      "equipmentId": 5,
      "serialNumber": "9Y864M68339"
    },
    {
      "id": 16,
      "customerId": 8,
      "equipmentId": 7,
      "serialNumber": "5L383T77572"
    },
    {
      "id": 17,
      "customerId": 0, //remove from Ava(9)
      "equipmentId": 9,
      "serialNumber": "7N992J69283"
    },
    {
      "id": 18,
      "customerId": 0, //remove from Ava(9)
      "equipmentId": 11,
      "serialNumber": "7H826B47548"
    },
    {
      "id": 19,
      "customerId": 1,
      "equipmentId": 10,
      "serialNumber": "7Y686J58959"
    },
    {
      "id": 20,
      "customerId": 2,
      "equipmentId": 12,
      "serialNumber": "5X522H66584"
    },
    {
      "id": 21,
      "customerId": 11,
      "equipmentId": 1,
      "serialNumber": "5324F555584"
    }
    ,
    {
      "id": 22,
      "customerId": 12,
      "equipmentId": 2,
      "serialNumber": "ABSJBSBJ293"
    },
    {
      "id": 23,
      "customerId": 13,
      "equipmentId": 3,
      "serialNumber": "498597BDJHW"
    },
    {
      "id": 24,
      "customerId": 14,
      "equipmentId": 4,
      "serialNumber": "381948741ABJ"
    },
    {
      "id": 25,
      "customerId": 15,
      "equipmentId": 5,
      "serialNumber": "PLSIEJ448313"
    },
    {
      "id": 26,
      "customerId": 16,
      "equipmentId": 7,
      "serialNumber": "WOEJEI213393"
    },
    {
      "id": 27,
      "customerId": 17,
      "equipmentId": 12,
      "serialNumber": "5X309131KDBS"
    },
    {
      "id": 28,
      "customerId": 18,
      "equipmentId": 10,
      "serialNumber": "DKNDSJBSAJ39"
    },
    {
      "id": 29,
      "customerId": 9, //removed from Emily(3) and given to Ava(9)
      "equipmentId": 9,
      "serialNumber": "7N996H95392"
    }
  ];
}

function getRepairRequestData() {
  return [
    {
      "id": 1,
      "invoiceDate": "2023-10-08",
      "invoiceNumber": 1234566,
      "issueDescription": "Engine won't start.",
      "hasWarranty": true,
      "isActive": true,
      "ownershipId": 1
    },
    {
      "id": 2,
      "invoiceDate": "2023-10-26",
      "invoiceNumber": 1234567,
      "issueDescription": "Blades need sharpening",
      "hasWarranty": true,
      "isActive": false,
      "ownershipId": 1
    },
    {
      "id": 3,
      "invoiceDate": "2023-07-14",
      "invoiceNumber": 1234568,
      "issueDescription": "Battery replacement needed",
      "hasWarranty": false,
      "isActive": false,
      "ownershipId": 2
    },
    {
      "id": 4,
      "invoiceDate": "2023-06-10",
      "invoiceNumber": 1234569,
      "issueDescription": "Drive belt snapped",
      "hasWarranty": true,
      "isActive": true,
      "ownershipId": 3
    },
    {
      "id": 5,
      "invoiceDate": "2023-05-22",
      "invoiceNumber": 1234570,
      "issueDescription": "Engine won't start",
      "hasWarranty": false,
      "isActive": false,
      "ownershipId": 4
    },
    {
      "id": 6,
      "invoiceDate": "2023-12-01",
      "invoiceNumber": 1234571,
      "issueDescription": "Impeller damaged",
      "hasWarranty": true,
      "isActive": true, //changed to Active
      "ownershipId": 6 //changed from 5 to 6 to remove from Emily and give to Ava
    },
    {
      "id": 7,
      "invoiceDate": "2023-03-15",
      "invoiceNumber": 1234572,
      "issueDescription": "Chain needs tightening",
      "hasWarranty": false,
      "isActive": false,
      "ownershipId": 0 //remove from Ava(6)
    },
    {
      "id": 8,
      "invoiceDate": "2023-02-10",
      "invoiceNumber": 1234573,
      "issueDescription": "Hose connector leak",
      "hasWarranty": true,
      "isActive": true,
      "ownershipId": 7
    },
    {
      "id": 9,
      "invoiceDate": "2023-01-05",
      "invoiceNumber": 1234574,
      "issueDescription": "Blades not spinning",
      "hasWarranty": false,
      "isActive": false,
      "ownershipId": 8
    },
    {
      "id": 10,
      "invoiceDate": "2023-08-20",
      "invoiceNumber": 1234575,
      "issueDescription": "Fan malfunction",
      "hasWarranty": true,
      "isActive": true,
      "ownershipId": 9
    },
    {
      "id": 11,
      "invoiceDate": "2023-09-25",
      "invoiceNumber": 1234576,
      "issueDescription": "Fuel line clog",
      "hasWarranty": false,
      "isActive": false,
      "ownershipId": 10
    },
    {
      "id": 12,
      "invoiceDate": "2023-10-01",
      "invoiceNumber": 1234577,
      "issueDescription": "Auger not turning",
      "hasWarranty": true,
      "isActive": false,
      "ownershipId": 11
    },
    {
      "id": 13,
      "invoiceDate": "2023-10-08",
      "invoiceNumber": 1234578,
      "issueDescription": "Chain came off",
      "hasWarranty": false,
      "isActive": true,
      "ownershipId": 12
    },
    {
      "id": 14,
      "invoiceDate": "2023-10-15",
      "invoiceNumber": 1234579,
      "issueDescription": "Handle broken",
      "hasWarranty": true,
      "isActive": false,
      "ownershipId": 13
    },
    {
      "id": 15,
      "invoiceDate": "2023-10-22",
      "invoiceNumber": 1234580,
      "issueDescription": "Blades need sharpening",
      "hasWarranty": false,
      "isActive": true,
      "ownershipId": 14
    },
    {
      "id": 16,
      "invoiceDate": "2023-10-29",
      "invoiceNumber": 1234581,
      "issueDescription": "Oil leak",
      "hasWarranty": true,
      "isActive": true,
      "ownershipId": 15
    },
    {
      "id": 17,
      "invoiceDate": "2023-11-05",
      "invoiceNumber": 1234582,
      "issueDescription": "Oil leak in engine",
      "hasWarranty": false,
      "isActive": false,
      "ownershipId": 6
    },
    {
      "id": 18,
      "invoiceDate": "2023-12-02",
      "invoiceNumber": 1234583,
      "issueDescription": "Chain dull and requires replacement",
      "hasWarranty": true,
      "isActive": false,
      "ownershipId": 6
    },
    {
      "id": 19,
      "invoiceDate": "2023-11-19",
      "invoiceNumber": 1234584,
      "issueDescription": "Starter rope broken",
      "hasWarranty": false,
      "isActive": false,
      "ownershipId": 0 //changed from 5 to 0 to remove from Emily's repair requests
    },
    {
      "id": 20,
      "invoiceDate": "2023-12-11",
      "invoiceNumber": 1234585,
      "issueDescription": "Spark plug malfunction",
      "hasWarranty": true,
      "isActive": true,
      "ownershipId": 5
    }
];
}