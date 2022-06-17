let section = document.querySelector("section");

let add = document.querySelector("form button");
add.addEventListener("click" , (e) => {
    e.preventDefault(); //停止表單送出 e就是表單的按鍵 JS沒有同層 需要往上層找下層
    // console.log(e); 表單會馬上送出歸零 submit


//把Input的Value給變數
let form = e.target.parentElement;
let todoText = form.children[0].value;
let todoY = form.children[1].value;
let todoM = form.children[2].value;
let todoD = form.children[3].value;


// 創立一個DIV
let todo = document.createElement('div');
todo.classList.add("todo");
// 創立一個P 塞text文字的值
let text = document.createElement('p');
text.classList.add("todo-text");
text.innerText = todoText
// 創立一個P 塞年月份文字的值
let time = document.createElement('p');
time.classList.add("todo-time");
time.innerText = todoY +"/" + todoM +"/" + todoD ;

//把這兩個值 塞回去DIV
todo.appendChild(text);
todo.appendChild(time);

//第三次KIN的位置
//打勾
let completeButton = document.createElement("button");
completeButton.classList.add("complete");
completeButton.innerHTML = '<i class = "fas fa-check"></i>' //圖
//垃圾桶
let trashButton = document.createElement("button");
trashButton.classList.add("trash");
trashButton.innerHTML = '<i class = "fas fa-trash"></i>' //圖
todo.appendChild(completeButton);  //add 在日期後面的打勾
todo.appendChild(trashButton); //add 在日期後面的垃圾桶
//第三次KIN的位置

//再把DIV 塞回去 Section
section.appendChild(todo);
});