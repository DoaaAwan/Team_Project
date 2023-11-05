//import { fetchData } from './functions.js';

//gets all seed data
const customerDatabase = getCustomerData();
const equipmentDatabase = getEquipmentData();
const ownershipDatabase = getOwnershipData();
const repairRequestDatabase = getRepairRequestData();

//gets all parameters
const urlParam = new URLSearchParams(window.location.search);
//const newequipmentName = urlParam.getAll("equipment-name");
const repairRequestId = urlParam.getAll("rrid");
//const customerId = urlParam.getAll("cid");
const equipmentId = urlParam.getAll("eid");

if (repairRequestId.length > 0) {

    //gets the repair request, and the equipment and customer its for
    let repairRequest = repairRequestDatabase.find(r => r.id == repairRequestId);
    let ownership = ownershipDatabase.find(o => o.id == repairRequest.ownershipId);
    let customer = customerDatabase.find(c => c.id == ownership.customerId);
    let equipment = equipmentDatabase.find(e => e.id == ownership.equipmentId);

    //passes ids in as parameters in url
    $("#back-to-customer").attr("href", equipmentId > 0 ? `../pages/customer-details.html?cid=${customer.id}&eid=${equipmentId}` : 
                                                            `../pages/customer-details.html?cid=${customer.id}`)

    //displays repair request details for user
    $("#repair-request-info").html(`Repair Request for a ${equipment.equipmentName}`);

    $("#repair-customer").html(`Customer: <b>${customer.firstName} ${customer.lastName}</b>`)
    $("#repair-date").html(`Invoice Date: <b>${repairRequest.invoiceDate}</b>`);
    $("#repair-number").html(`Invoice Number: <b>${repairRequest.invoiceNumber}</b>`);
    $("#repair-issue").html(`Issue Description: <b>${repairRequest.issueDescription}</b>`);
    $("#repair-warranty").html(`Valid Warranty?: <b>${repairRequest.hasWarranty == true ? "Yes" : "No"}</b>`);
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

function getRepairRequestData(){
    return [
        {
          "id": 1,
          "invoiceDate": "2023-10-08",
          "invoiceNumber": 1234566,
          "issueDescription": "Engine won't start.",
          "hasWarranty": true,
          "ownershipId": 1
        },
        {
          "id": 2,
          "invoiceDate": "2023-10-26",
          "invoiceNumber": 1234567,
          "issueDescription": "Blades need sharpening",
          "hasWarranty": true,
          "ownershipId": 1
        },
        {
          "id": 3,
          "invoiceDate": "2023-07-14",
          "invoiceNumber": 1234568,
          "issueDescription": "Battery replacement needed",
          "hasWarranty": false,
          "ownershipId": 2
        },
        {
          "id": 4,
          "invoiceDate": "2023-06-10",
          "invoiceNumber": 1234569,
          "issueDescription": "Drive belt snapped",
          "hasWarranty": true,
          "ownershipId": 3
        },
        {
          "id": 5,
          "invoiceDate": "2023-05-22",
          "invoiceNumber": 1234570,
          "issueDescription": "Engine won't start",
          "hasWarranty": false,
          "ownershipId": 4
        },
        {
          "id": 6,
          "invoiceDate": "2023-04-18",
          "invoiceNumber": 1234571,
          "issueDescription": "Spark plug malfunction",
          "hasWarranty": true,
          "ownershipId": 5
        },
        {
          "id": 7,
          "invoiceDate": "2023-03-15",
          "invoiceNumber": 1234572,
          "issueDescription": "Chain needs tightening",
          "hasWarranty": false,
          "ownershipId": 6
        },
        {
          "id": 8,
          "invoiceDate": "2023-02-10",
          "invoiceNumber": 1234573,
          "issueDescription": "Hose connector leak",
          "hasWarranty": true,
          "ownershipId": 7
        },
        {
          "id": 9,
          "invoiceDate": "2023-01-05",
          "invoiceNumber": 1234574,
          "issueDescription": "Blades not spinning",
          "hasWarranty": false,
          "ownershipId": 8
        },
        {
          "id": 10,
          "invoiceDate": "2023-08-20",
          "invoiceNumber": 1234575,
          "issueDescription": "Fan malfunction",
          "hasWarranty": true,
          "ownershipId": 9
        },
        {
          "id": 11,
          "invoiceDate": "2023-09-25",
          "invoiceNumber": 1234576,
          "issueDescription": "Fuel line clog",
          "hasWarranty": false,
          "ownershipId": 10
        },
        {
          "id": 12,
          "invoiceDate": "2023-10-01",
          "invoiceNumber": 1234577,
          "issueDescription": "Auger not turning",
          "hasWarranty": true,
          "ownershipId": 11
        },
        {
          "id": 13,
          "invoiceDate": "2023-10-08",
          "invoiceNumber": 1234578,
          "issueDescription": "Chain came off",
          "hasWarranty": false,
          "ownershipId": 12
        },
        {
          "id": 14,
          "invoiceDate": "2023-10-15",
          "invoiceNumber": 1234579,
          "issueDescription": "Handle broken",
          "hasWarranty": true,
          "ownershipId": 13
        },
        {
          "id": 15,
          "invoiceDate": "2023-10-22",
          "invoiceNumber": 1234580,
          "issueDescription": "Blades need sharpening",
          "hasWarranty": false,
          "ownershipId": 14
        },
        {
          "id": 16,
          "invoiceDate": "2023-10-29",
          "invoiceNumber": 1234581,
          "issueDescription": "Oil leak",
          "hasWarranty": true,
          "ownershipId": 15
        }
      ];
}