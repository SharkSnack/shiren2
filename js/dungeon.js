try {
  $.getJSON("https://sharksnack.github.io/shiren2/json/dungeon.json", function(data) {

  });
} catch(e) {
  console.log(e);
}

$(document).ready(function() {
  // load some common HTML
  try {
    $("#header").load("../../html/header.html", function() {
      console.log('info - loaded header');
    });
    $("#sidebar").load("../../html/sidebar.html", function() {
      console.log('info - loaded sidebar');
    });
    $("#footer").load("../../html/footer.html", function() {
      console.log('info - loaded footer');
    });
  } catch(e) {
    console.log('error: ' + e);
  }
});