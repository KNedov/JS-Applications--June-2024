import { html, render } from './node_modules/lit-html/lit-html.js'

let root = document.querySelector('table tbody');
document.querySelector('#searchBtn').addEventListener('click', onClick);

function onClick(event) {
   event.preventDefault();
   let match = event.target.parentNode.querySelector('#searchField').value.toLowerCase();
   loadTable(match);
   event.target.parentNode.querySelector('#searchField').value = "";
}

async function loadTable(match){
   const response =  await fetch('http://localhost:3030/jsonstore/advanced/table')
   const data = await response.json()

   const rows =  Object.values(data).map(student => {return html`
   <tr class=${match && ((`${student.firstName} ${student.lastName}`).toLowerCase().includes(match) || 
                        `${student.email}`.toLowerCase().includes(match) ||
                        `${student.course}`.toLowerCase().includes(match)) 
               ? "select"
               : ""}>
       <th>${student.firstName} ${student.lastName}</th>
       <th>${student.email}</th>
       <th>${student.course}</th>
   </tr>`});

   render(rows, root)
}

loadTable()