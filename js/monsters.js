try {
  $.getJSON("http://localhost/~tay/sharksnack.github.io/shiren2/json/monsters.json", function(data) {

    // load page HTML (2 sections - monster summary and monster details)
    document.getElementById("monster_explanation_table").innerHTML = monster_explanation_table(data);
    document.getElementById("monster_summary_table").innerHTML = monster_summary_table(data);
    document.getElementById("monster_details").innerHTML = monster_details(data);
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
