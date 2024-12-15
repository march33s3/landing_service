document.addEventListener("DOMContentLoaded", () => {
  const notifyForm = document.getElementById("notifyForm");
  const emailInput = document.getElementById("emailInput");
  const signupMessage = document.getElementById("signupMessage");

  notifyForm.addEventListener("submit", (event) => {
    event.preventDefault();

    fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: emailInput.value })
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          signupMessage.style.color = "#16a34a"; // green
          signupMessage.textContent = data.message; 
        } else {
          signupMessage.style.color = "#dc2626"; // red
          signupMessage.textContent = data.message; 
        }
        emailInput.value = "";
      })
      .catch(error => {
        console.error("Error:", error);
        signupMessage.style.color = "#dc2626"; // red
        signupMessage.textContent = "Something went wrong. Please try again later.";
      });
  });
});
