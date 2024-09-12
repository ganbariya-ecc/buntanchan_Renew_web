async function GetTasks() {
    // トークン取得
    const atoken = await GetJwt();

    const req = await fetch("/task/tasks",{
        method: "GET",
        headers : {
            "Authorized" : atoken,
        }
    })

    // エラー処理
    if (req.status != 200) {
        console.log(await req.text());
        return null;
    }

    // json で取得
    const result = await req.json();

    return result["result"];
}