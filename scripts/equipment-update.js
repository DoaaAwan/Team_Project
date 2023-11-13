//import { fetchData } from './functions.js';

//gets equipment seed data and gets equipment id
const equipmentDatabase = getEquipmentData();
const ownershipDatabase = getOwnershipData();

const urlParam = new URLSearchParams(window.location.search);
const equipmentId = urlParam.getAll("eid");
const customerId = urlParam.getAll("cid");
const ownershipId = urlParam.getAll("oid");
const equipmentName = urlParam.getAll("equipment-name");
const equipmentType = urlParam.getAll("equipment-type")
const equipmentManufacturer = urlParam.getAll("manufacturer")
const equipmentColour = urlParam.getAll("colour")
const equipmentModelNumber = urlParam.getAll("model-number")
const serialNumber = urlParam.getAll("serial-number");
const buttonAction = urlParam.getAll("button-action")

//checks if theres an equipment id
if ((equipmentId.length > 0 && ownershipId.length == 0 && customerId.length == 0) || buttonAction == "updateEquipment") {
    //sets up link for buttons with equipment id
    document.getElementById("back-to-equipment").href = ownershipId > 0 ?   `../pages/equipment-details.html?oid=${ownershipId}` : 
                                                                            `../pages/equipment-details.html?eid=${equipmentId}`;
    document.getElementById("cancel-to-details").href = ownershipId > 0 ?   `../pages/equipment-details.html?oid=${ownershipId}` : 
                                                                            `../pages/equipment-details.html?eid=${equipmentId}`;

    //gets equipment and displays all data in input fields
    let equipment = equipmentDatabase.find(e => e.id == equipmentId);
    document.getElementById("equipment-name").value = equipment.equipmentName;
    document.getElementById("manufacturer").value = equipment.manufacturer;
    document.getElementById("equipment-type").value = equipment.equipmentType;
    document.getElementById("colour").value = equipment.colour;
    document.getElementById("model-number").value = equipment.modelNumber;

    $("#serial-number-container").html("");
    document.getElementById("cid-container").innerHTML = "";
    document.getElementById("eid-container").innerHTML = "";
}else if((ownershipId.length > 0 || customerId.length > 0) && equipmentName.length == 0){


    //$("#serial-number-container").show();
    //$("#serial-number").focus()

    //gets equipment and displays all data in input fields
    let equipment = equipmentDatabase.find(e => e.id == equipmentId);
    let ownedEquipment = ownershipDatabase.find(o => o.id == ownershipId);

    document.getElementById("equipment-name").value = equipment.equipmentName;
    document.getElementById("manufacturer").value = equipment.manufacturer;
    document.getElementById("equipment-type").value = equipment.equipmentType;
    document.getElementById("colour").value = equipment.colour;
    document.getElementById("model-number").value = equipment.modelNumber;
    
    /*
    $("#equipment-name").prop("disabled", true);
    $("#manufacturer").prop("disabled", true);
    $("#equipment-type").prop("disabled", true);
    $("#colour").prop("disabled", true);
    $("#model-number").prop("disabled", true);
    */

    if (ownershipId.length == 0){

        if (serialNumber.length > 0){
            document.getElementById("serial-number").value = serialNumber;
        }

        document.getElementById("back-to-equipment").href = serialNumber.length > 0 ?   `../pages/equipment-details.html?eid=${equipmentId}&cid=${customerId}&serial-number=${serialNumber}` : 
                                                                                        `../pages/equipment-details.html?eid=${equipmentId}&cid=${customerId}`;
        document.getElementById("cancel-to-details").href = serialNumber.length > 0 ?   `../pages/equipment-details.html?eid=${equipmentId}&cid=${customerId}&serial-number=${serialNumber}` : 
                                                                                        `../pages/equipment-details.html?eid=${equipmentId}&cid=${customerId}`;
        $("#update-equipment-heading").html(serialNumber.length > 0 ? "Update Equipment Serial Number" : "Insert Equipment Serial Number");


        document.getElementById("equipment-form").method = "get";
        document.getElementById("equipment-form").action = `../pages/customer-details.html`;

        document.getElementById("cidvalue").value = customerId;
        document.getElementById("cidvalue").innerHTML = customerId;
        document.getElementById("eidvalue").value = equipmentId;
        document.getElementById("eidvalue").innerHTML = equipmentId;
    }else{
        document.getElementById("back-to-equipment").href = customerId.length > 0 ? `../pages/customer-details.html?oid=${ownershipId}&cid=${customerId}` : `../pages/equipment-details.html?oid=${ownershipId}`;
        document.getElementById("cancel-to-details").href = customerId.length > 0 ? `../pages/customer-details.html?oid=${ownershipId}&cid=${customerId}` : `../pages/equipment-details.html?oid=${ownershipId}`;
        
        //$("#update-equipment-heading").html("Update Equipment Serial Number")
        document.getElementById("serial-number").value = ownedEquipment.serialNumber;
    }
}else if(equipmentName.length > 0){

    $("#serial-number-container").show();
    document.getElementById("serial-number").value = serialNumber;
    $("#serial-number").focus()

    document.getElementById("back-to-equipment").href = `../pages/customer-details.html?equipment-name=${equipmentName}&manufacturer=${equipmentManufacturer}&equipment-type=${equipmentType}` + 
                                                        `&colour=${equipmentColour}&model-number=${equipmentModelNumber}&serial-number=${serialNumber}&cid=${customerId}`;
    document.getElementById("cancel-to-details").href = `../pages/customer-details.html?equipment-name=${equipmentName}&manufacturer=${equipmentManufacturer}&equipment-type=${equipmentType}` + 
                                                        `&colour=${equipmentColour}&model-number=${equipmentModelNumber}&serial-number=${serialNumber}&cid=${customerId}`;
    //$("#update-equipment-heading").html("Update Equipment Serial Number");

    document.getElementById("equipment-name").value = equipmentName;
    //$("#equipment-name").prop("disabled", false);
    document.getElementById("manufacturer").value = equipmentManufacturer;
    //$("#manufacturer").prop("disabled", false);
    document.getElementById("equipment-type").value = equipmentType;
    //$("#equipment-type").prop("disabled", false);
    document.getElementById("colour").value = equipmentColour;
    //$("#colour").prop("disabled", false);
    document.getElementById("model-number").value = equipmentModelNumber;
    //$("#model-number").prop("disabled", false);

    document.getElementById("equipment-form").method = "get";
    document.getElementById("equipment-form").action = `../pages/customer-details.html`;

    document.getElementById("cidvalue").value = customerId;
    document.getElementById("cidvalue").innerHTML = customerId;
    $("#eid").prop("disabled", true);
}else{
    window.alert("No equipment selected for update.");
    window.location.href = "../pages/equipment-search.html";
}

document.getElementById('equipment-form').addEventListener('submit', function() {
    $("#equipment-name").prop("disabled", false);
    $("#manufacturer").prop("disabled", false);
    $("#equipment-type").prop("disabled", false);
    $("#colour").prop("disabled", false);
    $("#model-number").prop("disabled", false);
});


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