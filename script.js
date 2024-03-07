$(".restartQuiz").hide();
$("#quiz").hide();

$(".continue").click(function(){
  $(".userInfo").hide();
  $("#quiz").show();
  updateQuizCount();
  showQuestion();
});

$("#restartQuiz").click(function() {
  score = 0;
  questionCount = 1;
  $("#result").hide();
  $(".userInfo").hide();
  $("#quiz").show();
});

$(".options label").click(function() {
  $(this).find("input").prop("checked", true);
});

  $(document).ready(function() {
    var questionCount = 1;
    var score = 0;
    var seasonImages = {
      "Grišma (গ্রীষ্ম)": "https://images.pexels.com/photos/13015186/pexels-photo-13015186.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "Barṣā (বর্ষা)": "https://images.pexels.com/photos/7086906/pexels-photo-7086906.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "Šarat (শরৎ)": "https://images.pexels.com/photos/3675856/pexels-photo-3675856.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "Hemanta (হেমন্ত)": "https://images.pexels.com/photos/19685051/pexels-photo-19685051/free-photo-of-roe-deer-standing-in-a-foggy-autumn-field-at-dusk.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "Šīt (শীত)": "https://images.pexels.com/photos/122107/pexels-photo-122107.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "Basanta (বসন্ত)": "https://images.pexels.com/photos/5206249/pexels-photo-5206249.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    };

    var facts = {
      "Grišma (গ্রীষ্ম)": ["The sun beats down, mangoes drip like honey, and cicadas hum a drowsy tune. Farmers weave baskets for the monsoon, their hands calloused from toil. On rooftops, families gather for starlit evenings, cooled by mango lassi and lulled by cricket chirps."],
      "Barṣā (বর্ষা)": ["The land becomes a shimmering emerald sea, whipped by the monsoons. Women in vibrant saris wade through flooded fields, their laughter echoing with the rain's thunder. Clay ovens fill the air with the aroma of jhal muri and doi-chhirat, a warm embrace against the storm's fury. Poets huddle inside, their pens dancing to the rhythm of raindrops on tin roofs."],
      "Šarat (শরৎ)": ["Sunbeams filter through fiery leaves, painting the landscape in auburn and gold. Boats laden with plump pumpkins and water hyacinths glide down rivers, their sails like autumn leaves dancing on the breeze. Villages thrum with the joyous melody of dhol beats, celebrating Nabami puja under the harvest moon's soft glow."],
      "Hemanta (হেমন্ত)": ["Crisp mornings draped in cobwebs of mist, fields shimmering with diamonds of dew. Ektaaras whisper tales of love and longing, harmonizing with the chirping of birds. Farmers sow mustard seeds, their golden glow mirroring the setting sun. Villagers gather around bonfires, roasting sweet potatoes and sharing stories under a sky adorned with constellations like celestial lanterns."],
      "Šīt (শীত)": ["Days shrink under cotton blankets of fog, nights shimmer with frost-kissed stars. Warm woolen shawls embrace shivering bodies, the air thick with the aroma of gur sandesh and steaming chai. Children's laughter dances with flickering flames, while elders weave tales of brave Rajas and mischievous fairies."],
      "Basanta (বসন্ত)": ["Fields erupt in a riot of yellow mustard, pink palash, and white kashful blossoms. The air vibrates with the melody of bees and laughter as children fly kites painted with hopes and dreams, chasing butterflies in sun-drenched meadows. Holi's vibrant hues stain hands and hearts, celebrating the rebirth of life in a joyous cacophony of drums and laughter."],
    };

    var questions = [
      {
        text: "What type of activities do you prefer on a rainy day?",
        options: [
          "Reading a book indoors",
          "Going for a walk in the rain",
          "Enjoying hot beverages and cozy conversations",
          "Engaging in creative hobbies like painting or writing"
        ]
      },
      {
        text: "How do you usually spend your free time?",
        options: [
          "Exploring new places and experiences",
          "Connecting with friends and socializing",
          "Enjoying moments of solitude and relaxation",
          "Trying out new adventurous activities"
        ]
      },
      {
        text: "What's your ideal vacation destination?",
        options: [
          "Lush green forests or countryside retreats",
          "Vibrant and bustling cities",
          "Serene beaches or tranquil lakesides",
          "Historic places with cultural significance"
        ]
      },
      {
        text: "What type of weather brings you the most joy?",
        options: [
          "Heavy rain with thunderstorms",
          "Pleasant and mild temperatures",
          "Crisp cold weather with snow",
          "Hot and sunny days"
        ]
      },
      {
        text: "Which color palette resonates with you the most?",
        options: [
          "Shades of blue and green",
          "Bright and lively colors like yellow and orange",
          "Cool and calming tones like white and pastels",
          "Warm and vibrant hues like red and magenta"
        ]
      },
      {
        text: "How do you handle challenges or stress?",
        options: [
          "Seeking advice and support from others",
          "Taking time for self-reflection and meditation",
          "Tackling problems head-on with determination",
          "Finding distractions or activities to unwind"
        ]
      }
    ];

    function getQuizCount() {
      var quizCount = sessionStorage.getItem('quizCount');
      return quizCount ? parseInt(quizCount) : 0;
    }

    // Function to update and display the quiz count
    function updateQuizCount() {
      var quizCount = getQuizCount();
      quizCount++;
      sessionStorage.setItem('quizCount', quizCount);
      $('.quiz-count').text("Quiz Taken: " + quizCount + " Times");
    }

    function showQuestion() {
      $(".question").text(questions[questionCount - 1].text);
      $(".options").empty();
      for (var i = 0; i < questions[questionCount - 1].options.length; i++) {
        $(".options").append("<li><input type='radio' name='answer' value='" + (i + 1) + "'>" + questions[questionCount - 1].options[i] + "</li>");
      }
    }

    function updateProgressBar() {
      var progressPercent = (questionCount / questions.length) * 100;
      $("#progress").css("width", progressPercent + "%");
    }

    showQuestion();

  // Function to get user inputs and show result
  function showResult() {
    var userName = $(".userName").val(); // Get the user's name input value
    var userAge = $(".userAge").val(); // Get the user's age input value

    var selectedAnswer = $("input[name='answer']:checked").val();
    if (selectedAnswer) {
      score += parseInt(selectedAnswer);
      var season = calculateSeason(score);

      // Update the result section with user info and result
      $(".result-header").text(userName + ", you are " + season + "!");
      $(".result-image").attr("src", seasonImages[season]);
      $(".result-facts").html(facts[season].join("<br>"));

      // Display user info in the result section
      $(".user-info").html("Name: " + userName + "<br>Age: " + userAge);

      $("#progress-bar").hide();
      $("#quizContent").hide();
      $("#result").show();
    } else {
      alert("Please select an answer");
    }
  }

  // Click event handler for the "Next" button
  $("#next").click(function() {
    var selectedAnswer = $("input[name='answer']:checked").val();
    if (selectedAnswer) {
      score += parseInt(selectedAnswer);
      questionCount++;
      updateProgressBar();
      if (questionCount > questions.length) {
        $("#next").hide();
        showResult(); // Show the result when all questions are answered
        updateQuizCount();
        quizCompleted(); // Update quiz count when the quiz is completed
      } else {
        showQuestion();
      }
    } else {
      alert("Please select an answer");
    }
  });

  // Function to calculate the season based on the score
  function calculateSeason(score) {
    if (score <= 8) {
      return "Grišma (গ্রীষ্ম)";
    } else if (score <= 12) {
      return "Barṣā (বর্ষা)";
    } else if (score <= 16) {
      return "Šarat (শরৎ)";
    } else if (score <= 16) {
      return "Hemanta (হেমন্ত)";
    } else if (score <= 24) {
      return "Šīt (শীত)";
    } else {
      return "Basanta (বসন্ত)";
    }
  }

  showQuestion();
});
