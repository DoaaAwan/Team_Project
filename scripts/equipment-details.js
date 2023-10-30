import { fetchData } from './functions.js';

//gets equipment seed data
const equipmentDatabase = await fetchData('../scripts/json/equipment.json');
const urlParam = new URLSearchParams(window.location.search);
//gets equipment id and customer id  from url parameters
const equipmentId = urlParam.getAll("eid");
const customerId = urlParam.getAll("cid");

//only displays if equipment if equipment id was passed as parameter to this page
if (equipmentId.length > 0) {

    //gets equipment by id
    let equipment = equipmentDatabase.find(e => e.id == equipmentId);

    //makes sure to pass customer id as a parameter in back to search button
    $("#back-to-search").attr("href", customerId > 0 ? `../pages/equipment-search.html?cid=${customerId}` : 
                                                        "../pages/equipment-search.html");

    //displays equipment details
    $("#equipment-name").html(equipment.equipmentName);
    $("#equipment-manufacturer").html(`Manufacturer: <b>${equipment.manufacturer}</b>`);
    $("#equipment-type").html(`Type: <b>${equipment.equipmentType}</b>`);
    $("#equipment-colour").html(`Colour: <b>${equipment.colour}</b>`);
    $("#equipment-item").html(`Item Number: <b>${equipment.itemNumber}</b>`);
    $("#equipment-serial").html(`S/N: <b>${equipment.serialNumber}</b>`);
    $("#equipment-model").html(`M/N: <b>${equipment.modelNumber}</b>`);

    //makes sure to pass equipment and customer ids as parameters in update button
    $("#update-equipment-btn").attr("href", customerId > 0 ? `../pages/customer-details.html?eid=${equipment.id}&cid=${customerId}` :
                                                             `../pages/equipment-update.html?eid=${equipment.id}`);
    //changes button content to show select equipment if there is a customer id. means that user is adding an equipment to a customer
    $("#update-equipment-btn").html(customerId > 0 ? "Select Equipment" : "Update Equipment");

} else {
    $("#equipment-details").html("<h2>No equipment details found.</h2>");
}
