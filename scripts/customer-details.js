import { fetchData } from './functions.js';

const customerDatabase = await fetchData('../scripts/json/customer.json');
const urlParam = new URLSearchParams(window.location.search);
const customerId = urlParam.getAll("cid");

if (customerId.length > 0) {
    
    let customer = customerDatabase.find(c => c.id == customerId);

    $("#customer-name").html(`${customer.firstName} ${customer.lastName}`);
    $("#customer-email").html(`E-mail: ${customer.email}`);
    $("#customer-phone").html(`Phone: ${customer.phone}`);
    $("#customer-street").html(`Street: ${customer.street}`);
    $("#customer-city").html(`City: ${customer.city}`);
    $("#customer-province").html(`Province: ${customer.province}`);
    $("#customer-postal").html(`Postal Code: ${customer.postalCode}`);

    $("#add-equipment-btn").attr("href", `../pages/equipment-search.html?cid=${customerId}`);
    
} else {
    $(`#customer-details`).html("<h2>No customer details found.</h2>");
}