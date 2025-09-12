function switchExp(){
    let selInd = parseInt(document.querySelector('#exps').value);
    if (selInd == 1){
        console.log("CHECKING");
        window.location.replace('uni-rz.html');
    }
    else if (selInd == 2){
        window.location.replace('simulation-nrz-l.html');
    }
    else if (selInd == 3){
        window.location.replace('simulation-nrz-i.html');
    }
    else if (selInd == 4){
        window.location.replace('simulation-manchester.html');
    }
    else if (selInd == 5){
        window.location.replace('simulation-differential-manchester.html');
    }
    else if (selInd == 6){
        window.location.replace('simulation-ami.html');
    }
    else if (selInd == 7){
        window.location.replace('simulation-pseudoternary.html');
    }
}
