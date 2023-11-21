document.addEventListener('DOMContentLoaded', function() {
    function updateNavItemsBasedOnRole() {
        const selectedRole = localStorage.getItem('selectedRole') || 'default';

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
    }

    updateNavItemsBasedOnRole();
});