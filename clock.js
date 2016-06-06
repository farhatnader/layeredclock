function setupClock() {
	var arc_init = d3.svg.arc()
		.startAngle(0);

	var current_time = new Date();

	var hr = current_time.getHours(),
		min = current_time.getMinutes(),
		sec = current_time.getSeconds();

<<<<<<< HEAD
	var time_objects = [
		{"unit": "hrs", "value": hr, "capacity": 24, "radius": 130}, 
		{"unit": "mins", "value": min, "capacity": 60, "radius": 165}, 
		{"unit": "secs", "value": sec, "capacity": 60, "radius": 200}
	];

	return [arc_init, time_objects];
}

function generateClock(arc, data) {
	var w = 410,
		h = 610;

	var color = d3.scale.ordinal()
		.domain(data)
		.range(['#476b6b', '#006666', '#0f3e3e']);

	var svg = d3.select("#wrapper").html('')
		.append("svg")
			.attr('width', w)
			.attr('height', h)
		.append("g");

	var clock = svg.selectAll("hand")
		.data(data)
		.enter()
		.append("g")
			.attr('transform', 'translate(' + w / 2 + ',' + h / 2 + ')');

	clock.append("path")
		.attr('class', "background")
		.style('stroke', function(d, i) { return color(d.unit); })
		.attr('d', arc.innerRadius(function(d) { return d.radius - 30; })
					  .outerRadius(function(d) { return d.radius; })
					  .endAngle(function(d) { return 2 * Math.PI; })
		);
	
	clock.append("path")
		.attr('class', function(d) { return d.unit; })
		.style('fill', function(d, i) { return color(d.unit); })
		.attr('d', arc.innerRadius(function(d) { return d.radius - 30; })
					  .outerRadius(function(d) { return d.radius; })
					  .endAngle(function(d) { return getProgress(d); })
		);

	var digital = svg.selectAll("digit")
		.data(data)
		.enter()
		.append("g")
			.attr('height', 66)
			.attr('transform', 'translate(' + w / 2 + ',' + (h / 2 - 33) + ')');

	digital.append("text")
		.attr('class', function(d) { return d.unit; })
		.text(function(d) { return d.value + ' ' + d.unit; })
		.style('fill', function(d) { return color(d.unit); })
		.attr('transform', function(d, i) { return 'translate(0,' + i * 33 + ')'; })
		.attr('text-anchor', 'middle');
}
