let task_achieve_buts = document.querySelectorAll("button.achieve-but");
let task = document.querySelectorAll("button.achieve-but");
task_achieve_buts.forEach(function (task_but,index){
    task_but.addEventListener("click",()=>{
        task_achieve_buts[index].parentNode.remove();
    })

});