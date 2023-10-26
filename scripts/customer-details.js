import { fetchData } from './functions.js';

const customerDatabase = await fetchData('../scripts/json/customer.json');
const equipmentDatabase = await fetchData('../scripts/json/equipment.json');
const ownershipDatabase = await fetchData('../scripts/json/ownership.json');
const repairRequestDatabase = await fetchData('../scripts/json/repair-request.json')


const urlParam = new URLSearchParams(window.location.search);
const newequipmentName = urlParam.getAll("equipment-name");
const customerId = urlParam.getAll("cid");
const equipmentId = urlParam.getAll("eid");

if (customerId.length > 0) {
    
    let customer = customerDatabase.find(c => c.id == customerId);

    $("#customer-name").html(`${customer.firstName} ${customer.lastName}`);
    $("#customer-name-equip").html(`${customer.firstName}'s Equipments`);

    $("#customer-email").html(`E-mail: ${customer.email}`);
    $("#customer-phone").html(`Phone: ${customer.phone}`);
    $("#customer-street").html(`Street: ${customer.street}`);
    $("#customer-city").html(`City: ${customer.city}`);
    $("#customer-province").html(`Province: ${customer.province}`);
    $("#customer-postal").html(`Postal Code: ${customer.postalCode}`);

    $("#add-equipment-btn").attr("href", `../pages/equipment-search.html?cid=${customerId}`);

    let ownership = ownershipDatabase.filter(o => o.customerId == customerId)
    let customerEquipments = []

    ownership.forEach(o => {
        let equipment = equipmentDatabase.find(e => e.id == o.equipmentId);
        customerEquipments.push(equipment);
    })

    let equipmentList = document.getElementById("equipment-list");
    let repairRequestList = document.getElementById("repair-requests-list");

    if (customerEquipments.length > 0){
        customerEquipments.forEach(e => {
            var option = document.createElement('option');
            option.value = e.id;
            option.text = e.equipmentName;
            equipmentList.add(option);
        });
    }

    if (equipmentId > 0){
        let newEquipment = equipmentDatabase.find(e => e.id == equipmentId);
        var option = document.createElement('option')
        option.value = newEquipment.id;
        option.text = newEquipment.equipmentName;
        equipmentList.add(option);
    }else if(newequipmentName.length > 0){
        var option = document.createElement('option')
        option.value = 0;
        option.text = newequipmentName;
        equipmentList.add(option);
    }
    
    if(customerEquipments.length == 0 && equipmentId == 0){
        $("#no-equipments").html("Customer has no equipments. Want to add an equipment?");
    }

    document.getElementById("equipment-list").addEventListener("change", function() {
        $("#repair-requests-list").empty();
        $("#details-repair-request").hide();
        $("#no-repair-requests").hide();

        const selectedEquipment = equipmentList.options[equipmentList.selectedIndex].value;
        $("#create-repair-request").attr("href", selectedEquipment != 0 ? `../pages/repair-request-create.html?cid=${customerId}eid=${selectedEquipment}` : 
                                                                            `../pages/repair-request-create.html?cid=${customerId}equipment-name=${newequipmentName}`);

        let repairRequests = [];
        let ownership = ownershipDatabase.find(o => o.customerId == customerId && o.equipmentId == selectedEquipment)
        

        if (ownership != undefined){
            repairRequests = repairRequestDatabase.filter(r => r.ownershipId == ownership.id);
        }

        if (repairRequests.length > 0){
            $("#repair-requests").show();
            repairRequests.forEach(r => {
                var option = document.createElement('option')
                option.value = r.id;
                option.text = `${r.invoiceDate}#${r.invoiceNumber}: ${r.issueDescription}`;
                repairRequestList.add(option);
            });
        }else{
            $("#repair-requests").show();
            var confirmCancel = window.confirm("No Repair Requests for the selected equipment. Would you like to create one?");

            if (confirmCancel) {
                window.location.href = document.getElementById("create-repair-request").href;
            }
            //$("#no-repair-requests").html("No Repair Requests for the selected equipment. Would you like to create one?");
        }
    });

    document.getElementById("repair-requests-list").addEventListener("change", function() {
        $("#details-repair-request").show();
        const selectedRepairRequest = repairRequestList.options[repairRequestList.selectedIndex].value;
        $("#details-repair-request").attr("href", equipmentId > 0 ? `../pages/repair-request-details.html?rrid=${selectedRepairRequest}&eid=${equipmentId}` : 
                                                                    `../pages/repair-request-details.html?rrid=${selectedRepairRequest}`);
    });

} else {
    $(`#customer-details`).html("<h2>No customer details found.</h2>");
}

