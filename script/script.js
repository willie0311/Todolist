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

//判斷 事件&年&月&日 有無填寫資料 沒有填寫彈出視窗停止 有往下一步
if(todoText === "" || todoY === "" || todoM === "" || todoD === ""){
    alert("請輸入事項&年月日");
    return;
}

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
let completeButton = document.createElement("button"); //按鈕
completeButton.classList.add("complete");
completeButton.innerHTML = '<i class = "fas fa-check"></i>' //圖

//打勾按鈕觸發 執行新增Class done 
completeButton.addEventListener("click" , e => {
    // console.log(e.target.parentElement)  回上層
    let todoItem = e.target.parentElement;  ////回到上一層div(父層)
    todoItem.classList.toggle("done");  // add 換成 toggle 切換按鈕 刪除線可以顯示於不顯示
});

//垃圾桶
let trashButton = document.createElement("button");
trashButton.classList.add("trash");
trashButton.innerHTML = '<i class = "fas fa-trash"></i>' //圖

//垃圾桶按鈕觸發 執行動畫 刪除list 把隱藏的位置直截刪除 remove
trashButton.addEventListener("click" , e => {
    let todoItem= e.target.parentElement;  //回到上一層div(父層)
    todoItem.addEventListener("animationend" , () =>{
        todoItem.remove(); //動畫結束後刪除
    });
   todoItem.style.animation = "scaleDown 0.3s forwards"; //先讓動畫跑完
});


todo.appendChild(completeButton);  //add 在日期後面的打勾
todo.appendChild(trashButton); //add 在日期後面的垃圾桶

//第三次KIN的位置

//list動畫顯示效果
todo.style.animation = "scaleUp 0.3s forwards";

//設定輸入資料後清空欄位的資料
form.children[0].value = "";  //清除第一個輸入欄位
form.children[1].value = "";  //清除第二個輸入欄位 年
form.children[2].value = "";  //清除第三個輸入欄位 月
form.children[3].value = "";  //清除第四個輸入欄位 日

//創立物件 放到local storage 很重要一環
let myTodo = {
    todoText: todoText,
    todoY : todoY,
    todoM : todoM,
    todoD : todoD
}

//1: 先取得localStorage 再去判斷裡面是否為空值null 再把localStorage轉換成JSON的格式
let myList = localStorage.getItem("list");
if (myList == null) {
    localStorage.setItem("list" , JSON.stringify([myTodo]));
}else {
//2: 如果裡面有值 把值轉換成JSON格式
    let myListArray = JSON.parse(myList);
    myListArray.push(myTodo); //用push把值放進去陣列內
    localStorage.setItem("list" , JSON.stringify(myListArray));  //用JSON格式放入
}
//在console內看行為
console.log(JSON.parse(localStorage.getItem("list")));


//再把DIV 塞回去 Section
section.appendChild(todo);
});