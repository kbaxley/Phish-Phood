

document.addEventListener("DOMContentLoaded", () => {

async function fetchData() {
    try {
      const response = await fetch("lake_vir_species_data.json");
      const data = await response.json();
      return data; 
    } catch (error) {
      console.error("Error fetching JSON:", error);
    }
  }

async function main() {
    const data = await fetchData();
    const speciesData = data.fish_species;
    const fishGrid = document.getElementById("gridContainer");
    speciesData.forEach(species => {
        const speciesItem = document.createElement('div');
        const imageFile = replaceSpace(species.common_name);
        speciesItem.classList.add('speciesItem');
        speciesItem.innerHTML= `
        <div class="container col-xxl-8 px-4 py-5">
            <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
            <div class="col-10 col-sm-8 col-lg-6">
              <img src="images/${imageFile}.jpg" class="d-block mx-lg-auto img-fluid" alt="${species.common_name} Illustration" width="700" height="500" loading="lazy">
            </div>
            <div class="col-lg-6">
              <h1 class="display-5 fw-bold lh-1 mb-3">${species.common_name}</h1>
              <h2 class="lh-1 mb-3">${species.scientific_name}</h2>
              <p class="lead">${species.common_name} Description.</p>
              <p><strong>Preferred Habitat:</strong>${species.preferred_habitat}.</p>
              <p><strong>Preferred Bait:</strong>${species.fishing_methods}.</p>
              <div class="d-grid gap-2 d-md-flex justify-content-md-start">
              </div>
            </div>
          </div>
          </div>
          <div class="b-example-divider"></div>
        `;
        fishGrid.appendChild(speciesItem);

    })
  }

function replaceSpace(input){
  const output = input.replace(/ /g, "_");
  return output;
}

  main(); 
});