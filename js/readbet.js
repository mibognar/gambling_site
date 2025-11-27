function readbet() {
    console.log(`Participant id is: ${participant_id}; Cash-out is: ${cash_out}`)
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
        let formData = new FormData()
        formData.append('participant_id', participant_id)
        formData.append('session_id', session_id)
        formData.append('cashout', cash_out)
        formData.append('sport', bet_sport)
        formData.append('matchup', bet_matchup)
        formData.append('option', bet_key)
        formData.append('odds', bet_odds)
        formData.append('amount', bet_value)
        fetch('savedata.php', {
        method: 'POST',
        body: formData
        })
    .then(response => response.json())
    .then(data =>{
    if (data.success) {
	console.log("success!")
	window.location.href = "https://elteppk.eu.qualtrics.com/jfe/form/SV_1zFzEDYDES9VAKq?if_cash_out="+cash_out+"&Response_ID="+participant_id;
    }else{console.log("nothing")}
    })
    .catch(error => console.error('Error:', error));

    }
}
