// 画像プレビューとアップロード
function previewImage(event) {
    const file = event.target.files[0];
    const fileUpload = document.getElementById('file_upload');
    
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            // プレビュー画像を削除
            const existingImg = fileUpload.querySelector('img');
            if (existingImg) {
                existingImg.remove();
            }
            const img = document.createElement('img');
            img.src = e.target.result;
            img.classList.add('w-full', 'h-full', 'object-contain');
            // addアイコンを削除
            const addIcon = fileUpload.querySelector('.material-icons');
            if (addIcon) {
                addIcon.remove();
            }
            // 画像を追加
            fileUpload.appendChild(img);
        };
        reader.readAsDataURL(file);
    }
}

//ユーザーのサンプルデータ
const users = [
    { id: 1, name: "お兄さん" },
    { id: 2, name: "お姉さん" },
    { id: 3, name: "いもうと" },
    { id: 4, name: "おとうと" },
];

// ユーザーをオプションに追加する関数
function addUserOptions() {
    const userSelect = document.getElementById('user_select');

    users.forEach(user => {
        const option = document.createElement('option');
        option.value = user.id;
        option.textContent = user.name;
        userSelect.appendChild(option);
    });
}

addUserOptions();