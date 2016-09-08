function setupClock() {
	timestamp = 'local';
	time = [
		{"unit": "hrs", "value": 0, "capacity": 12, "radius": 130}, 
		{"unit": "mins", "value": 0, "capacity": 60, "radius": 165}, 
		{"unit": "secs", "value": 0, "capacity": 60, "radius": 200}
	];

	$.getJSON("http://freegeoip.net/json/", function(data) { 
		$("#location").text(data.city);
	});
}


function generateClock() {
	arc = d3.svg.arc();

	var w = 550,
		h = 550;

	var color = d3.scale.ordinal()
		.domain(time)
		.range(['#bd0c0c', '#000000', '#000000']);

	var svg = d3.select("#wrapper").html('')
		.append("svg")
			.attr('width', w)
			.attr('height', h);

	var clock = svg.append("g")
			.attr('transform', 'translate(' + w / 2 + ',' + h / 2 + ')');

	var ticks = clock.selectAll("tick")
		.data(d3.range(12))
		.enter()
		.append("path")
			.attr('class', 'tick')
			.attr('d', arc.innerRadius(210)
						  .outerRadius(240)
						  .startAngle(function(d) { 
						  	if(d == 0 || d == 3 || d == 6 || d == 9)
						  		return (2 * Math.PI) / 12 * d - 0.05;
						  	else
						  		return (2 * Math.PI) / 12 * d - 0.01;
						  })
						  .endAngle(function(d) { 
						  	if(d == 0 || d == 3 || d == 6 || d == 9)
						  		return (2 * Math.PI) / 12 * d + 0.05;
						  	else
						  		return (2 * Math.PI) / 12 * d + 0.01 ;
						  }));

		
	clock.append("g").append("path")
		.attr('class', 'inner')
		.attr('d', arc.innerRadius(25)
					  .outerRadius(28)
					  .startAngle(0)
					  .endAngle(2 * Math.PI));

	
	var hands = clock.selectAll("hand")
		.data(time)
		.enter()
		.append("g");

	hands.append("path") 
		.attr('class', function(d) { return d.unit; })
		.style('fill', function(d, i) { return color(d.unit); });
		

	// var digits = clock.selectAll("digit")
	// 	.data(time)
	// 	.enter()
	// 	.append("g");

	// digits.append("text")
	// 	.attr('class', function(d) { return d.unit; })
	// 	.style('fill', function(d) { return color(d.unit); })
	// 	.attr('transform', function(d, i) { return 'translate(' + (i - 1) * 30 + ', 5)'; })
	// 	.attr('text-anchor', 'middle');
}
