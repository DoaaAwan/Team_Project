import { fetchData } from './functions.js';

const equipmentDatabase = await fetchData('../scripts/json/equipment.json');
const urlParam = new URLSearchParams(window.location.search);
const equipmentId = urlParam.getAll("id");

if (equipmentId.length > 0) {
    let equipmentDetailsDiv = document.getElementById("equipment-details");
    let equipment = equipmentDatabase.find(e => e.id == equipmentId);

    let equipmentDetails = document.createElement("div");
    equipmentDetails.innerHTML = `
        <h2>${equipment.equipmentName}</h2>
        <hr>
        <div class="row">
            <div class="column">
                <p>Manufacturer: ${equipment.manufacturer}<br>Type: ${equipment.equipmentType}<br>Colour: ${equipment.colour}<br>M/N: ${equipment.modelNumber}<br>S/N: ${equipment.serialNumber}<br></p>
            </div>
            <div class="d-flex">
                <a href="../pages/equipment-update.html?id=${equipment.id}" class="button btns"> Update Equipment</a>
            </div>
        </div>
    `;
    equipmentDetailsDiv.appendChild(equipmentDetails);

} else {
    let equipmentDetailsDiv = document.getElementById("equipment-details");
    equipmentDetailsDiv.innerHTML = "<h2>No equipment details found.</h2>";
}
