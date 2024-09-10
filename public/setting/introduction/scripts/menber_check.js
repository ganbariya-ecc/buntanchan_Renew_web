//セッションストレージから取得
const load_members = window.sessionStorage.getItem("members");

//メンバー表示エリア
const group_members = document.getElementById("group_members");

let membes = {};
//メンバー取得
if (load_members) {
    members = JSON.parse(load_members);

    //メンバー表示
    for (let memberid in members) {
        try {
            console.log(memberid);

            //checkbox ID
            const checkboxID = `${memberid}_checkbox`; 

            //メンバー追加
            const add_div = `
            <div class="bg-amber-100 w-8/12 mt-10 flex justify-center ml-auto mr-auto checkbox-wrapper">
                <input type="checkbox" id="${checkboxID}">
                <label for="${checkboxID}" class="checkbox-label"></label>
                <label for="${checkboxID}" class="text-label">${members[memberid]["name"]}</label>
            </div>
            `

            //メンバー追加
            group_members.insertAdjacentHTML("afterbegin", add_div);

            //チェック
            const checkbox = document.getElementById(checkboxID);

            //チェック
            checkbox.addEventListener("change", () => {
                //json 変更
                members[memberid]["isAdmin"] = checkbox.checked;
            })
        } catch (ex) {
            console.log(ex);
        }
    }
} else {
    //ロードに失敗した場合
    alert("メンバー情報の取得に失敗しました");

    //一つ前に遷移する
    BackPage();
}

//グループ名取得
const group_name = window.sessionStorage.getItem("group_name");

//グループ名が存在するか
if (group_name) {
    //存在する場合
} else {
    //存在しない場合戻る
    alert("グループ名に取得に失敗しました");

    //一つ前に遷移する
    BackPage();
}

async function SubmitGroup() {
    //メンバー一覧
    let members_list = [];

    //for 回す
    for (let memberid in members) {
        try {
            //ユーザーの権限
            let userRole = "member";

            //管理者か確認
            if (members[memberid]["isAdmin"]) {
                //ロールを管理者にする
                userRole = "admin";
            }

            //リストにプッシュする
            members_list.push({
                "name" : members[memberid]["name"],
                "role" : userRole
            })
        } catch (ex) {
            console.log(ex);
            alert("作成に失敗しました");
            return;
        }
    }

    try {
        //アクセストークン取得
        const access_token = await GetToken();

        //グループを作成する
        const req = await fetch("/app/group/create",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : "Bearer " + access_token
            },
            body: JSON.stringify({
                group_name: group_name,
                members: members_list,
            })
        })

        //Jsonに変換
        const res = await req.json();

        //ステータスコード確認
        if (req.status != 200) {
            //レスポンスを取得

            //表示
            console.log(res);    

            alert("作成に失敗しました");
            return;
        }

        //表示
        console.log(res);

        window.location.href = "/statics/app/html/admin/home.html"
    } catch (ex) {
        //エラー表示
        console.error(ex);
        alert("作成に失敗しました");
    }

    //成功してたら飛ばす
}

//イベント登録
const submit_button = document.getElementById("submit_button");
submit_button.addEventListener("click",SubmitGroup);

function BackPage() {
    window.location.href = "/statics/app/html/setting_user/group_name.html"
}