// 画像プレビューとアップロード
function previewImage(event) {
    const file = event.target.files[0];
    const fileUpload = document.getElementById('file_upload');
    
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            // プレビュー画像を削除
            const existingImg = fileUpload.querySelector('img');
            if (existingImg) {
                existingImg.remove();
            }
            const img = document.createElement('img');
            img.src = e.target.result;
            img.classList.add('w-full', 'h-full', 'object-contain');
            // addアイコンを削除
            const addIcon = fileUpload.querySelector('.material-icons');
            if (addIcon) {
                addIcon.remove();
            }
            // 画像を追加
            fileUpload.appendChild(img);
        };
        reader.readAsDataURL(file);
    }
}


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
            document.getElementById('countdown_time').textContent = secToDayTime(distance);
        }
    }, 1000);
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

let url_string = window.location.href;
// 文字列としてのURLをURLオブジェクトに変換する。
let url = new URL(url_string);
// URLオブジェクトのsearchParamsのget関数でIDがdの値を取得する。
let taskid = url.searchParams.get("taskid");

const back_button = document.getElementById("back_button");
back_button.addEventListener("click",function(evt){
    window.history.back();
})

// タスクのタイトルと締め切りを指定
async function Init() {
    // アイコン設定
    UserIcon.src = await GetIcon();

    console.log(taskid);

    // 自信のデータ取得
    const myData = await GetInfo();

    // タスクの詳細取得
    const taskData = await GetTaskInfo(taskid);
    const TaskInfo = taskData["result"];

    // 他の人向けの場合
    if (myData["UserID"] != TaskInfo["OrderTargetID"]) {
        // 戻る
        window.history.back();
    }

    const taskTitle = taskData["result"]["TaskName"]; // タスクタイトル
    const task_status_message = ConvertMsg(taskData["result"]["Status"]); // タスクのステータス

    document.getElementById('task_title').textContent = taskTitle;
    document.getElementById('status-message').textContent = task_status_message;

    Show_CountDown(taskData["result"]["ExpirationDate"]);
}

Init();
