game = {
    wordList: ["tapp", "covfefe", "origin","madam","orange","nambia","wall","hombre","caravan"],
    answer: [],
    input: null,
    result: {
        win: false,
        inputList: [],
        attempt: 10,
        fail: [],
    },
    audioGroup: {
        audioWin: ["assets/audio/i_congrats.mp3"],
        audioLose: ["assets/audio/fired.mp3"],
        audioCorrect: ["assets/audio/english.mp3", "assets/audio/mn_love_my_life.mp3", "assets/audio/rich.mp3", "assets/audio/iloveyou.mp3", "assets/audio/rich.mp3"],
        audioWrong: ["assets/audio/failed.mp3", "assets/audio/problem.mp3", "assets/audio/stupidpeople.mp3", "assets/audio/garbage.mp3", "assets/audio/oyaye.mp3"],
    },
    changeButton: function () {
        document.getElementById("startButton").innerHTML = "Press Any Key to Restart";
    },
    showGame: function () {
        var x = document.getElementById("myGame");
        x.style.display = "block";
    },
    showResult: function () {
        if (game.result.win === true) {
            var x = document.getElementById("resultWin");
            x.style.display = "block";
        } else {
            var x = document.getElementById("resultLose");
            x.style.display = "block";
        }

    },
    hideGame: function () {
        var x = document.getElementById("myGame");
        x.style.display = "none";
    },
    // Get input from webpage.
    getInput: function (inputString) {
        var string = inputString;
        game.input = string.toUpperCase();
    },
    reset: function () {
        game.result.win = false;
        game.result.inputList = [];
        game.result.attempt = 10;
        game.result.fail = [];
    },
    // make answer from word bank, capitalize, and split into array.
    createAnswer: function () {
        var string = game.wordList[Math.floor(Math.random() * game.wordList.length)];
        var upperCase = string.toUpperCase();
        game.answer = upperCase.split("");
        console.log("answer" + game.answer);
    },
    // create outcome list composed of inputs.
    createInputList: function (answerArr, inputListArr) {
        for (i = 0; i < answerArr.length; i++) {
            inputListArr.push("_");
        }
    },
    compare: function (inputString, answerArr, resultObj) {
        var guessCheck = false;
        // check every letter of answer
        for (i = 0; i < answerArr.length; i++) {
            // only concern the empty ones
            if (resultObj.inputList[i] === "_") {
                // replace inputlist with correct guess
                if (inputString === answerArr[i]) {
                    resultObj.inputList[i] = inputString;
                    guessCheck = true;
                    game.ani.correctAni(game.audioGroup.audioCorrect);
                    console.log("rightAni");
                }
            }
        }
        // if guessed wrong, decrease attempt and add to fail list
        if (guessCheck != true) {
            game.ani.wrongAni(game.audioGroup.audioWrong);
            resultObj.attempt -= 1;
            resultObj.fail.push(inputString);

        }
        // if no empty spot, win game
        if (resultObj.inputList.includes("_") === false) {
            resultObj.win = true;
        }
    },
    setup: function () {
        game.reset();
        game.displayScreen();
        game.createAnswer();
        game.createInputList(game.answer, game.result.inputList);
        $("#startButton").addClass("disabledButton");
    },
    displayScreen: function () {
        var attemptSlot = document.getElementById("attemptLeft");
        attemptSlot.textContent = game.result.attempt;
        var answerSlot = document.getElementById("answerList");
        answerSlot.textContent = game.result.inputList;
        var failSlot = document.getElementById("failList");
        failSlot.textContent = game.result.fail;
    },
    main: function () {
        var input = document.getElementById("input").value;
        game.getInput(input);
        if (game.result.attempt > 0) {
            game.compare(game.input, game.answer, game.result);
        };
        if (game.result.win === true) {
            game.ani.winAni();

            $(document).keypress(function () {
                history.go(0);
            });
        };
        if (game.result.attempt === 0) {
            game.ani.LoseAni();
            $(document).keypress(function () {
                history.go(0);
            });
        };
        game.displayScreen();
    },
    randomizer: function (number) {
        var random = Math.floor(Math.random() * number);
        return random;
    },
    ani: {
        startAni: function (arr) {
            console.log("StartAni");
        },
        correctAni: function (arr) {
            var i = arr.length;
            var j = game.randomizer(i);
            var audio = new Audio(game.audioGroup.audioCorrect[j]);
            audio.play();
            document.getElementById("resultAni").src = "assets/images/happy.jpg";
        },
        wrongAni: function (arr) {
            var i = arr.length;
            var j = game.randomizer(i);
            var audio = new Audio(game.audioGroup.audioWrong[j]);
            audio.play();
            var elem = document.getElementById("scoreAni");
            var pos = elem.offsetHeight;
            document.getElementById("resultAni").src = "assets/images/angry.jpeg";
            var id = setInterval(frame, 10);
            newPos = pos + 40;
            function frame() {
                if (pos === newPos) {
                    clearInterval(id);
                } else {
                    pos++;
                    elem.style.height = pos + 'px';
                }
            }
        },
        winAni: function () {
            game.showResult();
            game.hideGame();
            game.changeButton();
            var audio = new Audio(game.audioGroup.audioWin[0]);
            audio.play();
        },
        LoseAni: function () {
            game.showResult();
            game.hideGame();
            game.changeButton();
            var audio = new Audio(game.audioGroup.audioLose[0]);
            audio.play();
        },
    },
}
