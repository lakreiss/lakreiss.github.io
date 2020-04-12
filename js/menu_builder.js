function build_header() {
  document.write('<link rel="shortcut icon" href="img/favicon/favicon_real.ico"/>');
  document.write('<link rel="stylesheet" href="css/style.css">');
  document.write('<link rel="stylesheet" href="css/vincent_durand.css">');
  document.write('<link rel="stylesheet" href="css/style_dark_mode.css">');
  document.write('<script src="https://kit.fontawesome.com/fc40f0ea91.js" crossorigin="anonymous"></script>');

}

// <link rel="shortcut icon" href="img/favicon/favicon_real.ico" />
// <link rel="stylesheet" href="css/style.css">
// <link rel="stylesheet" href="css/vincent_durand.css">
// <script src="https://kit.fontawesome.com/fc40f0ea91.js" crossorigin="anonymous"></script>
//
// <script src="js/menu_builder.js"></script>


function build_menu() {
  document.write('<nav class="menu">');
  document.write('<ol>');
  document.write('<li class="menu-item"><a href="/index.html">Home</a></li>');
  document.write('<li class="menu-item">');
  document.write('<a href="/portfolio.html">Portfolio</a>');
  document.write('<ol class="sub-menu">');
  document.write('<li class="menu-item"><a href="/plus4.html">Plus4</a></li>');
  document.write('<li class="menu-item"><a href="/quadris.html">Quadris</a></li>');
  document.write('<li class="menu-item"><a href="/free_rice.html">Free Rice</a></li>');
  document.write('<li class="menu-item"><a href="/iReverse.html">iReverse</a></li>');
  document.write('<li class="menu-item"><a href="/grubsteak.html">Grubsteak</a></li>');
  document.write('</ol></li>');
  document.write('<li class="menu-item">');
  document.write('<a href="#0">Web Apps</a>');
  document.write('<ol class="sub-menu">');
  document.write('<li class="menu-item"><a href="/letter_game.html">The Letter Game</a></li>');
  document.write('<li class="menu-item"><a href="/bingo_builder.html">Bingo Builder</a></li>');
  document.write('<li class="menu-item"><a href="/balanced_ternary.html">Balanced Ternary Calculator</a></li>');
  document.write('<li class="menu-item"><a href="/assassin.html">Assassin</a></li>');
  document.write('</ol></li>');
  document.write('<li class="menu-item">');
  document.write('<a href="#0">Look, I\'m on the Internet!</a>');
  document.write('<ol class="sub-menu">');
  document.write('<li class="menu-item"><a href="https://binarymarbles.weebly.com" target="_blank">Binary Marbles</a></li>');
  document.write('<li class="menu-item"><a href="https://edrl.berkeley.edu/people/liam-kreiss/" target="_blank">Berkeley Research</a></li>');
  document.write('<li class="menu-item"><a href="https://ultiworld.com/2019/06/05/best-worst-jerseys-2019-college-national-championships/usau_college_nats_dqt_20190525_081624-zf-2413-34991-1-003/" target="_blank">Ultimate Frisbee</a></li>');
  document.write('<li class="menu-item"><a href="https://www.instagram.com/p/B965GvEn-RP/?igshid=120htfiffh8yk" target="_blank">Celebration</a></li>');
  document.write('</ol></li>');
  document.write('<li class="menu-item"><a href="/about.html">About</a></li>');
  document.write('</ol>');
  document.write('</nav>');
}

