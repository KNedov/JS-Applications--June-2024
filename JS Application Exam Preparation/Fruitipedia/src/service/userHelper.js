
function getUserData() {
    const userData=sessionStorage.getItem('userData')
    if (userData) {
        return JSON.parse(userData)
    }
    
}
function setUserData(userData) {
   sessionStorage.setItem("userData",JSON.stringify(userData)) 
}
function getUserID() {
    const userData= getUserData()
return userData._id
}
function removeUserData() {
    sessionStorage.removeItem("userData")
}
function isOwner(ownerId) {
    const user=getUserData()
    const _id=user?._id
    return _id===ownerId
}

export const userHelper= {
    getUserData,
    setUserData,
    getUserID,
    removeUserData,
    isOwner,
}