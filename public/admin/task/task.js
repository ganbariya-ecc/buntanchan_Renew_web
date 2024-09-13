async function TestTask() {
    // JWT 取得
    const token = await GetJwt();

    const req = await fetch("/task/gtest",{
        method: "POST",
        headers : {
            "Authorized" : token
        }
    })

    console.log(await req.json());
}


async function GetImg(taskid) {
    // JWT 取得
    const token = await GetJwt();

    // タスク画像を取得する
    const req = await fetch("/task/taskimg",{
        method: "GET",
        headers : {
            "Authorized" : token,
            "taskid" : taskid
        }
    })

    //エラー処理
    if (req.status != 200) {
        if (req.status == 404) {
            // blob で返す
            return await req.blob();
        }

        return null;
    }

    //blob で返す
    return await req.blob();
}

async function GetTaskInfo(taskid) {
    // JWT 取得
    const token = await GetJwt();

    // タスク画像を取得する
    const req = await fetch("/task/info",{
        method: "GET",
        headers : {
            "Authorized" : token,
            "taskid" : taskid
        }
    })

    //エラー処理
    if (req.status != 200) {
        return null;
    }

    //blob で返す
    return await req.json();
}