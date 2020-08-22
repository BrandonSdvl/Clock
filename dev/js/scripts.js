const needleHour = document.getElementById('needleHour');
const needleMinute = document.getElementById('needleMinute');
const needleSecond = document.getElementById('needleSecond');

const setTime = () => {
    const date = new Date()
    needleSecond.style.transform = `rotate(${date.getSeconds() * 6}deg)`
    needleMinute.style.transform = `rotate(${date.getMinutes() * 6}deg)`
    needleHour.style.transform = `rotate(${((date.getHours() > 12 ? date.getHours() - 12 : date.getHours()) * 30) + (date.getMinutes() * .5)}deg)`
    return setTimeout(setTime, 1000)
}
setTime();