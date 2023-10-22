import { fetchData } from './functions.js';

const equipmentDatabase = await fetchData('../scripts/json/equipment.json');

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

            results.push(equipment);

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
        `<div id="equipment-results">
            <a href="../pages/equipment-details.html?id=${equipment.id}" style="width: 100%;" class="result shadow d-flex justify-content-start">
                <!-- <img src="../images/equip.png" alt=""> -->
                <div id="equipment-details">
                    <p id="searchManufacturer" class="name">${equipment.equipmentName}</p>
                    <p id="searchItemNumber" class="email">Type: ${equipment.equipmentType}</p>
                    <p id="searchItemNumber" class="email">Manufacturer: ${equipment.manufacturer}</p>
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
        // If the user clicks "OK" in the confirmation dialog, navigate to the index page
        window.location.href = "../pages/equipment-create.html";
        }
    }
});