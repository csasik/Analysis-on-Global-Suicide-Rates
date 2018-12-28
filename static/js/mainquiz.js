function check(){
    let question1a = Number(document.quiz.question1.value);
	let question2a = Number(document.quiz.question2.value);
    let question3a = Number(document.quiz.question3.value);
    let question4a = Number(document.quiz.question4.value);
    

    var sum =question1a+question2a+question3a+question4a;
    let pictures =  ["/static/images/suicide-lifeline.jpeg", "/static/images/suicide-lifeline.jpeg", "/static/images/nimh.jpeg"];
	let messages = [ "High Suicide Risk ","High Suicide Risk", "Low Suicide Risk"];
    let sensitivity_messages = [ "80% sensitive and 91% specific for at risk adult psychiatric inpatients","93% sensitive and 95% specific for at risk individual in the adult population", "Below the score cut-off for at risk individual"];
    let score;
    if (sum<=6){
        score=2;
    }
    if (sum==7){
        score=1;
    }
    if (sum>=8){
        score=0;
    }
    document.getElementById("after_submit").style.visibility = "visible";
    document.getElementById("message").innerHTML = messages[score];
    document.getElementById("sensitivity_message").innerHTML=sensitivity_messages[score]
    document.getElementById("picture").src = pictures[score];
    document.getElementById("number_correct").innerHTML = "You scored: " + sum + " /18";
    document.getElementById("image").style.visibility = "hidden";
};
