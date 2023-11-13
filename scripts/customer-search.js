// import { fetchData } from './functions.js';

const custPerPage = 9;
let defaultPage = 1;
let currentPage = 1;



const customerDatabase = getCustomerData();
let searchDiv = document.getElementById("search-grid");

function displayAllCustomers() {

  searchDiv.innerHTML = "";

  customerDatabase.sort((a, b) => a.fullName.localeCompare(b.fullName))

  const paginatedCust = paging(customerDatabase, custPerPage, currentPage)

  paginatedCust.forEach(customer => {
    let customerDiv = document.createElement("div");
    customerDiv.innerHTML = `
      <div>
        <a href="./pages/customer-details.html?cid=${customer.id}" style="width: 100%;" class="result shadow d-flex justify-content-start">
          <img src="images/green-customer-details.png" style="margin-right: 20px" alt="">
          <div id="equipment-details">
            <p class="name">${customer.firstName} ${customer.lastName}</p>
            <p class="email">${customer.email}</p>
            <p class="number">${customer.phone}</p>
          </div>
        </a>
      </div>
    `;
    searchDiv.appendChild(customerDiv);
  });

  displayPagination(customerDatabase.length);
}

document.getElementById("search-btn").addEventListener("click", function(e) {
  e.preventDefault();

  handleCustomerSearch();
});

function handleCustomerSearch() {
  let custSearch = document.getElementById("search-value").value.toLowerCase();
  searchDiv.innerHTML = "";
  let results = [];

  customerDatabase.forEach(customer => { 
    if (customer.fullName.toLowerCase().includes(custSearch)) {

          results.push(customer);

        }
  });
  
  if (results.length > 0) {
    const paginatedResults = paging(results, custPerPage, defaultPage);
    paginatedResults.forEach(customer => {
      let customerDiv = document.createElement("div");
      customerDiv.innerHTML = `
        <div>
          <a href="./pages/customer-details.html?cid=${customer.id}" style="width: 100%;" class="result shadow d-flex justify-content-start">
            <img src="images/green-customer-details.png" style="margin-right: 20px" alt="">
            <div id="equipment-details">
              <p class="name">${customer.firstName} ${customer.lastName}</p>
              <p class="email">${customer.email}</p>
              <p class="number">${customer.phone}</p>
            </div>
          </a>
        </div>
      `;
      searchDiv.appendChild(customerDiv);
    });
    displayPaging(results.length);
  }
  else {
    //if no customer results, user message asking if they'd like to create one
    var confirmCancel = window.confirm("No matching customers found. Would you like to create one?");

    if (confirmCancel) {
        // If the user clicks "OK" in the confirmation dialog, navigate to the index page
        window.location.href = "../pages/customer-create.html";
    }
  }
}

handleCustomerSearch();

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


function paging(array, pageSize, pageNum) {
  return array.slice((pageNum -1 ) * pageSize, pageNum * pageSize);
} 

function displayPaging(totalCust) {
  const pageDiv = document.getElementById("pagination");
  pageDiv.innerHTML = "";
  const totalPages = Math.ceil(totalCust / custPerPage);

  for (let i = 1; i <= totalPages; i++) {
      const pageBtn = document.createElement("button");
      pageBtn.innerText = i;
      pageBtn.addEventListener("click", () => {
          currentPage = i;
          displayAllCustomers();
      });
      pageDiv.appendChild(pageBtn); // Corrected here
  }
}

displayAllCustomers();