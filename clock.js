function setupClock() {
	var arc_init = d3.svg.arc();
		// .startAngle(0);

	var current_time = new Date();

	var hr = current_time.getHours(),
		min = current_time.getMinutes(),
		sec = current_time.getSeconds();

	if (hr > 12) hr = hr - 12;
	hr = hr + (min / 0.6) / 100;

	var time_objects = [
		{"unit": "hrs", "value": hr, "capacity": 12, "radius": 130}, 
		{"unit": "mins", "value": min, "capacity": 60, "radius": 165}, 
		{"unit": "secs", "value": sec, "capacity": 60, "radius": 200}
	];

	return [arc_init, time_objects];
}

function generateClock(arc, data) {
	var w = 550,
		h = 550;

	var color = d3.scale.ordinal()
		.domain(data)
		.range(['#476b6b', '#006666', '#0f3e3e']);

	var svg = d3.select("#wrapper").html('')
		.append("svg")
			.attr('width', w)
			.attr('height', h)
		.append("g");

	var clock = svg.append("g")
			.attr('transform', 'translate(' + w / 2 + ',' + h / 2 + ')');

	for (t = 0; t < 12; t++) {
		clock.append("path")
			.attr('class', 'number')
			.style('fill', 'black')
			.attr('d', arc.innerRadius(210)
						  .outerRadius(220)
						  .startAngle((2 * Math.PI) / 12 * t - 0.01)
						  .endAngle((2 * Math.PI) / 12 * t + 0.01 ));
	}
	
	var hands = svg.selectAll("hand")
		.data(data)
		.enter()
		.append("g")
			.attr('transform', 'translate(' + w / 2 + ',' + h / 2 + ')');

	hands.append("path") 
		.attr('class', function(d) { return d.unit; })
		.style('fill', function(d, i) { return color(d.unit); });

	var digits = svg.selectAll("digit")
		.data(data)
		.enter()
		.append("g")
			.attr('height', 66)
			.attr('transform', 'translate(' + w / 2 + ',' + (h / 2 - 33) + ')');

	digits.append("text")
		.attr('class', function(d) { return d.unit; })
		.style('fill', function(d) { return color(d.unit); })
		.attr('transform', function(d, i) { return 'translate(' + (i - 1) * 30 + ', 33)'; })
		.attr('text-anchor', 'middle');
}
