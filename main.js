var task_list=[]
var reward_list=[]
var task_achieve_buts=[]



const task = {
    task_name: "",
    task_discription: "",
    task_reward: 0,

}

const reward = {
    reward_name: "",
    required_coins: 0,
}

console.log("task_list:");
console.log(JSON.parse(localStorage.getItem('task_list')));
if (Array.isArray(JSON.parse(localStorage.getItem('task_list')))){
    task_list = JSON.parse(localStorage.getItem('task_list'));
}else{
    console.log("o");
    let new_task = Object.create(task);
    new_task.task_name = "討伐哥布林 三十隻";
    new_task.task_discription = "最近哥布林的肆虐越來越嚴重，許多村莊被哥布林襲擊，村民們的生命財產都受到威脅。因此，需要一群勇者前去討伐哥布林，保護村莊居民的安全。";
    new_task.task_reward = 50;
    task_list.push(new_task);
}
console.log("reward_list:");
console.log(localStorage.getItem('reward_list'));
if (Array.isArray(JSON.parse(localStorage.getItem('reward_list')))){
    reward_list = JSON.parse(localStorage.getItem('reward_list'));
}else{
    console.log("oo");
    let new_reward = Object.create(reward);
    new_reward.reward_name ="休息10分鐘";
    new_reward.required_coins= 10;
    reward_list.push(new_reward);
}

console.log("coins_quantity:");
console.log(localStorage.getItem('coins_quantity'));
if (localStorage.getItem('coins_quantity')){
    document.getElementById("coins-quantity").innerHTML = localStorage.getItem('coins_quantity');
}




list_all_task();
function list_all_task(){
    for(let i=0; i<task_list.length; i++){
        if(task_list[i] != null){
            append_one_task_in_group(task_list[i].task_name,task_list[i].task_discription,task_list[i].task_reward)
        }
    }
}

function append_one_task_in_group(add_task_name,add_task_discription,add_task_reward){
    let task_group = document.getElementById("task-group");
    task_group.insertAdjacentHTML('beforeend','\
    <div class="flex justify-center items-end rounded-xl border-2 p-3 sm:p-5 pr-0 pb-0 sm:pr-0 sm:pb-0 mb-2 w-full border-slate-300 bg-amber-200 hover:border-slate-400 overflow-hidden">\
        <span class="text-2xl text-amber-950 flex-1 py-2 font-bold" >\
            <div class="pb-1" style="width:130%">'+
            add_task_name+
            '</div>\
            <div class="text-sm  pl-3" style="width:115%">'+
            add_task_discription+
            '</div>\
            <div class="flex items-center text-lg  pt-1" style="color: #bda928;">\
                <img src="images/svg/coin-vector-svgrepo-com.svg" width="45" alt="" class="inline sm:ml-1 "> \
                <span class="mr-1 pt-4">獎勵</span>\
                <span class="mr-1 pt-4">'+add_task_reward+'</span>\
                <span class="pt-4">枚金幣</span> \
            </div>\
        </span>\
        <button class="achieve-but text-xl sm:text-3xl hover:bg-yellow-500 bg-amber-300 text-yellow-700  hover:text-white py-2 px-2 hover:border-transparent flex-none">\
            達成\
        </button> \
    </div>\
    ');
}

//var index_of_remove_loop =0;
reset_achieve_button_listener();
function reset_achieve_button_listener(){
    task_achieve_buts = document.querySelectorAll("button.achieve-but");

    task_list = task_list.filter(Boolean);
    task_achieve_buts.forEach(function (task_but,index){
        task_but.addEventListener("click",function(){  
            // Remove the clicked element from the array by its index
            // change the coins number
            let number_of_coins = document.getElementById("coins-quantity");
            //console.log(task_list[index]);
            number_of_coins.innerHTML =  parseInt(number_of_coins.innerHTML) + task_list[index].task_reward;
            task_list[index]=null;

            // Remove the clicked element from the DOM
            task_but.parentNode.remove();

            console.log(task_list); 
            //index_of_remove_loop = index_of_remove_loop + 1;
            localStorage.setItem('task_list', JSON.stringify(task_list));//==
            localStorage.setItem('coins_quantity', document.getElementById("coins-quantity").innerHTML);//==
        });
    });

};


let get_task_bnt = document.getElementById("get-task");
get_task_bnt.addEventListener("click",open_create_task_windows);

