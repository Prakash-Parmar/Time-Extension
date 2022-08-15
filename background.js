//alarms start

chrome.alarms.create("pomodoroTimer", {
    periodInMinutes: 1/60,
})


chrome.storage.local.get(["timer", "isRunning"], (res) => {
    chrome.storage.local.set({
        timer: "timer" in res ? res.timer : 0,
        isRunning: "isRunning" in res ? res.isRunning : false,
    })
})

chrome.alarms.onAlarm.addListener((alarm) => {
    if(alarm.name === "pomodoroTimer"){
        chrome.storage.local.get(["timer", "isRunning"], (res) => {
            if(res.isRunning){
                let timer = res.timer +1
                console.log(timer)
                chrome.storage.local.set({
                    timer,
                })
            }
        })
    }
})

//alarms end

