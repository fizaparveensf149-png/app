// app.js - IPL 2026 Ticket Booking Interactions

// Reusable showToast function for notifications
function showToast(message) {
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 9999;
            display: flex;
            flex-direction: column;
            gap: 10px;
        `;
        document.body.appendChild(toastContainer);
    }

    const toast = document.createElement('div');
    toast.innerText = message;
    toast.style.cssText = `
        background: linear-gradient(135deg, #ff7a18, #ffb347);
        color: #111;
        padding: 12px 20px;
        border-radius: 8px;
        font-weight: 600;
        font-size: 14px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        opacity: 0;
        transition: opacity 0.3s ease, transform 0.3s ease;
        transform: translateY(20px);
    `;

    toastContainer.appendChild(toast);

    // Fade in
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
    }, 50);

    // Fade out and remove after 3 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Smooth scrolling and event handling on load
document.addEventListener('DOMContentLoaded', () => {
    // Handle smooth scrolling for navigation and button links
    const internalLinks = document.querySelectorAll('nav a, #home button a');

    internalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                    showToast('Scrolling to section...');
                }
            }
        });
    });

    // Toast confirmation on form submission
    const bookingForm = document.querySelector('form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            if (bookingForm.checkValidity()) {
                e.preventDefault();
                showToast('🎉 Booking confirmed successfully!');
            }
        });
    }
});