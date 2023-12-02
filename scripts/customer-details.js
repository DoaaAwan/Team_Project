//import { fetchData } from './functions.js';

// fetching seed data
const customerDatabase = getCustomerData();
const equipmentDatabase = getEquipmentData();
const ownershipDatabase = getOwnershipData();
const repairRequestDatabase = getRepairRequestData();

// retrieves all url parameters to display the right customer and equipments from previous page.
const urlParam = new URLSearchParams(window.location.search);
const newEquipmentName = urlParam.getAll("equipment-name");
const newEquipmentType = urlParam.getAll("equipment-type")
const newEquipmentManufacturer = urlParam.getAll("manufacturer")
const newEquipmentColour = urlParam.getAll("colour")
const newEquipmentModelNumber = urlParam.getAll("model-number")
const serialNumber = urlParam.getAll("serial-number");
const customerId = urlParam.getAll("cid");
const equipmentId = urlParam.getAll("eid");

// only runs block if there was a customer passed
if (customerId.length > 0) {
    
    //retrieves customer and displays details
    let customer = customerDatabase.find(c => c.id == customerId);

    $("#customer-name").html(`<b>${customer.firstName} ${customer.lastName}</b>`);
    $("#customer-name").show();
    $("#customer-name-equip").html(`${customer.firstName}'s Equipment`);
    $("#customer-name-equip").show();

    $("#customer-email").html(`${customer.email}`);
    $("#customer-phone").html(`${customer.phone}`);
    $("#customer-street").html(`${customer.street}`);
    $("#customer-city").html(`${customer.city}`);
    $("#customer-province").html(`${customer.province}`);
    $("#customer-postal").html(`${customer.postalCode}`);

    //gives buttons a url with customer id as parameter.
    $("#add-equipment-btn").attr("href", `../pages/equipment-create.html?cid=${customerId}`);
    $("#update-customer-btn").attr("href", `../pages/customer-update.html?cid=${customerId}`);
    

    //retrieves owned equipment data
    let ownership = ownershipDatabase.filter(o => o.customerId == customerId)
    let customerEquipments = []

    ownership.forEach(o => {
        let equipment = equipmentDatabase.find(e => e.id == o.equipmentId);
        customerEquipments.push(equipment);
    })

    //gets select element from html page
    let equipmentList = document.getElementById("equipment-list");
    let repairRequestList = document.getElementById("repair-requests-list");

    // displays equipment customer owns from seed data
    if (ownership.length > 0){
        ownership.forEach(o => {
            let equipment = equipmentDatabase.find(e => e.id == o.equipmentId);
            var option = document.createElement('option');
            option.value = o.equipmentId;
            option.text = `(M/N: ${equipment.modelNumber})${equipment.equipmentName} - ${equipment.equipmentType}`;
            equipmentList.add(option);
        });
    }

    //displays equipment owned that was passed as a parameter from the adding equipment process
    if (equipmentId.length > 0){
        let newEquipment = equipmentDatabase.find(e => e.id == equipmentId);
        /*let newOwnedEquipment = ownershipDatabase.find(o => {
            return (o.equipmentId == equipmentId && o.customerId == customerId);
        });*/
        var option = document.createElement('option')
        option.value = newEquipment.id;
        option.text = `(M/N: ${newEquipment.modelNumber})${newEquipment.equipmentName} - ${newEquipment.equipmentType}`;
        equipmentList.add(option);
    }else if(newEquipmentName.length > 0){
        var option = document.createElement('option')
        option.value = 0;
        option.text = `(M/N: ${newEquipmentModelNumber})${newEquipmentName} - ${newEquipmentType}`;
        equipmentList.add(option);
    }

    //user feedback for if theres nothing in equipment list
    if (equipmentList.options.length == 0){
        $("#no-repair-requests").html("Customer has no equipment.<br>Want to add an equipment?");
    }

    //event handler for selecting an option in owned equipment list
    document.getElementById("equipment-list").addEventListener("change", function() {
        //hides user feedback message and empties repair list
        $("#repair-requests-list").empty();
        $("#no-repair-requests").hide();
        //$('#details-repair-request').prop('disabled', true);
        //$("#details-repair-request").hide();

        //"disables" repair details button
        $("#details-repair-request").css("background-color", "grey");

        //gets selected equipment id
        const selectedEquipment = equipmentList.options[equipmentList.selectedIndex].value;

        //id of 0 reserved for new equipment created scenario. passes new equipment data instead of an id.
        $("#create-repair-request").attr("href", selectedEquipment != 0 ? `../pages/repair-request-create.html?cid=${customerId}eid=${selectedEquipment}` : 
                                                                            `../pages/repair-request-create.html?cid=${customerId}equipment-name=${newEquipmentName}`);

        let repairRequests = [];
        //gets ownership record for selected equipment
        let ownership = ownershipDatabase.find(o => o.customerId == customerId && o.equipmentId == selectedEquipment)

        $("#details-equipment-btn").css("background-color", "#236477"); //gives a look that the button is active by changing back to the site button color
        $('#details-equipment-btn').prop('disabled', false);

        if(selectedEquipment != 0){
          let equipment = equipmentDatabase.find(e => e.id == selectedEquipment);

          $("#equipment-name").html(`<b>${equipment.equipmentName}</b>`);
          $("#equipment-manufacturer").html(`<b>${equipment.manufacturer}</b>`);
          $("#equipment-type").html(`<b>${equipment.equipmentType}</b>`);
          $("#equipment-colour").html(`<b>${equipment.colour}</b>`);
          $("#equipment-model").html(`<b>${equipment.modelNumber}</b>`);
          $("#equipment-serial").html(`<b>${equipment.serialNumber}</b>`);
  
          $("#update-equipment-btn").attr("href", `../pages/equipment-update.html?cid=${customerId}&oid=${ownership.id}&eid=${equipment.id}`);
        }
        else if(selectedEquipment == 0){
          $("#equipment-name").html(`<b>${newEquipmentName}</b>`);
          $("#equipment-manufacturer").html(`<b>${newEquipmentManufacturer}</b>`);
          $("#equipment-type").html(`<b>${newEquipmentType}</b>`);
          $("#equipment-colour").html(`<b>${newEquipmentColour}</b>`);
          $("#equipment-model").html(`<b>${newEquipmentModelNumber}</b>`);
          $("#equipment-serial").html(`<b>${serialNumber}</b>`);

          document.getElementById("update-equipment-btn").href = `../pages/equipment-update.html?equipment-name=${newEquipmentName}&manufacturer=${newEquipmentManufacturer}&equipment-type=${newEquipmentType}` + 
                                                        `&colour=${newEquipmentColour}&model-number=${newEquipmentModelNumber}&serial-number=${serialNumber}&cid=${customerId}`;
        }

        if (ownership != undefined){
            //$("#details-equipment-btn").attr("href", `../pages/equipment-details.html?oid=${ownership.id}&cid=${customerId}`)
            //if record exists, gets all repair records for selected equipment
            repairRequests = repairRequestDatabase.filter(r => r.ownershipId == ownership.id);
        }else if(selectedEquipment != 0){
            //$("#details-equipment-btn").attr("href", `../pages/equipment-details.html?eid=${selectedEquipment}&cid=${customerId}&serial-number=${serialNumber}`)
        }else{
            //$("#details-equipment-btn").attr("href",    `../pages/equipment-details.html?equipment-name=${newEquipmentName}&manufacturer=${newEquipmentManufacturer}&equipment-type=${newEquipmentType}` + 
            //                                            `&colour=${newEquipmentColour}&model-number=${newEquipmentModelNumber}&serial-number=${serialNumber}&cid=${customerId}`)
        }

        if (repairRequests.length > 0){
            //if repair request records exist, shows list and displays all records in list
            /*repairRequests.forEach(r => {
                var option = document.createElement('option')
                option.value = r.id;
                option.text = `${r.invoiceDate}#${r.invoiceNumber}: ${r.issueDescription}`;
                repairRequestList.add(option);
            });
            */
        }else{
            //if no records exist, ask user if they want to create a repair record for the selected equipment
            /*
            //var confirmCancel = window.confirm("No Repair Requests for the selected equipment. Would you like to create one?");

            if (confirmCancel) {
                window.location.href = document.getElementById("create-repair-request").href;
            }
            */
            var option = document.createElement('option')
            option.value = "";
            //option.text = `No Repair Requests. Click the button below to create one.`;
            repairRequestList.add(option);
            $("#repair-requests").fadeIn();
            //$("#no-repair-requests").html("No Repair Requests for the selected equipment. Would you like to create one?");
        }
        
    });
    

    //event handler for if a repair record was selected from the list
    document.getElementById("repair-requests-list").addEventListener("change", function() {
        //$("#details-repair-request").show();
        //gets selected id for repair record and "activates" the button by adding the url with parameter to button
        const selectedRepairRequest = repairRequestList.options[repairRequestList.selectedIndex].value;
        if (selectedRepairRequest != ""){
        $("#details-repair-request").css("background-color", "#236477"); //gives a look that the button is active by changing back to the site button color
        //$("#details-repair-request").attr("href", equipmentId > 0 ? `../pages/repair-request-details.html?rrid=${selectedRepairRequest}&eid=${equipmentId}` : 
        //                                                            `../pages/repair-request-details.html?rrid=${selectedRepairRequest}`);
        $('#details-repair-request').prop('disabled', false);
        }

        let repairRequest = repairRequestDatabase.find(r => r.id == selectedRepairRequest);

        $("#invoice-date").html(`<b>${repairRequest.invoiceDate}</b>`);
        $("#invoice-number").html(`<b>${repairRequest.invoiceNumber}</b>`);
        $("#issue-description").html(`<b>${repairRequest.issueDescription}</b>`);
        $("#valid-warranty").html(`<b>${repairRequest.hasWarranty == true ? "Yes" : "No"}</b>`);
    });

} else {
    //if no customer id passed as parameter, page is blank with user message
    $(`#customer-details`).html("<h2>No customer details found.</h2>");
}

