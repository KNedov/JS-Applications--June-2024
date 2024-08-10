function attachEvents() {
   const main_URL='http://localhost:3030/jsonstore/messenger'
   const sendBtn=document.getElementById('submit').addEventListener('click',onSend)
   const refreshBtn=document.getElementById('refresh').addEventListener('click',onRefresh)
   const name=document.querySelector('[name=author]')
   const content=document.querySelector('[name=content]')
   const textArea=document.getElementById('messages')

 
  async function onSend(event) {
    const authorName=name.value
    const msgText=content.value
    const data={
        author: authorName,
        content: msgText,
      }
      
    const  response=await fetch(main_URL,{
        method:'POST',
        headers:{'Content-type':'application/json'},
        body:JSON.stringify(data)
    })

  }
  async function onRefresh(params) {
    const response=await fetch(main_URL)
    const data=await response.json()
    const array=Object.values(data)
    textArea.value = Object.values(data)
    .map((x) => `${x.author}: ${x.content}`)
    .join("\n");
}
}


attachEvents();