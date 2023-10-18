//Seed Data
const equipmentDatabase = [
    {
        "id": 1,
        "itemNumber": 332,
        "equipmentName": "GrassGlider Pro",
        "equipmentType": "Lawn Mower",
        "serialNumber": "20931890",
        "modelNumber": "A02B",
        "manufacturer": "Pro-Power Canada",
        "colour": "Red"
    },
    {
        "id": 2,
        "itemNumber": 456,
        "equipmentName": "LawnMaster 2000",
        "equipmentType": "Lawn Mower",
        "serialNumber": "987654321",
        "modelNumber": "B05C",
        "manufacturer": "Troy-Bilt",
        "colour": "Green"
    },
    {
        "id": 3,
        "itemNumber": 789,
        "equipmentName": "PowerHedge 300",
        "equipmentType": "Hedge Trimmer",
        "serialNumber": "123456789",
        "modelNumber": "H12D",
        "manufacturer": "HedgeMaster",
        "colour": "Blue"
    },
    {
        "id": 4,
        "itemNumber": 567,
        "equipmentName": "LeafBlaster 5000",
        "equipmentType": "Leaf Blower",
        "serialNumber": "456789123",
        "modelNumber": "L30X",
        "manufacturer": "Toro",
        "colour": "Yellow"
    },
    {
        "id": 5,
        "itemNumber": 123,
        "equipmentName": "SnowBuster Deluxe",
        "equipmentType": "Snow Blower",
        "serialNumber": "987654987",
        "modelNumber": "S08M",
        "manufacturer": "SnowMaster",
        "colour": "White"
    },
    {
        "id": 6,
        "itemNumber": 234,
        "equipmentName": "PressureWasher Pro",
        "equipmentType": "Pressure Washer",
        "serialNumber": "654321789",
        "modelNumber": "P15T",
        "manufacturer": "Pro-Power Canada",
        "colour": "Silver"
    },
    {
        "id": 7,
        "itemNumber": 890,
        "equipmentName": "ChainSaw Master",
        "equipmentType": "Chainsaw",
        "serialNumber": "789123456",
        "modelNumber": "C10R",
        "manufacturer": "Craftsman",
        "colour": "Black"
    }
];

// Equipment Search Code.
if (window.location.href.includes("equipment-search.html")){

    document.getElementById("search-btn").addEventListener("click", function(e){ 
        e.preventDefault();
        let searchDiv = document.getElementById("search-grid");
        searchDiv.innerHTML = "";
        let equipSearch = document.getElementById("search-value").value.toLowerCase();
        let results = [];

        
        equipmentDatabase.forEach(equipment => {
            if (equipment.equipmentName.toLowerCase().includes(equipSearch) ||
                equipment.manufacturer.toLowerCase().includes(equipSearch) ||
                equipment.serialNumber.toLowerCase().includes(equipSearch) ||
                equipment.modelNumber.toLowerCase().includes(equipSearch)){

                results.push(equipment);

            }
        });

        results.sort



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
                        <p id="searchItemNumber" class="email">Colour: ${equipment.colour}</p>
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
}


//Equipment Details Code
if (window.location.href.includes("equipment-details.html")){
    document.addEventListener("DOMContentLoaded", function() {

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

    });
}

//Equipment Update Code
if (window.location.href.includes("equipment-update.html")){
    const urlParam = new URLSearchParams(window.location.search);
    const equipmentId = urlParam.getAll("id");

    if (equipmentId.length > 0) {
        document.getElementById("back-to-equipment").href = `../pages/equipment-details.html?id=${equipmentId}`
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
}