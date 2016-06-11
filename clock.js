function generateClock() {
	var current_time = new Date();

	var hr = current_time.getHours(),
		min = current_time.getMinutes(),
		sec = current_time.getSeconds();

	var time = [
		{"unit": "hrs", "value": hr, "capacity": 24, "radius": 130}, 
		{"unit": "mins", "value": min, "capacity": 60, "radius": 165}, 
		{"unit": "secs", "value": sec, "capacity": 60, "radius": 200}
	];

	var arc = d3.svg.arc()
		.startAngle(0);

	var svg = d3.select("#wrapper").html('')
		.append("svg")
			.attr('width', 410)
			.attr('height', 410)
		.append("g");

	var clock = svg.selectAll("hand")
		.data(time)
		.enter()
		.append("g")
			.attr('transform', 'translate(205, 205)');

	clock.append("path")
		.attr('class', "background")
		.attr('d', arc.innerRadius(function(d) { return d.radius - 30; })
					  .outerRadius(function(d) { return d.radius; })
					  .endAngle(function(d) { return 2 * Math.PI; })
		);
	
	clock.append("path")
		.attr('class', "foreground")
		.style('fill', 'black')
		.attr('d', arc.innerRadius(function(d) { return d.radius - 30; })
					  .outerRadius(function(d) { return d.radius; })
					  .endAngle(function(d) { return getProgress(d); })
		);

	var digital = svg.selectAll("digit")
		.data(time)
		.enter()
		.append("g")
			.attr('height', 66)
			.attr('transform', 'translate(205, 172)');

	digital.append("text")
		.text(function(d) { return d.value + ' ' + d.unit; })
		.attr('transform', function(d, i) { return 'translate(0,' + i * 33 + ')'; })
		.attr('text-anchor', 'middle');
}


function getProgress(obj) {
	var progress = ((2*Math.PI) / obj.capacity) * obj.value;
	return progress;
}