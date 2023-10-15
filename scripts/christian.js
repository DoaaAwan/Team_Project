
//Christian Equipment Search & Details

const urlParams = new URLSearchParams(window.location.search);
const equipmentIDs = urlParams.get('ids');

const equipmentDatabase = {
    1: {
        equipmentId: 1,
        price: "$1000.00",
        itemNumber: 332,
        equipmentName: "GrassGlider Pro",
        equipmentType: "Lawn Mower",
        serialNumber: "20931890",
        modelNumber: "A02B",
        manufacturer: "Pro-Power Canada",
        colour: "Red"
    },
    2: {
        equipmentId: 2,
        price: "$800.00",
        itemNumber: 456,
        equipmentName: "LawnMaster 2000",
        equipmentType: "Lawn Mower",
        serialNumber: "987654321",
        modelNumber: "B05C",
        manufacturer: "Troy-Bilt",
        colour: "Green",
    },
};

function searchEquipment() {
    const searchId = document.getElementById("searchId").value;
    const searchItemNumber = document.getElementById("searchItemNumber").value;
    const searchSerialNumber = document.getElementById("searchSerialNumber").value;
    const searchModelNumber = document.getElementById("searchModelNumber").value;
    const searchManufacturer = document.getElementById("searchManufacturer").value;

    const results = [];

    for (const equipmentId in equipmentDatabase) {
        const equipment = equipmentDatabase[equipmentId];
        if (
            (searchId === "" || equipmentId == searchId) &&
            (searchItemNumber === "" || equipment.itemNumber == searchItemNumber) &&
            (searchSerialNumber === "" || equipment.serialNumber.includes(searchSerialNumber)) &&
            (searchModelNumber === "" || equipment.modelNumber.includes(searchModelNumber)) &&
            (searchManufacturer === "" || equipment.manufacturer.toLowerCase().includes(searchManufacturer.toLowerCase()))
        ) {
            results.push(equipmentId); // Store the equipment IDs in the results
        }
    }

    if (results.length > 0) {
        window.location.href = `equipment-details.html?ids=${results.join(',')}`;
    } else {
        alert("No equipment found for the entered criteria.");
    }
}

function populateEquipmentDetails(equipmentIDArray) {
    const equipmentDetails = document.getElementById("equipment-details");
    

    if (equipmentIDArray.length > 0) {
        equipmentIDArray.forEach(equipmentId => {
            const equipment = equipmentDatabase[equipmentId];

            if (equipment) {
                // Create elements to display equipment details
                const equipmentDiv = document.createElement("div");
                equipmentDiv.innerHTML = `
                    <h3>Equipment ID: ${equipment.equipmentId}</h3>
                    <p>Price: ${equipment.price}</p>
                    <p>Equipment Name: ${equipment.equipmentName}</p>
                    <p>Equipment Type: ${equipment.equipmentType}</p>
                    <p>Item Number: ${equipment.itemNumber}</p>
                    <p>Serial Number: ${equipment.serialNumber}</p>
                    <p>Model Number: ${equipment.modelNumber}</p>
                    <p>Manufacturer: ${equipment.manufacturer}</p>
                    <p>Colour: ${equipment.colour}</p>
                    <a href="../pages/equipment-update.html?id=${equipment.equipmentId}" class="btn btn-primary">Update</a>
                    <hr>
                `;

                equipmentDetails.appendChild(equipmentDiv);
            }
        });
    } else {
        equipmentDetails.innerHTML = "<p>No equipment details available.</p>";
    }
}

if (equipmentIDs) {
    const equipmentIDArray = equipmentIDs.split(',');

    populateEquipmentDetails(equipmentIDArray);
} else {
    console.log('No equipment IDs found in the URL.');
}//error passed console if generally the event listener function isnt being executed before the page loads. The scripts to load these details must load before 
//the page is loaded to the user to avoid the error
