document.addEventListener('DOMContentLoaded', function() {
    function updateNavItemsBasedOnRole() {
        const selectedRole = localStorage.getItem('selectedRole') || 'salesRep'; // Default to 'salesRep'


        const navItems = document.querySelectorAll('.nav-btn');
        navItems.forEach((item) => {

            const rolesData = item.parentElement.getAttribute('data-roles');
            
            if (rolesData) {
                const allowedRoles = rolesData.split(' ');

                if (!allowedRoles.includes(selectedRole) && !allowedRoles.includes('all')) {
                    item.parentElement.style.display = 'none';
                } else {
                    item.parentElement.style.display = 'flex'; 
                }
            }
        });

        const roleSelect = document.getElementById('userRoleList');
        if (roleSelect) {
            roleSelect.value = selectedRole;
        }
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

    updateNavItemsBasedOnRole();
});