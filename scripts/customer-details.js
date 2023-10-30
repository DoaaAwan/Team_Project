import { fetchData } from './functions.js';

// fetching seed data
const customerDatabase = await fetchData('../scripts/json/customer.json');
const equipmentDatabase = await fetchData('../scripts/json/equipment.json');
const ownershipDatabase = await fetchData('../scripts/json/ownership.json');
const repairRequestDatabase = await fetchData('../scripts/json/repair-request.json')

// retrieves all url parameters to display the right customer and equipments from previous page.
const urlParam = new URLSearchParams(window.location.search);
const newEquipmentName = urlParam.getAll("equipment-name");
const newEquipmentType = urlParam.getAll("equipment-type")
const newEquipmentItemNumber = urlParam.getAll("item-number")
const customerId = urlParam.getAll("cid");
const equipmentId = urlParam.getAll("eid");

// only runs block if there was a customer passed
if (customerId.length > 0) {
    
    //retrieves customer and displays details
    let customer = customerDatabase.find(c => c.id == customerId);

    $("#customer-name").html(`${customer.firstName} ${customer.lastName}`);
    $("#customer-name-equip").html(`${customer.firstName}'s Equipment`);

    $("#customer-email").html(`E-mail: <b>${customer.email}</b>`);
    $("#customer-phone").html(`Phone: <b>${customer.phone}</b>`);
    $("#customer-street").html(`Street: <b>${customer.street}</b>`);
    $("#customer-city").html(`City: <b>${customer.city}</b>`);
    $("#customer-province").html(`Province: <b>${customer.province}</b>`);
    $("#customer-postal").html(`Postal Code: <b>${customer.postalCode}</b>`);

    //gives add equipment button a url with customer id as parameter.
    $("#add-equipment-btn").attr("href", `../pages/equipment-search.html?cid=${customerId}`);

    //retrieves owned equipment data
    let ownership = ownershipDatabase.filter(o => o.customerId == customerId)
    let customerEquipments = []

    ownership.forEach(o => {
        let equipment = equipmentDatabase.find(e => e.id == o.equipmentId);
        customerEquipments.push(equipment);
    })

    //gets select element from html page
    let equipmentList = document.getElementById("equipment-list");
    let repairRequestList = document.getElementById("repair-requests-list");

    // displays equipment customer owns from seed data
    if (customerEquipments.length > 0){
        customerEquipments.forEach(e => {
            var option = document.createElement('option');
            option.value = e.id;
            option.text = `(#${e.itemNumber})${e.equipmentName} - ${e.equipmentType}`;
            equipmentList.add(option);
        });
    }

    //displays equipment owned that was passed as a parameter from the adding equipment process
    if (equipmentId.length > 0){
        let newEquipment = equipmentDatabase.find(e => e.id == equipmentId);
        var option = document.createElement('option')
        option.value = newEquipment.id;
        option.text = `(#${newEquipment.itemNumber})${newEquipment.equipmentName} - ${newEquipment.equipmentType}`;
        equipmentList.add(option);
    }else if(newEquipmentName.length > 0){
        var option = document.createElement('option')
        option.value = 0;
        option.text = `(#${newEquipmentItemNumber})${newEquipmentName} - ${newEquipmentType}`;
        equipmentList.add(option);
    }

    //user feedback for if theres nothing in equipment list
    if (equipmentList.options.length == 0){
        $("#no-repair-requests").html("Customer has no equipment.<br>Want to add an equipment?");
    }

    //event handler for selecting an option in owned equipment list
    document.getElementById("equipment-list").addEventListener("change", function() {
        //hides user feedback message and empties repair list
        $("#repair-requests-list").empty();
        $("#no-repair-requests").hide();
        //$("#details-repair-request").hide();

        //"disables" repair details button
        $("#details-repair-request").attr("href", "javascript:void(0)");
        $("#details-repair-request").css("background-color", "grey");

        //gets selected equipment id
        const selectedEquipment = equipmentList.options[equipmentList.selectedIndex].value;

        //id of 0 reserved for new equipment created scenario. passes new equipment data instead of an id.
        $("#create-repair-request").attr("href", selectedEquipment != 0 ? `../pages/repair-request-create.html?cid=${customerId}eid=${selectedEquipment}` : 
                                                                            `../pages/repair-request-create.html?cid=${customerId}equipment-name=${newEquipmentName}`);

        let repairRequests = [];
        //gets ownership record for selected equipment
        let ownership = ownershipDatabase.find(o => o.customerId == customerId && o.equipmentId == selectedEquipment)
        

        if (ownership != undefined){
            //if record exists, gets all repair records for selected equipment
            repairRequests = repairRequestDatabase.filter(r => r.ownershipId == ownership.id);
        }

        if (repairRequests.length > 0){
            //if repair request records exist, shows list and displays all records in list
            $("#repair-requests").fadeIn();
            repairRequests.forEach(r => {
                var option = document.createElement('option')
                option.value = r.id;
                option.text = `${r.invoiceDate}#${r.invoiceNumber}: ${r.issueDescription}`;
                repairRequestList.add(option);
            });
        }else{
            //if no records exist, ask user if they want to create a repair record for the selected equipment
            var confirmCancel = window.confirm("No Repair Requests for the selected equipment. Would you like to create one?");

            if (confirmCancel) {
                window.location.href = document.getElementById("create-repair-request").href;
            }
            $("#repair-requests").fadeIn();
            //$("#no-repair-requests").html("No Repair Requests for the selected equipment. Would you like to create one?");
        }
    });

    //event handler for if a repair record was selected from the list
    document.getElementById("repair-requests-list").addEventListener("change", function() {
        //$("#details-repair-request").show();
        //gets selected id for repair record and "activates" the button by adding the url with parameter to button
        const selectedRepairRequest = repairRequestList.options[repairRequestList.selectedIndex].value;
        $("#details-repair-request").css("background-color", "#236477"); //gives a look that the button is active by changing back to the site button color
        $("#details-repair-request").attr("href", equipmentId > 0 ? `../pages/repair-request-details.html?rrid=${selectedRepairRequest}&eid=${equipmentId}` : 
                                                                    `../pages/repair-request-details.html?rrid=${selectedRepairRequest}`);
    });

    $("#add-equipment-btn").attr("href", `../pages/equipment-search.html?cid=${customerId}`);
    
} else {
    //if no customer id passed as parameter, page is blank with user message
    $(`#customer-details`).html("<h2>No customer details found.</h2>");
}