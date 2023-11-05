//import { fetchData } from './functions.js';

//fetching customer seed data
const customerDatabase = getCustomerData();

//event handler for when user searches for customer
document.getElementById("search-btn").addEventListener("click", function(e){ 
    e.preventDefault();
    //empties results
    let searchDiv = document.getElementById("search-grid");
    searchDiv.innerHTML = "";

    //gets search value from search box
    let custSearch = document.getElementById("search-value").value.toLowerCase();
    let results = [];

    //gets all results of search
    customerDatabase.forEach(customer => {
        if (customer.firstName.toLowerCase().includes(custSearch) ||
            customer.lastName.toLowerCase().includes(custSearch)){

            results.push(customer);

        }
    });

    //if there are results, sorts array and then displays all customers for user
    if (results.length > 0){

        //sorts result array
        results.sort((a, b) => {
            const nameA = a.firstName.toUpperCase();
            const nameB = b.firstName.toUpperCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });

        //displays customer
        results.forEach(customer => {

            let customerDiv = document.createElement("div");
            customerDiv.innerHTML = 
            `<div>
                <a href="../pages/customer-details.html?cid=${customer.id}" style="width: 100%;" class="result shadow d-flex justify-content-start">
                    <img src="images/green-customer-details.png" style="margin-right: 20px" alt="">
                    <div id="equipment-details">
                        <p class="name">${customer.firstName} ${customer.lastName}</p>
                        <p class="email">${customer.email}</p>
                        <p class="number">${customer.phone}</p>
                    </div>
                </a>
            </div>`;

            searchDiv.appendChild(customerDiv);
        })
    }
    else{
        //if no customer results, user message asking if they'd like to create one
        var confirmCancel = window.confirm("No matching customers found. Would you like to create one?");

        if (confirmCancel) {
            // If the user clicks "OK" in the confirmation dialog, navigate to the index page
            window.location.href = "../pages/customer-create.html";
        }
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
        }
      ];
}