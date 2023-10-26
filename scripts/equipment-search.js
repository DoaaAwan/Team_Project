import { fetchData } from './functions.js';

const equipmentDatabase = await fetchData('../scripts/json/equipment.json');
const ownershipDatabase = await fetchData('../scripts/json/ownership.json');

const urlParam = new URLSearchParams(window.location.search);
const customerId = urlParam.getAll("cid");
const equipmentsOwned = ownershipDatabase.filter(o => o.customerId == customerId).map(o => o.equipmentId);

if (customerId > 0){
    const customerButton = document.getElementById("back-to-customer");
    const newEquipmentButton = document.getElementById("new-equipment");

    customerButton.style.display = "inline";
    customerButton.href = `../pages/customer-details.html?cid=${customerId}`;
    newEquipmentButton.href = `../pages/equipment-create.html?cid=${customerId}`;
}

document.getElementById("search-btn").addEventListener("click", function(e){ 
    e.preventDefault();
    let searchDiv = document.getElementById("search-grid");
    searchDiv.innerHTML = "";
    let equipSearch = document.getElementById("search-value").value.toLowerCase();
    let results = [];
    
    equipmentDatabase.forEach(equipment => {
        if (equipment.equipmentName.toLowerCase().includes(equipSearch) ||
            equipment.equipmentType.toLowerCase().includes(equipSearch) ||
            equipment.manufacturer.toLowerCase().includes(equipSearch) ||
            equipment.modelNumber.toLowerCase().includes(equipSearch) || 
            equipment.serialNumber.toLowerCase().includes(equipSearch)){

            if (equipmentsOwned.every(e => e != equipment.id)){
                results.push(equipment);
            }
        }
    });

    if (results.length > 0){

        results.sort((a, b) => {
            const nameA = a.equipmentName.toUpperCase();
            const nameB = b.equipmentName.toUpperCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });

        results.forEach(equipment => {

            let equipmentDiv = document.createElement("div");
            equipmentDiv.innerHTML = 
            `<div>
                <a href="../pages/equipment-details.html?eid=${equipment.id}${customerId.length > 0 ? `&cid=${customerId}` : ""}" style="width: 100%;" class="result shadow d-flex justify-content-start">
                    <!-- <img src="../images/equip.png" alt=""> -->
                    <div id="equipment-details">
                        <p id="searchName" class="name">${equipment.equipmentName}</p>
                        <p id="searchType" class="email">Type: ${equipment.equipmentType}</p>
                        <p id="searchManufacturer" class="email">Manufacturer: ${equipment.manufacturer}</p>
                        <p id="searchModelNumber" class="email">M/N: ${equipment.modelNumber}</p>
                        <p id="searchSerialNumber" class="number">S/N: ${equipment.serialNumber}</p>
                    </div>
                </a>
            </div>`;

            searchDiv.appendChild(equipmentDiv);
        })
    }
    else{
        var confirmCancel = window.confirm("No matching equipments found. Would you like to create one?");

        if (confirmCancel) {
            window.location.href = document.getElementById("new-equipment").href;
        }
    }
});