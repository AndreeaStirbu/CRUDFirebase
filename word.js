var firebaseConfig = {
    apiKey: "AIzaSyCHf5k5nLEZ8uneNnBONxbNrCJC5ulP1ec",
    authDomain: "words-422c1.firebaseapp.com",
    databaseURL: "https://words-422c1.firebaseio.com",
    projectId: "words-422c1",
    storageBucket: "words-422c1.appspot.com",
    messagingSenderId: "307898064238",
    appId: "1:307898064238:web:c0893950b25c3ff0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();
var words =  database.ref('words');


function addWord() {
    var word = document.getElementById("word").value;
    var meaning = document.getElementById("meaning").value;
    words.push({
        word: word,
        meaning: meaning
    });
    document.getElementById('addForm').reset();
}

function editWordFunction() {
    var word = document.getElementById("editWord").value;
    var meaning = document.getElementById("editMeaning").value;
    var key = document.getElementById("key").value;
    words.child(key).update({
        word: word,
        meaning: meaning
    });
    document.getElementById("editForm").reset();
    document.getElementById("editForm").style.display = "none";
    document.getElementById('addForm').style.display = "block";
}

var database = firebase.database();
var ref = database.ref("words");
ref.on("value", gotData, errData);

function gotData(data){
    var words = data.val();
    var keys = Object.keys(words);
    var listWords = document.getElementById('listWords');

    while(listWords.firstChild){
        listWords.removeChild(listWords.firstChild);
    }

    for(var i = 0; i < keys.length; i++) {
        (function () {
            var key = keys[i];
            console.log(key);
            var word = words[key].word;
            var meaning = words[key].meaning;
            var node = document.createElement("li");
            var deleteButton = document.createElement("button");
            var editButton = document.createElement("button");
            editButton.innerHTML = `<i class="material-icons">edit</i>`
            editButton.classList.add('mdl-button--colored', 'mdl-button', 'mdl-js-button');
            deleteButton.innerHTML = `<i class="material-icons">delete</i>`;
            deleteButton.classList.add('mdl-button--colored', 'mdl-button', 'mdl-js-button');
            deleteButton.addEventListener('click', function(e){
                listWords.removeChild(this.parentNode);
                ref.child(key).remove();
            }, false);
            editButton.addEventListener('click', function(e){
                document.getElementById('addForm').style.display = "none";
                var editForm = document.getElementById("editForm");
                editForm.style.display = "block";
                var editWord = document.getElementById("editWord");
                editWord.value = word;
                var editMeaning = document.getElementById("editMeaning");
                editMeaning.value = meaning;
                var editKey = document.getElementById("key");
                editKey.value = key;
            })
            var label = document.createElement("label");
            var textNode = document.createTextNode(`${word} - ${meaning}`);
            label.appendChild(textNode);
            node.appendChild(label);
            node.appendChild(editButton);
            node.appendChild(deleteButton);
            listWords.appendChild(node);
        }());
    }
}

function errData(err) {
    console.log(err);
}
