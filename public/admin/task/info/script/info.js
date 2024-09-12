function secToDayTime(seconds) {
    const day = Math.floor(seconds / 86400);
    const hour = Math.floor((seconds % 86400) / 3600);
    const min = Math.floor((seconds % 3600) / 60);
    const sec = seconds % 60;
    let time = '';
    
    if (day !== 0) {
        time = `${day}日${hour}時間${min}分${sec}秒`;
    } else if (hour !== 0) {
        time = `${hour}時間${min}分${sec}秒`;
    } else if (min !== 0) {
        time = `${min}分${sec}秒`;
    } else {
        time = `${sec}秒`;
    }
    
    return time;
}

function Show_CountDown(deadline_unix) {
    let countdownDate = new Date(deadline_unix * 1000);

    let interval = setInterval(function () {
        let now = new Date();
        let distance = Math.floor((countdownDate - now) / 1000);

        if (distance < 0) {
            clearInterval(interval);
            document.getElementById('countdown').innerHTML =`<span class="text-comment">カウントダウン終了</span>`;
        } else {
            document.getElementById('countdown_time').textContent = secToDayTime(distance);
        }
    }, 1000);
}

// サンプルデータの配列
const tasks = [
    {
        title: "かいもの",
        deadline: '2024-09-20T00:00:00',
        status_message: "手伝ってください！",
        task_message: "ライフスーパーにパスタソースをかってほしい。<br>じぶんが好きなあじをえらんでもいいよ。<br>おねがい"
    }
];

// タスクのタイトルと締め切りを指定
document.addEventListener('DOMContentLoaded', () => {

    // サンプルデータの取得
    const task = tasks[0];

    const taskTitle = task.title;
    const deadline = new Date(task.deadline);
    const task_status_message = task.status_message;
    const task_message = task.task_message;

    document.getElementById('task_title').textContent = taskTitle;
    document.getElementById('status-message').textContent = task_status_message;
    document.getElementById('task_message').innerHTML = task_message;

    // 締め切りをUNIXタイムスタンプに変換してカウントダウンを開始
    const deadlineUnix = Math.floor(deadline.getTime() / 1000);
    Show_CountDown(deadlineUnix);
});