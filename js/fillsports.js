
function fillsports(sport){
    var sport = sport
        // Fetch CSV file
        document.getElementById('sportname').innerHTML = sport.toUpperCase()
        document.getElementById('bet-button').style = "visibility: visible"
        document.getElementById('bet-form').style = "visibility: visible"
        document.getElementById('choose-text').style = "visibility: hidden"
        fetch(`../sportsdata/odds_data.json`)
        .then(response => response.json())
        .then(data => {
            // Access specific sport data
            const sportData = data[sport];

            // Build Bootstrap grid
            const csvGrid = document.getElementById('csvGrid');
            csvGrid.replaceChildren();
                
            sportData.forEach((rowData, index) => {
                const rowDiv = document.createElement('div');
                rowDiv.className = 'justify-content-center';


                // Dynamically create columns based on JSON keys
                Object.keys(rowData).forEach(key => {
                    

                    // Create and append label and input elements
                    

                    if (key.startsWith('odds_')) {
                        const colDiv = document.createElement('div');
                        colDiv.className = 'col-4 col-sm-2 btn-group text-center';
                        colDiv.style = 'margin-top: 10px; padding: 0px';
                        var input = document.createElement('input');
                        input.className = 'btn-check betbtn';
                        input.setAttribute("type", "radio");
                        input.setAttribute("name", "options");
                        input.setAttribute("sport", sport);
                        input.setAttribute("gameindex", index);
                        input.setAttribute("betkey", key);
                        input.setAttribute("betodds", rowData[key]);
                        input.setAttribute("matchup", rowData["hazai"]+"-"+rowData["vendég"]);
                        input.setAttribute("id", `rdbtn${index}${key}`);
                        var label = document.createElement('label');
                        label.className = 'btn btn-outline-success';
                        label.setAttribute("for", `rdbtn${index}${key}`)
                        label.innerHTML = `<strong>${key.replace('odds_', '').toUpperCase()}</strong> <br> ${rowData[key]}`;
                        colDiv.appendChild(input);
                        colDiv.appendChild(label);
                        rowDiv.appendChild(colDiv);
                    }else if (key.startsWith('info')){
                        const colDiv = document.createElement('div');
                        colDiv.className = 'col-12 col-sm-2 btn-group text-center justify-content-center';
                        colDiv.style = 'margin-top: 10px';
                       var label = document.createElement('p');
                        label.innerHTML = `<strong>${rowData[key]}</strong>`;
                        colDiv.appendChild(label);
                        rowDiv.appendChild(colDiv);
                    }
                    else{
                        const colDiv = document.createElement('div');
                        colDiv.className = 'col-6 col-sm-2 btn-group text-center justify-content-center';
                        colDiv.style = 'margin-top: 10px';
                       var label = document.createElement('p');
                        label.innerHTML = `<strong>${key.replace('odds_', '').toUpperCase()}</strong> <br> ${rowData[key]}`;
                        colDiv.appendChild(label);
                        rowDiv.appendChild(colDiv); 
                    }

                    
                });

                csvGrid.appendChild(rowDiv);
            });
        })
        .catch(error => console.error('Error fetching JSON:', error));
}