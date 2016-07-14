function getTime(zone) {
	var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://api.timezonedb.com/?zone=" + zone 
    	+ "&format=json&key=4D7EIVIR41DJ", false);
    xhr.send();

    var response = JSON.parse(xhr.response);
    
    return response;
}


function calculateTime(data) {
    var offset = parseInt(data.gmtOffset) / 3600;
    var local = new Date();
    var local_offset = local.getTimezoneOffset() * -1 / 60
    var diff = (offset - local_offset) * 3600000;
    var datetime = new Date(local.getTime() + diff)
    
    return [
        datetime.getHours(),
        datetime.getMinutes(),
        datetime.getSeconds()
    ];
}


function refreshTime() {
    var new_time = new Date();

    return [
        new_time.getHours(),
        new_time.getMinutes(),
        new_time.getSeconds()
    ]
}


function getProgress(obj) {
    var progress = ((2*Math.PI) / obj.capacity) * obj.value;
    return progress;
}


function modifyData(new_data) {
    time.forEach(function(d, i) {
        d.value = new_data[i];

        d3.select("." + d.unit)
            .attr('d', arc.endAngle(getProgress(d)));

        d3.select("text." + d.unit)
            .text(function(d) { return d.value + ' ' + d.unit; });
    });
}


function updateTime() {
    if (timezone == 'local') updated_time = refreshTime();
    else {
        var time_data = getTime(timezone);
        updated_time = calculateTime(time_data);
    }
    modifyData(updated_time);
}