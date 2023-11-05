import { fetchData } from './functions.js';

//gets equipment seed data and gets equipment id
const equipmentDatabase = await fetchData('../scripts/json/equipment.json');
const ownershipDatabase = await fetchData('../scripts/json/ownership.json');

const urlParam = new URLSearchParams(window.location.search);
const equipmentId = urlParam.getAll("eid");
const customerId = urlParam.getAll("cid");
const ownershipId = urlParam.getAll("oid");
const serialNumber = urlParam.getAll("serial-number");

//checks if theres an equipment id
if (equipmentId.length > 0 && ownershipId.length == 0 && customerId.length == 0) {
    //sets up link for buttons with equipment id
    document.getElementById("back-to-equipment").href = `../pages/equipment-details.html?eid=${equipmentId}`;
    document.getElementById("cancel-to-details").href = `../pages/equipment-details.html?eid=${equipmentId}`;

    //gets equipment and displays all data in input fields
    let equipment = equipmentDatabase.find(e => e.id == equipmentId);
    document.getElementById("equipment-name").value = equipment.equipmentName;
    document.getElementById("manufacturer").value = equipment.manufacturer;
    document.getElementById("equipment-type").value = equipment.equipmentType;
    document.getElementById("colour").value = equipment.colour;
    document.getElementById("model-number").value = equipment.modelNumber;

    $("#serial-number-container").html("");
    document.getElementById("cid-container").innerHTML = "";
    document.getElementById("eid-container").innerHTML = "";
}else if(ownershipId.length > 0 || customerId.length > 0){


    $("#serial-number-container").show();
    $("#serial-number").focus()

    //gets equipment and displays all data in input fields
    let equipment = equipmentDatabase.find(e => e.id == equipmentId);
    let ownedEquipment = ownershipDatabase.find(o => o.id == ownershipId);

    document.getElementById("equipment-name").value = equipment.equipmentName;
    $("#equipment-name").prop("disabled", true);
    document.getElementById("manufacturer").value = equipment.manufacturer;
    $("#manufacturer").prop("disabled", true);
    document.getElementById("equipment-type").value = equipment.equipmentType;
    $("#equipment-type").prop("disabled", true);
    document.getElementById("colour").value = equipment.colour;
    $("#colour").prop("disabled", true);
    document.getElementById("model-number").value = equipment.modelNumber;
    $("#model-number").prop("disabled", true);

    if (ownershipId.length == 0){

        if (serialNumber.length > 0){
            document.getElementById("serial-number").value = serialNumber;
        }

        document.getElementById("back-to-equipment").href = serialNumber.length > 0 ?   `../pages/equipment-details.html?eid=${equipmentId}&cid=${customerId}&serial-number=${serialNumber}` : 
                                                                                        `../pages/equipment-details.html?eid=${equipmentId}&cid=${customerId}`;
        document.getElementById("cancel-to-details").href = serialNumber.length > 0 ?   `../pages/equipment-details.html?eid=${equipmentId}&cid=${customerId}&serial-number=${serialNumber}` : 
                                                                                        `../pages/equipment-details.html?eid=${equipmentId}&cid=${customerId}`;
        $("#update-equipment-heading").html(serialNumber.length > 0 ? "Update Equipment Serial Number" : "Insert Equipment Serial Number");


        document.getElementById("equipment-form").method = "get";
        document.getElementById("equipment-form").action = `../pages/customer-details.html`;

        document.getElementById("cidvalue").value = customerId;
        document.getElementById("cidvalue").innerHTML = customerId;
        document.getElementById("eidvalue").value = equipmentId;
        document.getElementById("eidvalue").innerHTML = equipmentId;
    }else{
        document.getElementById("back-to-equipment").href = customerId.length > 0 ? `../pages/equipment-details.html?oid=${ownershipId}&cid=${customerId}` : `../pages/equipment-details.html?oid=${ownershipId}`;
        document.getElementById("cancel-to-details").href = customerId.length > 0 ? `../pages/equipment-details.html?oid=${ownershipId}&cid=${customerId}` : `../pages/equipment-details.html?oid=${ownershipId}`;
        
        $("#update-equipment-heading").html("Update Equipment Serial Number")
        document.getElementById("serial-number").value = ownedEquipment.serialNumber;
    }
}else{
    window.alert("No equipment selected for update.");
    window.location.href = "../pages/equipment-search.html";
}