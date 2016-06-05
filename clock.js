function generateClock() {
	var current_time = new Date();

	var hr = current_time.getHours(),
		min = current_time.getMinutes(),
		sec = current_time.getSeconds();

	var time = [
		{"unit": "hour", "value": hr, "capacity": 24, "radius": 130}, 
		{"unit": "minute", "value": min, "capacity": 60, "radius": 165}, 
		{"unit": "second", "value": sec, "capacity": 60, "radius": 200}
	];

	var svg = d3.select("#wrapper").html('')
		.append("svg")
			.attr('width', 1000)
			.attr('height', 500)
		.append("g");

	var clock = svg.selectAll("hand")
		.data(time)
		.enter()
		.append("g")
			.attr('transform', function(d, i) {
				return 'translate(' + i*250 + ',250)';
			});

	var arc = d3.svg.arc()
		.startAngle(0)
		.innerRadius(200 - 30)
		.outerRadius(200);
	
	clock.append("path")
		.style('fill', 'black')
		.attr('d', arc.endAngle(function(d) { return getProgress(d); }));
}

function getProgress(obj) {
	var progress = ((2*Math.PI) / obj.capacity) * obj.value;
	return progress;
}