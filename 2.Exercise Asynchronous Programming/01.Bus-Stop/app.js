function getInfo() {
   const inputRef=document.getElementById("stopId")
   const stopId=inputRef.value
   const BASE_URL="http://localhost:3030/jsonstore/bus/businfo/"
   const fullPath=BASE_URL+stopId
   const busesRef=document.getElementById("buses")
   const stopNameRef=document.getElementById('stopName')
   const data= makeResponse(fullPath)
   
   
  
async function makeResponse(fullPath) {
    try {
    const response=await fetch(fullPath)
    const data=await response.json()
    clear()
    renderList(data)
    } catch (error) {
        stopNameRef.textContent=''
     stopNameRef.textContent='Error'
    }
   }
   function renderList(data) {
    const stopName=data.name
    stopNameRef.textContent=stopName
    Object.entries(data.buses).forEach((info)=>{
        const [busId,time]=info
        const li=document.createElement('li')
        li.textContent=`Bus ${busId} arrives in ${time} minutes`
        busesRef.appendChild(li)
    })
   
   }
   function clear() {
    inputRef.value=''
    busesRef.textContent=''
    stopNameRef.textContent=''
   }
}
