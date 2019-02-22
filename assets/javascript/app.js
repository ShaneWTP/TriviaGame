var allQuestions = [
    {
        question: "What is the name of Hermione's cat?",
        choiceList: ["Peeves", "Crookshanks", "Hedwig", "Nagini"],
        choicesAnswer: 1
    },
    {
        question: "Which is NOT a class at Hogwarts?",
        choiceList: ["Transfiguration", "Charms", "Muggleology", "Arithmancy"],
        choicesAnswer: 2
    },
    {
        question: "What is Tonks' first name?",
        choiceList: ["Nymphadora", "Lucinda", "Bathilda", "Minerva"],
        choicesAnswer: 0
    },
    {
        question: "What creatures pull the carriages that take students from the Hogwarts Express to the Castle?",
        choiceList: ["Hippogriffs", "Thestrals", "Manticores", "Grindylows"],
        choicesAnswer: 1
    },
    {
        question: "Who was the Defense Against the Dark Arts teacher in Harry Potter and The Chamber of Secrets?",
        choiceList: ["Remus Lupin", "Gilderoy Lockheart", "Severus Snape", "Professor Quirrell"],
        choicesAnswer: 1
    },
    {
        question: "What animal is Hermione's partonus?",
        choiceList: ["Stag", "Rabbit", "Fox", "Otter"],
        choicesAnswer: 3
    },
    {
        question: "What is the name of the good luck potion?",
        choiceList: ["Veritaserum", "Amortentia", "Felix Felicis", "Invigoration Draught"],
        choicesAnswer: 2
    },
    {
        question: "In Harry Potter and the Sorcerer's Stone, what kind of dragon is Norbert?",
        choiceList: ["Norwegian Ridgeback", "Ukranian Ironbelly", "Chinese Fireball", "Hungarian Horntail"],
        choicesAnswer: 0
    },
    {
        question: "What was the name of the house elf that belonged to Sirius Black?",
        choiceList: ["Dobby", "Hokey", "Winky", "Kreacher"],
        choicesAnswer: 3
    },
    {
        question: "What country wins the Quidditch World Cup in Harry Potter and the Goblet of Fire?",
        choiceList: ["Bulgaria", "Sweden", "Ireland", "England"],
        choicesAnswer: 2
    }
];
 

var imgArray = ['crookshanks', 'library', 'tonks', 'thestral', 'gilderoy', 'otter', 'felix-felicis', 'norbert', 'kreacher', 'irish'];
var currentQuestion; 
var correctAnswer; 
var incorrectAnswer; 
var unanswered; 
var seconds; 
var time; 
var answered; 
var userSelect;
var evaluations = {
	correct: "Correct!",
	incorrect: "Incorrect",
	endTime: "Time's Up!",
	finished: "Final Score:"
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#restartBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalScore').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#evaluation').empty();
	$('#correctedAnswer').empty();
	$('#img').empty();
	answered = true;
	

	$('.question').html('<h2>' + allQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(allQuestions[currentQuestion].choiceList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.choiceList').append(choices);
	}
	countdown();

	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 20;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('.thisChoice').empty();
	$('.question').empty();

	var rightAnswerText = allQuestions[currentQuestion].choiceList[allQuestions[currentQuestion].choicesAnswer];
	var rightAnswerIndex = allQuestions[currentQuestion].choicesAnswer;
	$('#img').html('<img src = "assets/images/'+ imgArray[currentQuestion] +'.jpg" width = "600px">');

	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#evaluation').html(evaluations.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#evaluation').html(evaluations.incorrect);
		$('#correctedAnswer').html('The answer is: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#evaluation').html(evaluations.endTime);
		$('#correctedAnswer').html('The answer is: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (allQuestions.length-1)){
		setTimeout(scoreboard, 1000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 1000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#evaluation').empty();
	$('#correctedAnswer').empty();
	$('#img').empty();

	$('#finalScore').html(evaluations.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#restartBtn').addClass('reset');
	$('#restartBtn').show();
	$('#restartBtn').html('Try Again');
}