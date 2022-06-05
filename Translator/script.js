function getWords() {
    var input = document.getElementById('en-word').value;
    var firstLetter = input.charAt(0);
    var link = location.protocol + '//' + location.host + location.pathname + "dict/" + firstLetter + ".txt";

    var exp = new RegExp ("[0-9А-Яа-я()]+");
    var str=input;
    var rusExepsion = str.match(exp)
    console.log(rusExepsion);

    if (input != "" && event.keyCode != 13 && rusExepsion == null && document.getElementById('ru-word').value !="") {
        getContentAJAX(input, link);
    } else if (input != "" && event.keyCode == 13 && rusExepsion == null && document.getElementById('ru-word').value !="") {
        getContentAJAX(input, link, true);
    } else if (input != "" && rusExepsion != null){
        document.getElementById('ru-word').innerHTML = "";
        document.getElementById('transcription').innerHTML = "";

        document.getElementById('oplist').innerHTML = "<span style='font-size: 20px; font-family: helvetica; padding-left: 20px; color: rgb(95,99,104);'>Неверный ввод. Введите слово на английском языке";
        
    } else {
        document.getElementById('oplist').innerHTML = "";

        document.getElementById('transcription').innerHTML = "[transcription]";
        document.getElementById('ru-word').innerHTML = "Перевод";
    }

}

function getTranslate(input) {

    document.getElementById('oplist').innerHTML = "";

    document.getElementById('transcription').innerHTML = input.split(' ')[1];
    document.getElementById('ru-word').innerHTML = input.split(' ')[2];
    document.getElementById('en-word').value = input.split(' ')[0];
}

function uploadDroplist(input, content, isGetTranslate) {
    var regex = new RegExp(input + "[a-z' ]* \\[[' a-z]*\\] [\.\,\-\_\'\"\@\?\!\:\$ a-zA-Z0-9А-Яа-я()]*", "gmu");
    var newContentArr = [];
    newContentArr = content.match(regex);
    console.log("words: ",newContentArr);
    document.getElementById('oplist').innerHTML = '';
    document.getElementById('transcription').innerHTML = "";
    document.getElementById('ru-word').innerHTML = "";

    if (newContentArr != null){

        if (isGetTranslate) {
            getTranslate(newContentArr[0]);
        } else {
            for (let index = 0; index < Math.min(newContentArr.length, 5); index++) {
                document.getElementById('oplist').innerHTML = document.getElementById('oplist').innerHTML +
                    `<button onclick="getTranslate(\`` + newContentArr[index] + `\`);" class="send">` + newContentArr[index].split(' ')[0] + `</button>`;
            };
            
        }
    } else{
        document.getElementById('oplist').innerHTML = "<span style='font-size: 20px; font-family: helvetica; padding-left: 20px; color: rgb(95,99,104);'>Слово не найдено";
    }
}

function getContentAJAX(input, link, isGetTranslate = false) {
    var httpRequest;

    console.log(link);

    httpRequest = new XMLHttpRequest();
    
    httpRequest.onreadystatechange = function() {
        if (httpRequest.status == 200) {
            uploadDroplist(input, httpRequest.responseText, isGetTranslate);
        } else {

        }
    };

    httpRequest.open('GET', link, true);
    httpRequest.send(null);
}

function clearTranslate() {

}