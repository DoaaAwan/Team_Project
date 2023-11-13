//gets customer id from url
const urlParam = new URLSearchParams(window.location.search);
const customerId = urlParam.getAll("cid");

//sends new equipment data to customer details page if customer id was passed to this page
if (customerId.length > 0){
    const equipmentForm = document.getElementById("equipment-form");
    const cidValueFormInput = document.getElementById("cidvalue");
    const backToSearchButton = document.getElementById("back-to-search");
    const cancelToSearchButton = document.getElementById("cancel-to-search");

    //this makes it so that the form goes to the customer details with all data in the form passed as url parameters
    equipmentForm.method = "get";
    equipmentForm.action = `../pages/customer-details.html`;

    //sets a hidden form input on the page to the customer id passed from the url. this is so when the user submits the form, it carries over the customer id as well
    cidValueFormInput.value = customerId;
    cidValueFormInput.innerHTML = customerId;

    //makes sure to have the customer id in the url of the buttons as parameters
    backToSearchButton.href = `../pages/equipment-search.html?cid=${customerId}`;
    cancelToSearchButton.href = `../pages/equipment-search.html?cid=${customerId}`;
}else{
    //if theres no customer id, it removes hidden form input meant to store customer id
    document.getElementById("cid-container").innerHTML = "";
    //document.getElementById("serial-number-container").innerHTML = "";
}
