// getdates.js

// Display the current year dynamically
const currentYear = new Date().getFullYear();
document.getElementById("currentyear").textContent = currentYear;

// Display the document's last modified date
document.getElementById("lastModified").innerHTML = "Last Modification: " + document.lastModified;