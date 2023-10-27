import { fetchData } from './functions.js';

const equipmentDatabase = await fetchData('../scripts/json/equipment.json');
const urlParam = new URLSearchParams(window.location.search);
const equipmentId = urlParam.getAll("eid");
const customerId = urlParam.getAll("cid");

if (equipmentId.length > 0) {

    let equipment = equipmentDatabase.find(e => e.id == equipmentId);

    $("#back-to-search").attr("href", customerId > 0 ? `../pages/equipment-search.html?cid=${customerId}` : 
                                                        "../pages/equipment-search.html");

    $("#equipment-name").html(equipment.equipmentName);
    $("#equipment-manufacturer").html(`Manufacturer: <b>${equipment.manufacturer}</b>`);
    $("#equipment-type").html(`Type: <b>${equipment.equipmentType}</b>`);
    $("#equipment-colour").html(`Colour: <b>${equipment.colour}</b>`);
    $("#equipment-item").html(`Item Number: <b>${equipment.itemNumber}</b>`);
    $("#equipment-serial").html(`S/N: <b>${equipment.serialNumber}</b>`);
    $("#equipment-model").html(`M/N: <b>${equipment.modelNumber}</b>`);

    $("#update-equipment-btn").attr("href", customerId > 0 ? `../pages/customer-details.html?eid=${equipment.id}&cid=${customerId}` :
                                                             `../pages/equipment-update.html?eid=${equipment.id}`);
    $("#update-equipment-btn").html(customerId > 0 ? "Select Equipment" : "Update Equipment");

} else {
    $("#equipment-details").html("<h2>No equipment details found.</h2>");
}
