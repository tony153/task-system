let task_achieve_buts = document.querySelectorAll("button.achieve-but");
let task = document.querySelectorAll("button.achieve-but");

task_achieve_buts.forEach(function (task_but,index){
    task_but.addEventListener("click",()=>{
        task_achieve_buts[index].parentNode.remove();
    })
});

let get_task_bnt = document.getElementById("get-task");
get_task_bnt.addEventListener("click",open_create_task_windows);

function open_create_task_windows(){
    document.body.insertAdjacentHTML('beforeend','<div class="pop_up_win w-full h-screen absolute top-0 bg-stone-950/50 flex justify-center items-center"> <div class="add-task-win w-[96%] bg-stone-200 rounded-xl relative"> <div class="p-8"> <div class="text-3xl text-center"> 發布任務 </div> <div class="mt-5 text-xl"> 任務名稱 </div> <div class="flex justify-center"> <input type="text" class="w-full text-xl p-3"> </div> <div class="mt-5 text-xl"> 任務詳情 </div> <div class="flex justify-center"> <textarea id="txtArea" rows="3" cols="70" class="w-full text-xl p-3"></textarea> </div> <div class="mt-5 text-2xl flex justify-end"> <input type="number" value="10" class="mx-1 text-center" style="width:3em;"> <span class="mx-1">枚金幤</span> <span class="mx-1">酬勞</span> </div> <div class="mt-12 flex justify-center"> <button type="button" class="focus:outline-none w-5/6 text-white bg-yellow-500 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900">提交</button> </div> <div class="close-bnt absolute top-1 right-4 text-3xl select-none"> x </div> </div> </div>');
    
    close_bnt =document.querySelector(".close-bnt");
    close_bnt.addEventListener("click",()=>{
        let pop_up_win = document.querySelector(".pop_up_win");
        pop_up_win.remove();
        let get_task_bnt = document.getElementById("get-task");
        get_task_bnt.addEventListener("click",open_create_task_windows);
    });
}

