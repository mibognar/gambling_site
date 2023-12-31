const searchParams = new URLSearchParams(window.location.search);
var participant_id = searchParams.get('id')
var cash_out = searchParams.get('cashout')
var session_id = searchParams.get('sessionid')
fetch(`../sportsdata/odds_data.json`)
        .then(response => response.json())
        .then(data => {
            // Access specific sport data
            // <a class="dropdown-item" href="#">Action</a>
            const sportNames = Object.keys(data);
            const sportMenu = document.getElementById("dropmenu")
            console.log(sportNames)
            sportNames.forEach((name) => {
                const sportItem = document.createElement('a');
                sportItem.className = 'dropdown-item';
                sportItem.setAttribute("onclick",`fillsports("${name}")`)
                sportItem.innerHTML = name.toUpperCase()
                sportMenu.appendChild(sportItem)
            })
})