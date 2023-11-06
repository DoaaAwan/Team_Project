
// PROVINCE LIST

//when add button is clicked for province, new input item is added to bottom of list and highlighted
document.getElementById("add-prov").addEventListener("click", function(event) {
    event.preventDefault();
    const provEntered = document.getElementById("search-value").value.trim();
    if (provEntered != ""){
        const provList = document.getElementById("prov-list-container");
        const newProv = document.createElement("input");
        newProv.type = "text";
        newProv.value = provEntered;
        newProv.className = "prov-list-item highlighted";
        newProv.required = true;
        newProv.disabled = true;
        provList.appendChild(newProv);
        document.getElementById("search-value").value = ""; //clear search box
        provList.scrollTop = provList.scrollHeight;
    } else{
        alert("Please enter a province to add");
    }
})

//when update list button is clicked for province, 
document.getElementById("update-prov").addEventListener("click", function(){
     //Get all input fields
     const inputFields = document.querySelectorAll(".prov-list-item");

    //all disabled input fields are enabled 
    inputFields.forEach(function (input) {
        input.removeAttribute("disabled");
        input.classList.remove("highlighted");
    });

    //show action buttons (cancel and save)
    const actionButtons = document.getElementById("action-btns");
    actionButtons.style.display = "flex";
    actionButtons.classList.add("action-btns");

    //when save button is clicked, save the updated input 
    document.getElementById("save-prov").addEventListener("click", function(){
        inputFields.forEach(function(input) {
            if (input.value.trim() === '') {
                // If the input is empty, remove it
                input.remove();
            } else {
                // If there's a value, disable the input
                input.setAttribute("disabled", "true");
            }
        });
        actionButtons.style.display = "none";
    })

    //when cancel button is clicked, inputs go back to disabled
    // document.getElementById("cancel-btn").addEventListener("click", function(){
    //     inputFields.forEach(function (input) {
    //         input.setAttribute("disabled", "true");
    //     });
    //     actionButtons.style.display = "none";
    // })
})

// CITY LIST 

//when add button is clicked for city, new input item is added to bottom of list and highlighted
document.getElementById("add-city").addEventListener("click", function(event) {
    event.preventDefault();
    const cityEntered = document.getElementById("city-input").value.trim();
    if (cityEntered != ""){
        const cityList = document.getElementById("city-list-container");
        const newCity = document.createElement("input");
        newCity.type = "text";
        newCity.value = cityEntered;
        newCity.className = "city-list-item highlighted";
        newCity.required = true;
        newCity.disabled = true;
        cityList.appendChild(newCity);
        document.getElementById("city-input").value = ""; //clear search box
        cityList.scrollTop = cityList.scrollHeight;
    } else {
        alert("Please enter a city to add");
    }
})

//when update list button is clicked for city, 
document.getElementById("update-city").addEventListener("click", function(){
     //Get all input fields
     const inputFields = document.querySelectorAll(".city-list-item");

    //all disabled input fields are enabled 
    inputFields.forEach(function (input) {
        input.removeAttribute("disabled");
        input.classList.remove("highlighted");
    });

    //show action buttons (cancel and save)
    const actionButtons = document.getElementById("action-btns-city");
    actionButtons.style.display = "flex";
    actionButtons.classList.add("action-btns");

    //when save button is clicked, save the updated input 
    document.getElementById("save-city").addEventListener("click", function(){
        inputFields.forEach(function(input) {
            if (input.value.trim() === '') {
                // If the input is empty, remove it
                input.remove();
            } else {
                // If there's a value, disable the input
                input.setAttribute("disabled", "true");
            }
        });
        actionButtons.style.display = "none";
    })
})



