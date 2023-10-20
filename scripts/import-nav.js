fetch('../shared/shared-nav.html')
.then(response => response.text())
.then(data => {
    document.getElementById('shared-nav').innerHTML = data;
});