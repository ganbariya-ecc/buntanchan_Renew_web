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
        
    } catch (ex) {
        console.error(ex);
        window.location.href = Login_Group;
        return;
    }
}

main();