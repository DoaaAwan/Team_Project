  // Sample customer data
  const customers = [
    {
      name: "John Doe",
      number: "(905) 456 -7890",
      email: "johndoe@example.com",
    },
    // Add more customer data as needed
  ];

  const equipmentDatabase = {
    1: {
        equipmentId: 1,
        price: "$1000.00",
        itemNumber: 332,
        equipmentName: "Lawn Mower",
        serialNumber: "20931890",
        modelNumber: "A02B",
        manufacturer: "Pro-Power Canada",
        colour: "Red"
    },
    2: {
        equipmentId: 2,
        price: "$800.00",
        itemNumber: 456,
        equipmentName: "Lawn Mower",
        serialNumber: "987654321",
        modelNumber: "B05C",
        manufacturer: "Troy-Bilt",
        colour: "Green",
    },
}

  const searchForm = document.getElementById("search-form");
  const searchValue = document.getElementById("search-value");
  const searchResults = document.getElementById("search-results");
  const customerName = document.getElementById("customer-name");
  const customerEmail = document.getElementById("customer-email");
  const customerNumber = document.getElementById("customer-number");

  searchForm.addEventListener("submit", function (e) {
    e.preventDefault();
    performSearch();
  });

  // Add an input event listener to clear results when the search bar is cleared
  searchValue.addEventListener("input", function () {
    if (searchValue.value.trim() === "") {
      clearSearchResults();
    }
  });

  function performSearch() {
    const searchTerm = searchValue.value.toLowerCase();

    // Reset the customer info
    customerName.textContent = "";
    customerEmail.textContent = "";
    customerNumber.textContent = "";

    // Search for the customer by checking if the search term is a substring of the customer's name
    const matchingCustomer = customers.find((customer) =>
      customer.name.toLowerCase().includes(searchTerm)
    );

    if (matchingCustomer) {
      // Display the customer information
      customerName.textContent = `${matchingCustomer.name}`;
      customerEmail.textContent = `${matchingCustomer.email}`;
      customerNumber.textContent = `${matchingCustomer.number}`;
      searchResults.style.display = "block";
    } else {
      // Display a message if no matching customers are found
      customerName.textContent = "No matching customers found.";
      searchResults.style.display = "block";
    }
  }

  function clearSearchResults() {
    customerName.textContent = "";
    customerEmail.textContent = "";
    customerNumber.textContent = "";
    searchResults.style.display = "none";
  }


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
                    <p>Price: ${equipment.price}</p>
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