document.querySelector('.help-icon').addEventListener('mouseover', () => {
    const tooltip = document.querySelector('.tooltip-text');
    tooltip.style.visibility = 'visible';
    tooltip.style.opacity = 1;

    setTimeout(() => {
        tooltip.style.visibility = 'hidden';
        tooltip.style.opacity = 0;
    }, 20000); 
});

document.querySelector('.help-icon').addEventListener('mouseout', () => {
    const tooltip = document.querySelector('.tooltip-text');
    tooltip.style.visibility = 'hidden';
    tooltip.style.opacity = 0;
});

document.querySelector('.help-icon').addEventListener('mouseover', showTooltip);
document.querySelector('.help-icon').addEventListener('mouseout', hideTooltip);
document.querySelector('.help-icon').addEventListener('focus', showTooltip);
document.querySelector('.help-icon').addEventListener('blur', hideTooltip);

function showTooltip() {
    const tooltip = document.querySelector('.tooltip-text');
    tooltip.style.visibility = 'visible';
    tooltip.style.opacity = 1;

    setTimeout(() => {
        tooltip.style.visibility = 'hidden';
        tooltip.style.opacity = 0;
    }, 20000); 
}

function hideTooltip() {
    const tooltip = document.querySelector('.tooltip-text');
    tooltip.style.visibility = 'hidden';
    tooltip.style.opacity = 0;
}