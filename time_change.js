function calculateTime(data) {
    var offset = parseInt(data.gmtOffset) / 3600;
    var local = new Date();
    var local_offset = local.getTimezoneOffset() * -1 / 60
    var diff = (offset - local_offset) * 3600000;
    var datetime = new Date(local.getTime() + diff)

    return datetime;
}


function refreshTime(time_data) {
    var hr = time_data.getHours(),
        min = time_data.getMinutes(),
        sec = time_data.getSeconds();

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
    if (timestamp == 'local') {
        var new_time = new Date();
    }
    else {
        var new_time = calculateTime(timestamp);
    }
    var updated_time = refreshTime(new_time);
    modifyData(updated_time);
}