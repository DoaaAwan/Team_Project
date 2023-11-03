import { fetchData } from './functions.js';

//fetching customer seed data
const customerDatabase = await fetchData('../scripts/json/customer.json');

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