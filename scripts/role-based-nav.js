document.addEventListener('DOMContentLoaded', function() {
    const selectedRole = localStorage.getItem('selectedRole') || 'default';


    function updateVisibilityBasedOnRole(element, rolesData) {
        const allowedRoles = rolesData.split(' ');
        if (!allowedRoles.includes(selectedRole) && !allowedRoles.includes('all')) {
            element.style.display = 'none';
            if (element.tagName === 'A') { 
                element.removeAttribute('href');
            }
        } else {
            element.style.display = ''; // 
        }
    }

    function removeElementForRole(elementId, role) {
        if (selectedRole === role) {
            const element = document.getElementById(elementId);
            if (element) {
                element.parentNode.removeChild(element);
            }
        }
    }

    const navItems = document.querySelectorAll('.nav-btn');
    navItems.forEach((item) => {
        const rolesData = item.parentElement.getAttribute('data-roles');
        if (rolesData) {
            updateVisibilityBasedOnRole(item.parentElement, rolesData);
        }
    });

    const linkItems = document.querySelectorAll('[data-roles]');
    linkItems.forEach((link) => {
        const rolesData = link.getAttribute('data-roles');
        if (rolesData) {
            updateVisibilityBasedOnRole(link, rolesData);
        }
    });

    const signOutButton = document.getElementById('sign-out-btn');
    if (signOutButton) {
        signOutButton.addEventListener('click', function(event) {
            const confirmed = confirm('Are you sure you want to sign out?');
            if (!confirmed) {
                event.preventDefault(); 
            }
        });
    }


    removeElementForRole('update-customer-btn', 'technician');

});