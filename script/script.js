
let add = document.querySelector("form button");
add.addEventListener("click" , (e) => {
    e.preventDefault(); //停止表單送出
    // console.log(e); 表單會馬上送出歸零 submit


let form = e.target.parentElement;
let todoText = form.children[0].value;
let todoY = form.children[1].value;
let todoM = form.children[2].value;
let todoD = form.children[3].value;
console.log(todoText);

});