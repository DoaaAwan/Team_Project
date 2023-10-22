

function validateForm() {
    const price = document.getElementById("price");
    const itemNumber = document.getElementById("itemNumber");
    const equipmentName = document.getElementById("equipmentName");
    const serialNumber = document.getElementById("serialNumber");
    const modelNumber = document.getElementById("modelNumber");

    if (!validatePrice(price)) return false;
    if (!validateItemNumber(itemNumber)) return false;

    return true;
}

function validatePrice(input) {
    const pricePattern = /^\$\d+(\.\d{2})?$/;
    if (!pricePattern.test(input.value)) {
        alert("Price should match the pattern: $#.##");
        input.focus();
        return false;
    }
    return true;
}

function validateItemNumber(input) {
    if (isNaN(input.value)) {
        alert("Item Number must be a number.");
        input.focus();
        return false;
    }
    return true;
}