function open_create_task_windows(){
    document.body.insertAdjacentHTML('beforeend','<div class="pop_up_win w-full h-screen absolute top-0 bg-stone-950/50 flex justify-center items-center"> <div class="add-task-win w-[96%] bg-stone-200 rounded-xl relative"> <div class="p-8"> <div class="text-3xl text-center"> 發布任務 </div> <div class="mt-5 text-xl"> 任務名稱 </div> <div class="flex justify-center"> <input id="add-task-name" type="text" class="w-full text-xl p-3"> </div> <div class="mt-5 text-xl"> 任務詳情 </div> <div class="flex justify-center"> <textarea id="add-task-discription" rows="3" cols="70" class="w-full text-xl p-3"></textarea> </div> <div class="mt-5 text-2xl flex justify-end"> <input id="add_task_reward" type="number" value="10" class="mx-1 text-center" style="width:3em;"> <span class="mx-1">枚金幤</span> <span class="mx-1">酬勞</span> </div> <div class="mt-12 flex justify-center"> <button id="submit-task-bnt" type="button" class="focus:outline-none w-5/6 text-white bg-yellow-500 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900">提交</button> </div> <div class="close-bnt absolute top-1 right-4 text-3xl select-none"> x </div> </div> </div>');
    
    //close add task windows
    close_bnt =document.querySelector(".close-bnt");
    close_bnt.addEventListener("click",()=>{
        remove_add_task_windows()
    });

    //submit task
    submit_task_bnt = document.getElementById("submit-task-bnt");
    submit_task_bnt.addEventListener("click",()=>{

        add_task_name = document.getElementById("add-task-name").value;
        add_task_discription = document.getElementById("add-task-discription").value;
        add_task_reward = document.getElementById("add_task_reward").value;

        let new_task = Object.create(task);
        new_task.task_name = add_task_name;
        new_task.task_discription = add_task_discription;
        new_task.task_reward = parseInt(add_task_reward);

        task_list.push(new_task);


        remove_add_task_windows();
        let task_group = document.getElementById("task-group");
        task_group.innerHTML="";
        list_all_task();
        //append_one_task_in_group(add_task_name,add_task_discription,add_task_reward);
        console.log(task_list);


        reset_achieve_button_listener();
        reset_achieve_but_ainmation();

        localStorage.setItem('task_list', JSON.stringify(task_list));//==
    });
}


function remove_add_task_windows(){
    let pop_up_win = document.querySelector(".pop_up_win");
    pop_up_win.remove();
    
    //task_achieve_buts = document.querySelectorAll("button.achieve-but");
    // task_achieve_buts.forEach(function (task_but,index){
    //     task_but.addEventListener("click",()=>{
    //         task_achieve_buts[index].parentNode.remove();
    //         task_list.splice(index, 1);
    //         console.log("123");
    //     });
    // });
    // let get_task_bnt = document.getElementById("get-task");
    // get_task_bnt.addEventListener("click",open_create_task_windows);
};



reset_achieve_but_ainmation();
function reset_achieve_but_ainmation(){
// First, select the HTML element you want to track the click event on
let clickedElements = document.querySelectorAll('.achieve-but');

clickedElements.forEach((clickedElement,index)=>{
    // Add a click event listener to that element
    clickedElement.addEventListener('click', (event) => {
        // Use the MouseEvent object to get the X and Y coordinates of the click
        const mouseX = event.clientX;
        const mouseY = event.clientY;
    
        // handel postion and animation
        let firework = document.querySelector('.firework');
        firework.style.display="block";
        firework.style.top = mouseY +"px";
        firework.style.left = mouseX +"px";
        firework.style.animation = "firework 0.8s";
    
        firework.addEventListener("animationend", () => {
        // Remove the `animate` class from the element when the animation is finished
        firework.style.animation = "";
        firework.style.display="none";
        });
    });
});
};



//==========================================
list_all_reward();
function list_all_reward(){
    for(let i=0; i<reward_list.length; i++){
        if(reward_list[i] != null){
            append_one_reward_in_group(reward_list[i].reward_name,reward_list[i].required_coins);
        }
    }
    reset_getreward_but_ainmation();
}

