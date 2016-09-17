var response;

function loadXMLDoc() {
  var xmlhttp = new XMLHttpRequest();
  var search_button = document.getElementById("search_button");
  var container = document.getElementById("repositories");

  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
      if (xmlhttp.status == 200) {
        response = JSON.parse(xmlhttp.responseText);
        if(response.length > 0) {
          document.getElementById("avatar").src = response[0].owner.avatar_url;
          
          // remove previous results if any
          // reset with table
          // DOM manipulation
          container.innerHTML = '<table class="table table-responsive"><tr id="chart_row"></tr></table>';

          var appendDiv = document.createElement("div");
          appendDiv.className = "list-group"
          var panel = document.createElement("div");
          response.forEach(function(repo) {
            var panel_heading = document.createElement("div");
            var panel_body = document.createElement("div");
            var link = document.createElement("a");
            link.href = repo.html_url;
            panel.className = "list-item-group panel panel-default";
            panel_heading.className = "panel-heading";
            panel_body.className = "panel-body";
            link.appendChild(document.createTextNode(repo.name));
            panel_heading.appendChild(link);
            panel.appendChild(panel_heading);

            // only add description if it exists
            if(repo.description) {
              panel_body.appendChild(document.createTextNode(repo.description));
              panel.appendChild(panel_body);
            }
            appendDiv.appendChild(panel);
            
          });
          container.appendChild(appendDiv); // append to DOM
          
          // set username heading
          document.getElementById("avatar_title").innerText = search_button.value + "'s repositories";
          
          chart(); // build charts after loading api response
        }
      } else {

        // display error message
        var error_alert = document.createElement("div");
        error_alert.className = "alert alert-danger";
        error_alert.role = "alert";
        error_alert.appendChild(document.createTextNode("Error! No user found with that name"));
        container.appendChild(error_alert);
      }
    }
  };

  xmlhttp.open("GET", "https://api.github.com/users/" + search_button.value + "/repos", true);
  xmlhttp.send();
}

