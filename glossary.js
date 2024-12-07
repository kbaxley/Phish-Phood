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
                <div class="speciesItem">
                <img src="images/${imageFile}.jpg" class="fishPicture" alt="Fish Picture">
                    <div class="fishName">${species.common_name}</div> 
                    <div class="species">${species.scientific_name}</div>
                    <div class="fishDescription">${species.common_name} Description</div>
                    <div class="preferredCondition">${species.preferred_habitat}.</div>
                    <div class="preferredBait">${species.fishing_methods}.</div> 
                </div>
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