function append_one_reward_in_group(reward_name,required_coins){
    let reward_group = document.getElementById("reward-group");
    reward_group.insertAdjacentHTML('beforeend','\
    <div class="flex justify-center items-end rounded-xl border-2 p-3 sm:p-5 pr-0 pb-0 sm:pr-0 sm:pb-0 mb-2 w-full border-slate-300 bg-yellow-100 hover:border-slate-400 overflow-hidden relative">\
    <span class="text-3xl text-amber-950 flex-1 py-3 font-bold  h-full pl-2 max-w-[75%]" >'
            +reward_name+
    '<div class="flex items-center text-lg pt-1" style="color: #bda928;">\
    <img src="images/svg/coin-vector-svgrepo-com.svg" width="45" alt="" class="inline sm:ml-1 "> \
    <span class="mr-1 pt-4">所需</span>\
    <span class="mr-1 pt-4">'+required_coins+'</span>   \
    <span class="pt-4">枚金幣</span>  \
    </div>\
    </span>\
    <button class="get-reward-but text-xl sm:text-3xl min-w-[5rem] hover:bg-yellow-500 bg-amber-300 text-yellow-700  hover:text-white py-2 px-2 hover:border-transparent flex-none">\
    換領\
    </button> \
    <button class="absolute top-0 right-0 p-2 text-lg text-slate-500 hover:underline ">\
    刪除\
    </button>\
    ');
}

let add_reward_bnt = document.getElementById("add-reward");
add_reward_bnt.addEventListener("click",open_create_reward_windows);

function open_create_reward_windows(){
    document.body.insertAdjacentHTML('beforeend','<div class="pop_up_win w-full h-screen absolute top-0 bg-stone-950/50 flex justify-center items-center"> <div class="add-task-win w-[96%] bg-stone-200 rounded-xl relative"> <div class="p-8"> <div class="text-3xl text-center"> 添加獎勵 </div> <div class="mt-5 text-xl"> 獎勵名稱 </div> <div class="flex justify-center"> <input id="add-reward-name" type="text" class="w-full text-xl p-3"> </div> <div class="mt-5 text-2xl flex justify-end"><span class="mx-1">所需</span><input id="required_coins" type="number" value="10" class="mx-1 text-center" style="width:3em;"> <span class="mx-1">金幤</span> </div> <div class="mt-12 flex justify-center"> <button id="submit-reward-bnt" type="button" class="focus:outline-none w-5/6 text-white bg-yellow-500 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900">提交</button> </div> <div class="close-bnt absolute top-1 right-4 text-3xl select-none"> x </div> </div> </div>');
    
    //close add reward windows
    close_bnt =document.querySelector(".close-bnt");
    close_bnt.addEventListener("click",()=>{
        remove_add_task_windows()
    });

    //submit reward
    submit_reward_bnt = document.getElementById("submit-reward-bnt");
    submit_reward_bnt.addEventListener("click",()=>{

        add_reward_name = document.getElementById("add-reward-name").value;
        add_required_coins = document.getElementById("required_coins").value;

        let new_task = Object.create(reward);
        new_task.reward_name = add_reward_name;
        new_task.required_coins = parseInt(add_required_coins);

        reward_list.push(new_task);


        remove_add_reward_windows();
        let reward_group = document.getElementById("reward-group");
        reward_group.innerHTML="";
        list_all_reward();
        //append_one_task_in_group(add_task_name,add_task_discription,add_task_reward);
        console.log(reward_list);


        reset_get_reward_button_listener();
        reset_getreward_but_ainmation();

        localStorage.setItem('reward_list', JSON.stringify(reward_list));//==
    });
};

function remove_add_reward_windows(){
    let pop_up_win = document.querySelector(".pop_up_win");
    pop_up_win.remove();
    
    //task_achieve_buts = document.querySelectorAll("button.achieve-but");
    // task_achieve_buts.forEach(function (task_but,index){
    //     task_but.addEventListener("click",()=>{
    //         task_achieve_buts[index].parentNode.remove();
    //         task_list.splice(index, 1);
    //         console.log("123");
    //     });
    // });
    // let get_task_bnt = document.getElementById("get-task");
    // get_task_bnt.addEventListener("click",open_create_task_windows);
};

