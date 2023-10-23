import { fetchData } from './functions.js';

const customerDatabase = await fetchData('../scripts/json/customer.json');

document.getElementById("search-btn").addEventListener("click", function(e){ 
    e.preventDefault();
    let searchDiv = document.getElementById("search-grid");
    searchDiv.innerHTML = "";
    let custSearch = document.getElementById("search-value").value.toLowerCase();
    let results = [];

    
    customerDatabase.forEach(customer => {
        if (customer.firstName.toLowerCase().includes(custSearch) ||
            customer.lastName.toLowerCase().includes(custSearch)){

            results.push(customer);

        }
    });

    if (results.length > 0){

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
        var confirmCancel = window.confirm("No matching customers found. Would you like to create one?");

        if (confirmCancel) {
            // If the user clicks "OK" in the confirmation dialog, navigate to the index page
            window.location.href = "../pages/customer-create.html";
        }
    }
});