async function main() {
    try {
        // 現在のグループを取得
        const currentg = await GetCurrentG();

        // グループが存在するとき
        const groupName = currentg["result"]["Group"]["Name"];

        // ロール取得
        const Role = currentg["result"]["Mydata"]["MemberRole"];

        if (groupName != undefined) {
            if (Role == "Owner" || Role == "Admin") {
                window.location.href = Admin_Home;
            } else {
                window.location.href = Member_Home;
            }
        }
    } catch (ex) {
        console.log("エラーです")
        console.error(ex);
    }

}

main();