reset_get_reward_button_listener();
function reset_get_reward_button_listener(){
    get_reward_buts = document.querySelectorAll("#reward-group .get-reward-but");

    reward_list = reward_list.filter(Boolean);
    get_reward_buts.forEach(function (get_reward_but,index){
        get_reward_but.addEventListener("click",function(){  
            // Remove the clicked element from the array by its index
            // change the coins number
            let number_of_coins = document.getElementById("coins-quantity");
            if (parseInt(number_of_coins.innerHTML)>=reward_list[index].required_coins){
                number_of_coins.innerHTML =  parseInt(number_of_coins.innerHTML) - reward_list[index].required_coins;
            }else{
                alert("金幣不足");
            }
            //console.log(task_list[index]);
            //reward_list[index]=null;

            // Remove the clicked element from the DOM
            //get_reward_but.parentNode.remove();

            console.log(reward_list); 
            //index_of_remove_loop = index_of_remove_loop + 1;
            localStorage.setItem('coins_quantity', parseInt(number_of_coins.innerHTML));//==
        });

        let del_reward_but = get_reward_but.parentNode.querySelector("button.absolute.top-0.right-0.p-2.text-lg");
        console.log(del_reward_but);
        del_reward_but.addEventListener("click",function(){  

            if (confirm('確定刪除獎勵 ['+reward_list[index].reward_name+'] 嗎？')) {
                // Remove the clicked element from the array by its index
                reward_list[index]=null;

                // Remove the clicked element from the DOM
                get_reward_but.parentNode.remove();
              } else {
                // Do nothing!
                console.log('Nothing to do');
              }

            console.log(reward_list); 
            localStorage.setItem('reward_list', JSON.stringify(reward_list));//==
        });
    });


    // reward_list = reward_list.filter(Boolean);
    // del_reward_buts.forEach(function (del_reward_but,index){
    //     console.log("13");
    //     del_reward_but.addEventListener("click",function(){  
    //         // Remove the clicked element from the array by its index
    //         //console.log(task_list[index]);
    //         reward_list[index]=null;

    //         // Remove the clicked element from the DOM
    //         get_reward_but.parentNode.remove();

    //         console.log(reward_list); 
    //     });
    // });



};


//reset_getreward_but_ainmation();
function reset_getreward_but_ainmation(){
    // First, select the HTML element you want to track the click event on
    let clickedElements = document.querySelectorAll('.get-reward-but');
    clickedElements.forEach((clickedElement,index)=>{
        // Add a click event listener to that element
        clickedElement.addEventListener('click', (event) => {
            // Use the MouseEvent object to get the X and Y coordinates of the click
            const mouseX = event.clientX;
            const mouseY = event.clientY;
        
            // handel postion and animation
            let firework = document.querySelector('.firework');
            firework.style.display="block";
            firework.style.top = mouseY +"px";
            firework.style.left = mouseX +"px";
            firework.style.animation = "firework 0.8s";
        
            firework.addEventListener("animationend", () => {
            // Remove the `animate` class from the element when the animation is finished
            firework.style.animation = "";
            firework.style.display="none";
            });
        });
    });
    };


//============================================
let get_default_reward_buts = document.querySelectorAll("#default-reward-group .get-reward-but");
get_default_reward_buts[0].addEventListener("click",function(){
    let number_of_coins = document.getElementById("coins-quantity");
    if (parseInt(number_of_coins.innerHTML)>=20){
        number_of_coins.innerHTML =  parseInt(number_of_coins.innerHTML) - 20;
        let audio = new Audio('audios/warm_applause.mp3');
        audio.play();
        setTimeout(() => { 
            audio.pause();
            audio.currentTime = 0; 
        },10000);
    }else{
        alert("金幣不足");
    }
});



let to_redemption_reward_bnt = document.getElementById("to_redemption_reward");
let to_do_task_bnt = document.getElementById("to_do_task");

let task_group_page = document.getElementById("task-group").parentNode;
let reward_group_page = document.getElementById("reward-group").parentNode;

to_redemption_reward_bnt.addEventListener("click",()=>{
    to_do_task_bnt.classList.remove("hidden");
    to_redemption_reward_bnt.classList.add("hidden");
    task_group_page.classList.add("hidden");
    reward_group_page.classList.remove("hidden");

});
to_do_task_bnt.addEventListener("click",()=>{
    to_redemption_reward_bnt.classList.remove("hidden");
    to_do_task_bnt.classList.add("hidden");
    task_group_page.classList.remove("hidden");
    reward_group_page.classList.add("hidden");
});

let clear_localStorage_bnt = document.getElementById("clear_localStorage");
clear_localStorage_bnt.addEventListener("click",()=>{
    if (confirm('確定刪除本地的記錄及重設嗎？')) {
        localStorage.clear();
      } else {
        // Do nothing!
        console.log('Nothing to do');
      }
});


