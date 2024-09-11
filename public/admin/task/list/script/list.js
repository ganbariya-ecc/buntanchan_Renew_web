// サンプルデータ
let users = [];

async function main() {
    try {
        if (await IsMember()) {
            // Memberの場合
            window.location.href = Member_Home;
            return;
        }

        // 現在のグループメンバーを取得
        const members = await GetCurrentMembers();

        members.forEach((member) => {
            users.push({
                id : member["UserID"],
                name : member["UserName"],
            })
        });
        
        addUserOptions();
        showTasks();
    } catch (ex) {
        console.error(ex);
        window.location.href = Login_Group;
        return;
    }
}

main();


const tasks = [
    { id: 1, name: "ごみだし", completed: false },
    { id: 2, name: "かいもの", completed: true },
    { id: 3, name: "せんたく", completed: true },
    { id: 4, name: "そうじ", completed: true },
];

// ユーザーをオプションに追加する関数
function addUserOptions() {
    const userSelect = document.getElementById('userSelect');

    users.forEach(user => {
        const option = document.createElement('option');
        option.value = user.id;
        option.textContent = user.name;
        userSelect.appendChild(option);
    });
}

// タスクを表示する関数
function showTasks() {
    const taskList = document.getElementById('taskList');

    tasks.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.className = 'flex items-center my-16 pl-32';

        taskItem.innerHTML = `
            <span class="material-icons text-icon-xl ${task.completed ? 'text-completed' : 'text-incomplete'}">check_circle</span>
            <span class="text-sub ml-16">${task.name}</span>
        `;
        taskList.appendChild(taskItem);
    });
}
