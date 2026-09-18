<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>ホーム画面・お気に入り追加のご案内</title>
  <style>
    /* --- ポップアップ全体・透過制御用CSS --- */
    * { box-sizing: border-box; }
    html, body {
      margin: 0; padding: 0; background: transparent;
      width: 100vw; height: 100vh; overflow: hidden;
      font-family: sans-serif;
      pointer-events: none; /* ボタン以外の透明部分のクリックを下のサイトへ通過させる */
    }

    /* 右下追従ボタン */
    .pwa-trigger-btn {
      position: fixed; bottom: 20px; right: 20px;
      background: #b8446a; color: #fff; border: none; padding: 12px 22px;
      border-radius: 30px; font-size: 14px; font-weight: bold; cursor: pointer;
      box-shadow: 0 4px 15px rgba(0,0,0,0.25); transition: 0.2s;
      pointer-events: auto; z-index: 10;
    }
    .pwa-trigger-btn:hover { background: #9e3758; }

    /* モーダル背景（暗転エリア） */
    .pwa-modal-overlay {
      position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
      background: rgba(0, 0, 0, 0.6);
      display: none; justify-content: center; align-items: center;
      padding: 15px; z-index: 9999; pointer-events: auto;
    }
    .pwa-modal-overlay.active { display: flex; }

    /* モーダルの中身（スクロール対応） */
    .pwa-modal-container {
      position: relative; width: 100%; max-width: 680px;
      max-height: 90vh; overflow-y: auto; border-radius: 14px;
    }

    /* 閉じる（×）ボタン */
    .pwa-modal-close {
      position: absolute; top: 18px; right: 20px; font-size: 28px;
      border: none; background: none; cursor: pointer;
      color: var(--glo-muted, #6a6065); z-index: 100; line-height: 1;
    }
    .pwa-modal-close:hover { color: var(--glo-text, #1a1517); }

    /* 提示されたコードのレイアウト微調整 */
    .glo-bm { margin: 0 auto !important; }

/* -------------------------------------------------------------------
   以下、提示されたCSSコード
   ------------------------------------------------------------------- */
.glo-bm{
  --glo-bg:#fbf8f9;       /* パーツの背景 */
  --glo-panel:#ffffff;   /* タブの中 */
  --glo-line:#e3d9dd;    /* 枠線 */
  --glo-text:#1a1517;    /* 本文の文字 */
  --glo-muted:#6a6065;   /* 補足の文字 */
  --glo-accent:#b8446a;  /* 選択中のタブ・番号の色 */

  background:var(--glo-bg);
  color:var(--glo-text);
  font-family:"Hiragino Sans","Hiragino Kaku Gothic ProN","Noto Sans JP","Yu Gothic",sans-serif;
  font-size:15px;
  line-height:1.8;
  border:1px solid var(--glo-line);
  border-radius:14px;
  padding:26px 20px 28px;
  margin:32px auto;
  max-width:680px;
  -webkit-text-size-adjust:100%;
}
.glo-bm *{box-sizing:border-box;}

.glo-bm .glo-bm-eyebrow{
  display:block;
  color:var(--glo-accent);
  font-size:11px;
  letter-spacing:.14em;
  margin:0 0 10px;
}
.glo-bm .glo-bm-title{
  margin:0 0 14px;
  padding:0;
  border:none;
  background:none;
  color:var(--glo-text);
  font-size:21px;
  line-height:1.5;
  font-weight:700;
  letter-spacing:.02em;
}
.glo-bm .glo-bm-lead{
  margin:0 0 22px;
  color:var(--glo-muted);
  font-size:14px;
  line-height:1.8;
}
.glo-bm .glo-bm-label{
  margin:0 0 10px;
  color:var(--glo-text);
  font-size:13px;
}

/* 切り替え用のボタン本体は画面に出しません */
.glo-bm .glo-bm-radio{
  position:absolute;
  width:1px;
  height:1px;
  margin:-1px;
  padding:0;
  border:0;
  opacity:0;
  overflow:hidden;
  clip:rect(0 0 0 0);
}

.glo-bm .glo-bm-tabs{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:8px;
  margin:0 0 20px;
}
.glo-bm .glo-bm-tab{
  display:block;
  background:var(--glo-panel);
  border:1px solid var(--glo-line);
  border-radius:12px;
  color:var(--glo-text);
  font-size:14px;
  font-weight:600;
  line-height:1.4;
  padding:14px 6px 12px;
  text-align:center;
  cursor:pointer;
  user-select:none;
  transition:background .15s ease, border-color .15s ease;
}
.glo-bm .glo-bm-tab svg{
  display:block;
  width:20px;
  height:20px;
  margin:0 auto 6px;
  stroke:currentColor;
  fill:none;
  stroke-width:1.6;
}
.glo-bm .glo-bm-tab:hover{border-color:#c9a9b5;}
.glo-bm .glo-bm-state{
  display:block;
  margin-top:2px;
  font-size:10px;
  font-weight:400;
  opacity:0;
}

/* 選択中のタブの色 */
.glo-bm #glo-bm-ios:checked      ~ .glo-bm-tabs label[for="glo-bm-ios"],
.glo-bm #glo-bm-android:checked ~ .glo-bm-tabs label[for="glo-bm-android"],
.glo-bm #glo-bm-pc:checked      ~ .glo-bm-tabs label[for="glo-bm-pc"]{
  background:var(--glo-accent);
  border-color:var(--glo-accent);
  color:#fff;
}
.glo-bm #glo-bm-ios:checked      ~ .glo-bm-tabs label[for="glo-bm-ios"]     .glo-bm-state,
.glo-bm #glo-bm-android:checked ~ .glo-bm-tabs label[for="glo-bm-android"] .glo-bm-state,
.glo-bm #glo-bm-pc:checked      ~ .glo-bm-tabs label[for="glo-bm-pc"]      .glo-bm-state{
  opacity:.9;
}
/* キーボード操作でも位置が分かるように */
.glo-bm #glo-bm-ios:focus-visible      ~ .glo-bm-tabs label[for="glo-bm-ios"],
.glo-bm #glo-bm-android:focus-visible ~ .glo-bm-tabs label[for="glo-bm-android"],
.glo-bm #glo-bm-pc:focus-visible      ~ .glo-bm-tabs label[for="glo-bm-pc"]{
  outline:2px solid var(--glo-accent);
  outline-offset:2px;
}

/* 手順の出し分け */
.glo-bm .glo-bm-panel{display:none;}
.glo-bm #glo-bm-ios:checked      ~ .glo-bm-panels .glo-bm-panel-ios,
.glo-bm #glo-bm-android:checked ~ .glo-bm-panels .glo-bm-panel-android,
.glo-bm #glo-bm-pc:checked      ~ .glo-bm-panels .glo-bm-panel-pc{
  display:block;
}

.glo-bm .glo-bm-steps{
  list-style:none;
  margin:0 0 18px;
  padding:0;
  min-height:150px;
}
.glo-bm .glo-bm-steps li{
  display:flex;
  gap:12px;
  align-items:flex-start;
  margin:0;
  padding:10px 0;
  border-bottom:1px solid var(--glo-line);
  font-size:14px;
  line-height:1.8;
}
.glo-bm .glo-bm-steps li:last-child{border-bottom:none;}
.glo-bm .glo-bm-num{
  flex:0 0 22px;
  width:22px;
  height:22px;
  margin-top:3px;
  border:1px solid var(--glo-accent);
  border-radius:50%;
  color:var(--glo-accent);
  font-size:11px;
  line-height:20px;
  text-align:center;
}
.glo-bm .glo-bm-note{
  margin:0 0 22px;
  color:var(--glo-muted);
  font-size:12.5px;
  line-height:1.7;
}

.glo-bm .glo-bm-copy{
  display:inline-flex;
  align-items:center;
  gap:8px;
  background:var(--glo-panel);
  border:1px solid var(--glo-line);
  border-radius:12px;
  color:var(--glo-text);
  font-family:inherit;
  font-size:13px;
  padding:12px 18px;
  cursor:pointer;
}
.glo-bm .glo-bm-copy:hover{border-color:#c9a9b5;}
.glo-bm .glo-bm-copy:focus-visible{outline:2px solid var(--glo-accent);outline-offset:2px;}
.glo-bm .glo-bm-copy svg{width:15px;height:15px;stroke:currentColor;fill:none;stroke-width:1.6;}

.glo-bm .glo-bm-urlbox{
  display:none;
  width:100%;
  margin-top:10px;
  background:var(--glo-panel);
  border:1px solid var(--glo-line);
  border-radius:8px;
  color:var(--glo-text);
  font-family:inherit;
  font-size:12px;
  padding:10px;
}
.glo-bm .glo-bm-urlbox.is-shown{display:block;}

@media (max-width:420px){
  .glo-bm{padding:22px 16px 24px;margin:24px auto;}
  .glo-bm .glo-bm-title{font-size:19px;}
  .glo-bm .glo-bm-tab{font-size:13px;padding:12px 4px 10px;}
}
@media (prefers-reduced-motion:reduce){
  .glo-bm *{transition:none !important;}
}
  </style>
</head>
<body>

  <!-- 右下ボタン -->
  <button id="pwa-trigger-btn" class="pwa-trigger-btn" onclick="openModal()">📱 追加方法を見る</button>

  <!-- モーダルポップアップ本体 -->
  <div id="pwa-modal-overlay" class="pwa-modal-overlay">
    <div class="pwa-modal-container">
      <button class="pwa-modal-close" onclick="closeModal()">&times;</button>
      
      <!-- ▼ 提示されたHTMLコード ▼ -->
      <div class="glo-bm">
      <h2 class="glo-bm-title">ページをホーム画面やお気に入りに追加するには？</h2>

      <p class="glo-bm-lead">スマートフォンならホーム画面に追加、パソコンならブックマーク（お気に入り）に登録しておけば、すぐにこのページへ戻ってこられます。アプリのインストールは不要で、容量もほとんど使いません。</p>

      <p class="glo-bm-label">▼ お使いの端末をタップすると、手順が切り替わります</p>
      <input checked="checked" class="glo-bm-radio" id="glo-bm-ios" name="glo-bm-device" type="radio" /> <input class="glo-bm-radio" id="glo-bm-android" name="glo-bm-device" type="radio" /> <input class="glo-bm-radio" id="glo-bm-pc" name="glo-bm-device" type="radio" />
      <div class="glo-bm-tabs"><label class="glo-bm-tab" for="glo-bm-ios"><svg aria-hidden="true" viewbox="0 0 24 24"><rect height="20" rx="2" width="10" x="7" y="2"></rect><line x1="10.5" x2="13.5" y1="18.5" y2="18.5"></line></svg> iPhone<span class="glo-bm-state">選択中</span> </label> <label class="glo-bm-tab" for="glo-bm-android"> <svg aria-hidden="true" viewbox="0 0 24 24"><rect height="20" rx="2" width="10" x="7" y="2"></rect><line x1="10.5" x2="13.5" y1="18.5" y2="18.5"></line></svg> Android<span class="glo-bm-state">選択中</span> </label> <label class="glo-bm-tab" for="glo-bm-pc"> <svg aria-hidden="true" viewbox="0 0 24 24"><rect height="12" rx="1.5" width="18" x="3" y="4"></rect><line x1="2" x2="22" y1="20" y2="20"></line></svg> パソコン<span class="glo-bm-state">選択中</span> </label></div>

      <div class="glo-bm-panels">
      <div class="glo-bm-panel glo-bm-panel-ios">
      <ol class="glo-bm-steps">
        <li><span class="glo-bm-num">1</span><span>画面の下（機種によっては上）にある共有ボタン（□に&uarr;のマーク）を押します</span></li>
        <li><span class="glo-bm-num">2</span><span>メニューを下にスクロールして「ホーム画面に追加」を選びます</span></li>
        <li><span class="glo-bm-num">3</span><span>右上の「追加」を押すと、ホーム画面にアイコンが並びます</span></li>
      </ol>

      <p class="glo-bm-note">※ Safari以外のブラウザでご覧の場合は、項目名が「ホーム画面に追加」ではないことがあります。見つからないときは、下のボタンでURLをコピーしてSafariで開いてください。</p>
      </div>

      <div class="glo-bm-panel glo-bm-panel-android">
      <ol class="glo-bm-steps">
        <li><span class="glo-bm-num">1</span><span>ブラウザ右上のメニュー（点が縦に3つ並んだマーク）を押します</span></li>
        <li><span class="glo-bm-num">2</span><span>「ホーム画面に追加」または「アプリをインストール」を選びます</span></li>
        <li><span class="glo-bm-num">3</span><span>確認の画面で「追加」を押すと、ホーム画面にアイコンが並びます</span></li>
      </ol>

      <p class="glo-bm-note">※ ブラウザの種類によって、表示される項目名が少し違うことがあります。</p>
      </div>

      <div class="glo-bm-panel glo-bm-panel-pc">
      <ol class="glo-bm-steps">
        <li><span class="glo-bm-num">1</span><span>アドレスバー右端の星のマーク（☆）を押します。キーボードなら Ctrl+D（Macは ⌘+D）でも同じです</span></li>
        <li><span class="glo-bm-num">2</span><span>表示された画面で「完了」を押すと、ブックマーク（お気に入り）に登録されます</span></li>
        <li><span class="glo-bm-num">3</span><span>次の回が公開されたら、ブックマークからこのページを開いてください</span></li>
      </ol>

      <p class="glo-bm-note">※ スマートフォンでご覧の皆様は、上のタブから端末を選んでください。ホーム画面へのアイコン追加をご案内します。</p>
      </div>
      </div>
      <button class="glo-bm-copy" type="button"><svg aria-hidden="true" viewbox="0 0 24 24"><rect height="11" rx="2" width="11" x="9" y="9"></rect><path d="M5 15V5a2 2 0 0 1 2-2h8"></path></svg> <span class="glo-bm-copylabel">うまくいかないときはURLをコピー</span></button> <input aria-label="このページのURL" class="glo-bm-urlbox" readonly="readonly" type="text" />
      </div>
      <!-- ▲ 提示されたHTMLコード ▲ -->

    </div>
  </div>

  <script>
    // モーダル開閉制御
    function openModal() {
      document.getElementById('pwa-modal-overlay').classList.add('active');
      document.getElementById('pwa-trigger-btn').style.display = 'none';
    }
    function closeModal() {
      document.getElementById('pwa-modal-overlay').classList.remove('active');
      document.getElementById('pwa-trigger-btn').style.display = 'block';
    }
  </script>

  <!-- ▼ 提示されたScriptコード ▼ -->
  <script>
  (function(){
    var roots = document.querySelectorAll(".glo-bm");
    var root = roots[roots.length - 1];
    if (!root) return;

    var ua = navigator.userAgent;
    var device = "pc";
    if (/iPhone|iPad|iPod/.test(ua)) device = "ios";
    else if (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1) device = "ios";
    else if (/Android/.test(ua)) device = "android";

    var radio = root.querySelector("#glo-bm-" + device);
    if (radio) radio.checked = true;

    var copyBtn   = root.querySelector(".glo-bm-copy");
    var copyLabel = root.querySelector(".glo-bm-copylabel");
    var urlbox    = root.querySelector(".glo-bm-urlbox");
    if (!copyBtn) return;

    copyBtn.addEventListener("click", function(){
      var url = location.href;
      var done = function(){
        copyLabel.textContent = "コピーしました";
        setTimeout(function(){
          copyLabel.textContent = "うまくいかないときはURLをコピー";
        }, 2000);
      };
      var fallback = function(){
        urlbox.value = url;
        urlbox.classList.add("is-shown");
        urlbox.select();
        copyLabel.textContent = "下のURLを長押しでコピーしてください";
      };
      if (navigator.clipboard && window.isSecureContext){
        navigator.clipboard.writeText(url).then(done).catch(fallback);
      } else {
        fallback();
      }
    });
  })();
  </script>

</body>
</html>
