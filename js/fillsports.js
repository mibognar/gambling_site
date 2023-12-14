
function fillsports(sport){
    var sport = sport
    console.log(`../sportsdata/${sport}_data.csv`)
        // Fetch CSV file

        fetch(`../sportsdata/${sport}_data.csv`)
            .then(response => response.text())
            .then(data => {
                // Parse CSV
                const rows = data.split('\n');
                const header = rows[0].split(',');
                const csvData = rows.slice(1).map(row => row.split(','));

                // Build Bootstrap grid
                const csvGrid = document.getElementById('csvGrid');
                csvGrid.replaceChildren();
                
                csvData.forEach((rowData, index) => {
                    const rowDiv = document.createElement('div');
                    rowDiv.className = 'row-lg-2 d-flex justify-content-center';

                    //rowDiv.setAttribute('data-toggle','buttons')

                    // Loop through each column
                    for (let i = 0; i < header.length; i++) {
                        const colDiv = document.createElement('div');
                        colDiv.className = 'col-sm-2 btn-group text-center justify-content-center';
                        //colDiv.setAttribute("data-toggle","buttons")
                        colDiv.style = 'margin-top: 10px'
                        if (i<2){
                            var label = document.createElement('p');
                            label.innerHTML = `${header[i]} <br> <strong>${rowData[i]}</strong>`;
                            colDiv.appendChild(label);
                            rowDiv.appendChild(colDiv);
                        }else{
                            var input = document.createElement('input')
                            input.className = 'btn-check'
                            input.setAttribute("type","radio")
                            input.setAttribute("name","options")
                            input.setAttribute("id",`rdbtn${index}${i}`)
                            //input.setAttribute("autocomplete","off")
                            var label = document.createElement('label')
                            label.className = 'btn btn-outline-success'
                            label.setAttribute("for",`rdbtn${index}${i}`)
                            label.innerHTML = `<strong>${header[i]}</strong> <br> ${rowData[i]} <br>`;
                            colDiv.appendChild(input)
                            colDiv.appendChild(label);
                            rowDiv.appendChild(colDiv);
                        }
                        
                    }
                    csvGrid.appendChild(rowDiv);
                });
            })
            .catch(error => console.error('Error fetching CSV:', error));

}