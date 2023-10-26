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
    $("#equipment-manufacturer").html(`Manufacturer: ${equipment.manufacturer}`);
    $("#equipment-type").html(`Type: ${equipment.equipmentType}`);
    $("#equipment-colour").html(`Colour: ${equipment.colour}`);
    $("#equipment-item").html(`Item #: ${equipment.itemNumber}`);
    $("#equipment-serial").html(`S/N: ${equipment.serialNumber}`);
    $("#equipment-model").html(`M/N: ${equipment.modelNumber}`);

    $("#update-equipment-btn").attr("href", customerId > 0 ? `../pages/customer-details.html?eid=${equipment.id}&cid=${customerId}` :
                                                             `../pages/equipment-update.html?eid=${equipment.id}`);
    $("#update-equipment-btn").html(customerId > 0 ? "Select Equipment" : "Update Equipment");

} else {
    $("#equipment-details").html("<h2>No equipment details found.</h2>");
}
