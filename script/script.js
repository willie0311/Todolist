let section = document.querySelector("section");

let add = document.querySelector("form button");
//---------------------------------------------------------------------------------------------------
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
        //刪除local storage 裡面對應資料
        let text = todoItem.children[0].innerHTML;  //把資料存起來
            let myListArray = JSON.parse(localStorage.getItem("list")); //抓取local storage資料
            // 用forEach迴圈去抓陣列資料
            myListArray.forEach((item, index) => {
                // 如果資料等於一樣
                if(item.todoText == text) {
                    // 用陣列的splice 去對應索引號碼 刪除一筆資料
                    myListArray.splice(index ,1);
                    // 再把資料放回去local stoeage內更新
                    localStorage.setItem("list" , JSON.stringify(myListArray));
                };
            });

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

//-------------------------------------------------------------------------------------------------------------

loadData()  //開畫面執行一次
//這一段寫回去讀寫local storage內部資料顯示出來  接著把這段變成函示
function loadData(){
    let myList = localStorage.getItem("list");
    if (myList !== null) {
        let myListArray = JSON.parse(myList);
        //回傳local storage需要加上item
        myListArray.forEach( item => {

            // 創立一個DIV
            let todo = document.createElement('div');
            todo.classList.add("todo");
            // 創立一個P 塞text文字的值
            let text = document.createElement('p');
            text.classList.add("todo-text");
            text.innerText = item.todoText //需要加上item  很重要
            // 創立一個P 塞年月份文字的值
            let time = document.createElement('p');
            time.classList.add("todo-time");
            time.innerText = item.todoY +"/" + item.todoM +"/" + item.todoD ; //需要加上item  很重要

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
                    //刪除local storage 裡面對應資料 跟上面的相同
                    let text = todoItem.children[0].innerHTML;
                        let myListArray = JSON.parse(localStorage.getItem("list"));
                        myListArray.forEach((item, index) => {
                            if(item.todoText == text) {
                                myListArray.splice(index ,1);
                                localStorage.setItem("list" , JSON.stringify(myListArray));
                            };
                        });

                    todoItem.remove(); //動畫結束後刪除
                });
            todoItem.style.animation = "scaleDown 0.3s forwards"; //先讓動畫跑完
            });


            todo.appendChild(completeButton);  //add 在日期後面的打勾
            todo.appendChild(trashButton); //add 在日期後面的垃圾桶

            //list動畫顯示效果
            todo.style.animation = "scaleUp 0.3s forwards";
            //再把DIV 塞回去 Section
            section.appendChild(todo);

        });
    }
}


//----------------------------------------------------------------------------------------------------------

//建立兩個比較函式


//第一個函式 切半比較
function mergeSort(arr) {
    if (arr.length === 1){
        return arr;
    }else{
        let middle = Math.floor(arr.length / 2);
        let right = arr.slice(0, middle);
        let left = arr.slice(middle, arr.length);
        return mergeTime(mergeSort(right), mergeSort(left));
    }
}

//第二個函式 比較年月日
function mergeTime(arr1, arr2){
    let results = [];
    let i = 0;
    let j = 0;
    while(i < arr1.length && j < arr2.length) {
        if (Number(arr1[i].todoY) > Number(arr2[j].todoY)){
            results.push(arr2[j]);
            j++;
        }else if (Number(arr1[i].todoY) < Number(arr2[j].todoY)){
            results.push(arr1[i]);
            i++;
        }else if (Number(arr1[i].todoY) == Number(arr2[j].todoY)){
            if(Number(arr1[i].todoM) > Number(arr2[j].todoM)){
                results.push(arr2[j]);
                j++;
            }else if(Number(arr1[i].todoM) < Number(arr2[j].todoM)){
                results.push(arr1[i]);
                i++;
            }else if(Number(arr1[i].todoM) == Number(arr2[j].todoM)){
                if(Number(arr1[i].todoD) > Number(arr2[j].todoD)){
                    results.push(arr2[j]);
                    j++;
                }else{
                    results.push(arr1[i]);
                    i++;
                }
            }
        }
    }
    while (i < arr1.length) {
        results.push(arr1[i]);
        i++;
    }
    while (j < arr2.length) {
        results.push(arr2[j]);
        j++;
    }
    return results;
};

//-------------------------------------------------------------------------------------------------

let sortButton = document.querySelector("div.sort button");
sortButton.addEventListener("click" , () =>{

    let sortedArray =  mergeSort(JSON.parse(localStorage.getItem("list")));
    localStorage.setItem("list" , JSON.stringify(sortedArray));

    let len = section.children.length;
    for(let i = 0 ; i<len ; i++){
        section.children[0].remove();
    };

    loadData();
})
