
const urlParams = new URLSearchParams(window.location.search);
const equipmentID = urlParams.get('id');

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

function populateEquipmentUpdate(equipmentID) {

    const equipmentUpdate = document.getElementById("equipment-update");

    const equipment = equipmentDatabase[equipmentID];
    if(equipmentID != null){
        document.getElementById("equipment-name").value = equipment.equipmentName
        document.getElementById("equipment-type").value = equipment.equipmentType
        document.getElementById("manufacturer").value = equipment.manufacturer
        document.getElementById("colour").value = equipment.colour
        document.getElementById("item-number").value = equipment.itemNumber
        document.getElementById("serial-number").value = equipment.serialNumber
        document.getElementById("model-number").value = equipment.modelNumber
    }
    else{
        equipmentUpdate.innerHTML = `
        <p>No equipment was selected for update.</p>
        <div style="margin-top: 50px;">
            <a href="../pages/equipment-search.html" class="button btn-cancel">
                Cancel
            </a>
        </div>`;
    }
}
populateEquipmentUpdate(equipmentID);