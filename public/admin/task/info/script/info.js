// ユーザーアイコンエリア
const UserIcon = document.getElementById("UserIcon");

// 確定ボタン
const submit_button = document.getElementById("submit_button");

// サンプルデータの配列
let tasks = [];

let url_string = window.location.href;
// 文字列としてのURLをURLオブジェクトに変換する。
let url = new URL(url_string);
// URLオブジェクトのsearchParamsのget関数でIDがdの値を取得する。
let taskid = url.searchParams.get("taskid");

// タスク画像を表示するimg
const task_image = document.getElementById("task_image");

async function main() {
    try {
        if (await IsMember()) {
            // Memberの場合
            window.location.href = Member_Home;
            return;
        }

        // アイコン設定
        UserIcon.src = await GetIcon();

        console.log(taskid);

        // 画像を取得する
        const imgBlob = await GetImg(taskid);
        if (imgBlob) {
            // 画像を表示
            task_image.src = URL.createObjectURL(imgBlob);
        }

        // 自信のデータ取得
        const myData = await GetInfo();

        // タスクの詳細取得
        const taskData = await GetTaskInfo(taskid);
        const TaskInfo = taskData["result"];

        // データを追加
        tasks.push(
            {
                title: taskData["result"]["TaskName"],
                deadline: taskData["result"]["ExpirationDate"],
                status_message: ConvertMsg(taskData["result"]["Status"]),
                task_message: taskData["result"]["Explanation"]
            }
        )

        // 他の人向けの場合
        if (myData["UserID"] != TaskInfo["OrderTargetID"]) {
            submit_button.textContent = "削除";

            submit_button.addEventListener("click",async function (evt) {
                // 確認
                if (!confirm("削除しますか")) {
                    return;
                }

                // JWT 取得
                const token = await GetJwt();

                // 削除リクエスト
                const req = await fetch("/task/del",{
                    method: "DELETE",
                    headers : {
                        "Authorized" : token,
                        "taskid" : taskid
                    }
                })

                // エラー処理
                if (req.status != 200) {
                    alert("削除失敗");
                    return;
                }

                // Admin Home 
                window.location.href = Admin_Home;
            })
        } else {
            // 自分向けの場合
            submit_button.addEventListener("click",function(evt) {
                window.location.href = "/statics/common/report/report.html?taskid=" + taskid;
            });
        }

        InitTask();
    } catch (ex) {
        console.error(ex);
        window.location.href = Login_Group;
        return;
    }
}

function ConvertMsg(taskStatus) {
    switch (taskStatus) {
        case "InProgress":
            return "進行中";
            break;
        case "Reported":
            return "報告済み"
            break;
        case "Completed":
            return "完了済み";
            break;
        case "Rejected":
            return "拒否済み"
            break;
    }

    return "";
}

main();

function secToDayTime(seconds) {
    const day = Math.floor(seconds / 86400);
    const hour = Math.floor((seconds % 86400) / 3600);
    const min = Math.floor((seconds % 3600) / 60);
    const sec = seconds % 60;
    let time = '';

    if (day !== 0) {
        time = `${day}日${hour}時間${min}分${sec}秒`;
    } else if (hour !== 0) {
        time = `${hour}時間${min}分${sec}秒`;
    } else if (min !== 0) {
        time = `${min}分${sec}秒`;
    } else {
        time = `${sec}秒`;
    }

    return time;
}

function Show_CountDown(deadline_unix) {
    let countdownDate = new Date(deadline_unix * 1000);

    let interval = setInterval(function () {
        let now = new Date();
        let distance = Math.floor((countdownDate - now) / 1000);

        if (distance < 0) {
            clearInterval(interval);
            document.getElementById('countdown').innerHTML = `<span class="text-comment">カウントダウン終了</span>`;
        } else {
            document.getElementById('countdown').textContent = secToDayTime(distance);
        }
    }, 1000);
}


function InitTask() {
    // サンプルデータの取得
    const task = tasks[0];

    const taskTitle = task.title;
    const task_status_message = task.status_message;
    const task_message = task.task_message;

    document.getElementById('task_title').textContent = taskTitle;
    document.getElementById('status-message').textContent = task_status_message;
    document.getElementById('task_message').innerHTML = task_message;

    // 締め切りをUNIXタイムスタンプに変換してカウントダウンを開始
    Show_CountDown(task.deadline);
}

const back_button = document.getElementById("back_button");
back_button.addEventListener("click",function(evt){
    window.location.href = "../list/list.html";
})