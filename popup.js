(function() {
  // ① トップページでのみ表示させる設定
  // URLのパスが「/」または「/index.html」以外なら処理をストップ
  if (window.location.pathname !== '/' && window.location.pathname !== '/index.html') {
    return; 
  }

  // ② すでに「閉じる」を押した人には二度と出さない設定（Local Storage）
  if (localStorage.getItem('pwaModalClosed')) {
    return; 
  }

  // ③ CSS（デザイン）を生成してページに適用
  const style = document.createElement('style');
  style.innerHTML = `
    /* 背景の暗いオーバーレイ */
    #pwa-install-modal {
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0, 0, 0, 0.6); z-index: 9999;
      display: flex; justify-content: center; align-items: center;
      opacity: 0; transition: opacity 0.5s; /* フワッと表示させる */
    }
    /* ポップアップの白い箱 */
    .pwa-modal-content {
      background: #fff; padding: 20px; border-radius: 10px;
      width: 90%; max-width: 400px; position: relative;
      text-align: center; box-shadow: 0 4px 10px rgba(0,0,0,0.3);
      font-family: sans-serif;
    }
    /* 閉じるボタン */
    #pwa-close-btn {
      position: absolute; top: 10px; right: 15px; font-size: 24px;
      border: none; background: none; cursor: pointer; color: #666;
    }
    /* 説明文のエリア */
    .pwa-instructions {
      background: #f7f7f7; padding: 15px; margin-top: 15px;
      border-radius: 5px; text-align: left; font-size: 14px; line-height: 1.6;
    }
  `;
  document.head.appendChild(style);

  // ④ HTML（ポップアップの中身）を生成してページに追加
  const modal = document.createElement('div');
  modal.id = 'pwa-install-modal';
  modal.innerHTML = `
    <div class="pwa-modal-content">
      <button id="pwa-close-btn">&times;</button>
      <h3 style="margin: 0 0 10px 0; font-size: 18px; color: #333;">ホーム画面に追加</h3>
      <p style="font-size: 14px; color: #555; margin: 0;">このサイトをホーム画面に追加すると、次回からアプリのようにサクサク開けます！</p>
      <div class="pwa-instructions">
        <p style="margin: 0 0 10px 0;"><b>【iPhone (Safari) の場合】</b><br>画面下部の「共有ボタン（□から↑が出るマーク）」をタップし、「ホーム画面に追加」を選んでください。</p>
        <p style="margin: 0;"><b>【Android の場合】</b><br>ブラウザ右上のメニュー（︙）から「ホーム画面に追加」を選んでください。</p>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  // ⑤ 2秒後（2000ミリ秒後）にフワッと表示させる
  setTimeout(function() {
    modal.style.opacity = '1';
  }, 2000);

  // ⑥ 「閉じるボタン」を押したときの動作
  document.getElementById('pwa-close-btn').addEventListener('click', function() {
    modal.style.opacity = '0'; // フワッと消す
    setTimeout(function() {
      modal.remove(); // 完全に削除
    }, 500);
    // 閉じた記録をブラウザに保存（次回から出ないようにする）
    localStorage.setItem('pwaModalClosed', 'true');
  });
})();
