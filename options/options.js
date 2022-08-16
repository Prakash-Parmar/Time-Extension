const timeOption = document.querySelector("#time-option")
timeOption.addEventListener("change", (e) => {
    const val = e.target.value
    if(val<1 || val>60){
        timeOption.value = 25
    }
})

const saveBtn = document.querySelector("#save-btn")
saveBtn.addEventListener("click", () => {
    chrome.storage.local.set({
        timeOption: timeOption.value,
        isRunning: false,
        timer: 0
    })
})

chrome.storage.local.get(["timeOption"], (res) => {
    timeOption.value = res.timeOption
})