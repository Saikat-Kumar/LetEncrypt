function encrypt() {
    // Wuery the active tab, which will be only one tab and inject the script in it.
    // chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    //     chrome.scripting.executeScript({target: {tabId: tabs[0].id}, files: ['content_script.js']})
    // })
    var copyText = document.getElementById("inText").value;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        // query the active tab, which will be only one tab
        //and inject the script in it
        chrome.tabs.sendMessage(tabs[0].id, {
            type: "encrypt",
            Text:copyText
          });
    });
    
}
function deencrypt() {
    // Wuery the active tab, which will be only one tab and inject the script in it.
    // chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    //     chrome.scripting.executeScript({target: {tabId: tabs[0].id}, files: ['content_script.js']})
    // })
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        // query the active tab, which will be only one tab
        //and inject the script in it
        chrome.tabs.sendMessage(tabs[0].id, {
            type: "decrypt",
          });
    });
    
}

document.getElementById('ebtn').addEventListener('click', encrypt)
document.getElementById('dbtn').addEventListener('click', deencrypt)