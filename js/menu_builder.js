function build_header() {
  document.write('<link rel="shortcut icon" href="/../img/favicon/favicon_real.ico"/>');
  document.write('<link rel="stylesheet" href="/../css/style.css">');
  document.write('<link rel="stylesheet" href="/../css/vincent_durand.css">');
  document.write('<link rel="stylesheet" href="/../css/style_dark_mode.css">');
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
  document.write('<li class="menu-item"><a href="/index.html">About Me</a></li>');
  document.write('<li class="menu-item">');
  document.write('<a href="/html/creations.html">Creations</a>');
  document.write('<ol class="sub-menu">');
  document.write('<li class="menu-item"><a href="https://fourword.xyz" target="_blank">Fourword</a></li>');
  document.write('<li class="menu-item"><a href="https://pyramini.com" target="_blank">Pyramini</a></li>');
  // document.write('<li class="menu-item"><a href="/html/letter_game.html">The Letter Game</a></li>');
  // document.write('<li class="menu-item"><a href="/html/bingo_builder.html">Bingo Builder</a></li>');
  // document.write('<li class="menu-item"><a href="/html/spelling_bee.html">Spelling Bee</a></li>');
  // document.write('<li class="menu-item"><a href="/html/game_of_life.html">Game of Life</a></li>');
  document.write('<li class="menu-item"><a href="/html/creations.html">More</a></li>');
  document.write('</ol></li>');
  // document.write('<li class="menu-item">');
  // document.write('<a href="/html/portfolio.html">Portfolio</a>');
  // document.write('<ol class="sub-menu">');
  // document.write('<li class="menu-item"><a href="/html/plus4.html">Plus4</a></li>');
  // document.write('<li class="menu-item"><a href="/html/quadris.html">Quadris</a></li>');
  // document.write('<li class="menu-item"><a href="/html/free_rice.html">Free Rice</a></li>');
  // document.write('<li class="menu-item"><a href="/html/iReverse.html">iReverse</a></li>');
  // document.write('<li class="menu-item"><a href="/html/grubsteak.html">Grubsteak</a></li>');
  // document.write('</ol></li>');
  // document.write('<li class="menu-item">');
  // document.write('<a href="#0">Look, I\'m on the Internet!</a>');
  // document.write('<ol class="sub-menu">');
  // document.write('<li class="menu-item"><a href="https://binarymarbles.weebly.com" target="_blank">Binary Marbles</a></li>');
  // document.write('<li class="menu-item"><a href="https://edrl.berkeley.edu/people/liam-kreiss/" target="_blank">Berkeley Research</a></li>');
  // document.write('<li class="menu-item"><a href="https://ultiworld.com/2019/06/05/best-worst-jerseys-2019-college-national-championships/usau_college_nats_dqt_20190525_081624-zf-2413-34991-1-003/" target="_blank">Ultimate Frisbee</a></li>');
  // document.write('<li class="menu-item"><a href="https://www.instagram.com/p/B965GvEn-RP/?igshid=120htfiffh8yk" target="_blank">Celebration</a></li>');
  // document.write('</ol></li>');
  // document.write('<li class="menu-item"><a href="/html/about.html">About Me</a></li>');
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
  if (hasCookie("theme")) {
    let cur_theme = getCookie("theme");
    setCookie("theme", (cur_theme.includes('light') ? 'dark' : 'light'));
    printCookies();
  } else {
    setCookie("theme", "dark");
  }
  toggle_dark_mode();
}

function color_mode() {
  if (hasCookie("color")) {
    let cur_color = getCookie("color");
    setCookie("color", cur_color.includes('none') ? 'colored' : 'none');
  } else {
    setCookie("color", "lightsteelblue");
  }
  toggle_color_mode();
}

function toggle_color_mode() {
  var body = document.body;
  body.classList.toggle("color-mode-body");
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
  var cur_theme = getCookie("theme");
  if (!cur_theme) {
    return false;
  }
  return cur_theme.includes("dark");
}

function is_color_mode() {
  var cur_theme = getCookie("color");
  if (!cur_theme) {
    return false;
  }
  return cur_theme.includes("colored");
}

function check_and_set_dark_mode() {
  if (is_dark_mode()) {
    toggle_dark_mode();
  }

  if (is_color_mode()) {
    toggle_color_mode();
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
  document.write('<a class="icon" id="color_mode_button" title="Color Mode" onclick="color_mode()"><i class="fas fa-paint-brush"></i></a>');
  document.write('</div>');
  document.write('</div>');
  build_ground();
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

function build_ground() {
  document.write('<p id="ground"></p>');
}

/*
<p id="ground"></p>
*/

//from https://www.tabnine.com/academy/javascript/how-to-set-cookies-javascript/#:~:text=To%20update%20a%20cookie%2C%20simply,Name%2C%20but%20a%20different%20Value.
function getCookie(cName) {
  const name = cName + "=";
  const cDecoded = decodeURIComponent(document.cookie); //to be careful
  const cArr = cDecoded.split('; ');
  let res;
  cArr.forEach(val => {
      if (val.indexOf(name) === 0) res = val.substring(name.length);
  })
  return res;
}

//from https://www.tabnine.com/academy/javascript/how-to-set-cookies-javascript/#:~:text=To%20update%20a%20cookie%2C%20simply,Name%2C%20but%20a%20different%20Value.
function setCookie(cName, cValue, expDays=1) {
  let date = new Date();
  date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
}

function hasCookie(cName) {
  const name = cName + "=";
  const cDecoded = decodeURIComponent(document.cookie); //to be careful
  const cArr = cDecoded.split('; ');
  let res = false;
  cArr.forEach(val => {
      if (val.indexOf(name) === 0) res = true;
  })
  return res;
}

// from https://stackoverflow.com/questions/179355/clearing-all-cookies-with-javascript
function deleteAllCookies() {
  var cookies = document.cookie.split("; ");

  for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}

function printCookies() {
  console.log('Cookies are now: ' + document.cookie);
}