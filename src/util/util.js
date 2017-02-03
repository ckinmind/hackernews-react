

function convertTime (time) {
    let d = new Date();
    let currentTime = Math.floor(d.getTime() / 1000);  //getTime()：返回距离1970年1月1日00:00:00的毫秒数
    let seconds = currentTime - time;

    // more that two days
    if (seconds > 2*24*3600) {
        return 'a few days ago';
    }

    // a day
    if (seconds > 24*3600) {
        return 'yesterday';
    }

    if (seconds > 3600) {
        return 'a few hours ago';
    }

    if (seconds > 1800) {
        return 'Half an hour ago';
    }

    if (seconds > 60) {
        return Math.floor(seconds/60) + ' minutes ago';
    }
}

export {convertTime};


