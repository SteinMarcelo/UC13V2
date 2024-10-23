const { response } = require("express");

document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem(token);

  if (!token) {
    window.location.href = "login.html";
    return;
  }

  const response = await fetch("http://localhost:3000/user", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
});

const userEmailElement = document.getElementById("userEmail");
const messageElement = document.getElementById("message");

if (response.ok) {
  const userData = await response.json();
  userEmailElement.textContent = userData.email;
}
