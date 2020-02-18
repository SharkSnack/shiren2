$(document).ready(function() {
  // load some common HTML
  try {
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
