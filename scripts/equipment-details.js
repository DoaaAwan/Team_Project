import { fetchData } from './functions.js';

const equipmentDatabase = await fetchData('../scripts/json/equipment.json');
const urlParam = new URLSearchParams(window.location.search);
const equipmentId = urlParam.getAll("eid");
const customerId = urlParam.getAll("cid");

if (equipmentId.length > 0) {
    let equipmentDetailsDiv = document.getElementById("equipment-details");
    let equipment = equipmentDatabase.find(e => e.id == equipmentId);

    document.getElementById("back-to-search").href = customerId > 0 ? `../pages/equipment-search.html?cid=${customerId}` : "../pages/equipment-search.html";

    equipmentDetailsDiv.innerHTML = `
        <h2>${equipment.equipmentName}</h2>
        <hr>
        <div class="row">
            <div class="column">
                <p>Manufacturer: ${equipment.manufacturer}<br>Type: ${equipment.equipmentType}<br>Colour: ${equipment.colour}<br>M/N: ${equipment.modelNumber}<br>S/N: ${equipment.serialNumber}<br></p>
            </div>
            <div class="d-flex">
                ${customerId > 0 ? `<a href="../pages/customer-details.html?eid=${equipment.id}&cid=${customerId}" id="update-equipment-btn" class="button btns">Select Equipment</a>` :
                    `<a href="../pages/equipment-update.html?eid=${equipment.id}" id="update-equipment-btn" class="button btns">Update Equipment</a>`}
            </div>
        </div>
    `;

} else {
    let equipmentDetailsDiv = document.getElementById("equipment-details");
    equipmentDetailsDiv.innerHTML = "<h2>No equipment details found.</h2>";
}
