function getGroups() {
	timezones.forEach(function(d) {
		$("<option/>", {
			'value': d.group,
			'id': 'group',
			'text': d.group,
		}).appendTo("#groups");
	});
}

function getZones(elem) {
	var region = elem.value;

	$("#zones").html('');
	// $("<option/>", { 
	// 	'value': 'default',
	// 	'text': 'Select a Location'
	// }).appendTo("#zones");

	timezones.forEach(function(d) {
		if (d.group == region) {
			d.zones.forEach(function(zone) {
				$("<option/>", {
					'value': zone.value,
					'id': 'zone',
					'text': zone.name
				}).appendTo("#zones");
			})
		}
	})
}

function changeTimezone() {
	timezone = $("#zones").find(":selected").val();
}