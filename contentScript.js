(() => {
  
  chrome.runtime.onMessage.addListener(async (obj, sender, response) => {
    const { type,Text } = obj;
   
    if (typeof Text !== 'undefined' && Text !== "")
    {
      let data={"data":Text,"type":type}
         
          let options = {
            method: 'POST',
            headers: {
                'Content-Type': 
                    'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        }
        const res=await fetch ("http://localhost:5000/encryptDecrypt",options);
        const record=await res.json();
        
        var t=record['key']
        navigator.clipboard.writeText(t);
        var TempText = document.createElement("input");
        TempText.value = t;
        document.body.appendChild(TempText);
        TempText.select();
  
        document.execCommand("copy");
        document.body.removeChild(TempText);
        alert("paste the Encrypted data")
    }
    else{
     
    document.body.addEventListener('mouseup', async function () {
      if (typeof window.getSelection != 'undefined') {
          var sel = window.getSelection();
          var range = sel.getRangeAt(0);
          var selectedText = range.toString();
          var startOffset = range.startOffset;
          var endOffset = startOffset + selectedText.length;
          // Creating a XHR object
          let data={"data":selectedText,"type":type}
         
          let options = {
            method: 'POST',
            headers: {
                'Content-Type': 
                    'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        }
        
        const res=await fetch ("http://localhost:5000/encryptDecrypt",options);
        const record=await res.json();
        
        var t=record['key']
        range.deleteContents();
        range.insertNode(document.createTextNode(t.toString()));
       
                  
        
      }   
     
  }, {once : true})
}
  });

  

 
})();

