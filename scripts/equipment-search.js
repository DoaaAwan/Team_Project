//import { fetchData } from './functions.js';

class EquipmentSearchPage {
  constructor() {
    document.addEventListener('DOMContentLoaded', () => this.init());
  }

  async init() {

    //gets seed data for equipment and ownership
    this.customerDatabase = getCustomerData();
    this.equipmentDatabase = getEquipmentData();
    this.ownershipDatabase = getOwnershipData();

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
        $('#filterToggle').html("Click To Find Existing Equipment In Database");
        $('#search-heading').html("Search for customer's equipment");
        
        this.searchEquipments = false;
      }else{
        $('#filterToggle').html("Click To Find Customer's Equipment");
        $('#search-heading').html("Search for existing equipment in database");
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

    }else{
      results = this.equipmentDatabase.filter(equipment => {
        return (equipment.equipmentName.toLowerCase().includes(searchQuery) ||
                equipment.equipmentType.toLowerCase().includes(searchQuery) ||
                equipment.manufacturer.toLowerCase().includes(searchQuery) ||
                equipment.modelNumber.toLowerCase().includes(searchQuery)) &&
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
                  <p id="searchColour" class="email">Colour: ${result.colour}</p>
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


function getCustomerData(){
  return [
      {
        "id": 1,
        "firstName": "John",
        "lastName": "Doe",
        "email": "johndoe@gmail.com",
        "phone": "(905) 456-7890",
        "street": "123 Main St.",
        "city": "St. Catharines",
        "province": "Ontario",
        "postalCode": "L4K 8F9",
        "fullName" : "John Doe"
      },
      {
        "id": 2,
        "firstName": "Jane",
        "lastName": "Smith",
        "email": "janesmith@gmail.com",
        "phone": "(905) 123-4567",
        "street": "456 Elm St.",
        "city": "Hamilton",
        "province": "Ontario",
        "postalCode": "L5T 9K3",
        "fullName" : "Jane Smith"
      },
      {
        "id": 3,
        "firstName": "Emily",
        "lastName": "Johnson",
        "email": "emilyj@gmail.com",
        "phone": "(905) 789-0123",
        "street": "789 Maple Ave.",
        "city": "Mississauga",
        "province": "Ontario",
        "postalCode": "L6P 5G7",
        "fullName" : "Emily Johnson"
      },
      {
        "id": 4,
        "firstName": "William",
        "lastName": "Brown",
        "email": "williambrown@gmail.com",
        "phone": "(905) 654-3210",
        "street": "101 Oak Dr.",
        "city": "Toronto",
        "province": "Ontario",
        "postalCode": "L7R 2W4",
        "fullName" : "William Brown"
      },
      {
        "id": 5,
        "firstName": "Olivia",
        "lastName": "White",
        "email": "oliviawhite@gmail.com",
        "phone": "(905) 876-5432",
        "street": "234 Pine St.",
        "city": "Brampton",
        "province": "Ontario",
        "postalCode": "L8S 3T9",
        "fullName" : "Olivia White"
      },
      {
        "id": 6,
        "firstName": "Michael",
        "lastName": "Wilson",
        "email": "michaelwilson@gmail.com",
        "phone": "(905) 678-9056",
        "street": "567 Birch Blvd.",
        "city": "Waterloo",
        "province": "Ontario",
        "postalCode": "L9Z 2X8",
        "fullName" : "Michael Wilson"
      },
      {
        "id": 7,
        "firstName": "Sophia",
        "lastName": "Taylor",
        "email": "sophiataylor@gmail.com",
        "phone": "(905) 234-5678",
        "street": "890 Cedar Ln.",
        "city": "London",
        "province": "Ontario",
        "postalCode": "L0A 1B2",
        "fullName" : "Sophia Taylor"
      },
      {
        "id": 8,
        "firstName": "James",
        "lastName": "Thomas",
        "email": "jamesthomas@gmail.com",
        "phone": "(905) 987-6543",
        "street": "123 Walnut St.",
        "city": "Oshawa",
        "province": "Ontario",
        "postalCode": "L1T 2Y4",
        "fullName" : "James Thomas"
        
      },
      {
        "id": 9,
        "firstName": "Ava",
        "lastName": "Martin",
        "email": "avamartin@gmail.com",
        "phone": "(905) 432-1987",
        "street": "456 Spruce Ave.",
        "city": "Markham",
        "province": "Ontario",
        "postalCode": "L2E 3F5",
        "fullName" : "Ava Martin"
      },
      {
        "id": 10,
        "firstName": "Ethan",
        "lastName": "Miller",
        "email": "ethanmiller@gmail.com",
        "phone": "(905) 321-7654",
        "street": "789 Oak Lane",
        "city": "Kitchener",
        "province": "Ontario",
        "postalCode": "L3M 6N1",
        "fullName" : "Ethan Miller"
      }
    ];
}

function getOwnershipData(){
  return [
      {
        "id": 1,
        "customerId": 1,
        "equipmentId": 1,
        "serialNumber": "6S985C78866"
      },
      {
        "id": 2,
        "customerId": 1,
        "equipmentId": 3,
        "serialNumber": "7U942Z45486"
      },
      {
        "id": 3,
        "customerId": 2,
        "equipmentId": 2,
        "serialNumber": "2Z867N46698"
      },
      {
        "id": 4,
        "customerId": 2,
        "equipmentId": 4,
        "serialNumber": "6D247A85967"
      },
      {
        "id": 5,
        "customerId": 3,
        "equipmentId": 5,
        "serialNumber": "8A979P36869"
      },
      {
        "id": 6,
        "customerId": 3,
        "equipmentId": 7,
        "serialNumber": "8E445U62644"
      },
      {
        "id": 7,
        "customerId": 4,
        "equipmentId": 6,
        "serialNumber": "5Z935M24736"
      },
      {
        "id": 8,
        "customerId": 4,
        "equipmentId": 8,
        "serialNumber": "7E537T79592"
      },
      {
        "id": 9,
        "customerId": 5,
        "equipmentId": 9,
        "serialNumber": "8S828W84428"
      },
      {
        "id": 10,
        "customerId": 5,
        "equipmentId": 11,
        "serialNumber": "6W727K88322"
      },
      {
        "id": 11,
        "customerId": 6,
        "equipmentId": 10,
        "serialNumber": "6V897N22689"
      },
      {
        "id": 12,
        "customerId": 6,
        "equipmentId": 12,
        "serialNumber": "5J638F23992"
      },
      {
        "id": 13,
        "customerId": 7,
        "equipmentId": 1,
        "serialNumber": "9B475T53372"
      },
      {
        "id": 14,
        "customerId": 7,
        "equipmentId": 3,
        "serialNumber": "6H483T94664"
      },
      {
        "id": 15,
        "customerId": 8,
        "equipmentId": 5,
        "serialNumber": "9Y864M68339"
      },
      {
        "id": 16,
        "customerId": 8,
        "equipmentId": 7,
        "serialNumber": "5L383T77572"
      },
      {
        "id": 17,
        "customerId": 9,
        "equipmentId": 9,
        "serialNumber": "7N992J69283"
      },
      {
        "id": 18,
        "customerId": 9,
        "equipmentId": 11,
        "serialNumber": "7H826B47548"
      },
      {
        "id": 19,
        "customerId": 1,
        "equipmentId": 10,
        "serialNumber": "7Y686J58959"
      },
      {
        "id": 20,
        "customerId": 2,
        "equipmentId": 12,
        "serialNumber": "5X522H66584"
      }
    ];
}


function getEquipmentData(){
  return [
      {
        "id": 1,
        "equipmentName": "GrassGlider Pro",
        "equipmentType": "Lawn Mower",
        "serialNumber": "20931890",
        "modelNumber": "A02B",
        "manufacturer": "Pro-Power Canada",
        "colour": "Red"
      },
      {
        "id": 2,
        "equipmentName": "LawnMaster 2000",
        "equipmentType": "Lawn Mower",
        "serialNumber": "987654321",
        "modelNumber": "B05C",
        "manufacturer": "Troy-Bilt",
        "colour": "Green"
      },
      {
        "id": 3,
        "equipmentName": "PowerHedge 300",
        "equipmentType": "Hedge Trimmer",
        "serialNumber": "123456789",
        "modelNumber": "H12D",
        "manufacturer": "HedgeMaster",
        "colour": "Blue"
      },
      {
        "id": 4,
        "equipmentName": "LeafBlaster 5000",
        "equipmentType": "Leaf Blower",
        "serialNumber": "456789123",
        "modelNumber": "L30X",
        "manufacturer": "Toro",
        "colour": "Yellow"
      },
      {
        "id": 5,
        "equipmentName": "SnowBuster Deluxe",
        "equipmentType": "Snow Blower",
        "serialNumber": "987654987",
        "modelNumber": "S08M",
        "manufacturer": "SnowMaster",
        "colour": "White"
      },
      {
        "id": 6,
        "equipmentName": "PressureWasher Pro",
        "equipmentType": "Pressure Washer",
        "serialNumber": "654321789",
        "modelNumber": "P15T",
        "manufacturer": "Pro-Power Canada",
        "colour": "Silver"
      },
      {
        "id": 7,
        "equipmentName": "ChainSaw Master",
        "equipmentType": "Chainsaw",
        "serialNumber": "789123456",
        "modelNumber": "C10R",
        "manufacturer": "Craftsman",
        "colour": "Black"
      },
      {
        "id": 8,
        "equipmentName": "TurfMaster 1500",
        "equipmentType": "Lawn Mower",
        "serialNumber": "876543210",
        "modelNumber": "TM15Z",
        "manufacturer": "Pro-Power Canada",
        "colour": "Red"
      },
      {
        "id": 9,
        "equipmentName": "LeafSweeper Pro",
        "equipmentType": "Leaf Blower",
        "serialNumber": "123789456",
        "modelNumber": "LS20Y",
        "manufacturer": "Toro",
        "colour": "Yellow"
      },
      {
        "id": 10,
        "equipmentName": "EdgeTrimmer X",
        "equipmentType": "Hedge Trimmer",
        "serialNumber": "789456123",
        "modelNumber": "ET10W",
        "manufacturer": "HedgeMaster",
        "colour": "Blue"
      },
      {
        "id": 11,
        "equipmentName": "ProSnow 3000",
        "equipmentType": "Snow Blower",
        "serialNumber": "321654987",
        "modelNumber": "PS30Q",
        "manufacturer": "SnowMaster",
        "colour": "White"
      },
      {
        "id": 12,
        "equipmentName": "PowerChain X",
        "equipmentType": "Chainsaw",
        "serialNumber": "456123789",
        "modelNumber": "PC12K",
        "manufacturer": "Craftsman",
        "colour": "Black"
      }
    ];
}