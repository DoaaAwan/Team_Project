import { fetchData } from './functions.js';

const customerDatabase = await fetchData('../scripts/json/customer.json');
const urlParam = new URLSearchParams(window.location.search);
const customerId = urlParam.getAll("cid");

if (customerId.length > 0) {
    document.getElementById("back-to-customer").href = `../pages/customer-details.html?cid=${customerId}`
    document.getElementById("cancelButton").href = `../pages/customer-details.html?cid=${customerId}`
    let customer = customerDatabase.find(c => c.id == customerId);

    document.getElementById("first-name").value = customer.firstName;
    document.getElementById("last-name").value = customer.lastName;
    document.getElementById("email").value = customer.email;
    document.getElementById("phone").value = customer.phone;
    document.getElementById("address").value = customer.street;
    document.getElementById("city").value = customer.city;
    document.getElementById("province").value = customer.province;
    document.getElementById("postal").value = customer.postalCode;
}
else{
    window.alert("No customer selected for update.");
    window.location.href = "../index.html";
}