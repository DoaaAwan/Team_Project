import { fetchData } from './functions.js';

class EquipmentSearchPage {
  constructor() {
    document.addEventListener('DOMContentLoaded', () => this.init());
  }

  async init() {

    //gets seed data for equipment and ownership
    this.customerDatabase = await fetchData('../scripts/json/customer.json')
    this.equipmentDatabase = await fetchData('../scripts/json/equipment.json');
    this.ownershipDatabase = await fetchData('../scripts/json/ownership.json');

    //gets customer id if one is passed
    this.customerId = new URLSearchParams(window.location.search).getAll("cid");
    this.equipmentsOwned = this.getEquipmentsOwned();
    this.searchEquipments = false;
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
      $("#customer-collapse").removeClass("show");
      this.searchEquipments = true;
      customerButton.style.display = "inline";
      customerButton.href = `../pages/customer-details.html?cid=${this.customerId}`;
      newEquipmentButton.href = `../pages/equipment-create.html?cid=${this.customerId}`;
    }else{
      $("#filterToggle").show();
    }
  }

  addSearchButtonEventListener() {
    document.getElementById("search-btn").addEventListener("click", (e) => {
      e.preventDefault();
      this.performSearch();
    });
    document.getElementById("filterToggle").addEventListener("click", (e) => {
      e.preventDefault();
      if (this.searchEquipments){
        $('#filterToggle').html("Click To Search Equipments");
        $('#search-heading').html("Search for customer owned equipments");
        
        this.searchEquipments = false;
      }else{
        $('#filterToggle').html("Click To Search Customer Owned Equipments");
        $('#search-heading').html("Search for equipment");
        document.getElementById("search-customer").value = "";
        this.searchEquipments = true;
      }
      this.performSearch();
    });
  }

  triggerSearch() {
    this.performSearch('');
  }

  //gets all equipments matching equipment search
  performSearch(searchQuery = document.getElementById("search-value").value.toLowerCase()) {
    let customerSearch = document.getElementById("search-customer");
    let searchDiv = document.getElementById("search-grid");
    searchDiv.innerHTML = "";
    let results = [];

    if (!this.searchEquipments){
      let customersFilter = this.customerDatabase .filter(c => {
        return (c.firstName.toLowerCase().includes(customerSearch.value.toLowerCase())) || 
              (c.lastName.toLowerCase().includes(customerSearch.value.toLowerCase()))
      }).map(c => c.id);
      
      let equipmentFilter = this.equipmentDatabase.filter(e => {
        return (e.equipmentName.toLowerCase().includes(searchQuery) ||
        e.equipmentType.toLowerCase().includes(searchQuery) ||
        e.manufacturer.toLowerCase().includes(searchQuery) ||
        e.modelNumber.toLowerCase().includes(searchQuery) ||
        e.serialNumber.toLowerCase().includes(searchQuery))
      }).map(e => e.id);

      results = this.ownershipDatabase.filter(o => {
        return (customersFilter.includes(o.customerId)) && (equipmentFilter.includes(o.equipmentId))
      });

    }
    else{
      results = this.equipmentDatabase.filter(equipment => {
        return (equipment.equipmentName.toLowerCase().includes(searchQuery) ||
                equipment.equipmentType.toLowerCase().includes(searchQuery) ||
                equipment.manufacturer.toLowerCase().includes(searchQuery) ||
                equipment.modelNumber.toLowerCase().includes(searchQuery) ||
                equipment.customerName.toLowerCase().includes(searchQuery) ||
                equipment.serialNumber.toLowerCase().includes(searchQuery)) &&
                this.equipmentsOwned.every(e => e != equipment.id);
      });
    }
    
    
    //only gets results that doesn't already exist as equipment customer owns
    if (results.length > 0) {
      this.searchEquipments ? results.sort((a, b) => a.equipmentName.toUpperCase().localeCompare(b.equipmentName.toUpperCase())) : 
                              results.sort((a, b) => this.customerDatabase.find(c => a.customerId == c.id).fullName.toUpperCase().localeCompare(this.customerDatabase.find(c => b.customerId == c.id).fullName.toUpperCase()));
      results.forEach(result => searchDiv.appendChild(this.createEquipmentDiv(result)));
    } else {
      if (window.confirm("No matching equipments found. Would you like to create one?")) {
        window.location.href = document.getElementById("new-equipment").href;
      }
    }
  }

  //displays all equipment results
  createEquipmentDiv(result) {
    let equipmentDiv = document.createElement("div");

    if (!this.searchEquipments){
      let c = this.customerDatabase.find(c => c.id == result.customerId);
      let e = this.equipmentDatabase.find(e => e.id == result.equipmentId);

      equipmentDiv.innerHTML = 
      `<div>
          <a href="../pages/equipment-details.html?oid=${result.id}" style="width: 100%;" class="result shadow d-flex justify-content-start">
              <!-- <img src="../images/equip.png" alt=""> -->
              <div id="equipment-details">
                  <p id="searchCustName" class="name">${c.firstName} ${c.lastName}</p>
                  <p id="searchName" class="name">${e.equipmentName}</p>
                  <p id="searchType" class="email">Type: ${e.equipmentType}</p>
                  <p id="searchManufacturer" class="email">Manufacturer: ${e.manufacturer}</p>
                  <p id="searchModelNumber" class="email">M/N: ${e.modelNumber}</p>
                  <p id="searchSerialNumber" class="number">S/N: ${result.serialNumber}</p>
              </div>
          </a>
      </div>`;
    }
    else{
      equipmentDiv.innerHTML = 
      `<div>
          <a href="../pages/equipment-details.html?eid=${result.id}${this.customerId.length > 0 ? `&cid=${this.customerId}` : ""}" style="width: 100%;" class="result shadow d-flex justify-content-start">
              <!-- <img src="../images/equip.png" alt=""> -->
              <div id="equipment-details">
                  <p id="searchName" class="name">${result.equipmentName}</p>
                  <p id="searchType" class="email">Type: ${result.equipmentType}</p>
                  <p id="searchManufacturer" class="email">Manufacturer: ${result.manufacturer}</p>
                  <p id="searchModelNumber" class="email">M/N: ${result.modelNumber}</p>
              </div>
          </a>
      </div>`;
    }

    return equipmentDiv;
  }


  
}

new EquipmentSearchPage();


/*
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
});*/