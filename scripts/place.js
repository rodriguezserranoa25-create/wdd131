/* --- Wind Chill Calculation --- */

// Static variables matching the HTML content for testing
const temp_c = 5; // Temperature in Celsius (°C)
const wind_speed_kmh = 15; // Wind speed in kilometers per hour (km/h)

// Required: Function to calculate wind chill factor
/**
 * Calculates the wind chill factor using the metric formula.
 * Formula: 13.12 + 0.6215T - 11.37(V^0.16) + 0.3965T(V^0.16)
 * @param {number} T - Air temperature in Celsius (°C).
 * @param {number} V - Wind speed in kilometers per hour (km/h).
 * @returns {number} The wind chill factor in Celsius.
 */
function calculateWindChill(T, V) {
    // Required: One line of code for the calculation
    return (13.12 + (0.6215 * T) - (11.37 * Math.pow(V, 0.16)) + (0.3965 * T * Math.pow(V, 0.16)));
}

// Function to display the wind chill factor
function displayWindChill() {
    const windChillElement = document.getElementById('wind-chill-factor');

    // Required: Conditional check for calculation viability (Metric)
    // Temperature <= 10 °C AND Wind speed > 4.8 km/h
    if (temp_c <= 10 && wind_speed_kmh > 4.8) {
        // Calculate and round to one decimal place
        const windChill = calculateWindChill(temp_c, wind_speed_kmh).toFixed(1);

        // Display the result
        windChillElement.textContent = `${windChill} °C`;
    } else {
        // Required: Display "N/A" if conditions are not met
        windChillElement.textContent = "N/A";
    }
}

/* --- Footer Updates (UPDATED IDs) --- */

// Function to set the current year in the footer
function setCurrentYear() {
    const currentYearElement = document.getElementById('year');
    const currentYear = new Date().getFullYear();
    currentYearElement.textContent = currentYear;
}

// Function to set the last modified date in the footer
function setLastModifiedDate() {
    const lastModifiedElement = document.getElementById('lastModified');
    // Gets the last modification date of the document
    const lastModified = document.lastModified;
    lastModifiedElement.textContent = lastModified;
}

/* --- Execution --- */

// Call functions when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Required: Wind chill calculation and display on page load
    displayWindChill(); 
    
    // Footer updates
    setCurrentYear();
    setLastModifiedDate();
});