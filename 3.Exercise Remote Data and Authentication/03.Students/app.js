async function attachEvents() {
 const mainURL='http://localhost:3030/jsonstore/collections/students/'
 const inputs=document.querySelector('#form')
 document.getElementById('submit').addEventListener('click',onSubmit)
 const table=document.querySelector('tbody')
 const response= await fetch(mainURL)
 if (response.ok) {
    const students=await response.json()
    Object.values(students).forEach(student=>
        {
         createInerHtml(student)  
          
        }
    )
    
 }

 async function onSubmit(e) {
    
    e.preventDefault()
    const firstName=inputs.firstName.value
    const lastName=inputs.lastName.value
    const facultyNumber=inputs.facultyNumber.value
    const grade=inputs.grade.value
    if (!firstName,!lastName,!facultyNumber,!grade) {
      return alert ('"Please fill in all required fields."')
    }
    const student={
        firstName,
        lastName,
        facultyNumber,
        grade
    }
    const response=await fetch(mainURL,{
        method:"post",
        header:{'Content-type':'application/json'},
        body:JSON.stringify(student)
    })
    createInerHtml(student);
    document.querySelector('#form input[name=firstName]').value = '';
      document.querySelector('#form input[name=lastName]').value = '';
      document.querySelector('#form input[name=facultyNumber]').value = '';
      document.querySelector('#form input[name=grade]').value = '';
 

    

 }
 function createInerHtml(student) {
 const row =document.createElement('tr')
 row.innerHTML=
    `<tr>
      <td>${student.firstName}</td>
      <td>${student.lastName}</td>
      <td>${student.facultyNumber}</td>
      <td>${student.grade}</td>
    </tr>`;
    table.appendChild(row)

 }
  }
  
  attachEvents();