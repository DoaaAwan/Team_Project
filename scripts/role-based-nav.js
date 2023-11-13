document.addEventListener('DOMContentLoaded', function() {

    //updates nav item based on role
    function updateNavItemsBasedOnRole() {
        const selectedRole = localStorage.getItem('selectedRole') || 'default'; // Default assignment of the select list

        //loops through the nav bar btns and gets their attributes to use in the conditional statement 
        const navItems = document.querySelectorAll('.nav-btn');
        navItems.forEach((item) => {

            const rolesData = item.parentElement.getAttribute('data-roles');
            
            if (rolesData) {
                const allowedRoles = rolesData.split(' ');

                if (!allowedRoles.includes(selectedRole) && !allowedRoles.includes('all')) {
                    item.parentElement.style.display = 'none';//hides btns
                } else {
                    item.parentElement.style.display = 'flex';//shows btns 
                }
            }
        });

        const roleSelect = document.getElementById('userRoleList');
        if (roleSelect) {
            roleSelect.value = selectedRole;
        }//parses roleselect list for the selected value
    }

    function changeRole(event) {
        localStorage.setItem('selectedRole', event.target.value);
        // Update the navigation items
        updateNavItemsBasedOnRole();
    }

    const roleSelect = document.getElementById('userRoleList');
    if (roleSelect) {
        roleSelect.addEventListener('change', changeRole);
    }

    updateNavItemsBasedOnRole();//calls function initally on page load
});