// ハンバーガーメニューのjs
$(document).ready(function () {
    $('.js-btn').on('click', function () { // js-btnクラスがクリックされたときに実行
        $('.menu').toggleClass('open'); // メニューにopenクラスを追加・削除
        $('.btn-line').toggleClass('open'); // バーガーの線にopenクラスを追加・削除
        $('.overlay').toggleClass('show'); // グレイレイヤーにshowクラスを追加・削除
    });
});
