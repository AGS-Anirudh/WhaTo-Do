const itemsArray= localStorage.getItem('items')?JSON.parse(localStorage.getItem("items")):[]

document.getElementById('enter').addEventListener('click',()=>{
    const item = document.getElementById('item')
    create_Item(item)
    const text = document.querySelector('#item')
    text.value=" "
})
function displayDate(){
    let formatted_date= new Date();
    formatted_date=formatted_date.toString().split(" ")
    formatted_date=formatted_date[1]+" "+formatted_date[2]+" "+formatted_date[3]
    document.getElementById('date').innerHTML=formatted_date
    console.log(formatted_date)
}

function display_items(){
    let items=" "
    for(let i=0 ; i<itemsArray.length ; i++){
        items+=`<div class="item">
                <div class="input-controller">
                  <textarea disabled>${itemsArray[i]}</textarea>
                  <div class="edit-controller">
                    <i class="fa-solid fa-check deleteBtn"></i>
                    <i class="fa-solid fa-pen-to-square editBtn"></i>
                  </div>
                </div>
                <div class="update-controller">
                  <button class="saveBtn">Save</button>
                  <button class="cancelBtn">Cancel</button>
                </div>
              </div>`
    }
    document.querySelector(".to-do-list").innerHTML = items
    activateDeletion()
    activateUpdation()
    activateSave()
    activateCancel()
}

function activateDeletion(){
    const deleteBtn=document.querySelectorAll('.deleteBtn')
    deleteBtn.forEach((dB,i)=>{
        dB.addEventListener('click',()=>{deleteItem(i)})
    })
}

function deleteItem(i){
    itemsArray.splice(i,1)
    localStorage.setItem('items',JSON.stringify(itemsArray))
    display_items()

}

function activateUpdation(){
    const updateBtn=document.querySelectorAll('.editBtn')
    const updateController=document.querySelectorAll('.update-controller')
    const inputs = document.querySelectorAll(".input-controller textarea");
        updateBtn.forEach((btn,i)=>{
            btn.addEventListener('click',()=>{
                console.log("edit");
                updateController[i].style.display="block"
                inputs[i].disabled=false
            })
        })
}
function activateSave(){
const saveBtn=document.querySelectorAll('.saveBtn')
const inputs = document.querySelectorAll(".input-controller textarea");

saveBtn.forEach((btn,i)=>{
    btn.addEventListener('click',()=>{
        updateItems(inputs[i].value,i)
    })
})
}

function updateItems(input,index){
    itemsArray[index] = input;
    localStorage.setItem('items', JSON.stringify(itemsArray));
    display_items()
}
function activateCancel(){
    const cancelBtn= document.querySelectorAll('.cancelBtn')
    const updateController = document.querySelectorAll(".update-controller");
    const inputs = document.querySelectorAll(".input-controller textarea");

  cancelBtn.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      updateController[i].style.display = "none";
      inputs[i].disabled = true;
      inputs[i].style.border = "none";
    });
  });

}
function create_Item(item){
    itemsArray.push(item.value)
    localStorage.setItem('items',JSON.stringify(itemsArray))
    display_items()
}

window.onload=function(){
    displayDate()
    console.log(itemsArray)
}
