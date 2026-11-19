let toastTimeoutId = null;

// Reusable Toast Notification Function
function showToast(message) {
    let toast = document.getElementById("toast");

    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toast";
        toast.setAttribute("role", "status");
        toast.setAttribute("aria-live", "polite");
        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add("show");

    if (toastTimeoutId) {
        clearTimeout(toastTimeoutId);
    }

    toastTimeoutId = setTimeout(function () {
        toast.classList.remove("show");
    }, 3000);
}

// Smooth Scrolling to the Booking Form (#book)
function scrollToBooking(selectedMatchValue) {
    const bookingFormSection = document.getElementById("book");
    const matchSelect = document.getElementById("match");

    if (selectedMatchValue && matchSelect) {
        matchSelect.value = selectedMatchValue;
    }

    if (bookingFormSection) {
        bookingFormSection.scrollIntoView({
            behavior: "smooth"
        });
    }

    showToast("Scrolled to the booking form. Ready to book IPL 2026 tickets!");
}

// Event Handling
document.addEventListener("DOMContentLoaded", function () {
    const bookButtons = document.querySelectorAll(".book-btn");
    const bookingForm = document.getElementById("bookingForm");
    const checkBookingBtn = document.getElementById("checkBookingBtn");
    const bookingIdInput = document.getElementById("bookingid");

    bookButtons.forEach(function (button) {
        button.addEventListener("click", function (event) {
            const matchCode = button.getAttribute("data-match");
            const bookingFormSection = document.getElementById("book");

            // Allow form submission buttons to validate/submit normally if inside a form
            if (button.type === "submit") {
                return;
            }

            if (bookingFormSection) {
                event.preventDefault();
                scrollToBooking(matchCode);
            } else {
                showToast("Let's book your IPL 2026 tickets!");
            }
        });
    });

    if (bookingForm) {
        bookingForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const nameValue = document.getElementById("name")?.value.trim() || "Fan";
            showToast(`Booking request received for ${nameValue}!`);
            bookingForm.reset();
        });

        bookingForm.addEventListener("reset", function () {
            showToast("Booking form cleared.");
        });
    }

    if (checkBookingBtn && bookingIdInput) {
        checkBookingBtn.addEventListener("click", function () {
            const bookingId = bookingIdInput.value.trim();
            if (!bookingId) {
                showToast("Please enter a Booking ID first.");
                return;
            }
            showToast(`Checking status for Booking ID: ${bookingId}`);
        });
    }
});