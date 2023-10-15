
// Add an event listener to the "Cancel" button
document.getElementById('cancelButton').addEventListener('click', function (e) {
    e.preventDefault(); // Prevent the default link behavior

    // Display a confirmation dialog
    var confirmCancel = window.confirm("Are you sure you want to cancel?");

    if (confirmCancel) {
        // If the user clicks "OK" in the confirmation dialog, navigate to the index page
        window.location.href = "../index.html";
    }
    // If the user clicks "Cancel" in the confirmation dialog, do nothing
});