const UserIcon = document.getElementById("UserIcon");

async function main() {
    try {
        if (await IsMember()) {
            // Memberの場合
            window.location.href = Member_Home;
            return;
        }

        UserIcon.src = await GetIcon();
    } catch (ex) {
        console.error(ex);
        window.location.href = Login_Group;
        return;
    }
}

main();