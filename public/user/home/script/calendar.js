// カレンダー
const calendarEl = document.getElementById('calendar');
const date = new Date();
const currentYear = date.getFullYear();
const currentMonth = date.getMonth();
const currentDate = date.getDate();
const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

const today_counter = document.getElementById("today_counter");

async function Init_Calendar() {

    // 当日の日付を取得とクラスを付けて
    const currentDay = date.getDate();
    const getDayClass = (day) => {
        if (day === currentDay) return 'current-day';
        return "";
    };

    // カレンダーのHTML構造を生成
    let calendarHtml = '<table><thead><tr>';
    for (let i = 0; i < 7; i++) {
        calendarHtml += `<th>${['日', '月', '火', '水', '木', '金', '土'][i]}</th>`;
    }
    calendarHtml += '</tr></thead><tbody>';     // 余計な<tr>を削除した

    for (let i = 1; i <= daysInMonth; i++) {
        const dayOfWeek = new Date(currentYear, currentMonth, i).getDay();
        if (i === 1) {
            calendarHtml += '<tr>';
            for (let j = 0; j < dayOfWeek; j++) {
                calendarHtml += '<td></td>';
            }
        }
        // 追加部分
        const dayClass = getDayClass(i);

        calendarHtml += `<td class="${dayClass}" id="${currentYear}_${currentMonth}_${i}">${i}</td>`;    // 当日のクラスを追加部分
        if (dayOfWeek === 6) {
            calendarHtml += '</tr>';
            if (i < daysInMonth) {
                calendarHtml += '<tr>';
            }
        } else if (i === daysInMonth) {
            for (let j = dayOfWeek + 1; j <= 6; j++) {
                calendarHtml += '<td></td>';
            }
            calendarHtml += '</tr>';
        }
    }
    calendarHtml += '</tbody></table>';
    calendarEl.innerHTML = calendarHtml;

    //現在時刻表示
    today_counter.textContent = currentYear + "年" + (currentMonth + 1) + "月";
}

Init_Calendar();