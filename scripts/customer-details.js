import { fetchData } from './functions.js';

const customerDatabase = await fetchData('../scripts/json/customer.json');
const urlParam = new URLSearchParams(window.location.search);
const customerId = urlParam.getAll("id");

if (customerId.length > 0) {
    let customerDetailsDiv = document.getElementById("customer-details");
    let customer = customerDatabase.find(c => c.id == customerId);

    customerDetailsDiv.innerHTML = `
        <h2>${customer.firstName} ${customer.lastName}</h2>
        <hr>
        <div class="row">
            <div class="column">
                <p>${customer.email}<br>${customer.phone}<br>${customer.street}<br>${customer.city}<br>${customer.province}<br>${customer.postalCode}</p>
            </div>

            <div class="column">
                <h2>Order History</h2>
                <select name="Orders" size="5">  
                    <option value="Order1"> Order 1 </option>  
                    <option value="Order2"> Order 2 </option>  
                    <option value="Order3"> Order 3 </option>  
                    <option value="Order4"> Order 4 </option>  
                </select>
                <div class="d-flex">
                    <a href="../pages/customer-update.html?id=${customer.id}" class="button btns">Update Customer</a>
                    <a href="../pages/equipment-search.html" class="button btns">Add Equipment</a>
                </div>
            </div>
        </div>
    `;

} else {
    let customerDetailsDiv = document.getElementById("customer-details");
    customerDetailsDiv.innerHTML = "<h2>No customer details found.</h2>";
}