/*

<nav class="menu">
  <ol>
    <li class="menu-item"><a href="/index.html">Home</a></li>
    <li class="menu-item">
      <a href="#0">Coding</a>
      <ol class="sub-menu">
        <li class="menu-item"><a href="/plus4.html">Plus4</a></li>
        <li class="menu-item"><a href="/quadris.html">Quadris</a></li>
        <li class="menu-item"><a href="/free_rice.html">Free Rice</a></li>
        <li class="menu-item"><a href="/iReverse.html">iReverse</a></li>
        <li class="menu-item"><a href="/grubsteak_home_page.html">Grubsteak</a></li>
      </ol>
    </li>
    <li class="menu-item">
      <a href="#0">Projects</a>
      <ol class="sub-menu">
        <li class="menu-item"><a href="/letter_game.html" target="_blank">The Letter Game</a></li>
        <li class="menu-item"><a href="/bingo_builder.html" target="_blank">Bingo Builder</a></li>
      </ol>
    </li>
    <li class="menu-item">
      <a href="#0">Look, I'm on the Internet!</a>
      <ol class="sub-menu">
        <li class="menu-item"><a href="https://binarymarbles.weebly.com" target="_blank">Binary Marbles</a></li>
        <li class="menu-item"><a href="https://edrl.berkeley.edu/people/liam-kreiss/" target="_blank">Berkeley Research</a></li>
        <li class="menu-item"><a href="https://ultiworld.com/2019/06/05/best-worst-jerseys-2019-college-national-championships/usau_college_nats_dqt_20190525_081624-zf-2413-34991-1-003/" target="_blank">Ultimate Frisbee</a></li>
        <li class="menu-item"><a href="https://www.instagram.com/p/B965GvEn-RP/?igshid=120htfiffh8yk" target="_blank">Celebration</a></li>
      </ol>
    </li>
    <li class="menu-item"><a href="/about.html">About</a></li>
  </ol>
</nav>

*/

function dark_mode() {
  if (document.cookie.includes("theme=")) {
    document.cookie = 'theme=' + (document.cookie.split("theme=")[1].includes('light') ? 'dark' : 'light');
    console.log('Cookies are now: ' + document.cookie.split("theme=")[1]);
  } else {
    document.cookie = 'theme=dark';
  }
  toggle_dark_mode();
}

function toggle_dark_mode() {
  var body = document.body;
  body.classList.toggle("dark-mode-body");

  var menu = document.getElementsByClassName("menu");
  for (var i = 0; i < menu.length; i++) {
    menu[i].classList.toggle("dark-mode-menu");
  }

  var text_elements = document.getElementsByClassName("text");
  for (var i = 0; i < text_elements.length; i++) {
    text_elements[i].classList.toggle("dark-mode-text");
  }

  var footer = document.getElementById("footer");
  var footer_icons = footer.getElementsByClassName("icon");
  for (var i = 0; i < footer_icons.length; i++) {
    footer_icons[i].classList.toggle("dark-mode-icon");
  }

  var dark_mode_button = document.getElementById("dark_mode_button");
  if (is_dark_mode()) {
    dark_mode_button.innerHTML = '<i class="fas fa-sun">';
  } else {
    dark_mode_button.innerHTML = '<i class="fas fa-moon">';
  }

}

function is_dark_mode() {
  var cur_theme = document.cookie.split("theme=")[1];
  // alert("is dark? " + cur_theme.includes("dark"));
  if (!cur_theme) {
    return false;
  }
  return cur_theme.includes("dark");
}

function check_and_set_dark_mode() {
  if (is_dark_mode()) {
    toggle_dark_mode();
  }
}

function build_footer() {
  document.write('<div id="footer">');
  document.write('<div class="icons">');
  document.write('<a class="icon" title="Email Me" href="mailto:liam.kreiss@gmail.com" target="_blank"><i class="fas fa-envelope"></i></a>');
  document.write('<a class="icon" title="Books I\'ve Read" href="https://www.goodreads.com/user/show/82975472-liam-kreiss" target="_blank"><i class="fas fa-book"></i></i></a>');
  document.write('<a class="icon" title="My LinkedIn" href="https://www.linkedin.com/in/lakreiss/" target="_blank"><i class="fab fa-linkedin"></i></a>');
  document.write('<a class="icon" title="My Github" href="https://github.com/lakreiss" target="_blank"><i class="fab fa-github"></i></a>');
  document.write('<a class="icon" id="dark_mode_button" title="Dark Mode" onclick="dark_mode()"><i class="fas fa-moon"></i></a>');
  document.write('</div>');
  document.write('</div>');
}

/*
<div id="footer">
  <div class="icons">
    <a title="Email Me" href="mailto:liam.kreiss@gmail.com" class="fa social fa-envelope" target="_blank"></a>
    <a title="Books I've Read" href="https://www.goodreads.com/user/show/82975472-liam-kreiss" class="fa social fa-book" target="_blank"></a>
    <a title="My LinkedIn" href="https://www.linkedin.com/in/lakreiss/" class="fa social fa-linkedin" target="_blank"></a>
    <a title="My Github" href="https://github.com/lakreiss" class="fa social fa-github" target="_blank"></a>
  </div>
</div>

*/
