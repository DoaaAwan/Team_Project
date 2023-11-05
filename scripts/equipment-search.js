import { fetchData } from './functions.js';

class EquipmentSearchPage {
  constructor() {
    document.addEventListener('DOMContentLoaded', () => this.init());
  }

  async init() {

    //gets seed data for equipment and ownership
    this.equipmentDatabase = await fetchData('../scripts/json/equipment.json');
    this.ownershipDatabase = await fetchData('../scripts/json/ownership.json');

    //gets customer id if one is passed
    this.customerId = new URLSearchParams(window.location.search).getAll("cid");
    this.equipmentsOwned = this.getEquipmentsOwned();
    this.setupButtons();
    this.addSearchButtonEventListener();
    this.triggerSearch();
  }

  //gets all equipment ids of equipments customer owns
  getEquipmentsOwned() {
    if (this.customerId.length > 0) {
      return this.ownershipDatabase.filter(o => o.customerId == this.customerId).map(o => o.equipmentId);
    }
    return [];
  }

  setupButtons() {
    if (this.customerId.length > 0) {
      const customerButton = document.getElementById("back-to-customer");
      const newEquipmentButton = document.getElementById("new-equipment");
      
      //sets link of buttons to include customer parameter
      customerButton.style.display = "inline";
      customerButton.href = `../pages/customer-details.html?cid=${this.customerId}`;
      newEquipmentButton.href = `../pages/equipment-create.html?cid=${this.customerId}`;
    }
  }

  addSearchButtonEventListener() {
    document.getElementById("search-btn").addEventListener("click", (e) => {
      e.preventDefault();
      this.performSearch();
    });
  }

  triggerSearch() {
    this.performSearch('');
  }

  //gets all equipments matching equipment search
  performSearch(searchQuery = document.getElementById("search-value").value.toLowerCase()) {
    let searchDiv = document.getElementById("search-grid");
    searchDiv.innerHTML = "";
    let results = this.equipmentDatabase.filter(equipment => {
      return (equipment.equipmentName.toLowerCase().includes(searchQuery) ||
              equipment.equipmentType.toLowerCase().includes(searchQuery) ||
              equipment.manufacturer.toLowerCase().includes(searchQuery) ||
              equipment.modelNumber.toLowerCase().includes(searchQuery) ||
              equipment.customerName.toLowerCase().includes(searchQuery) ||
              equipment.serialNumber.toLowerCase().includes(searchQuery)) &&
              this.equipmentsOwned.every(e => e != equipment.id);
    });

    //only gets results that doesn't already exist as equipment customer owns
    if (results.length > 0) {
      results.sort((a, b) => a.equipmentName.toUpperCase().localeCompare(b.equipmentName.toUpperCase()));
      results.forEach(equipment => searchDiv.appendChild(this.createEquipmentDiv(equipment)));
    } else {
      if (window.confirm("No matching equipments found. Would you like to create one?")) {
        window.location.href = document.getElementById("new-equipment").href;
      }
    }
  }

  //displays all equipment results
  createEquipmentDiv(equipment) {
    let equipmentDiv = document.createElement("div");
            equipmentDiv.innerHTML = 
            `<div>
                <a href="../pages/equipment-details.html?eid=${equipment.id}${customerId.length > 0 ? `&cid=${customerId}` : ""}" style="width: 100%;" class="result shadow d-flex justify-content-start">
                    <!-- <img src="../images/equip.png" alt=""> -->
                    <div id="equipment-details">
                        <p id="searchCustName" class="name">${equipment.customerName}
                        <p id="searchName" class="name">${equipment.equipmentName}</p>
                        <p id="searchType" class="email">Type: ${equipment.equipmentType}</p>
                        <p id="searchManufacturer" class="email">Manufacturer: ${equipment.manufacturer}</p>
                        <p id="searchModelNumber" class="email">M/N: ${equipment.modelNumber}</p>
                        <p id="searchSerialNumber" class="number">S/N: ${equipment.serialNumber}</p>
                    </div>
                </a>
            </div>`;
    return equipmentDiv;
  }


  
}

new EquipmentSearchPage();



'./functions.js';

//gets seed data for equipment and ownership
const equipmentDatabase = await fetchData('../scripts/json/equipment.json');
const ownershipDatabase = await fetchData('../scripts/json/ownership.json');


//gets customer id if one is passed
const urlParam = new URLSearchParams(window.location.search);
const customerId = urlParam.getAll("cid");

let equipmentsOwned = []

if (customerId.length > 0){
    const customerButton = document.getElementById("back-to-customer");
    const newEquipmentButton = document.getElementById("new-equipment");

    //gets all equipment ids of equipments customer owns
    equipmentsOwned = ownershipDatabase.filter(o => o.customerId == customerId).map(o => o.equipmentId);

    //sets link of buttons to include customer parameter
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
    
    //gets all equipments matching equipment search
    equipmentDatabase.forEach(equipment => {
        if (equipment.equipmentName.toLowerCase().includes(equipSearch) ||
            equipment.equipmentType.toLowerCase().includes(equipSearch) ||
            equipment.manufacturer.toLowerCase().includes(equipSearch) ||
            equipment.modelNumber.toLowerCase().includes(equipSearch) || 
            equipment.customerName.toLowerCase().includes(equipSearch) ||
            equipment.serialNumber.toLowerCase().includes(equipSearch)){

            //only gets results that doesn't already exist as equipment customer owns
            if (equipmentsOwned.every(e => e != equipment.id)){
                results.push(equipment);
            }
        }
    });

    //sorts and displays results if there are results
    if (results.length > 0){

        //sorts results by name
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

        //displays all equipment results
        results.forEach(equipment => {

            let equipmentDiv = document.createElement("div");
            equipmentDiv.innerHTML = 
            `<div>
                <a href="../pages/equipment-details.html?eid=${equipment.id}${customerId.length > 0 ? `&cid=${customerId}` : ""}" style="width: 100%;" class="result shadow d-flex justify-content-start">
                    <!-- <img src="../images/equip.png" alt=""> -->
                    <div id="equipment-details">
                        <p id="searchCustName" class="name">${equipment.customerName}
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
        //if equipment doesn't exist, asks user if they want to create a new equipment
        var confirmCancel = window.confirm("No matching equipments found. Would you like to create one?");

        if (confirmCancel) {
            window.location.href = document.getElementById("new-equipment").href;
        }
    }
});