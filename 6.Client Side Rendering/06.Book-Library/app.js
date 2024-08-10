import { api } from "./api.js";
import { html, render } from "./node_modules/lit-html/lit-html.js";
const root = document.querySelector("body");
const tableBook = ( id, book ) =>
  html` <tr>
    <td>${book.author}</td>
    <td>${book.title}</td>
    <td>
      <button @click=${onEdit.bind(id)}>Edit</button>
      <button @click=${onDelete.bind(id)}>Delete</button>
    </td>
  </tr>`;
const tableTemp = (allBooksInfo, author,id) => html` 
<button @click=${loadAllBooks} id="loadBooks">LOAD ALL BOOKS</button>
<table>
    <thead>
      <tr>
        <th>Title</th>
        <th>Author</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      ${allBooksInfo?.map(([id, book]) => tableBook(id, book))}
    </tbody>
</table>
${tempForm(author,id)}

  `;
  const tempForm=(author,id)=>html`
  ${!id?html`
<form id="add-form">
    <h3>Add book</h3>
    <label>TITLE</label>
    <input type="text" name="title" placeholder="Title...">
    <label>AUTHOR</label>
    <input type="text" name="author" placeholder="Author...">
    <input @click=${onSubmit} type="submit" value="Submit">
</form>

   `:html`
   <form id="edit-form">
        <input type="hidden" name="id">
        <h3>Edit book</h3>
        <label>TITLE</label>
        <input type="text" name="title" placeholder="Title..." value=${author.title} >
        <label>AUTHOR</label>
        <input type="text" name="author"  placeholder="Author..." value=${author.author}>
        <input @click=${onSave} id=${id} type="submit" value="Save">
    </form>`}`
 
render(tableTemp(), root);
;
async function onSubmit(e) {
    e.preventDefault()
   const formData=new FormData(e.target.parentElement)
   const data=Object.fromEntries(formData)
  
   await api.post('jsonstore/collections/books',data)
   
   loadAllBooks()
}
async function loadAllBooks(author,_id) {

  const allBooksInfo = Object.entries(
    await api.get("jsonstore/collections/books")
  );
  const id = allBooksInfo[0][0];
  const data = Object.values(allBooksInfo);
  
  render(tableTemp(data,author,_id), root);
}

async function onEdit() {
  const id = this;
  const data =await api.get(`jsonstore/collections/books/${id}`);
 
 loadAllBooks(data,id)
}
async function onDelete() {
    await api.del(`jsonstore/collections/books/${this}`)
    loadAllBooks()
}

async function onSave(e) {
    
    e.preventDefault()
    const id=e.target.id
    const {author,"id":_id,title}= Object.fromEntries(new FormData(e.target.parentElement ))

    await api.put(`jsonstore/collections/books/${id}`,{author,title})
    loadAllBooks()
}
