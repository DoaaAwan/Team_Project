document.addEventListener('DOMContentLoaded', function() {
    const selectedRole = localStorage.getItem('selectedRole') || 'default';

    const userImg = document.getElementById('navUserImg');
    const userName = document.getElementById('navUserName');
    const userRole = document.getElementById('navUserRole');

    if (selectedRole === 'technician' || selectedRole === 'admin') {
        if (userImg) {//can specify which role per image, i can change it if needed
            userImg.src = '../images/green-customer-details.png'
        }

        if (userName) {
            userName.textContent = selectedRole === 'technician' ? 'Dion Phaneuf' : 'Jane Doe';
        }

        if (userRole) {
            userRole.textContent = selectedRole === 'technician' ? 'Technician' : 'Administrator';
        }
    }
});