  // Sample customer data
  const customers = [
    {
      name: "John Doe",
      number: "(905) 456 -7890",
      email: "johndoe@example.com",
    },
    // Add more customer data as needed
  ];

  //EQUIPMENT SEARCH
  const equipResults = document.getElementById("equipment-results");

  function showEquipResult(){
    equipResults.style.display = "block";
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
      var confirmCancel = window.confirm("No matching customers found. Would you like to create one?");

      if (confirmCancel) {
          // If the user clicks "OK" in the confirmation dialog, navigate to the index page
          window.location.href = "../pages/customer-create.html";
      }
      // If the user clicks "Cancel" in the confirmation dialog, do nothing
    }
  }

  function clearSearchResults() {
    customerName.textContent = "";
    customerEmail.textContent = "";
    customerNumber.textContent = "";
    searchResults.style.display = "none";
  }


