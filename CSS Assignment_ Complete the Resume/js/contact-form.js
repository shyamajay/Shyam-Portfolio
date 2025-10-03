document
  .getElementById("contact-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    // Add loading state to button
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = "Sending...";
    submitButton.disabled = true;

    // Form validation
    const name = document.getElementById("input-name").value;
    const email = document.getElementById("input-email").value;
    const message = document.getElementById("input-message").value;

    if (!name || !email || !message) {
      alert("Please fill in all fields");
      submitButton.textContent = originalText;
      submitButton.disabled = false;
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      submitButton.textContent = originalText;
      submitButton.disabled = false;
      return;
    }

    try {
      const formData = new FormData(this);
      const response = await fetch(this.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        // Reset the form
        this.reset();

        // Show success message
        alert("Thank you! Your message has been sent successfully.");

        // Reset button state
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      alert(
        "Oops! There was a problem sending your message. Please try again later."
      );
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }
  });
