/**
 * 🎮 Love Quiz & Clicker Game
 * Two interactive modes: multiple-choice quiz and love-meter clicker
 */
(function () {
  'use strict';

  var currentQuestion = 0;
  var score = 0;
  var questions = [];
  var answered = false;
  var clickCount = 0;

  // Milestone messages for the clicker game
  var milestoneMessages = {
    10:   "That's a good start! 💖",
    25:   "You really do love me! 💕",
    50:   "Okay wow, you're serious! 💗",
    100:  "100 clicks of love!!! 💝",
    200:  "My heart can barely contain it! 💓",
    500:  "FIVE HUNDRED?! You're amazing! 🥰",
    1000: "One THOUSAND! This is infinite love! ♾️💕"
  };

  // ═══════════════════════════════════════════
  // QUIZ MODE
  // ═══════════════════════════════════════════

  /**
   * Initialize the quiz & clicker game.
   * @param {Array} quizQuestions - Array of { question, options[], correct }
   */
  window.initQuiz = function (quizQuestions) {
    questions = quizQuestions;
    currentQuestion = 0;
    score = 0;

    renderQuestion();
    initClicker();

    // Tab switching
    document.querySelectorAll('.quiz-tab').forEach(function (tab) {
      tab.addEventListener('click', function () {
        document.querySelectorAll('.quiz-tab').forEach(function (t) { t.classList.remove('active'); });
        this.classList.add('active');

        var mode = this.dataset.mode;
        document.getElementById('quiz-area').classList.toggle('hidden', mode !== 'quiz');
        document.getElementById('clicker-area').classList.toggle('hidden', mode !== 'clicker');
      });
    });
  };

  function renderQuestion() {
    var area = document.getElementById('quiz-area');
    if (!area) return;

    // Show results when all questions are done
    if (currentQuestion >= questions.length) {
      renderResult();
      return;
    }

    var q = questions[currentQuestion];
    answered = false;

    // Progress dots
    var dotsHTML = '';
    for (var d = 0; d < questions.length; d++) {
      var cls = 'quiz-dot';
      if (d === currentQuestion) cls += ' active';
      dotsHTML += '<div class="' + cls + '" id="quiz-dot-' + d + '"></div>';
    }

    // Option buttons
    var optionsHTML = '';
    for (var o = 0; o < q.options.length; o++) {
      optionsHTML += '<button class="quiz-option interactive" data-index="' + o + '">' + q.options[o] + '</button>';
    }

    area.innerHTML =
      '<div class="quiz-container">' +
        '<div class="quiz-question-card">' +
          '<div class="quiz-progress">' + dotsHTML + '</div>' +
          '<p class="quiz-question-text">' + q.question + '</p>' +
          '<div class="quiz-options">' + optionsHTML + '</div>' +
        '</div>' +
      '</div>';

    // Wire up answer handlers
    area.querySelectorAll('.quiz-option').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (answered) return;
        answered = true;

        var selected = parseInt(this.dataset.index);
        var correct = q.correct;

        // Disable all options
        area.querySelectorAll('.quiz-option').forEach(function (b) { b.classList.add('disabled'); });

        if (selected === correct) {
          this.classList.add('correct');
          score++;
          // Heart burst effect!
          var rect = this.getBoundingClientRect();
          if (window.createHeartBurst) {
            window.createHeartBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
          }
        } else {
          this.classList.add('wrong');
          // Highlight the correct answer
          area.querySelectorAll('.quiz-option')[correct].classList.add('correct');
        }

        // Update progress dots
        var dot = document.getElementById('quiz-dot-' + currentQuestion);
        if (dot) {
          dot.classList.remove('active');
          dot.classList.add(selected === correct ? 'correct' : 'wrong');
        }

        // Next question after a short pause
        setTimeout(function () {
          currentQuestion++;
          renderQuestion();
        }, 1500);
      });
    });
  }

  function renderResult() {
    var area = document.getElementById('quiz-area');
    var total = questions.length;
    var pct = Math.round((score / total) * 100);

    var msg;
    if (pct === 100)     msg = "Perfect score! You know us better than anyone! 🥰💕";
    else if (pct >= 80)  msg = "Amazing! You really pay attention to our love story! 💖";
    else if (pct >= 60)  msg = "Pretty good! Our love story is beautiful! 💗";
    else if (pct >= 40)  msg = "Not bad! We still have more memories to make! 💕";
    else                 msg = "Let's create more memories so you'll ace it next time! 💝";

    area.innerHTML =
      '<div class="quiz-container">' +
        '<div class="quiz-result">' +
          '<div class="quiz-score-circle">' + score + '/' + total + '<small>' + pct + '%</small></div>' +
          '<p class="quiz-result-msg">' + msg + '</p>' +
          '<button class="quiz-restart interactive" id="quiz-restart">Try Again 💕</button>' +
        '</div>' +
      '</div>';

    document.getElementById('quiz-restart').addEventListener('click', function () {
      currentQuestion = 0;
      score = 0;
      renderQuestion();
    });
  }

  // ═══════════════════════════════════════════
  // CLICKER GAME (Love Meter)
  // ═══════════════════════════════════════════

  function initClicker() {
    var area = document.getElementById('clicker-area');
    if (!area) return;

    clickCount = 0;

    area.innerHTML =
      '<div class="clicker-container">' +
        '<div class="clicker-heart interactive" id="clicker-heart">💖</div>' +
        '<div class="clicker-count" id="clicker-count">0</div>' +
        '<div class="clicker-label">clicks of love</div>' +
        '<div class="love-meter"><div class="love-meter-fill" id="love-meter-fill"></div></div>' +
        '<div class="clicker-milestone" id="clicker-milestone">Click the heart! 💕</div>' +
      '</div>';

    var heart = document.getElementById('clicker-heart');
    var countEl = document.getElementById('clicker-count');
    var fillEl = document.getElementById('love-meter-fill');
    var milestoneEl = document.getElementById('clicker-milestone');

    heart.addEventListener('click', function () {
      clickCount++;
      countEl.textContent = clickCount;

      // Grow heart proportionally (caps at ~3x)
      var scale = 1 + Math.min(clickCount * 0.002, 2);
      heart.style.fontSize = (5 * scale) + 'rem';

      // Pop animation
      heart.classList.remove('pop');
      void heart.offsetWidth; // force reflow
      heart.classList.add('pop');

      // Fill love meter (maxes out at 1000)
      var fill = Math.min((clickCount / 1000) * 100, 100);
      fillEl.style.width = fill + '%';

      // Check for milestone messages
      if (milestoneMessages[clickCount]) {
        milestoneEl.textContent = milestoneMessages[clickCount];
        milestoneEl.style.animation = 'none';
        void milestoneEl.offsetWidth;
        milestoneEl.style.animation = 'fadeSlideUp 0.5s ease';

        // Heart burst!
        var rect = heart.getBoundingClientRect();
        if (window.createHeartBurst) {
          window.createHeartBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
        }
      }
    });
  }
})();
