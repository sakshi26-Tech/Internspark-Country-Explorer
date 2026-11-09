// 1. Select HTML Elements

const countryContainer = document.getElementById("country-container");
const statusMessage = document.getElementById("status");

const searchInput = document.getElementById("search-input");
const regionFilter = document.getElementById("region-filter");


// 2. API URL

const API_URL = "https://countries.dev/countries";


// 3. Store Country Data

let allCountries = [];


// 4. Fetch Countries from API

async function fetchCountries() {

    statusMessage.innerText = "Loading countries...";
    countryContainer.innerHTML = "";

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to fetch countries");
        }

        const countries = await response.json();

        console.log("API Response:", countries);

        if (!Array.isArray(countries)) {
            throw new Error("API did not return an array");
        }

        allCountries = countries;

        displayCountries(allCountries);

        statusMessage.innerText =
            "Showing " + allCountries.length + " countries";

    } catch (error) {

        statusMessage.innerText =
            "Unable to load countries. Please try again.";

        console.error("API Error:", error);

    }

}


// 5. Display Country Cards

function displayCountries(countries) {

    countryContainer.innerHTML = "";

    if (countries.length === 0) {

        statusMessage.innerText = "No countries found.";

        return;

    }

    countries.forEach(function(country) {

        const card = document.createElement("div");

        card.classList.add("country-card");

        const countryName = country.name || "Unknown";
        const capital = country.capital || "N/A";
        const region = country.region || "N/A";
        const population = country.population ?? "N/A";

        const flagURL = country.flags?.svg || country.flags?.png || "";

        card.innerHTML = `
            <img
                src="${flagURL}"
                alt="Flag of ${countryName}"
                loading="lazy"
                onerror="this.style.display='none'"
            >

            <div class="country-info">

                <h2>${countryName}</h2>

                <p>
                    <strong>Capital:</strong> ${capital}
                </p>

                <p>
                    <strong>Region:</strong> ${region}
                </p>

                <p>
                    <strong>Population:</strong>
                    ${typeof population === "number"
                        ? population.toLocaleString("en-IN")
                        : population}
                </p>

            </div>
        `;

        countryContainer.appendChild(card);

    });

}


// 6. Search Countries

searchInput.addEventListener("input", filterCountries);


// 7. Region Filter

regionFilter.addEventListener("change", filterCountries);


// 8. Filter Countries

function filterCountries() {

    const searchValue = searchInput.value.toLowerCase();

    const selectedRegion = regionFilter.value;

    const filteredCountries = allCountries.filter(function(country) {

        const matchesName =
            (country.name || "").toLowerCase().includes(searchValue);

        const matchesRegion =
            selectedRegion === "all" ||
            country.region === selectedRegion;

        return matchesName && matchesRegion;

    });

    displayCountries(filteredCountries);

    statusMessage.innerText =
        "Showing " + filteredCountries.length + " countries";

}


// 9. Start Application

fetchCountries();



