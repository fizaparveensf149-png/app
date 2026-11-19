const bookingForm = document.getElementById("bookingForm");
const matchSelect = document.getElementById("matchSelect");
const standSelect = document.querySelector("#standSelect");
const ticketQtyInput = document.querySelector("#ticketQty");
const resetBtn = document.getElementById("resetBtn");

const summaryMatch = document.getElementById("summaryMatch");
const summaryStand = document.querySelector("#summaryStand");
const summaryUnitPrice = document.querySelector("#summaryUnitPrice");
const summaryQty = document.getElementById("summaryQty");
const summaryTotal = document.querySelector("#summaryTotal");
const toastEl = document.getElementById("toast");

let toastTimer = null;

function showToast(message) {
  if (!toastEl) return;

  toastEl.textContent = message;
  toastEl.classList.add("show");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastEl.classList.remove("show");
  }, 2600);
}

function formatINR(amount) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

function updateBookingSummary(shouldShowToast = true) {
  const selectedMatchOption = matchSelect.options[matchSelect.selectedIndex];
  const selectedStandOption = standSelect.options[standSelect.selectedIndex];

  const matchValue = matchSelect.value;
  const standValue = standSelect.value;

  const basePrice = Number(selectedMatchOption?.dataset.price || 0);
  const multiplier = Number(selectedStandOption?.dataset.multiplier || 1);

  let quantity = parseInt(ticketQtyInput.value, 10);
  if (Number.isNaN(quantity) || quantity < 1) {
    quantity = 1;
    ticketQtyInput.value = "1";
  } else if (quantity > 10) {
    quantity = 10;
    ticketQtyInput.value = "10";
  }

  const unitPrice = matchValue ? Math.round(basePrice * multiplier) : 0;
  const totalPrice = unitPrice * quantity;

  summaryMatch.textContent = matchValue || "Not selected";
  summaryStand.textContent = standValue || "Not selected";
  summaryUnitPrice.textContent = formatINR(unitPrice);
  summaryQty.textContent = String(quantity);
  summaryTotal.textContent = formatINR(totalPrice);

  if (shouldShowToast) {
    showToast("Booking Summary updated!");
  }
}

matchSelect.addEventListener("change", () => updateBookingSummary(true));
standSelect.addEventListener("change", () => updateBookingSummary(true));
ticketQtyInput.addEventListener("change", () => updateBookingSummary(true));
ticketQtyInput.addEventListener("input", () => updateBookingSummary(false));

bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();
  updateBookingSummary(false);

  if (!matchSelect.value || !standSelect.value) {
    showToast("Please select both a match and a stand category.");
    return;
  }

  showToast(`Confirmed ${summaryQty.textContent} ticket(s) • Total ${summaryTotal.textContent}`);
});

resetBtn.addEventListener("click", () => {
  bookingForm.reset();
  ticketQtyInput.value = "1";
  updateBookingSummary(false);
  showToast("Booking form cleared.");
});

updateBookingSummary(false);