function readbet() {
        const radioButton = document.querySelector('.betbtn:checked');
        bet_value = parseInt(document.getElementById("cashform").value)
        console.log(bet_value)

        
        if (radioButton === null) {
            console.log('No radio buttons are checked.');
            alert ("Kérjük válassz ki egy fogadást!")
            return;
        }else if (isNaN(bet_value) || bet_value < 1 || bet_value > 1000){
            alert("Kérjük válassz egy összeget 0 és 1000 forint között!")
            return;
        }else{
            bet_sport = radioButton.getAttribute("sport")
            bet_matchup = radioButton.getAttribute("matchup")
            bet_key = radioButton.getAttribute("betkey").replace('odds_', '')
            bet_odds = radioButton.getAttribute("betodds")
            console.log(bet_sport + " | " + bet_matchup + " | " + bet_key + " | " + bet_odds + " ||| " + bet_value)
        }
}