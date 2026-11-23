/*
 * 도깨비 시세표 · 관리자 설정
 * 이 파일만 고쳐서 올리면 모든 사용자에게 반영돼요. (사용자 화면에서는 바꿀 수 없어요)
 * 고친 뒤에는 아래 version과 version.json의 version을 같은 숫자로 올려 주세요.
 */
var APP_CONFIG = {
  version: "2.3.1",

  // 꺼진 상태 알림 서버 주소 (Cloudflare Worker 주소, 예: https://kkaebi-push.내아이디.workers.dev)
  // 비워 두면 '앱이 꺼져 있어도 알림 받기' 버튼이 '준비 중'으로 보여요.
  pushServer: "https://kkaebi-push.dreamedtuna.workers.dev",

  // 앱 맨 아래에 표시할 제작자 닉네임
  maker: "참치",

  // 건의하기 버튼이 여는 주소 (GitHub 저장소 Settings → Features에서 Issues를 켜 두세요)
  // 구글 설문지 등 다른 주소를 넣으면, 적은 내용을 복사해 둔 뒤 그 주소를 열어요.
  feedbackUrl: "https://github.com/dreamedTuna/dokkaebi-price/issues/new",

  // 돌파 분해량 [천요석, 요혼석] — 1돌파 ~ 5돌파 (평균값=중간값)
  breakthrough: {
    "무기":   [[18,1595],[54,1655],[108,1715],[180,1775],[270,1835]],
    "방어구": [[7,359],[21,383],[42,407],[70,431],[105,455]],
    "장신구": [[10,457],[28,489],[55,521],[91,553],[137,585]]
  },

  // 개방 분해량 [요혼석] — 1개방 ~ 5개방 (천요석 없음, 평균값=중간값)
  open: {
    "무기":   [135,335,635,1035,1535],
    "방어구": [55,95,155,235,335],
    "장신구": [65,115,195,294,425]
  },

  // 알리미 고정 일정 (days: 0=일 1=월 2=화 3=수 4=목 5=금 6=토) · 문파 컨텐츠 종류
  alarm: {
    fixed: [
      { id: "fieldBoss", name: "필드보스",        time: "21:00", days: [0,1,2,3,4,5,6], icon: "👹" },
      { id: "nakhwa",    name: "낙화의 전장 보스", time: "22:00", days: [0,1,2,3,4,5,6], icon: "🌸" },
      { id: "dimension", name: "차원점령전",       time: "21:30", days: [2],             icon: "🌀" }
    ],
    guild: ["요신 토벌령", "결계지 방어", "미혹의 정원", "신기 쟁탈전"]
  },

  // 숙제 체크리스트 (초기화: 매일 오전 5시 / 주간은 수요일 오전 5시)
  todo: {
    resetHour: 5, weeklyResetDay: 3,
    daily:  [ {id:"dq", name:"일일 퀘스트"}, {id:"shop_soul", name:"단상점 교환 · 요혼석 100개"}, {id:"shop_coin", name:"단상점 교환 · 엽전 100만"}, {id:"dungeon_d", name:"일일 비경 (1시간)"} ],
    weekly: [ {id:"wq", name:"주간 퀘스트"}, {id:"dungeon_w", name:"주간 비경 (5시간)"}, {id:"tower", name:"승천의 탑"}, {id:"craft", name:"천요석 제작"},
              {id:"bokbun", name:"복분이 상점 · 천요석 10개"}, {id:"member", name:"멤버십 잡화상점 · 천요석 10개"} ]
  },

  // 요혼석 환산 기준
  ratio: {
    rare: 2,       // 희귀아이템 1개 분해 시 평균 요혼석
    easy: 600,     // 만귀령패 쉬움 (4인 품앗이)
    normal: 1200,  // 만귀령패 보통 (4인 품앗이)
    dust: 100      // 가루 몇 개 = 요혼석 1개
  },

  // 구매 신호·재검증 기준
  signal: {
    rec: 10, must: 20, high: 15,   // 구매 추천 / 강력 추천 / 비쌈 기준 (%)
    profitMust: 20,                // 영웅장비 강력 추천 수익률 (%)
    window: 10, days: 7, minRec: 3, // 평소 시세: 최근 10번·7일, 3번부터 분석
    warnH: 6, staleH: 24,          // 확인 권장 / 재검증 필요 (시간)
    outlier: 50,                   // 평소와 이만큼(%) 차이 나면 재검증
    simH: 1, simTol: 10            // 1시간 간격·±10%로 두 번 기록되면 진짜 시세로 인정
  }
};
