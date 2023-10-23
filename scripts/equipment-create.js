const urlParam = new URLSearchParams(window.location.search);
const customerId = urlParam.getAll("cid");

if (customerId > 0){
    const equipmentForm = document.getElementById("equipment-form");
    const cidValueFormInput = document.getElementById("cidvalue");
    const backToSearchButton = document.getElementById("back-to-search");

    equipmentForm.method = "get";
    equipmentForm.action = `../pages/customer-details.html`;

    cidValueFormInput.value = customerId;
    cidValueFormInput.innerHTML = customerId;

    backToSearchButton.href = `../pages/equipment-search.html?cid=${customerId}`;
}
