
const groupsContainer = document.querySelector('.groupsContainer');
// 管理者を表示する関数
function showAdmins(admins) {
    const adminsContainer = document.createElement('div');
    adminsContainer.id = 'adminsContainer';
    adminsContainer.className = 'flex flex-wrap';

    admins.forEach((admin) => {
        const adminDiv = document.createElement('div');
        adminDiv.className = 'flex-grow text-center';

        // アイコンの作成
        const icon = document.createElement('img');
        icon.src = admin.icon;
        icon.className = 'w-72 h-72 rounded-full mx-auto';
        adminDiv.appendChild(icon);

        // 名前の追加
        const adminName = document.createElement('p');
        adminName.className = 'text-3xl font-bold mt-12';
        adminName.textContent = admin.name;
        adminDiv.appendChild(adminName);
        adminDiv.addEventListener("click", () => {
            let password = admin["password"];

            //// パスワード表示
            if (password == "") {
                alert("パスワードはありません");
                return;
            }
            //パスワード表示
            alert("パスワード : " + password);
        })

        adminsContainer.appendChild(adminDiv);
    });
    return adminsContainer;
}

// メンバーを表示する関数
function showMembers(members) {
    const membersContainer = document.createElement('div');
    membersContainer.id = 'membersContainer';
    membersContainer.className = 'flex flex-wrap';

    members.forEach((member, index) => {
        const memberDiv = document.createElement('div');
        memberDiv.className = 'flex-grow text-center';

        // アイコンの作成
        const icon = document.createElement('img');
        icon.src = member.icon;
        icon.className = 'w-44 h-44 rounded-full mx-auto';
        memberDiv.appendChild(icon);

        // 名前の追加
        const memberName = document.createElement('p');
        memberName.className = 'text-3xl font-bold mt-8';
        memberName.textContent = member.name;
        memberDiv.appendChild(memberName);

        memberDiv.addEventListener("click", () => {
            console.log(member);

            let password = member["password"];

            //// パスワード表示
            if (password == "") {
                alert("パスワードはありません");
                return;
            }
            //パスワード表示
            alert("パスワード : " + password);
        })

        membersContainer.appendChild(memberDiv);
    });
    return membersContainer;
}

async function Get_Members(access_token, group) {
    //メンバーとadminを取得
    let admins = [];
    let members = [];

    //初期化
    for (const member of group["Members"]) {
        try {
            //メンバー情報
            const member_info = await GetMember(access_token, member["MemberID"]);

            //ユーザー
            const user = member_info["result"]["User"];
            //メンバー情報
            const member_data = member_info["result"]["Member"];

            //admin かオーナーの場合
            if (member_data["Role"] == "owner" || member_data["Role"] == "admin") {
                admins.push({
                    id: user["UserID"],
                    name: user["Name"],
                    icon: "/app/account/icon/" + user["UserID"],
                    password: user["Password"],
                });
            } else {
                members.push({
                    id: user["UserID"],
                    name: user["Name"],
                    icon: "/app/account/icon/" + user["UserID"],
                    password: user["Password"],
                });
            }

        } catch (error) {
            console.log(error);
        }
    }

    // サンプルデータ
    const groups = [
        {
            name: 'A Group',
            admins: admins,
            members: members
        }
    ];

    // グループの表示
    groups.forEach((group) => {
        const groupDiv = document.createElement('div');
        groupDiv.className = 'group';

        const groupName = document.createElement('h1');
        groupName.className = 'text-6xl text-gray-800 mt-16 mb-16 ml-12';
        groupName.textContent = group.name;
        groupDiv.appendChild(groupName);

        const adminsContainer = showAdmins(group.admins);
        const membersContainer = showMembers(group.members);

        groupDiv.appendChild(adminsContainer);
        groupDiv.appendChild(membersContainer);

        groupsContainer.appendChild(groupDiv);
    });
}
async function GetMember(access_token, MemberID) {
    const req = await fetch("/app/group/member/" + MemberID, {
        headers: {
            "Authorization": "Bearer " + access_token
        }
    })

    if (req.status != 200) {
        return null;
    }

    const res = await req.json();

    return res;
}


async function Init_Members() {
    const access_token = await GetToken();

    const groups = await GetGroups(access_token)

    const group = groups[0];

    await Get_Members(access_token, group);

}

Init_Members();

async function GenInvite(groupid) {
    //トークン取得
    const access_token = await GetToken();

    //グループ情報取得
    const req = await fetch("/app/link/create", {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + access_token,
            "GroupID": groupid
        }
    })

    //成功したか
    if (req.status != 200) {
        //json にする
        const res = await req.json();
        console.log(res);
        return null;
    }

    //json にする
    const res = await req.json();
    return res["invite_code"];
}

//リンクをコピーボタン
const link_copy_btn = document.getElementById('link_copy_btn');

link_copy_btn.addEventListener('click', async () => {
    //アクセストークン取得
    const access_token = await GetToken();

    //グループ一覧取得
    const groups = await GetGroups(access_token);

    //最初のグループ取得
    const get_group = groups[0];

    //トークン取得
    const invite_token = await GenInvite(get_group["GroupID"]);

    //トークンがないとき
    if (invite_token == null) {
        alert("リンクの生成に失敗しました");
        return;
    }

    //リンクコピー
    navigator.clipboard.writeText(window.location.origin + "/statics/app/html/join/join_code.html?invite_token=" + invite_token).then(() => {
        // 成功したときの処理
        alert("リンクをコピーしました");
    }, () => {
        // 失敗したときの処理
        alert("リンクのコピーに失敗しました");
    });
})