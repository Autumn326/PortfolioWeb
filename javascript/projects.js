window.addEventListener('load', () => {
    const contentWrapper = document.querySelector('.content-wrapper');
    contentWrapper.classList.add('show');
});

document.addEventListener("DOMContentLoaded", function () {
    const button = document.querySelector('.button');
    const ripple = document.querySelector('.ripple');
    const buttonRipple = document.querySelector('.button-ripple'); // New ripple

    if (button && ripple && buttonRipple) {
        button.addEventListener('mousedown', function (e) {
            // Reset both ripple animations
            ripple.classList.remove('active');
            buttonRipple.classList.remove('active');
            ripple.offsetHeight; // Trigger reflow to restart the animation
            buttonRipple.offsetHeight; // Trigger reflow to restart the animation

            // Get the viewport position for ripple
            const rippleX = e.clientX - button.getBoundingClientRect().left; // Relative to button
            const rippleY = e.clientY - button.getBoundingClientRect().top; // Relative to button

            // Set positions for both ripples
            ripple.style.left = `${rippleX}px`;
            ripple.style.top = `${rippleY}px`;
            buttonRipple.style.left = `${rippleX}px`;
            buttonRipple.style.top = `${rippleY}px`;

            // Add active class to trigger the ripple effects
            ripple.classList.add('active');
            buttonRipple.classList.add('active');
            ripple.style.opacity = 1; // Make the original ripple visible
            buttonRipple.style.opacity = 1; // Make the new ripple visible

            // Remove ripple after animation duration
            const rippleDuration = 600; // Match with CSS transition duration
            setTimeout(() => {
                ripple.classList.remove('active');
                ripple.style.opacity = 0; // Fade out the original ripple
                buttonRipple.classList.remove('active');
                buttonRipple.style.opacity = 0; // Fade out the new ripple
            }, rippleDuration);

            // Redirect after ripple animation duration
            const redirectDelay = rippleDuration; // Match with ripple animation duration
            const href = button.getAttribute('href');

            if (href) {
                setTimeout(() => {
                    window.location.href = href;
                }, redirectDelay);
            }
        });

        // Adding keyboard accessibility
        button.addEventListener('keypress', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault(); // Prevent default space scrolling
                button.dispatchEvent(new Event('mousedown')); // Trigger mousedown
            }
        });
    }
});