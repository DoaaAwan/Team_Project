//Michael Equipment Search & Details

const equipmentDatabase = {
    1: {
        equipmentId: 1,
        equipmentType: "Mower",
        itemNumber: 332,
        equipmentName: "JohnDeere Electric Mower",
        serialNumber: "20931890",
        modelNumber: "A02B",
        manufacturer: "Pro-Power Canada",
        colour: "Red"
    },
    2: {
        equipmentId: 2,
        equipmentType: "Mower",
        itemNumber: 456,
        equipmentName: "Lawn Mower",
        serialNumber: "987654321",
        modelNumber: "B05C",
        manufacturer: "Troy-Bilt",
        colour: "Green",
    },
}//can add more equipment as needed, just for display/functionality display purposes, and for debugging.

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

//DOMcontentloaded ensures html and associated scripts have loaded. 

document.addEventListener("DOMContentLoaded", function() {

    function populateEquipmentDetails() {
        console.log("populateEquipmentDetails function called");

        const urlParams = new URLSearchParams(window.location.search);
        const equipmentIds = urlParams.getAll("ids");

        if (equipmentIds.length > 0) {
            const equipmentDetailsContainer = document.querySelector(".equipment-details");

            equipmentIds.forEach(equipmentId => {
                const equipment = equipmentDatabase[equipmentId];
                const equipmentDetails = document.createElement("div");
                equipmentDetails.innerHTML = `
                    <h3>Equipment ID: ${equipment.equipmentId}</h3>
                    <p>Equipment Type: ${equipment.equipmentType}</p>
                    <p>Equipment Name: ${equipment.equipmentName}</p>
                    <p>Item Number: ${equipment.itemNumber}</p>
                    <p>Serial Number: ${equipment.serialNumber}</p>
                    <p>Model Number: ${equipment.modelNumber}</p>
                    <p>Manufacturer: ${equipment.manufacturer}</p>
                    <p>Colour: ${equipment.colour}</p>
                `;
                equipmentDetailsContainer.appendChild(equipmentDetails);
            });
        } else {
            const equipmentDetailsContainer = document.querySelector(".equipment-details");
            equipmentDetailsContainer.innerHTML = "<p>No equipment details found.</p>";
        }
    }

    populateEquipmentDetails();
});



