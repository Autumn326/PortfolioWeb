// JavaScript to handle the scroll action
document.querySelector('.scroll-indicator').addEventListener('click', function() {
    document.getElementById('next-section').scrollIntoView({ behavior: 'smooth' });
});
