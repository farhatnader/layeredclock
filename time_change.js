function getTime(zone) {
	var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://api.timezonedb.com/?zone=" + zone 
    	+ "&format=json&key=" + api_key, false);
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
    
    var hr = datetime.getHours(),
        min = datetime.getMinutes(),
        sec = datetime.getSeconds();

    if (hr > 12) hr = hr - 12;
    hr = hr + (min / 0.6) / 100;

    return [hr, min, sec]
}


function refreshTime() {
    var new_time = new Date();

    var hr = new_time.getHours(),
        min = new_time.getMinutes(),
        sec = new_time.getSeconds();

    if (hr > 12) hr = hr - 12;
    hr = hr + (min / 0.6) / 100;

    return [hr, min, sec]
}


function getProgress(obj) {
    var progress = ((2*Math.PI) / obj.capacity) * obj.value;
    return progress;
}


function modifyData(new_data) {
    time.forEach(function(d, i) {
        d.value = new_data[i];

        d3.select("." + d.unit)
            .attr('d', arc.innerRadius(50)
                          .outerRadius(180 + (i * 10))
                          .endAngle(getProgress(d) + (0.05 / (i + 1)) / 2)
                          .startAngle(getProgress(d) - (0.05 / (i + 1)) / 2)
        );

        d3.select("text." + d.unit)
            .text(String(d.value).split('.')[0]);
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