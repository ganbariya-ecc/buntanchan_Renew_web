async function main() {
    try {
        if (await IsAdmin() || await IsOwner()) {
            // adminの場合
            window.location.href = Admin_Home;
            return;
        }
    } catch (ex) {
        console.error(ex);
        window.location.href = Login_Group;
        return;
    }
}

main();