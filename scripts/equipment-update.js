import { fetchData } from './functions.js';

//gets equipment seed data and gets equipment id
const equipmentDatabase = await fetchData('../scripts/json/equipment.json');
const urlParam = new URLSearchParams(window.location.search);
const equipmentId = urlParam.getAll("eid");

//checks if theres an equipment id
if (equipmentId.length > 0) {
    //sets up link for buttons with equipment id
    document.getElementById("back-to-equipment").href = `../pages/equipment-details.html?eid=${equipmentId}`
    document.getElementById("cancel-to-details").href = `../pages/equipment-details.html?eid=${equipmentId}`

    //gets equipment and displays all data in input fields
    let equipment = equipmentDatabase.find(e => e.id == equipmentId);
    document.getElementById("equipment-name").value = equipment.equipmentName;
    document.getElementById("manufacturer").value = equipment.manufacturer;
    document.getElementById("equipment-type").value = equipment.equipmentType;
    document.getElementById("colour").value = equipment.colour;
    document.getElementById("item-number").value = equipment.itemNumber;
    document.getElementById("serial-number").value = equipment.serialNumber;
    document.getElementById("model-number").value = equipment.modelNumber;
}
else{
    window.alert("No equipment selected for update.");
    window.location.href = "../pages/equipment-search.html";
}