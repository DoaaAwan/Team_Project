  // Sample customer data
  const customers = [
    {
      name: "John Doe",
      number: "(905) 456 -7890",
      email: "johndoe@example.com",
    },
    // Add more customer data as needed
  ];

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