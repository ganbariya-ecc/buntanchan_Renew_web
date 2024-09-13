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
                id: member["UserID"],
                name: member["UserName"],
            })
        });

        addUserOptions();

        // showTasks();
    } catch (ex) {
        console.error(ex);
        window.location.href = Login_Group;
        return;
    }
}

main();

// 画像プレビューとアップロード
function previewImage(event) {
    const file = event.target.files[0];
    const fileUpload = document.getElementById('file_upload');

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
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

// ユーザーをオプションに追加する関数
function addUserOptions() {
    const userSelect = document.getElementById('user_select');

    users.forEach(user => {
        const option = document.createElement('option');
        option.value = user.id;
        option.textContent = user.name;
        userSelect.appendChild(option);
    });
}


// タスク作成の処理
const task_create_form = document.getElementById("task_create_form");

task_create_form.addEventListener("submit", async function (evt) {
    // submit イベントをキャンセル
    evt.preventDefault();

    const tas_name = task_create_form.task_name.value;
    const task_experience = new Date(task_create_form.experience.value);
    const task_point = task_create_form.task_point.value;
    const member_id = task_create_form.member_id.value;
    const task_image = task_create_form.task_image.files[0];
    const task_description = task_create_form.description.value;

    // JWT 生成
    const atoken = await GetJwt();

    // アクセス
    const req = await fetch("/task/create", {
        method: "POST",
        headers: {
            "Authorized": atoken,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "TaskName": tas_name, //タスク名
            "Explanation": task_description, // タスクの説明
            "ExpirationDate": task_experience.getTime() / 1000,  // タスクの有効期限
            "OrderTargetID": member_id, // 依頼先ID
            "Point": Number(task_point)    //タスクのポイント
        })
    });

    if (req.status != 200) {
        console.log(await req.text());
        return;
    }

    // 作成したタスクIDを取得
    const create_result = await req.json();
    const taskid = create_result["result"];

    // ファイルをアップロード
    const payload = new FormData();
    // ファイルを追加
    payload.append("img",task_image);

    // ファイルをアップロード
    const imgReq = await fetch("/task/upimg",{
        method: "POST",
        headers : {
            "Authorized" : atoken,
            "taskid" : taskid
        },
        body: payload
    });

    // 成功したか
    if (imgReq.status != 200) {
        console.log(await imgReq.text());
        return;
    }

    // 画面遷移
    window.location.href = "../list/list.html";
})