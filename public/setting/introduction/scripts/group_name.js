//メンバー集
let members = {}

//グループ名
const group_members = document.getElementById('group_members');

//メンバー追加
const add_member_button = document.getElementById('add_member_button');

//メンバー追加
add_member_button.addEventListener('click', () => {
    console.log('click');

    //IDを生成
    const addid = crypto.randomUUID();

    //メンバー追加
    group_members.insertAdjacentHTML("afterbegin", `
        <input class="mr-auto ml-auto mt-24 text-3xl font-light w-4/5 h-24 rounded-3xl" type="text" id="${addid}">
    `);

    //一番上までスクロール
    group_members.scrollTop = 0;

    //IDで取得
    const get_text = document.getElementById(addid);

    //辞書に追加
    members[addid] = {
        "input_area": get_text,
        "name": "",
        "isAdmin": false
    };

    //フォーカスを当てる
    get_text.focus();
})

//最初にボタンを押す
add_member_button.click();

//作成ボタン
const create_button = document.getElementById('create_button');

//グループ名入力
const group_name_input = document.getElementById("group_name_input");

//作成ボタン
create_button.addEventListener('click', () => {
    //グループ名が入力されていないとき
    if (group_name_input.value == "") {
        alert("グループ名を入力してください");
        return;
    }

    //メンバー一覧を回す
    for (let memberid in members) {
        //名前を取得
        const input_name = (members[memberid].input_area.value);

        //入力がからのとき
        if (input_name == "") {
            //input要素を削除
            members[memberid].input_area.remove();

            //辞書から削除
            delete members[memberid];
            continue;
        }

        //名前を設定
        members[memberid].name = input_name;
    }

    //メンバーを保存する
    window.sessionStorage.setItem('members', JSON.stringify(members));

    //グループ名を保存する
    window.sessionStorage.setItem("group_name", group_name_input.value);

    window.location.href = './menber_check.html';
})

async function main() {
    const access_token = await GetToken();

    //グループ取得
    const groups = await GetGroups(access_token);

    //グループ数を取得する
    if (groups.length > 0) {
        //タスク取得
        const req = await fetch("/app/account/me", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + access_token,
            }
        })

        //失敗したとき
        if (req.status != 200) {
            //なにもしない
            return;
        }

        //自信のID
        const res_json = await req.json();
        const my_role = res_json["role"];

        //成功したとき
        //owner の場合
        if (my_role == "owner") {
            //グループ作成に飛ばす
            window.location.href = "/statics/app/html/admin/home.html";
        } else {
            //それ以外の場合
            window.location.href = "/statics/app/html/user/home.html";
        }
    }
}

main();