// I found removing any of the jquery broke the page, so I opted to keep it, but just removed its functionality in the site where needed, which was only a few spots. 
document.addEventListener('DOMContentLoaded', function() {
  const activeRepairsBtn = document.getElementById('active-repairs-btn');
  const completedRepairsBtn = document.getElementById('completed-repairs-btn');
  const repairsList = document.getElementById('repair-requests-list');
  const urlParams = new URLSearchParams(window.location.search);
  const customerId = urlParams.get('cid');

  activeRepairsBtn.addEventListener('click', function() {
      populateRepairsList('active');
  });

  completedRepairsBtn.addEventListener('click', function() {
      populateRepairsList('completed');
  });

  function populateRepairsList(type) {
      repairsList.innerHTML = '';
      let repairsData = type === 'active' ? getActiveRepairs() : getCompletedRepairs();
      console.log(repairsData);

      let filteredRepairs = repairsData.filter(repair => repair.id == customerId);
      console.log("Filtered Repairs:", filteredRepairs);
      if (filteredRepairs.length === 0) {
          repairsList.appendChild(new Option("No repair requests found", ""));
      }

      filteredRepairs.forEach(repair => {
          let optionText = `${repair.equipmentModel} - ${repair.equipmentType} - ${repair.issue} - ${repair.orderDate}`;
          let option = new Option(optionText, repair.id);
          repairsList.appendChild(option);
      });
  }

  function getActiveRepairs() {
    return [
      {
        id: 1,
        name: "John Doe",
        orderDate: "2023-10-08",
        city: "St.Catharines",
        equipmentType: "Lawn Mower",
        equipmentModel: "GlassGlider Pro",
        issue: "Engine won't start"
      },
      {
        id: 2,
        name: "Jane Smith",
        orderDate: "2023-06-10",
        city: "Hamilton",//doubt we need city here, just included it anyways, wont be displayed in select list
        equipmentType: "Lawn Mower",
        equipmentModel: "LeafBlaster 5000",
        issue: "Drive belt snapped"
      },
      {
        id: 3,
        name: "Emily Johnson",
        orderDate: "2023-04-18",
        city: "Mississauga",
        equipmentType: "Snow Blower",
        equipmentModel: "SnowBuster Deluxe",
        issue: "Spark plug malfunction"
      },
      {
        id: 4,
        name: "William Brown",
        orderDate: "2023-02-10",
        city: "Toronto",
        equipmentType: "Pressure Washer",
        equipmentModel: "PressureWasher Pro",
        issue: "Hose connector leak"
      },
      {
        id: 5,
        name: "Olivia White",
        orderDate: "2023--09-25",
        city: "Brampton",
        equipmentType: "Snow Blower",
        equipmentModel: "ProSnow 3000",
        issue: "Fan malfunction"
      },
      {
        id: 6,
        name: "Michael Wilson",
        orderDate: "2023-10-08",
        city: "Waterloo",
        equipmentType: "Chainsaw",
        equipmentModel: "PowerChain x",
        issue: "Chain came off"
      },
      {
        id: 7,
        name: "Sophia Taylor",
        orderDate: "2023-10-12",
        city: "London",
        equipmentType: "Hedge Trimmer",
        equipmentModel: "PowerHedge 300",
        issue: "Blades need sharpening"
      },
      {
        id: 8,
        name: "James Thomas",
        orderDate: "2023-10-29",
        city: "Oshawa",
        equipmentType: "Snow Blower",
        equipmentModel: "SnowBuster Deluxe",
        issue: "Oil leak"
      }
    ];
  }

  function getCompletedRepairs() {
    return [
      {
        id: 1,
        name: "John Doe",
        orderDate: "2023-07-14",
        city: "St.Catharines",
        equipmentType: "Lawn Mower",
        equipmentModel: "GlassGlider Pro",
        issue: "Battery replacement needed"
      },
      {
        id: 2,
        name: "Jane Smith",
        orderDate: "2023-05-22",
        city: "Hamilton, ON",
        equipmentType: "Lawn Mower",
        equipmentModel: "LeafBlaster 5000",
        issue: "Engine won't start"
      },
      {
        id: 3,
        name: "Emily Johnson",
        orderDate: "2023-03-15",
        city: "Mississauga",
        equipmentType: "Chainsaw",
        equipmentModel: "ChainSaw Master",
        issue: "Chain needs tightening"
      },
      {
        id: 4,
        name: "William Brown",
        orderDate: "2023-01-05",
        city: "Toronto",
        equipmentType: "Lawn Mower",
        equipmentModel: "Turfmaster 1500",
        issue: "Blades not spinning"
      },
      {
        id: 5,
        name: "Olivia White",
        orderDate: "2023-08-20",
        city: "Brampton",
        equipmentType: "Leaf Blower",
        equipmentModel: "LeafSweeper Pro",
        issue: "Fan malfunction"
      },
      {
        id: 6,
        name: "Michael Wilson",
        orderDate: "2023-10-01",
        city: "Waterloo",
        equipmentType: "Hedge Trimmer",
        equipmentModel: "Edge Trimmer",
        issue: "Auger not turning"
      },
      {
        id: 7,
        name: "Sophia Taylor",
        orderDate: "2023-10-15",
        city: "London",
        equipmentType: "Lawn Mower",
        equipmentModel: "GlassGlider Pro",
        issue: "Handle broken"
      },
      
    ];
  }


});



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
      },
      {
        "id": 11,
        "firstName": "John",
        "lastName": "Smith",
        "email": "jSmith@gmail.com",
        "phone": "(905) 377-7654",
        "street": "789 Oak Lane",
        "city": "Waterloo",
        "province": "Ontario",
        "postalCode": "L3M 6N1",
        "fullName" : "John Smith"
      }
      ,
      {
        "id": 12,
        "firstName": "Kaylee",
        "lastName": "Johnson",
        "email": "johnsonKay@gmail.com",
        "phone": "(905) 367-3345",
        "street": "180 Russel Lane",
        "city": "Niagara Falls",
        "province": "Ontario",
        "postalCode": "L5Q 6F1",
        "fullName" : "Kaylee Johnson"
      },
      {
        "id": 13,
        "firstName": "Andrew",
        "lastName": "Blackwell",
        "email": "andrew20@gmail.com",
        "phone": "(289) 663-7654",
        "street": "10 Water Street",
        "city": "St. Catharines",
        "province": "Ontario",
        "postalCode": "L2R 7H7",
        "fullName" : "Andrew Blackwell"
      },
      {
        "id": 14,
        "firstName": "James",
        "lastName": "Perez",
        "email": "jPerez@gmail.com",
        "phone": "(289) 402-3133",
        "street": "700 Watertown Street",
        "city": "London",
        "province": "Ontario",
        "postalCode": "N6B 2W6",
        "fullName" : "James Perez"
      },
      {
        "id": 15,
        "firstName": "Xander",
        "lastName": "Kohut",
        "email": "xander999@gmail.com",
        "phone": "(289) 407-2132",
        "street": "800 Township Rd",
        "city": "Thorold",
        "province": "Ontario",
        "postalCode": "L2E 4H4",
        "fullName" : "Xander Kohut"
      }
      ,
      {
        "id": 16,
        "firstName": "Vladimir",
        "lastName": "Rosolov",
        "email": "vRosolov@gmail.com",
        "phone": "(304) 111-2222",
        "street": "100 Main Street",
        "city": "Toronto",
        "province": "Ontario",
        "postalCode": "L3M 6N1",
        "fullName" : "Vladimir Rosolov"
      },
      {
        "id": 17,
        "firstName": "Drake",
        "lastName": "Taylor",
        "email": "dTaylor@gmail.com",
        "phone": "(404) 337-3254",
        "street": "10 Oak Lane",
        "city": "Waterloo",
        "province": "Ontario",
        "postalCode": "L3M 4H4",
        "fullName" : "Drake Taylor"
      },
      {
        "id": 18,
        "firstName": "David",
        "lastName": "Bernard",
        "email": "dBernard@gmail.com",
        "phone": "(905) 668-0933",
        "street": "10 Carlton Street",
        "city": "St.Catharines",
        "province": "Ontario",
        "postalCode": "L2R 2L2",
        "fullName" : "David Bernard"
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
        },
        {
          "id": 21,
          "customerId": 11,
          "equipmentId": 1,
          "serialNumber": "5324F555584"
        }
        ,
        {
          "id": 22,
          "customerId": 12,
          "equipmentId": 2,
          "serialNumber": "ABSJBSBJ293"
        },
        {
          "id": 23,
          "customerId": 13,
          "equipmentId": 3,
          "serialNumber": "498597BDJHW"
        },
        {
          "id": 24,
          "customerId": 14,
          "equipmentId": 4,
          "serialNumber": "381948741ABJ"
        },
        {
          "id": 25,
          "customerId": 15,
          "equipmentId": 5,
          "serialNumber": "PLSIEJ448313"
        },
        {
          "id": 26,
          "customerId": 16,
          "equipmentId": 7,
          "serialNumber": "WOEJEI213393"
        },
        {
          "id": 27,
          "customerId": 17,
          "equipmentId": 12,
          "serialNumber": "5X309131KDBS"
        }
        ,
        {
          "id": 28,
          "customerId": 18,
          "equipmentId": 10,
          "serialNumber": "DKNDSJBSAJ39"
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