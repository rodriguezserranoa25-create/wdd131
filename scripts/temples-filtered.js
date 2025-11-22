// Temple Data (Week 04 requirement)
const temples = [
  {
    name: "Salt Lake Temple",
    location: "Salt Lake City, Utah, USA",
    dedicated: "1893-04-06",
    area: 382207,
    imageUrl: "images/salt-lake-temple.jpg"
  },
  {
    name: "Preston England Temple",
    location: "Chorley, England",
    dedicated: "1998-06-07",
    area: 69630,
    imageUrl: "images/preston-temple.jpg"
  },
  {
    name: "Tokyo Japan Temple",
    location: "Tokyo, Japan",
    dedicated: "1980-10-27",
    area: 53997,
    imageUrl: "images/tokyo-japan-temple.jpg"
  },
  {
    name: "Paris France Temple",
    location: "Le Chesnay, France",
    dedicated: "2017-05-21",
    area: 44175,
    imageUrl: "images/paris-france-temple.jpg"
  },
  {
    name: "Rome Italy Temple",
    location: "Rome, Italy",
    dedicated: "2019-03-10",
    area: 41000,
    imageUrl: "images/rome-temple.jpg"
  },
  {
  name: "Colonia Juárez Chihuahua Mexico Temple",
  location: "Colonia Juárez, Mexico",
  dedicated: "1999-03-06",
  area: 6800,
  imageUrl: "images/colonia-juarez-temple.jpg"
}
];

// DOM selectors
const gallery = document.getElementById("temple-gallery");
const filterTitle = document.getElementById("filter-title");

// Function to display temples
function displayTemples(filteredTemples) {
  gallery.innerHTML = ""; // Clear gallery

  filteredTemples.forEach(t => {
    const card = document.createElement("div");
    card.classList.add("temple-card");

    card.innerHTML = `
      <h3>${t.name}</h3>
      <img src="${t.imageUrl}" loading="lazy" alt="${t.name}">
      <p><strong>Location:</strong> ${t.location}</p>
      <p><strong>Dedicated:</strong> ${t.dedicated}</p>
      <p><strong>Area:</strong> ${t.area} sq ft</p>
    `;

    gallery.appendChild(card);
  });
}

// Default: show all temples
displayTemples(temples);

// Filter buttons
document.getElementById("home").addEventListener("click", () => {
  filterTitle.textContent = "All Temples";
  displayTemples(temples);
});

document.getElementById("old").addEventListener("click", () => {
  filterTitle.textContent = "Old Temples";
  displayTemples(temples.filter(t => parseInt(t.dedicated) < 1900));
});

document.getElementById("new").addEventListener("click", () => {
  filterTitle.textContent = "New Temples";
  displayTemples(temples.filter(t => parseInt(t.dedicated) > 2000));
});

document.getElementById("large").addEventListener("click", () => {
  filterTitle.textContent = "Large Temples";
  displayTemples(temples.filter(t => t.area > 90000));
});

document.getElementById("small").addEventListener("click", () => {
  filterTitle.textContent = "Small Temples";
  displayTemples(temples.filter(t => t.area < 20000));
});

// Mobile menu script
const menuButton = document.getElementById("menuButton");
const navMenu = document.getElementById("navMenu");

menuButton.addEventListener("click", () => {
  navMenu.classList.toggle("open");
});

// Footer year + last modified
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;
