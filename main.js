/*1 유저가 값을 입력한다.
  2 +버튼을 클릭하면, 할일이 추가된다.
  3.delete버튼을 누르면 할일이 삭제된다
  4.check버튼을 누르면 할일이 끝나면서 밑줄이 간다.
  5.진행중 끝남 탭을 누르면, 언더바가 이동한다.
  6 끝남탭은 , 끝남 아이템만, 진행중인 탭은 진행중인 아이템만 
  7 전체탭을 누르면 다시 전체아이템으로 돌아옴*/


let taskInput=document.getElementById("task-input")
let addButton=document.getElementById("add-button")
let tabs=document.querySelectorAll(".task-tabs div")
let taskList=[]
let mode='all'
let filterList=[]



addButton.addEventListener("click",addTask)

for(let i=1; i<tabs.length;i++){
    tabs[i].addEventListener("click",function(event){filter(event)})
}
console.log(tabs)

function addTask(){
    let task={
        id:randomIDGenerate(),
        taskContent : taskInput.value,
        isComplete:false
    }
    taskList.push(task)
    render()
    
}

function render(){
    let list= []
    if(mode=="all"){
        list=taskList
    }else if(mode="notdone" || mode == "done"){
        list=filterList
    }



    let resultHtml=''
    for(let i=0; i<list.length; i++){

        if(list[i].isComplete==true){
            resultHtml +=`
            <div class="task">
                <div class="task-done"> ${list[i].taskContent}</div>
                <div>
                    <button onclick="toggleComplete('${list[i].id}')">Check</button>
                    <button onclick="deleteTask('${list[i].id}')">Delete</button>
                </div>
            </div>
        `
        }else{
            resultHtml +=`
            <div class="task">
                <div> ${list[i].taskContent}</div>
                <div>
                    <button onclick="toggleComplete('${list[i].id}')">Check</button>
                    <button onclick="deleteTask('${list[i].id}')">Delete</button>
                </div>
            </div>
        `
        }
     
    }

    document.getElementById("task-board").innerHTML=resultHtml
}


function toggleComplete(id){
    console.log("id: ", id)
    for(let i=0;i<taskList.length; i++){
        if(taskList[i].id==id){
            taskList[i].isComplete=!taskList[i].isComplete
            break;
        }
    }
    console.log(taskList)
    render()
}

function deleteTask(id){
    console.log("id: ",id)
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id==id){
            taskList.splice(i,1);
            break;
        }
    }
    console.log(taskList)
    render()
}

function randomIDGenerate(){
    return Math.random().toString(36).substr(2, 16);
}


function filter(event){
    mode=event.target.id
    filterList=[]

    document.getElementById("under-line").style.width=
    event.target.offsetWidth+"px";
    document.getElementById("under-line").style.top=
    event.target.offsetTop+event.target.offsetHeight+"px";
    document.getElementById("under-line").style.left=
    event.target.offsetLeft+"px";



    if(mode=='all'){
        render()
    }else if(mode=='notdone'){
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete==false){
                filterList.push(taskList[i])
            }
        }
        
        render()
    }else if(mode=="done"){
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete==true){
                filterList.push(taskList[i])
            }
        }
        render()
    }
    console.log(filterList)
}