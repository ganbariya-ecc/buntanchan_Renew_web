// サンプルデータ
let users = [];

// タスク一覧
let tasks_list = [];

// ユーザーアイコンエリア
const UserIcon = document.getElementById("UserIcon");

async function main() {
    try {
        if (await IsMember()) {
            // Memberの場合
            window.location.href = Member_Home;
            return;
        }

        // 現在のグループメンバーを取得
        const members = await GetCurrentMembers();

        users.push({
            id: "-1",
            name: "ALL",
        })

        members.forEach((member) => {
            users.push({
                id: member["UserID"],
                name: member["UserName"],
            })
        });

        // ユーザー表示
        addUserOptions();

        // アイコン設定
        UserIcon.src = await GetIcon();

        // タスク初期化
        const tasks = await GetTasks();

        tasks.forEach((task) => {
            console.log(task);
            tasks_list.push({ id: task["TaskID"], name: task["TaskName"], completed: false,OrderTargetID: task["OrderTargetID"] });
        })

        showTasks();
    } catch (ex) {
        console.error(ex);
        window.location.href = Login_Group;
        return;
    }
}

main();

// ボタンにイベントつける
const task_create_btn = document.getElementById("task_create_btn");
task_create_btn.addEventListener("click", function (evt) {
    window.location.href = "../create/create.html";
})

const userSelect = document.getElementById('userSelect');

// ユーザーをオプションに追加する関数
function addUserOptions() {
    users.forEach(user => {
        const option = document.createElement('option');
        option.value = user.id;
        option.textContent = user.name;
        userSelect.appendChild(option);
    });

    userSelect.addEventListener("change",function(evt){
        showTasks();
    })
}

// タスクを表示する関数
function showTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = "";

    tasks_list.forEach(task => {

        if (userSelect.value == task["OrderTargetID"] || userSelect.value == "-1") {

            const taskItem = document.createElement('div');
            taskItem.className = 'flex items-center my-4 pl-16';

            taskItem.innerHTML = `
                <span class="material-icons text-comment ml-8 ${task.completed ? 'text-completed' : 'text-incomplete'}">check_circle</span>
                <span class="text-large ml-16 overflow-x-hidden ">${task.name}</span>
            `;
            taskList.appendChild(taskItem);

            taskItem.addEventListener("click", function (evt) {
                window.location.href = `/statics/admin/task/info/info.html?taskid=${task.id}`;
            })
        }
    });
}
