//import { fetchData } from './functions.js';

//gets equipment seed data
const customerDatabase = getCustomerData();
const equipmentDatabase = getEquipmentData();
const ownershipDatabase = getOwnershipData();
const urlParam = new URLSearchParams(window.location.search);
//gets equipment id and customer id  from url parameters
const equipmentId = urlParam.getAll("eid");
const customerId = urlParam.getAll("cid");
const ownershipId = urlParam.getAll("oid");
const equipmentName = urlParam.getAll("equipment-name");
const equipmentType = urlParam.getAll("equipment-type")
const equipmentManufacturer = urlParam.getAll("manufacturer")
const equipmentColour = urlParam.getAll("colour")
const equipmentModelNumber = urlParam.getAll("model-number")
const serialNumber = urlParam.getAll("serial-number");

//only displays if equipment if equipment id was passed as parameter to this page
if (equipmentId.length > 0 && serialNumber.length == 0) {
    console.log("what");
    //gets equipment by id
    let equipment = equipmentDatabase.find(e => e.id == equipmentId);

    $("#back-to-search").show();
    //makes sure to pass customer id as a parameter in back to search button
    $("#back-to-search").attr("href", customerId > 0 ? `../pages/equipment-search.html?cid=${customerId}` : 
                                                        "../pages/equipment-search.html");

    //displays equipment details
    $("#equipment-name").html(equipment.equipmentName);
    $("#equipment-manufacturer").html(`Manufacturer: <b>${equipment.manufacturer}</b>`);
    $("#equipment-type").html(`Type: <b>${equipment.equipmentType}</b>`);
    $("#equipment-colour").html(`Colour: <b>${equipment.colour}</b>`);
    $("#equipment-model").html(`M/N: <b>${equipment.modelNumber}</b>`);

    //makes sure to pass equipment and customer ids as parameters in update button
    $("#update-equipment-btn").show();
    $("#update-equipment-btn").attr("href", customerId > 0 ? `../pages/equipment-update.html?eid=${equipment.id}&cid=${customerId}` :
                                                             `../pages/equipment-update.html?eid=${equipment.id}`);
    //changes button content to show select equipment if there is a customer id. means that user is adding an equipment to a customer
    $("#update-equipment-btn").html(customerId > 0 ? "Select Equipment" : "Update Equipment");

}else if(ownershipId.length > 0){
    
    let ownedEquipment = ownershipDatabase.find(o => o.id == ownershipId);

    let customer = customerDatabase.find(c => c.id == ownedEquipment.customerId);
    let equipment = equipmentDatabase.find(e => e.id == ownedEquipment.equipmentId);
    
    //displays equipment details
    $("#equipment-customer").html(`Equipment Owned By: <b>${customer.fullName}</b>`);
    $("#equipment-name").html(equipment.equipmentName);
    $("#equipment-manufacturer").html(`Manufacturer: <b>${equipment.manufacturer}</b>`);
    $("#equipment-type").html(`Type: <b>${equipment.equipmentType}</b>`);
    $("#equipment-colour").html(`Colour: <b>${equipment.colour}</b>`);
    $("#equipment-model").html(`M/N: <b>${equipment.modelNumber}</b>`);
    $("#equipment-serial").show();
    $("#equipment-serial").html(`S/N: <b>${ownedEquipment.serialNumber}</b>`);

    //$("#update-equipment-btn").html("Update Serial Number");
    $("#update-serial-btn").show();
    $("#update-serial-btn").attr("href", customerId.length > 0 ? `../pages/equipment-update.html?eid=${equipment.id}&oid=${ownershipId}&cid=${customerId}` : 
                                                                    `../pages/equipment-update.html?eid=${equipment.id}&oid=${ownershipId}`);
    let href = $("#update-serial-btn").attr("href");
    href = href + "&button-action=updateEquipment"
    $("#update-equipment-btn").attr("href", href);
    $("#update-equipment-btn").show();
    $("#update-equipment-btn").html("Update Equipment Model (Affects all Customers)");
    $("#update-update").attr

    $("#back-to-search").show();
    $("#go-to-customer").show();
    $("#go-to-customer").attr("href", `../pages/customer-details.html?cid=${customer.id}`);


}else if (serialNumber.length > 0 && equipmentName.length == 0){
    let customer = customerDatabase.find(c => c.id == customerId);
    let equipment = equipmentDatabase.find(e => e.id == equipmentId);

    $("#go-to-customer").show()
    $("#go-to-customer").attr("href", `../pages/customer-details.html?eid=${equipment.id}&cid=${customerId}&serial-number=${serialNumber}`);

    $("#equipment-customer").html(`Equipment Owned By: <b>${customer.fullName}</b>`);
    $("#equipment-name").html(equipment.equipmentName);
    $("#equipment-manufacturer").html(`Manufacturer: <b>${equipment.manufacturer}</b>`);
    $("#equipment-type").html(`Type: <b>${equipment.equipmentType}</b>`);
    $("#equipment-colour").html(`Colour: <b>${equipment.colour}</b>`);
    $("#equipment-model").html(`M/N: <b>${equipment.modelNumber}</b>`);
    $("#equipment-serial").show();
    $("#equipment-serial").html(`S/N: <b>${serialNumber}</b>`);

    $("#update-equipment-btn").html("Update Serial Number");
    $("#update-equipment-btn").attr("href", `../pages/equipment-update.html?eid=${equipment.id}&cid=${customerId}&serial-number=${serialNumber}`);
}else if (equipmentName.length > 0){

    $("#go-to-customer").show()
    $("#go-to-customer").attr("href",   `../pages/customer-details.html?equipment-name=${equipmentName}&manufacturer=${equipmentManufacturer}&equipment-type=${equipmentType}` + 
                                        `&colour=${equipmentColour}&model-number=${equipmentModelNumber}&serial-number=${serialNumber}&cid=${customerId}`);

    let customer = customerDatabase.find(c => c.id == customerId);
    
    $("#equipment-customer").html(`Equipment Owned By: <b>${customer.fullName}</b>`);
    $("#equipment-name").html(equipmentName);
    $("#equipment-manufacturer").html(`Manufacturer: <b>${equipmentManufacturer}</b>`);
    $("#equipment-type").html(`Type: <b>${equipmentType}</b>`);
    $("#equipment-colour").html(`Colour: <b>${equipmentColour}</b>`);
    $("#equipment-model").html(`M/N: <b>${equipmentModelNumber}</b>`);
    $("#equipment-serial").show();
    $("#equipment-serial").html(`S/N: <b>${serialNumber}</b>`);

    $("#update-equipment-btn").html("Update Serial Number");
    $("#update-equipment-btn").attr("href",     `../pages/equipment-update.html?equipment-name=${equipmentName}&manufacturer=${equipmentManufacturer}&equipment-type=${equipmentType}` + 
                                                `&colour=${equipmentColour}&model-number=${equipmentModelNumber}&serial-number=${serialNumber}&cid=${customerId}`);
}else {
    $("#equipment-details").html("<h2>No equipment details found.</h2>");
}


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