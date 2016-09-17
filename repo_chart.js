google.charts.load("current", {"packages":["corechart"]});

function chart() {
  var stargazer = response;
  var watchers = response;

  // sort high to low stars and watchers
  stargazer.sort(function(a, b) {
    return b.stargazer_count - a.stargazer_count;
  });
  watchers.sort(function(a, b) {
    return b.watchers_count - a.watchers_count;
  });
  drawChart(stargazer, "Stars", "stargazers_count");
  drawChart(watchers, "Watchers", "watchers_count");
}

function drawChart(metric, title, metric_name) {
  var count = [];
  var watched = [];

  count.push(["Repository", title, { role: "style" } ]);

  // only display the top 5 
  for(var i=0;i<4;i++) {
    count.push([metric[i].name, metric[i][metric_name], "color: blue"])
  }

  var data = new google.visualization.arrayToDataTable(count);

  var chart_title = "Repo with most " + title;
  var options = {"title": chart_title,
    "width":640,
    "height":480
  };

  var chart_div = document.createElement("div");
  var chart_cell = document.createElement("td");
  chart_div.id = title;
  chart_cell.appendChild(chart_div);
  document.getElementById("chart_row").appendChild(chart_cell); // append to DOM
  
  var chart = new google.visualization.ColumnChart(chart_div);
  chart.draw(data, options);
}

