<script setup>
  import { ref, onMounted } from "vue";
  import { toPng } from "html-to-image";
  import { APP_CONFIG } from "@/config";

  const omikujiData = APP_CONFIG.omikuji;

  const result = ref(null);
  const hasDrawn = ref(false);
  const userName = ref("");
  const cardRef = ref(null);

  onMounted(() => {
    const savedDataJSON = localStorage.getItem(APP_CONFIG.storageKey);
    const today = new Date().toLocaleDateString();

    if (savedDataJSON) {
      const savedData = JSON.parse(savedDataJSON);
      if (savedData.date === today) {
        const foundResult = omikujiData.find(
          (item) => item.label === savedData.result
        );
        if (foundResult) {
          result.value = foundResult;
          userName.value = savedData.name || "";
          hasDrawn.value = true;
        }
      } else {
        localStorage.removeItem(APP_CONFIG.storageKey);
      }
    }
  });

  const draw = () => {
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * omikujiData.length);
      const selected = omikujiData[randomIndex];
      const today = new Date().toLocaleDateString();

      result.value = selected;
      hasDrawn.value = true;

      const dataToSave = {
        result: selected.label,
        name: userName.value,
        date: today,
      };
      localStorage.setItem(APP_CONFIG.storageKey, JSON.stringify(dataToSave));
    }, 300);
  };

  const saveCardAsImage = async () => {
    if (!cardRef.value) return;
    try {
      const dataUrl = await toPng(cardRef.value, {
        cacheBust: true,
        backgroundColor: "#ffffff",
        pixelRatio: 3,
      });
      const link = document.createElement("a");
      link.download = `omikuji_${new Date().getTime()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("画像の保存に失敗しました", err);
      alert("画像の保存に失敗しました。");
    }
  };

  const shareOnTwitter = () => {
    const nameText = userName.value ? `${userName.value}の` : "";
    const text = `今日の${nameText}運勢は【${result.value.label}】でした。%0a%0a`;
    const url = `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent("https://" + APP_CONFIG.brandUrl)}`;
    window.open(url, "_blank");
  };
</script>

<template>
  <div class="card-container">
    <transition name="fade" mode="out-in">
      <div v-if="!hasDrawn" class="card initial-card" key="start">
        <p class="message">今日の運勢を占います。</p>
        <div class="input-area">
          <input
            type="text"
            v-model="userName"
            placeholder="お名前（省略可）"
            class="name-input"
            @keyup.enter="draw"
          />
        </div>
        <button @click="draw" class="draw-button">おみくじを引く</button>
      </div>

      <div v-else class="result-wrapper" key="result">
        <div class="omikuji-paper" ref="cardRef">
          <h2 class="paper-header">
            今日の{{ userName ? userName : "" }}の運勢は…
          </h2>

          <div class="paper-top">
            <div class="vertical-line"></div>
            <h3 class="result-rank">{{ result.label }}</h3>
            <div class="vertical-line"></div>
          </div>

          <div class="dotted-divider"></div>

          <div class="paper-bottom">
            <p class="result-text-vertical">{{ result.desc }}</p>
          </div>
        </div>

        <div class="action-buttons">
          <button @click="saveCardAsImage" class="action-btn save-btn">
            画像を保存
          </button>
          <button @click="shareOnTwitter" class="action-btn tweet-btn">
            Xでポスト
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
  .card-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .card {
    background-color: #fff;
    width: 90%;
    max-width: 280px;
    padding: 1.5rem 1rem;
    border-radius: 8px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    text-align: center;
    border: 1px solid #eee;
  }

  .message {
    line-height: 1.6;
    margin-bottom: 1rem;
    color: #555;
    font-family: "Yu Mincho", serif;
    font-size: 0.9rem;
  }

  .input-area {
    margin-bottom: 1rem;
  }

  .name-input {
    width: 80%;
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    text-align: center;
    outline: none;
  }

  .draw-button {
    background-color: #d93d3d;
    color: #fff;
    border: none;
    padding: 0.7rem 1.5rem;
    font-size: 0.9rem;
    border-radius: 4px;
    cursor: pointer;
  }

  .result-wrapper {
    text-align: center;
    width: 90%;
    max-width: 340px;
  }

  .omikuji-paper {
    border: 8px solid #1a5c36;
    background-color: white;
    padding: 1.5rem 0.8rem;
    border-radius: 4px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
  }

  .paper-header {
    margin: 0 0 1rem 0;
    font-size: 1rem;
    color: #333;
    font-family: "Yu Mincho", serif;
  }

  .paper-top {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 140px;
    gap: 1rem;
  }

  .result-rank {
    font-size: 3rem;
    margin: 0;
    color: #000;
    font-family: "Yu Mincho", serif;
    writing-mode: vertical-rl;
    text-orientation: upright;
    line-height: 1;
  }

  .vertical-line {
    width: 2px;
    height: 100px;
    background-color: #000;
  }

  .dotted-divider {
    width: 90%;
    height: 1px;
    border-bottom: 1px dotted #999;
    margin: 1.2rem 0;
  }

  .paper-bottom {
    width: 100%;
    text-align: center;
  }

  .result-text-vertical {
    font-size: 0.85rem;
    line-height: 1.7;
    color: #333;
    font-family: "Yu Mincho", serif;
    writing-mode: vertical-rl;
    margin: 0 auto;
    height: 170px;
    text-align: left;
    white-space: pre-wrap;
    display: inline-block;
  }

  .action-buttons {
    margin-top: 1.5rem;
    display: flex;
    justify-content: center;
    gap: 1rem;
  }

  .action-btn {
    border: none;
    padding: 0.6rem 1rem;
    border-radius: 20px;
    font-size: 0.8rem;
    cursor: pointer;
    transition: opacity 0.3s;
    color: white;
    font-weight: bold;
  }

  .save-btn {
    background-color: #555;
  }

  .tweet-btn {
    background-color: #000;
  }

  .action-btn:hover {
    opacity: 0.8;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
