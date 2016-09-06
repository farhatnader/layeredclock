function getTimestamp(zone) {
	var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://api.timezonedb.com/?zone=" + zone 
    	+ "&format=json&key=" + api_key, false);
    xhr.send();

    var response = JSON.parse(xhr.response);
    
    return response;
}


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
	var timezone = $("#zones").find(":selected").val();
	timestamp = getTimestamp(timezone);
}