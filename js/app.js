/**
 * 💕 Happy Girlfriend Day — Main Application
 * Router, Personalization Config, and Page Management
 */
(function () {
  'use strict';

  // ═══════════════════════════════════════════════════════════════
  // 🎀 PERSONALIZE THIS SECTION 🎀
  // ─────────────────────────────────────────────────────────────
  // Change these values to make the site yours!
  // This is the ONLY section you need to edit.
  // ═══════════════════════════════════════════════════════════════

  var CONFIG = {

    // ─── Her Name & Nickname ───
    herName: "Rajeshwarii",
    nickname: "Karu",

    // ─── Login Settings ───
    // Passwords for the login screen (change these!)
    adminName: "Dumbo",           // Your display name on login screen
    adminPassword: "iloveyou",    // Your password (admin — can edit photos)
    viewerPassword: "karu",       // Her password (viewer — view & interact only)

    // ─── Why I Love You (8 flip-cards) ───
    // Each card has an icon, title, and the reason text on the back.
    reasons: [
      { icon: "✨", title: "Your Smile",        text: "Your smile could light up the darkest room. Every time you smile at me, I fall in love all over again." },
      { icon: "🌙", title: "Your Kindness",     text: "The way you care about everyone around you — your kindness knows no bounds, and it inspires me every single day." },
      { icon: "🎵", title: "Your Laugh",        text: "Your laugh is my favorite sound in the entire world. I'd do anything just to hear it every single day." },
      { icon: "🌸", title: "Your Strength",     text: "You are the strongest person I know. You face every challenge with grace, and I admire you endlessly." },
      { icon: "🦋", title: "Your Dreams",       text: "The way your eyes sparkle when you talk about your dreams... I want to help make every single one come true." },
      { icon: "🌈", title: "Your Warmth",       text: "Being with you feels like home. Your warmth wraps around me like the coziest blanket on a cold night." },
      { icon: "💫", title: "Your Intelligence",  text: "Your brilliant mind amazes me. The way you think, learn, and grow — you make me want to be a better person too." },
      { icon: "🌺", title: "Just... You",       text: "I love you because you are YOU. Every imperfection, every quirk, every little thing makes you perfectly mine." }
    ],

    // ─── Our Timeline (Relationship Milestones) ───
    // Add your dates, titles, captions, and photo paths.
    // Leave photo empty ("") for a placeholder.
    timeline: [
      { date: "📍 The Beginning",   title: "When We First Met",         caption: "The day my life changed forever. I didn't know it then, but I had just met the love of my life.",                           photo: "" },
      { date: "💬 Getting Closer",  title: "Our First Conversation",    caption: "Hours flew by like minutes. We talked, we laughed, and I knew there was something incredibly special about you.",          photo: "" },
      { date: "💕 The Moment",      title: "When I Knew",               caption: "There was a moment when everything clicked — I realized I wanted you in my life, forever and always.",                     photo: "" },
      { date: "🌟 Together",        title: "We Became Us",              caption: "The best 'yes' I ever heard. The day we officially started our beautiful journey together.",                               photo: "" },
      { date: "🎉 Memories",        title: "Adventures Together",       caption: "Every date, every trip, every lazy afternoon — each moment with you is a treasure I'll never forget.",                     photo: "" },
      { date: "💖 Today",           title: "Still Falling For You",     caption: "Even now, every single day I discover a new reason to love you more than the day before.",                                 photo: "" }
    ],

    // ─── Memory Gallery ───
    // Add your photo paths and captions.
    // Leave src empty ("") for a gradient placeholder.
    gallery: [
      { src: "", caption: "Our first photo together 📸" },
      { src: "", caption: "That perfect sunset date 🌅" },
      { src: "", caption: "Laughing at our inside jokes 😄" },
      { src: "", caption: "Our favorite spot 🌸" },
      { src: "", caption: "Dressed up for a special night ✨" },
      { src: "", caption: "Just being us, perfectly imperfect 💕" },
      { src: "", caption: "Adventures in the making 🗺️" },
      { src: "", caption: "A candid moment of pure love 💖" }
    ],

    // ─── Love Quiz Questions ───
    // Change questions, options, and set `correct` to the
    // index (0-3) of the right answer.
    quizQuestions: [
      {
        question: "What's the first thing I noticed about you?",
        options: ["Your beautiful eyes", "Your amazing smile", "Your kind heart", "Your sense of humor"],
        correct: 1
      },
      {
        question: "What's our song? (or what should be our song?)",
        options: ["Perfect — Ed Sheeran", "All of Me — John Legend", "Tum Hi Ho — Arijit Singh", "A Thousand Years — Christina Perri"],
        correct: 2
      },
      {
        question: "What do I love doing most with you?",
        options: ["Watching movies together", "Long walks and talks", "Cooking together", "Just being in your presence"],
        correct: 3
      },
      {
        question: "What's my favorite thing you do without realizing?",
        options: ["The way you scrunch your nose", "When you hum songs randomly", "How you play with your hair", "Your little dance when you're happy"],
        correct: 2
      },
      {
        question: "If I could give you anything, what would it be?",
        options: ["A trip around the world", "A lifetime of happiness", "All the stars in the sky", "All of the above, and more 💕"],
        correct: 3
      }
    ],

    // ─── Love Letter ───
    letterText: {
      greeting: "My Dearest Karu,",
      body: "There are not enough words in any language to tell you how much you mean to me. From the moment you came into my life, everything changed — colors became brighter, days became warmer, and my heart finally found its home.\n\nYou are my favorite person, my best friend, my partner in everything. I love the way you laugh, the way you care, the way you make even ordinary moments feel extraordinary.\n\nOn this Girlfriend Day, I want you to know — I don't just love you today. I love you on every ordinary Tuesday, every busy Monday, every quiet Sunday. I love you in the big moments and the small ones. I love you when you're happy, when you're silly, and even when you're mad at me (you're cute when you're angry, don't tell me otherwise 😄).\n\nThank you for choosing me. Thank you for loving me. Thank you for being the most beautiful person — inside and out.",
      signature: "Forever & Always Yours ❤️",
      heart: "💕"
    },

    // ─── Surprise Page ───
    surpriseTitle: "You Are My Everything, Karu! 🌟",
    surpriseText: 'If you\'re reading this, it means you couldn\'t resist clicking that button — just like I can\'t resist falling for you every single day.<br><br>You are the most <span class="highlight">beautiful</span>, <span class="highlight">incredible</span>, <span class="highlight">amazing</span> person I\'ve ever known. And I am the luckiest person alive because I get to call you mine.<br><br>Here\'s my promise to you: I will love you louder, hold you tighter, and choose you <span class="highlight">always</span>. Today, tomorrow, and every day after that. 💕',

    // ─── Playlist Embed (optional) ───
    // Paste a Spotify or YouTube embed URL, or leave empty to hide.
    // Example: "https://open.spotify.com/embed/playlist/YOUR_PLAYLIST_ID"
    playlistEmbed: ""
  };

  // ═══════════════════════════════════════════════════════════════
  // 🚫 BELOW THIS LINE: Application logic
  //    (Edit only if you know what you're doing!)
  // ═══════════════════════════════════════════════════════════════

  var pages = ['reasons', 'timeline', 'gallery', 'quiz', 'letter'];

  // ─── Populate All Dynamic Content ───

  function populateContent() {
    // Welcome page name
    var welcomeName = document.getElementById('welcome-name');
    if (welcomeName) welcomeName.textContent = CONFIG.nickname + ' 💕';

    var navBrand = document.getElementById('nav-brand');
    if (navBrand) navBrand.textContent = '💕 For ' + CONFIG.nickname;

    // Build sections
    buildReasonCards();

    if (window.initTimeline)  window.initTimeline(CONFIG.timeline);
    if (window.initGallery)   window.initGallery(CONFIG.gallery);
    if (window.initQuiz)      window.initQuiz(CONFIG.quizQuestions);

    buildLetter();
    buildSurprise();
  }

  // ─── Flip Cards ───

  function buildReasonCards() {
    var grid = document.getElementById('reasons-grid');
    if (!grid) return;

    CONFIG.reasons.forEach(function (reason, i) {
      var card = document.createElement('div');
      card.className = 'flip-card interactive';
      card.innerHTML =
        '<div class="flip-card-inner">' +
          '<div class="flip-card-front">' +
            '<span class="card-icon">' + reason.icon + '</span>' +
            '<span class="card-label">' + reason.title + '</span>' +
            '<span class="card-hint">Click to reveal</span>' +
          '</div>' +
          '<div class="flip-card-back">' +
            '<span class="reason-number">#' + (i + 1) + '</span>' +
            '<p class="reason-text">' + reason.text + '</p>' +
          '</div>' +
        '</div>';

      card.addEventListener('click', function () {
        this.classList.toggle('flipped');
        if (this.classList.contains('flipped')) {
          var rect = this.getBoundingClientRect();
          if (window.createHeartBurst) {
            window.createHeartBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
          }
        }
      });

      grid.appendChild(card);
    });
  }

  // ─── Love Letter ───

  function buildLetter() {
    var content = document.getElementById('letter-content');
    var wrapper = document.getElementById('envelope-wrapper');
    if (!content || !wrapper) return;

    var lt = CONFIG.letterText;
    var paragraphs = lt.body.split('\n\n');
    var bodyHTML = '';
    for (var p = 0; p < paragraphs.length; p++) {
      bodyHTML += '<p style="margin-bottom: 16px;">' + paragraphs[p] + '</p>';
    }

    content.innerHTML =
      '<span class="letter-greeting">' + lt.greeting + '</span>' +
      bodyHTML +
      '<div class="letter-sign">' + lt.signature + '</div>' +
      '<span class="letter-heart">' + lt.heart + '</span>';

    wrapper.addEventListener('click', function () {
      if (!this.classList.contains('opened')) {
        this.classList.add('opened');
        var hint = document.getElementById('letter-hint');
        if (hint) hint.textContent = '💕';
      }
    });
  }

  // ─── Surprise Page ───

  function buildSurprise() {
    var title = document.getElementById('surprise-title');
    var text = document.getElementById('surprise-text');
    if (title) title.innerHTML = CONFIG.surpriseTitle;
    if (text)  text.innerHTML = CONFIG.surpriseText;

    // Playlist embed (if provided)
    if (CONFIG.playlistEmbed) {
      var embed = document.getElementById('playlist-embed');
      if (embed) {
        embed.innerHTML =
          '<iframe src="' + CONFIG.playlistEmbed + '" width="100%" height="152" ' +
          'frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" ' +
          'loading="lazy" style="border-radius: 12px;"></iframe>';
      }
    }
  }

  // ─── Page Router ───

  function navigateTo(pageName) {
    // Remove active from all pages and activate the target
    document.querySelectorAll('#main-site .page').forEach(function (p) {
      p.classList.remove('active');
    });

    var target = document.getElementById('page-' + pageName);
    if (target) {
      target.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Refresh timeline progress when its page is shown
      if (pageName === 'timeline' && window.updateTimelineProgress) {
        setTimeout(window.updateTimelineProgress, 100);
      }
    }

    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(function (link) {
      link.classList.toggle('active', link.dataset.page === pageName);
    });

    closeMobileNav();
  }

  // ─── Welcome → Main Site ───

  function enterSite() {
    var welcome = document.getElementById('welcome-page');
    var mainSite = document.getElementById('main-site');
    var surpriseBtn = document.getElementById('surprise-btn');

    welcome.classList.add('exit');

    setTimeout(function () {
      welcome.style.display = 'none';
      mainSite.classList.remove('hidden');
      surpriseBtn.classList.remove('hidden');
      navigateTo('reasons');
    }, 800);
  }

  // ─── Surprise Page Controls ───

  function openSurprise() {
    var surprise = document.getElementById('page-surprise');
    var mainSite = document.getElementById('main-site');
    var surpriseBtn = document.getElementById('surprise-btn');

    mainSite.classList.add('hidden');
    surpriseBtn.classList.add('hidden');
    surprise.classList.remove('hidden');
    surprise.classList.add('active');

    setTimeout(function () {
      if (window.launchConfetti) window.launchConfetti();
    }, 300);
  }

  function closeSurprise() {
    var surprise = document.getElementById('page-surprise');
    var mainSite = document.getElementById('main-site');
    var surpriseBtn = document.getElementById('surprise-btn');

    surprise.classList.remove('active');
    surprise.classList.add('hidden');
    mainSite.classList.remove('hidden');
    surpriseBtn.classList.remove('hidden');
  }

  // ─── Mobile Nav ───

  function closeMobileNav() {
    var links = document.getElementById('nav-links');
    var toggle = document.getElementById('nav-toggle');
    var overlay = document.getElementById('nav-overlay');
    if (links) links.classList.remove('open');
    if (toggle) toggle.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
  }

  // ─── Navbar Scroll Shadow ───

  function handleNavScroll() {
    var navbar = document.getElementById('navbar');
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 10);
  }

  // ─── Login System ───

  function setupLogin() {
    var modal = document.getElementById('login-modal');
    var form = document.getElementById('login-form');
    var passwordInput = document.getElementById('login-password');
    var errorMsg = document.getElementById('login-error');
    var selectedRole = null;

    // Set profile names from CONFIG
    var adminNameEl = document.getElementById('profile-admin-name');
    var viewerNameEl = document.getElementById('profile-viewer-name');
    if (adminNameEl) adminNameEl.textContent = CONFIG.adminName;
    if (viewerNameEl) viewerNameEl.textContent = CONFIG.nickname;

    // Profile button click → show password field
    document.querySelectorAll('.profile-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        selectedRole = this.dataset.role;
        document.querySelectorAll('.profile-btn').forEach(function (b) { b.classList.remove('selected'); });
        this.classList.add('selected');

        form.classList.remove('hidden');
        var label = document.getElementById('login-form-label');
        if (label) {
          label.textContent = selectedRole === 'admin'
            ? 'Enter your password, ' + CONFIG.adminName + ':'
            : 'Enter your password, ' + CONFIG.nickname + ':';
        }
        passwordInput.value = '';
        errorMsg.classList.add('hidden');
        passwordInput.focus();
      });
    });

    // Attempt login
    function attemptLogin() {
      var password = passwordInput.value;
      var correctPw = selectedRole === 'admin' ? CONFIG.adminPassword : CONFIG.viewerPassword;

      if (password === correctPw) {
        window.AuthSystem.login(selectedRole);

        // Fade out login modal
        modal.style.opacity = '0';
        modal.style.transform = 'scale(1.05)';
        modal.style.transition = 'all 0.6s ease';
        modal.style.pointerEvents = 'none';

        setTimeout(function () {
          modal.classList.add('hidden');
          modal.style = '';
          onLoginComplete();
        }, 600);
      } else {
        errorMsg.classList.remove('hidden');
        passwordInput.value = '';
        passwordInput.focus();
      }
    }

    document.getElementById('login-submit').addEventListener('click', attemptLogin);
    passwordInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') attemptLogin();
    });

    // Back button
    document.getElementById('login-back').addEventListener('click', function () {
      form.classList.add('hidden');
      document.querySelectorAll('.profile-btn').forEach(function (b) { b.classList.remove('selected'); });
      selectedRole = null;
    });
  }

  function onLoginComplete() {
    // Enable admin mode if admin
    if (window.AuthSystem && window.AuthSystem.isAdmin()) {
      document.body.classList.add('admin-mode');
      if (window.PhotoEditor) window.PhotoEditor.addEditOverlays();
    }
  }

  // ─── Initialize Everything ───

  function init() {
    populateContent();

    // Setup login system
    setupLogin();

    // Check if already logged in → skip login modal
    if (window.AuthSystem && window.AuthSystem.isLoggedIn()) {
      document.getElementById('login-modal').classList.add('hidden');
      onLoginComplete();
    }

    // Logout button
    document.getElementById('logout-btn').addEventListener('click', function () {
      if (window.AuthSystem) window.AuthSystem.logout();
      location.reload();
    });

    // Welcome enter button
    document.getElementById('enter-btn').addEventListener('click', enterSite);

    // Navigation links
    document.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        navigateTo(this.dataset.page);
      });
    });

    // Hamburger menu
    document.getElementById('nav-toggle').addEventListener('click', function () {
      this.classList.toggle('open');
      document.getElementById('nav-links').classList.toggle('open');
      document.getElementById('nav-overlay').classList.toggle('active');
    });

    // Close mobile nav on overlay click
    document.getElementById('nav-overlay').addEventListener('click', closeMobileNav);

    // Surprise buttons
    document.getElementById('surprise-btn').addEventListener('click', openSurprise);
    document.getElementById('surprise-back').addEventListener('click', closeSurprise);
    document.getElementById('replay-confetti').addEventListener('click', function () {
      if (window.launchConfetti) window.launchConfetti();
    });

    // Navbar scroll shadow
    window.addEventListener('scroll', handleNavScroll, { passive: true });

    // Hash-based deep linking
    window.addEventListener('hashchange', function () {
      var hash = window.location.hash.replace('#', '');
      if (pages.indexOf(hash) !== -1) {
        navigateTo(hash);
      }
    });

    // Check for initial hash (e.g., shared link)
    var initialHash = window.location.hash.replace('#', '');
    if (pages.indexOf(initialHash) !== -1) {
      enterSite();
      setTimeout(function () { navigateTo(initialHash); }, 900);
    }
  }

  // Start!
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
