var task_list=[]
var task_achieve_buts=[]

const task = {
    task_name: "",
    task_discription: "",
    task_reward: 0,

}


let new_task = Object.create(task);
new_task.task_name = "討伐哥布林 三十隻";
new_task.task_discription = "最近哥布林的肆虐越來越嚴重，許多村莊被哥布林襲擊，村民們的生命財產都受到威脅。因此，需要一群勇者前去討伐哥布林，保護村莊居民的安全。";
new_task.task_reward = 50;
task_list.push(new_task);


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


let to_redemption_reward_bnt = document.getElementById("to_redemption_reward");
let to_do_task_bnt = document.getElementById("to_do_task");

let task_group_page = document.getElementById("task-group").parentNode;
let reward_group_page = document.getElementById("reward-group").parentNode;

to_redemption_reward_bnt.addEventListener("click",()=>{
    console.log("test");
    to_do_task_bnt.classList.remove("hidden");
    to_redemption_reward_bnt.classList.add("hidden");
    task_group_page.classList.add("hidden");
    reward_group_page.classList.remove("hidden");

});
to_do_task_bnt.addEventListener("click",()=>{
    console.log("test2");
    to_redemption_reward_bnt.classList.remove("hidden");
    to_do_task_bnt.classList.add("hidden");
    task_group_page.classList.remove("hidden");
    reward_group_page.classList.add("hidden");
});


