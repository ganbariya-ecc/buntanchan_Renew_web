// タスクサンプルデータの作成
const myTasks = [
    // { id: 1, name: 'ごみ出す', completed: true },
    // { id: 2, name: 'かいもの', completed: false },
    // { id: 3, name: 'せんたく', completed: false },
    // { id: 4, name: 'そうじ', completed: false },
    // { id: 5, name: 'おしはらい', completed: false },
    // { id: 6, name: 'おやつ', completed: false },
];

// サンプルデータ
let users = [];

// タスク一覧
let tasks_list = [];

// ユーザーアイコンエリア
const UserIcon = document.getElementById("UserIcon");

async function main() {
    try {
        if (await IsAdmin() || await IsOwner()) {
            // Memberの場合
            window.location.href = Admin_Home;
            return;
        }

        // アイコン設定
        UserIcon.src = await GetIcon();

        // タスク初期化
        const tasks = await GetTasks();

        tasks.forEach((task) => {
            console.log(task);
            myTasks.push({ id: task["TaskID"], name: task["TaskName"], completed: false,OrderTargetID: task["OrderTargetID"] });
        })

        InitTask();
    } catch (ex) {
        console.error(ex);
        window.location.href = Login_Group;
        return;
    }
}

main();

// const extraTasks = [
//     { id: 5, name: 'おしはらい', completed: false }
// ];

// タスクの表示エリアを取得
const myTasksContainer = document.getElementById('my_tasks_container');

function InitTask() {
    // タスクの有無を確認
    if (myTasks.length === 0) {
        // タスクがない場合
        myTasksContainer.className = 'h-[50dvh] flex flex-col justify-center items-center';
        myTasksContainer.innerHTML = `
            <img src="image/task_complete.png" alt="task_complete" class="w-11/12 mx-auto mb-16">
            <p class="mb-24 text-text text-center">ぜんぶ、終わったよ！<br>ありがとう！</p>
        `;
    } else {
        // タスクがある場合
        myTasksContainer.className = 'w-5/6 h-[50dvh] mx-auto bg-sub-color border-4 border-white rounded-3xl overflow-y-scroll';
        myTasks.forEach(task => {
            const taskItem = document.createElement('div');
            taskItem.className = 'flex items-center my-4 pl-16';
            taskItem.innerHTML = `
                <span class="material-icons text-comment ml-8 ${task.completed ? 'text-completed' : 'text-incomplete'}">check_circle</span>
                <span class="text-large ml-16 overflow-x-hidden">${task.name}</span>
            `;
            myTasksContainer.appendChild(taskItem);

            taskItem.addEventListener("click",function(evt){
                window.location.href = "/statics/user/task/info/info.html?taskid=" + task.id;
            })
        });
    }
}
// // 自主的に引き受けるタスクを表示
// const extraTasksContainer = document.getElementById('extra_tasks_container');
// extraTasks.forEach(task => {
//     const taskItem = document.createElement('div');
//     taskItem.className = 'flex items-center my-16 pl-32';

//     taskItem.innerHTML = `
//         <span class="material-icons text-icon-xl ${task.completed ? 'text-completed' : 'text-incomplete'}">check_circle</span>
//         <span class="text-6xl ml-16">${task.name}</span>
//     `;

//     extraTasksContainer.appendChild(taskItem);
// });