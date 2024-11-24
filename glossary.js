document.addEventListener("DOMContentLoaded", () => {

    async function fetchData() {
        try {
          const response = await fetch("lake_vir_species_data.json");
          const data = await response.json();
        //   console.log(data); // Use the data here
          return data; // You can return the data for further use
        } catch (error) {
          console.error("Error fetching JSON:", error);
        }
      }

    // const data = fetchData();
    // const speciesData = data.fish_species;
    // console.log(speciesData);

    async function main() {
        const data = await fetchData();
        const speciesData = data.fish_species;
        const fishGrid = document.getElementById("gridContainer");
        speciesData.forEach(species => {
            const speciesItem = document.createElement('div');
            speciesItem.classList.add('speciesItem');
            console.log(species.common_name);

            speciesItem.innerHTML= `
                <div class="speciesItem">
                <img src="images/basspic.jpg" class="fishPicture" alt="Fish Picture">
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
      
      main(); // Start the process
});