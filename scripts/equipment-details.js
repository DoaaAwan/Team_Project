import { fetchData } from './functions.js';

//gets equipment seed data
const customerDatabase = await fetchData('../scripts/json/customer.json');
const equipmentDatabase = await fetchData('../scripts/json/equipment.json');
const ownershipDatabase = await fetchData('../scripts/json/ownership.json');
const urlParam = new URLSearchParams(window.location.search);
//gets equipment id and customer id  from url parameters
const equipmentId = urlParam.getAll("eid");
const customerId = urlParam.getAll("cid");
const ownershipId = urlParam.getAll("oid");
const equipmentName = urlParam.getAll("equipment-name");
const equipmentType = urlParam.getAll("equipment-type")
const equipmentManufacturer = urlParam.getAll("manufacturer")
const equipmentColour = urlParam.getAll("colour")
const equipmentModelNumber = urlParam.getAll("model-number")
const serialNumber = urlParam.getAll("serial-number");

//only displays if equipment if equipment id was passed as parameter to this page
if (equipmentId.length > 0 && serialNumber.length == 0) {

    //gets equipment by id
    let equipment = equipmentDatabase.find(e => e.id == equipmentId);

    $("#back-to-search").show();
    //makes sure to pass customer id as a parameter in back to search button
    $("#back-to-search").attr("href", customerId > 0 ? `../pages/equipment-search.html?cid=${customerId}` : 
                                                        "../pages/equipment-search.html");

    //displays equipment details
    $("#equipment-name").html(equipment.equipmentName);
    $("#equipment-manufacturer").html(`Manufacturer: <b>${equipment.manufacturer}</b>`);
    $("#equipment-type").html(`Type: <b>${equipment.equipmentType}</b>`);
    $("#equipment-colour").html(`Colour: <b>${equipment.colour}</b>`);
    $("#equipment-model").html(`M/N: <b>${equipment.modelNumber}</b>`);

    //makes sure to pass equipment and customer ids as parameters in update button
    $("#update-equipment-btn").attr("href", customerId > 0 ? `../pages/equipment-update.html?eid=${equipment.id}&cid=${customerId}` :
                                                             `../pages/equipment-update.html?eid=${equipment.id}`);
    //changes button content to show select equipment if there is a customer id. means that user is adding an equipment to a customer
    $("#update-equipment-btn").html(customerId > 0 ? "Select Equipment" : "Update Equipment");

}else if(ownershipId.length > 0){
    let ownedEquipment = ownershipDatabase.find(o => o.id == ownershipId);

    let customer = customerDatabase.find(c => c.id == ownedEquipment.customerId);
    let equipment = equipmentDatabase.find(e => e.id == ownedEquipment.equipmentId);
    
    //displays equipment details
    $("#equipment-customer").html(`Equipment Owned By: <b>${customer.fullName}</b>`);
    $("#equipment-name").html(equipment.equipmentName);
    $("#equipment-manufacturer").html(`Manufacturer: <b>${equipment.manufacturer}</b>`);
    $("#equipment-type").html(`Type: <b>${equipment.equipmentType}</b>`);
    $("#equipment-colour").html(`Colour: <b>${equipment.colour}</b>`);
    $("#equipment-model").html(`M/N: <b>${equipment.modelNumber}</b>`);
    $("#equipment-serial").show();
    $("#equipment-serial").html(`S/N: <b>${ownedEquipment.serialNumber}</b>`);

    $("#update-equipment-btn").html("Update Serial Number");
    $("#update-equipment-btn").attr("href", customerId.length > 0 ? `../pages/equipment-update.html?eid=${equipment.id}&oid=${ownershipId}&cid=${customerId}` : 
                                                                    `../pages/equipment-update.html?eid=${equipment.id}&oid=${ownershipId}`);

    $("#back-to-search").show();
    $("#go-to-customer").show();
    $("#go-to-customer").attr("href", `../pages/customer-details.html?cid=${customer.id}`);


}else if (serialNumber.length > 0 && equipmentName.length == 0){
    let customer = customerDatabase.find(c => c.id == customerId);
    let equipment = equipmentDatabase.find(e => e.id == equipmentId);

    $("#go-to-customer").show()
    $("#go-to-customer").attr("href", `../pages/customer-details.html?eid=${equipment.id}&cid=${customerId}&serial-number=${serialNumber}`);

    $("#equipment-customer").html(`Equipment Owned By: <b>${customer.fullName}</b>`);
    $("#equipment-name").html(equipment.equipmentName);
    $("#equipment-manufacturer").html(`Manufacturer: <b>${equipment.manufacturer}</b>`);
    $("#equipment-type").html(`Type: <b>${equipment.equipmentType}</b>`);
    $("#equipment-colour").html(`Colour: <b>${equipment.colour}</b>`);
    $("#equipment-model").html(`M/N: <b>${equipment.modelNumber}</b>`);
    $("#equipment-serial").show();
    $("#equipment-serial").html(`S/N: <b>${serialNumber}</b>`);

    $("#update-equipment-btn").html("Update Serial Number");
    $("#update-equipment-btn").attr("href", `../pages/equipment-update.html?eid=${equipment.id}&cid=${customerId}&serial-number=${serialNumber}`);
}else if (equipmentName.length > 0){

    $("#go-to-customer").show()
    $("#go-to-customer").attr("href",   `../pages/customer-details.html?equipment-name=${equipmentName}&manufacturer=${equipmentManufacturer}&equipment-type=${equipmentType}` + 
                                        `&colour=${equipmentColour}&model-number=${equipmentModelNumber}&serial-number=${serialNumber}&cid=${customerId}`);

    let customer = customerDatabase.find(c => c.id == customerId);
    
    $("#equipment-customer").html(`Equipment Owned By: <b>${customer.fullName}</b>`);
    $("#equipment-name").html(equipmentName);
    $("#equipment-manufacturer").html(`Manufacturer: <b>${equipmentManufacturer}</b>`);
    $("#equipment-type").html(`Type: <b>${equipmentType}</b>`);
    $("#equipment-colour").html(`Colour: <b>${equipmentColour}</b>`);
    $("#equipment-model").html(`M/N: <b>${equipmentModelNumber}</b>`);
    $("#equipment-serial").show();
    $("#equipment-serial").html(`S/N: <b>${serialNumber}</b>`);

    $("#update-equipment-btn").html("Update Serial Number");
    $("#update-equipment-btn").attr("href",     `../pages/equipment-update.html?equipment-name=${equipmentName}&manufacturer=${equipmentManufacturer}&equipment-type=${equipmentType}` + 
                                                `&colour=${equipmentColour}&model-number=${equipmentModelNumber}&serial-number=${serialNumber}&cid=${customerId}`);
}else {
    $("#equipment-details").html("<h2>No equipment details found.</h2>");
}
