// 특정 조합에 대한 스페셜 이름/설명 (네가 준 예시 포함)
const specialTypes = {
  FAND: {
    title: "직진형 열정 리더",
    desc:
      "빨리 다가가고, 애정표현이 풍부하며, 함께 있는 시간과 연락이 중요하고, " +
      "연애에서 리드도 잘하는 타입이에요. 상대에게 직진하고, 어느 정도 질투도 있는 편이라 " +
      "‘내 사람’이라는 확신이 들 때 가장 편안해요."
  },
  SCRM: {
    title: "차분·독립 연애 파트너",
    desc:
      "천천히 다가가고, 표현은 조용하지만 진심은 깊고, 각자의 시간이 꼭 필요하며, " +
      "상대를 부드럽게 맞춰주는 스타일이에요. 서로의 일상과 자유를 존중해 줄 때 " +
      "관계가 더 단단해지는 타입이에요."
  },
  FCRD: {
    title: "시크·주도형 연애러",
    desc:
      "접근은 빠르고 적극적인데, 표현은 쿨하고 담담한 편이에요. " +
      "연락이나 간섭에는 비교적 자유로운 편이고, 데이트나 계획은 주도적으로 이끄는 타입이에요. " +
      "적당한 거리감과 텐션 있는 썸·연애를 즐기기 좋아요."
  }
};

// 각 알파벳별 기본 설명 문장
const letterDesc = {
  F: "빠르게 마음을 표현하고 먼저 움직이는 직진형이에요.",
  S: "상대를 천천히 알아가면서 안정감을 느끼는 타입이에요.",
  A: "애정표현이 많고 따뜻하게 챙겨주는 스타일이에요.",
  C: "표현은 적지만 마음은 진지한, 다소 담담한 스타일이에요.",
  N: "연락과 함께 있는 시간이 중요해서, 가까이 있을 때 안정감을 느껴요.",
  R: "각자의 시간과 공간을 존중하는 독립적인 연애를 선호해요.",
  D: "결정을 잘 내리고 데이트나 계획을 이끄는 리더 역할을 즐겨요.",
  M: "상대를 잘 맞추고 부드럽게 흘러가는 연애를 좋아하는 타입이에요."
};

function getSelectedValue(name) {
  return document.querySelector(`input[name="${name}"]:checked`);
}

// 스페셜 타입이 아닐 때, 코드(FAND 같은 것)로 자동 설명 만들어주는 함수
function buildGenericDescription(code) {
  return code
    .split("")
    .map((ch) => letterDesc[ch])
    .join(" ");
}

document.addEventListener("DOMContentLoaded", () => {
  const submitBtn = document.getElementById("submit-btn");
  const resetBtn = document.getElementById("reset-btn");
  const resultSection = document.getElementById("result-section");
  const resultCodeEl = document.getElementById("result-code");
  const resultTitleEl = document.getElementById("result-title");
  const resultDescEl = document.getElementById("result-desc");

  // 결과 보기 버튼 클릭
  submitBtn.addEventListener("click", () => {
    const fs = getSelectedValue("FS");
    const ac = getSelectedValue("AC");
    const nr = getSelectedValue("NR");
    const dm = getSelectedValue("DM");

    if (!fs || !ac || !nr || !dm) {
      alert("모든 문항에서 하나씩 골라줘! 😊");
      return;
    }

    const code = fs.value + ac.value + nr.value + dm.value; // 예: FAND
    const prettyCode = code.split("").join(" "); // "F A N D" 형식

    let title;
    let desc;

    if (specialTypes[code]) {
      // 미리 정의해 둔 스페셜 조합이면 그 내용 사용
      title = specialTypes[code].title;
      desc = specialTypes[code].desc;
    } else {
      // 나머지 조합은 자동 설명
      title = `${prettyCode} 타입`;
      desc = buildGenericDescription(code);
    }

    resultCodeEl.textContent = prettyCode;
    resultTitleEl.textContent = title;
    resultDescEl.textContent = desc;

    resultSection.classList.remove("hidden");
    resultSection.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  // 다시 하기 버튼 클릭
  resetBtn.addEventListener("click", () => {
    document
      .querySelectorAll('input[type="radio"]')
      .forEach((input) => (input.checked = false));

    resultSection.classList.add("hidden");
    resultCodeEl.textContent = "";
    resultTitleEl.textContent = "";
    resultDescEl.textContent = "";
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});