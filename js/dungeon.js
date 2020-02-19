try {

} catch(e) {
  console.log(e);
}

$(document).ready(function() {
  // load some common HTML
  try {
    $("#sidebar").load("../../html/sidebar.html", function() {
      console.log('info - loaded sidebar');
    });
  } catch(e) {
    console.log('error: ' + e);
  }
});
