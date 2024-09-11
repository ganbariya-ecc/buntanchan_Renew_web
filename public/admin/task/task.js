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


TestTask();