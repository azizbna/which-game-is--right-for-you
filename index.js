let questions = document.getElementsByClassName("question");


function show(H, title) {
    document.getElementById(H).style.display = "revert";
    document.title = title;
}

function getChosen() {
    let url_string = window.location.href; //window.location.href
    let url = new URL(url_string);
    let cgame = url.searchParams.get("cgame");

    switch (cgame) {
        case ('CSGO'):
            show('CSGO', "Counter Strike Global Offensive");
            break;
        case ('SIMS'):
            show('SIMS', "Sims 4");
            break;
        case ('CIV'):
            show('CIV',"Civilization V");
            break;
        case ('DET'):
            show('DET',"Detroit: Become Human");
            break;
        case ('MC'):
            show('MC',"Minecraft");
            break;
        default:
            show("ERROR, PLEASE CHECK THE GAME");
    }
}

function redirectToChosen(G) {
    new_url = "./result.html?cgame=" + G.Abbr;
    window.location.replace(new_url);
}

function game(N, V, A) {
    this.Name = N;
    this.Val = V;
    this.Abbr = A;
}
let SIMS = new game("Sims", 0, "SIMS"),
    CIV = new game("Civilization", 0, "CIV"),
    DET = new game("Detroit", 0, "DET"),
    MC = new game("Minecraft", 0, "MC"),
    CSGO = new game("Counter Strike Global Offensive", 0, "CSGO");


function gamePoints(G, PT) { ///GOOD
    switch (G) {
        case ("ALL"):
            SIMS.Val += PT;
            CIV.Val += PT;
            DET.Val += PT;
            MC.Val += PT;
            CSGO.Val += PT;
            break;

        case ("SIMS"):
            SIMS.Val += PT;
            break;

        case ("CIV"):
            CIV.Val += PT;
            break;

        case ("DET"):
            DET.Val += PT;
            break;

        case ("MC"):
            MC.Val = +PT;
            break;

        case ("CSGO"):
            CSGO.Val += PT;
            break;
    }
}

function addPoints(P) { //GOOOOOOOOOD
    points = Number(P[0]);
    for (j = 1; j < P.length; j++) {

        //console.log("j[P]" + j + " P[j]=" + P[j]);

        gamePoints(P[j], points);
    }
}


function getAnswers(ans) { //GOOOOOOOOOOOD
    addpoint = ans.split(',');
    addPoints(addpoint);
}

function winner(GAMES) {
    win = GAMES[0];
    for (k = 1; k < GAMES.length; k++) {
        if (GAMES[k].Val >= win.Val) {
            win = GAMES[k];
        }
    }
    return win;
}

function runs() {
    for (i = 0; i < questions.length; i++) {
        try {
            answer = questions[i].getElementsByClassName("answers")[0].querySelectorAll('label>input:checked')[0].value;
            getAnswers(answer);
            chosen = winner([MC, SIMS, CSGO, CIV, DET]);

        } catch (err) {
            error = document.getElementById("check");
            error.style.width = "0";
            error.style.transition = "width 400ms linear 250ms";
            error.style.transition = "font-size 400ms linear 50ms";
            error.style.width = "100%";
            error.style.fontSize = "1.5em";
            break;
        }
       // console.log("i=" + i + "//// questions.length = " + questions.length);
    }

   // document.getElementById("out").value = ("MC = " + MC.Val + "/ SIMS = " + SIMS.Val + "/ CSGO = " + CSGO.Val + "/ CIV = " + CIV.Val + "/ DET = " + DET.Val + "    WINNER IS : " + chosen.Name);
    redirectToChosen(chosen);
}