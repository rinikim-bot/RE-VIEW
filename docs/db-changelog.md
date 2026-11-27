# 채널 DB 변경 기록

## 2026-11-27 · 28,380개 (미분류 검수 CSV 4개 추가 반영)

- 직전 24,203개 DB에 새 미분류 검수 CSV 4개(`미분류-검수-2026-11-27` 이름의 파일 4개, 756 · 5,412 · 1,580 · 249개)를 반영했다. 4개 파일에는 채널 ID 기준 7,161개 채널이 있고, 이 중 2,602개는 이미 DB에 있었다.
- 총 채널 수: 28,380개. 이번에 추가한 수: 4,177개.
- 추가 기준: DB에 없는 채널 중 `include`가 Y이고 `ai_type`이 8개 유형인 채널만 넣었다. 추가분의 `classificationMethod`는 gemini(4,176개) · gemini_then_human(1개), `dataStatus`는 ai_reviewed(팀 검수 전)이다.
- 추가분 유형별: 엔터 1,219 · 지식 885 · 브이로그 686 · 스포츠 494 · 음악 357 · 게임 349 · 뷰티 134 · 뉴스 53
- 제외한 수: 382개. 근거가 부족해 넣지 않았다.
  - `include` 공백(신뢰도 low): 342개
  - 유형을 알 수 없음(unknown): 28개
  - 파일끼리 유형이 다르고 신뢰도도 같아 결정하지 못한 채널: 12개(DB에 있는 보류 채널 62개는 DB 값을 유지했다)
- 새 CSV끼리 유형이 다른 채널 163개: 신뢰도가 더 높은 쪽을 선택했다(86개). 신뢰도까지 같으면 결정하지 않고 보류했다(74개). `edited=Y`인 4건(강남언니, 지구별, 해외쇼쇼, Cookie Wagoo)은 사람이 고친 값이라 최우선으로 반영했다.
- DB와 이미 같은 채널 ID가 있는 채널: DB 값을 기본으로 유지했다. 새 CSV와 유형이 달랐던 720개 중 신뢰도 high인 293개가 변경 후보였고, 이 중 이전 CSV에서는 DB와 같은 유형이었던 101개는 라운드마다 결과가 달라 DB를 유지했다. 나머지 192개만 CSV 유형으로 바꿨다. 사람이 고친 2건(해외쇼쇼, Cookie Wagoo)도 바꿨다. 이를 포함해 유형이 바뀐 채널은 194개다.
- 유형을 바꾼 채널은 `type`, `category8`, `category8Code`, `contentDescription`(CSV note)을 바꿨고, 사람이 고친 값은 `classificationMethod`를 gemini_then_human으로 표기했다. 모두 11/27에 추가한 Gemini 채널이고, 기존 사이트 DB 6,474개와 11/25 팀 검수분 3,037개는 바뀌지 않았다.
- 이름만 같고 ID가 다른 채널은 별개 채널로 모두 넣었다(이름 겹침 44쌍). ID는 같은데 이름이 다른 채널은 DB 이름을 유지했다.
- 모든 채널의 type과 category8Code가 8개 유형 중 하나로 일치하고, 채널 ID가 다른 채널과 겹치는 경우는 없다.
- 이번에 바뀐 파일: `data/channel-types.json`, `data/channel-types.js`, `docs/db-changelog.md`

### 유형별 채널 수

엔터테인먼트 7,151 · 음악 4,247 · 지식·교육 5,953 · 브이로그·일상 5,034 · 뷰티·패션 1,490 · 스포츠 2,808 · 게임 966 · 뉴스·시사 731

### 유형을 바꾼 채널 192개 (기존 → 변경, 신뢰도 high)

1201 아이브(엔터→음악), 모아모아(음악→엔터), 유시은 sieun(브이로그→엔터), 일팔케이(음악→브이로그), 또왔어(브이로그→엔터), 러블리타임(음악→엔터), 오해단(음악→엔터), 이넉살(엔터→브이로그), LIFEPLUS TV(엔터→지식), 개그듀오 다비치(브이로그→음악), 귀여움팩토리(브이로그→엔터), 딱복(음악→엔터), 레이다 - IVE ENG Sub & 日本語字幕(엔터→음악), 솔로몬코드 SOLOMONCHORD(엔터→뷰티), 찾았다 내 엔돌핀(음악→엔터), 하루종일 플레이리스트(엔터→음악), 허걱(음악→엔터), daisuki_kbeauty(뷰티→엔터), JPOP소금(음악→게임), 1분의순간(뉴스→엔터), 가치요가 Gachi Yoga(스포츠→지식), 고니 goeun(뷰티→음악), 그림그릴시간(브이로그→지식), 노숭이는 에이나(음악→엔터), 대글이(엔터→음악), 덕덕로그 DDLog(음악→브이로그), 도리(음악→엔터), 돌줍는언니(음악→엔터), 무슨 말이 필요해(음악→엔터), 미남미녀내게로오라(음악→엔터), 미녀협회(음악→엔터), 배추현(음악→엔터), 봄날에Climax(음악→엔터), 세상너(음악→엔터), 셀럽밈캐치(음악→엔터), 스프 : 스튜디오 프로미스나인(브이로그→엔터), 시온이야(뷰티→브이로그), 에이튜드(음악→엔터), 예능잼잼(지식→엔터), 옷장(브이로그→지식), 요정재형(음악→엔터), 우와한 비디오(지식→엔터), 월간베스트 MonthlyBest(엔터→음악), 이센느(엔터→음악), 이호정 HOLLYDAY(엔터→뷰티), 익숙한 데자뷰(음악→엔터), 인플루 KPOP(엔터→음악), 쮸아쮸아(음악→엔터), 채널톡(뷰티→지식), 컷앤타임(지식→엔터), 코라니(엔터→음악), 밀리터리K(엔터→지식), 리브렁(엔터→음악), 오평힙(음악→엔터), 의도치 않은 바접(엔터→스포츠), 공감1분(음악→엔터), 블랙캠(브이로그→엔터), 탕후루 아니고 정후루(브이로그→엔터), 도파민창작소(지식→엔터), 랭킹공(엔터→지식), 지니키즈 (인기 동요・동화)(엔터→음악), 디테일(엔터→음악), 뭘보냥(브이로그→엔터), 결정적장면(엔터→스포츠), 대박s쇼츠(브이로그→엔터), 미녀이슈(엔터→스포츠), 빌리언아이디어(엔터→지식), 스피드7(음악→엔터), 야구로망(음악→스포츠), 김희뷰(뷰티→엔터), 이거봄??(지식→엔터), 이거사(뷰티→지식), 힐링매거진(음악→엔터), 기억의순간(뷰티→엔터), 낭만피플(뉴스→스포츠), 모먼트로그(엔터→스포츠), 봉봉이의 쇼츠노트(엔터→지식), 스타는별(음악→엔터), 심심하댕(브이로그→엔터), 아이도루냥(음악→엔터), 어?(엔터→지식), 잼컨여기(브이로그→엔터), 쿨냥냥(음악→엔터), Storypick(엔터→게임), 10초만(엔터→스포츠), 4B연필(지식→엔터), 낰낰티비(음악→엔터), 누워냥댕(브이로그→엔터), 돌아에몽(엔터→음악), 딱한장면(지식→엔터), 딸기우유(음악→엔터), 리리센센느느(엔터→브이로그), 먹구리(브이로그→엔터), 멍냥데이즈(브이로그→엔터), 비비픽(음악→브이로그), 쁨이bbeume(뷰티→브이로그), 쇼츠샘(브이로그→엔터), 숏때리기(엔터→지식), 신박발견(엔터→지식), 쓰잘데기(지식→엔터), 아이돌핀(음악→엔터), 엔섞어(엔터→스포츠), 연예이슈Top랭킹(엔터→음악), 요멤삼(브이로그→엔터), 원탱(엔터→스포츠), 월붕이(브이로그→게임), 율희TV(브이로그→뷰티), 윸팁(엔터→음악), 인생모이쓔?(브이로그→지식), 재밌슈(엔터→게임), 저스트모먼트(브이로그→엔터), 저승이의 세상구경(브이로그→엔터), 조필름TV(지식→엔터), 쩌쩌의모험(엔터→게임), 파이리빵(음악→엔터), 편쿡(브이로그→지식), 하이아정(지식→브이로그), 핸들잡고(엔터→스포츠), 혜야 Hyeya(지식→뷰티), Anwar Jibawi(엔터→스포츠), Bollywood Actresses(엔터→스포츠), CORTIS(브이로그→음악), favory(스포츠→음악), HYOMIN KOO구효민(브이로그→뷰티), IDOLCATCHUP(음악→엔터), K챱챱(음악→엔터), WonderWilds(브이로그→엔터), Yangpoonee 양푼이(브이로그→엔터), SuGaR 슈가(엔터→브이로그), 리센느도감(음악→엔터), 피디니무(음악→엔터), 어이없어(지식→엔터), 날으는다람쥐(엔터→지식), 리센느입니다(음악→엔터), 아이브아카이브(엔터→음악), 프루스트(음악→엔터), 감동수달(지식→음악), 돌픽갤러리(뷰티→음악), 얼미새도 새라우(음악→엔터), 이쁜이모음집(음악→엔터), 케이팝팬튜브(음악→엔터), 고수의살림(브이로그→지식), 또카리나(음악→엔터), 똥꾸뇨옹(브이로그→엔터), 숏츠툰(지식→엔터), 아이돌냥(뷰티→엔터), 아이브모음(음악→엔터), 케이팝찍먹(엔터→음악), 1분악기들(음악→지식), 덕포인트(음악→엔터), 덕후지인(음악→엔터), 도니케이팝_1000개(엔터→음악), 도다이(브이로그→지식), 돌토리(음악→엔터), 득템(브이로그→지식), 디스댓(음악→엔터), 로열젤리(지식→엔터), 매혹의 향수(엔터→음악), 물고기물고기오이데(엔터→음악), 별별소문(음악→엔터), 볼륨올려(브이로그→엔터), 서센느(엔터→음악), 숏꺄르(음악→엔터), 스크롤로리(뷰티→엔터), 심멎(뷰티→음악), 아육대(음악→엔터), 앙파피클(브이로그→뷰티), 얼레벌레(뷰티→지식), 영미새(음악→엔터), 영비모【영화 비하인드 모음】(엔터→지식), 영지주의보(음악→엔터), 올데프다이어리(엔터→브이로그), 웃픽 | 리센느(음악→엔터), 윤정한야호(음악→엔터), 이채영 아카이브(엔터→음악), 인절미마켓 ingermi market🐶(브이로그→엔터), 일본미녀보관소(엔터→음악), 임용패쓰(지식→게임), 좌두(뷰티→브이로그), 쫑순아 여기 밥하나 추가🍚(엔터→음악), 차개듀인배오(엔터→음악), 최토끼ttokkii(뷰티→브이로그), 커피우유1505(브이로그→음악), 케플(엔터→음악), 클립백서(브이로그→엔터), 킹카퀸카 아카이브(음악→엔터), 힙테이크(음악→뉴스), Animal나라(브이로그→엔터), May pli(음악→뉴스), Yinrun's World(엔터→게임), 채널아하: 채널A Health & Asset(지식→엔터), 차장금 차예련(엔터→지식)

### 사람이 고친 값으로 바꾼 채널 2개

해외쇼쇼(지식→엔터), Cookie Wagoo - Story, Merch Review, BGM(엔터→음악)

### 이전 CSV와 어긋나 DB를 유지한 채널 101개 (DB 유형 ↔ 새 CSV 유형)

웃기숏(음악↔CSV 엔터), 햅삐설윤(음악↔CSV 엔터), 도파민 케이팝(음악↔CSV 엔터), 뒹굴맨(스포츠↔CSV 엔터), 문채원 Moon chaewon(엔터↔CSV 뷰티), 셀럽볼꼬양(음악↔CSV 게임), 원샷한솔OneshotHansol(브이로그↔CSV 엔터), 유스데스크 YOO'S DESK.(엔터↔CSV 음악), 절세미녀 김희연 회계사(지식↔CSV 브이로그), 어나더뉴스(스포츠↔CSV 뉴스), 힙셀(음악↔CSV 엔터), 쇼맛(엔터↔CSV 스포츠), 탁탐정(뉴스↔CSV 엔터), 1분 터짐(엔터↔CSV 스포츠), 영콕드콕(지식↔CSV 엔터), 우웃짜(엔터↔CSV 스포츠), 킥 (KICK)(스포츠↔CSV 엔터), 쇼츠쇼츠픽(스포츠↔CSV 엔터), 가요톱5(음악↔CSV 지식), Howieazy(엔터↔CSV 스포츠), 쇼츠더쿠(엔터↔CSV 스포츠), 야! 너두심심(스포츠↔CSV 엔터), 이슈노트(스포츠↔CSV 뉴스), 토리무비(지식↔CSV 엔터), 핵빠따(엔터↔CSV 스포츠), 무아지경(스포츠↔CSV 브이로그), 수니그룹 댄스 [SOONIGROUP DANCE](음악↔CSV 엔터), 어쩌라고(스포츠↔CSV 엔터), 오사임(스포츠↔CSV 게임), 웃짜고835(엔터↔CSV 스포츠), 캐빈아빠 - 쉽고 빠른 신차정보(엔터↔CSV 지식), Wolf(스포츠↔CSV 게임), 24_Market(엔터↔CSV 음악), 감동픽(엔터↔CSV 스포츠), 광형의 환카 Fancar(엔터↔CSV 지식), 알고포스(스포츠↔CSV 엔터), 애니멀로그(엔터↔CSV 지식), 야구너울(엔터↔CSV 스포츠), 영화불꽃(엔터↔CSV 지식), 잠깐만tv(엔터↔CSV 스포츠), 지나가는물고기(스포츠↔CSV 음악), 키킥썰(엔터↔CSV 브이로그), 포텐 도파민(브이로그↔CSV 엔터), 학교종(엔터↔CSV 스포츠), 홈스타일러스(지식↔CSV 스포츠), 홈잇(뷰티↔CSV 지식), Javed ASMR(지식↔CSV 엔터), Kelly Wakasa(브이로그↔CSV 스포츠), 1분의행복(지식↔CSV 엔터), 364일(지식↔CSV 브이로그), 5초쇼핑(지식↔CSV 엔터), 감동버튼(지식↔CSV 엔터), 갓잇TV(지식↔CSV 엔터), 강원도민TV(스포츠↔CSV 뉴스), 꿀잼박제(지식↔CSV 게임), 내가jam이써(스포츠↔CSV 엔터), 당구튜븝(엔터↔CSV 게임), ㄹㅇ뉴스(뉴스↔CSV 스포츠), 로띠끼룩(Rotiggiluk)(뷰티↔CSV 지식), 롤집(게임↔CSV 엔터), 롤카카(게임↔CSV 음악), 멘탈플러그(지식↔CSV 스포츠), 뷔티크 | VTQ(뷰티↔CSV 지식), 서울경제TV(지식↔CSV 뉴스), 세상연구소(지식↔CSV 스포츠), 숏뿌라스(엔터↔CSV 지식), 썰댕이(엔터↔CSV 지식), 쏭픽(음악↔CSV 엔터), 쑥덕템(브이로그↔CSV 엔터), 아이좋아(스포츠↔CSV 음악), 알고리즘 탈출 실패(스포츠↔CSV 엔터), 옆집스타(스포츠↔CSV 엔터), 유니집(음악↔CSV 엔터), 이런거야(엔터↔CSV 스포츠), 이슈닷(뉴스↔CSV 스포츠), 재밋쟈나(엔터↔CSV 브이로그), 캠핑TV - H2 KOREA(엔터↔CSV 지식), 포근한 발자국(브이로그↔CSV 스포츠), 피까축(스포츠↔CSV 뉴스), 헐 진짜?(엔터↔CSV 지식), 현장LEO(엔터↔CSV 브이로그), BTS_CODE(음악↔CSV 엔터), ポテト王国(지식↔CSV 엔터), 미나미시네요(음악↔CSV 엔터), 아이소(엔터↔CSV 음악), 푸디타임 FoodieTime(브이로그↔CSV 엔터), 건심선생(뉴스↔CSV 지식), 둠치따(엔터↔CSV 음악), 레전드zip(엔터↔CSV 음악), 스낵타운 SNACKTOWN(엔터↔CSV 지식), 승리자마인드(엔터↔CSV 지식), 유머1짱(지식↔CSV 엔터), 유머돌고래(음악↔CSV 엔터), 헝그리제이Hungry J(지식↔CSV 스포츠), 헉이슈(뉴스↔CSV 엔터), 운동메이트 장쌤(뷰티↔CSV 지식), 홈트하루(스포츠↔CSV 지식), 모멘트핏 록코치(지식↔CSV 스포츠), 템캣(브이로그↔CSV 지식), 퍼니페이스(엔터↔CSV 지식), ChoiRakuLife(지식↔CSV 뷰티)

### 제외한 채널 382개

- include 공백(신뢰도 low) 342개: 러볼리실험실, 루아쇼츠, 말랑젤리, 야호템, 이승기2, 자반 콩 jaban kong, 정보통나무, 제주속으로, 제철통통 K-Season Food, 지니왕, 진슬토리 Tori, 체크보드, 케이힙하이퍼, 퀸텀인사이트, 뭉굴뭉굴, 김이누, 빡빡이 시카, 김노아, 정준홍, 로즈, 예상치 못한 필름, 비둘기 사랑, Crazy Driver, Ghentalin, 여여소리, 히얼 HRHE HEAR, GiggleFin, 그냥 필름, 아랑이누나, 준준브로, 퀸앤쿡Queen & Cook, 꼬꼬지다소다, 아트스테이션_예술로tv, 왼손글씨, MEZOo., 말티쥬, 문열쓰패럿Moonyeol's parrot, 산타는 미스터리, 새봄아씨, 소소한우생, 가라사대, 가부리, 규리의세로튜브, 모기시러, 무민서, 신인방송(김소라), 실버왕, 쓸데있템, 양라, 영우녀석, 예뽀, 오후드라, 와클립, 우와우!, 육투구, 율TV, 조강식, 지팡나라, 허밍연아, 홈런한방!, 화랑이네(HR . Family), 흰비, Alexander, Lord of Squirrels, AYESEl TV, BaramTago, Behind Mystery, Birds_vibes, BubuBambino, GRANDMA SIK, JEONG GYU TV, Kiyul Toys, Mooo11, papa뽀미, Rui, Soul Stories With Auntie, Unknown Rider, تصوير حيوانات وطيور, @규, 🌼ToTy🌼, 313usually, 3초정지, 48k-2, 강인경, 강하준티빙, 갱상도, 건잭, 계란말이pick, 고파민, 규만, 그림쟁이, 글로우아틀리에, 기다려도파민, 김강민_Kim Kang min, 김다한, 김드얘, 김뽀뿡!, 김어진, 까멜로멜로마시멜로, 꼬꼬삼촌^^, 꼬미짱, 꾸꾸 닭•강아지, 냥냥게장, 네네네네, 다, 다동구리, 다람쥐, 다이다희, 단경, 달려라 뭉쿠루지 [Run Moong krooge], 댕균, 데비아, 데이리에, 독밥, 뒤웅박, 똘이, 띵오, 라고함, 랭킹킥, 러브바구, 레전드네, 륀륀륀, 리우띠, 만사, 말빨로조진다, 매일봐숏츠, 맥시언즈, 맹구네 방앗간, 먹태깡, 멈추지않을자, 멍들 물어보시개, 멍지, 메디툰, 무라사키, 무한정열, 문문MunMun, 문용숙, 뮤빌로 : MUVYLO, 미녀는보는것만으로도즐겁다, 미뇽포레 일상룰루, 미니비숑 망고, 미시카 ASMR 포비돈요오드맛쿠키, 미아사거리90, 바로이거야 !, 박나나, 박둘둘, 박수민, 방구석소설가, 방어사랑, 백마언니, 뱅딘, 벽을넘어서 beyond, 별 소릴 다 듣네, 별걸다봄a, 보굴보굴 (bogulbogul), 보라색 유니버스 스튜디오, 보수일격, 볼만하다, 볼베킹, 브라더한량 (free brother), 비빅숏츠, 빅토리, 빠밤, 뿡빵공주, 사남매 난장판, 살아난잡것들, 소중한소리, 송지효 JIHYO SSONG, 쇼오츠, 쇼츠폭발, 스며들고싶어네게, 아드레날린 연구소 : 터프한 인생실험실, 안녕하또영, 알룔료, 알카Alka, 얄쌍이, 양사탕, 어쩌죠이야기, 예능팡, 예스스, 오규오규, 오늘도 숏츠, 오매단, 온재 Onzed, 우리맨, 우와이거, 유나른, 윤 꿀, 의태, 이슈조아, 일이삼, 임하윤, 재공품, 젊은할머니, 정지차니 JUNG JICHANI, 제이피씨의 습작, 제일라 jeila, 조통닥, 주아🫪, 즐아사, 진도믹스=똥개, 진라면4발면, 집안사람, 짚푸리, 짤의 국경, 짧은필름, 쩔어 커뮤니티, 차뜨라마, 창밖세상, 코코넛 밀크, 콜라맛 아폴로, 콩쥥어, 쿨타임 CoolTime, 크림은새, 클릭 엔딩, 클립보고가, 태권도강함, 탱보하우스, 테토남일대기, 토종해병벌, 통수산최사장, 트빌 20Billion, ㅍㅌㅂ, 파오, 판슥, 퍼튜브, 페비쵸비, 평범한술범이, 프레임아웃, 한국교육문화방송, 한조각월드, 한컷아우라, 할짓없는승윤, 해피멀, 홍시맛이나서 홍시라한것이온데, 황룡갑, 황씨네, 후원, 힐링강사 오코치, ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤꞋꞌꞋꞌ, ㅗㅗㅗ, 红笺听雨, A H G M, abdo & waad, Ahmm., AKANG FEBRI, Amin Shorts, Amna smart, Amroz Khan, Animalcom, Artck Gaming, Artisan Mud, artmoto, Asel Zümra Ballı, ASMR LIVE-TV, ASMR RELAXATION, ASMR-TV12, Avery Avila and Grace, Busil the cat, Curious Mouser, DaDa TV, dc_akademi : Burak Demirhan, Denver, Devvert Parmar, dodamtor(korea), Dopamine Dance Floor, ELZOZ TV, GlideLife, Gola x, Hamvori, Hamza Dublaj, HappyBabyHaircuts1.0, HelloJosie, Heosu, jatin.__8441, JourneywithVishal, Júlia  tx, Kupo TV, mahiji01, Mez174Gaming&Fitness, MotionRush, Musa Meadows, NDEN PRO, NEXORA_PLAY_1, NOX007, play with aaribah🧿, playsummer, plusman55 한국어를 영어로  In Korean,in English, Proof 2.0, PURESTAR KOREA, QCLAB TV, Rengoku minecraft, RONNey., Tzatziki & Huni, USA little chaos, Vabikes, VaniMani Basa Jawa, vicky, Wenzel TCG, Yayyy, Zaid, ღ민츠Mintzღ, 🐣 매력왕 🐣, 감성충전중, 강백, 게임발굴단, 김감자, 까엉이엉니, 꼬꼬댁, 냠끼, 너한테만 하는 얘긴데, 다고, 메로나 비비빅, 밈박스, 뽀솜, 書記 / shoki【白衣委員会】, 쇼츠 어택, 아니부기, 안녕하신교, 야호미나미데스도죠요로시쿠오네가이시마스, 우바비, 하뉴, 햇살메이, 후추추추, austinthewingman, Brainrot Space, CAPTAIN JK, Jackie(ng) the tree down, Kpop_Lens, Lucky Kirby ASMR, Mypleasure, pokemon_fan, Real Life manish, Rubiks.sayda.1387, SACHI TV, sare, Satisfying Grains, starlit, Tăng Tiến Official, that's a bad idea, very, KJStrike, 갱상도남
- unknown 28개: 옥수수콘 주식회사, 키위, 농수도NSD, 곰돌이TV, Lapolita, 압둘알리과로사, 🍪ПИЧЕНЬКА🍪, 👑CrownKing تاج الملك, 고랜덤, 몌맘대로, 쭌튜버, Anshika kanaujiya rudra, Draqulyn, Gowtham Nataraj, Rakib pest, RiaTV, Sks sangita sah, the dredger, ViolaM123, 이나, 궁금함, 그래서 누구야?, 주야르, 쥰이, 캐빈, Shortvs, SKRIPKOSLAV, 꿍이
- 보류(신뢰도 동률) 12개: 해양수산부, 드리고, 디에디션, 숏맨, 어데이즈 리뷰어, 요즘셀럽, 너는 꽃이야, 김지원, 소요 soyo, 연예가쭝계, 퇴근안함, 포켓리센느

## 2026-11-27 · 24,203개 (미분류 검수 CSV 반영)

- 직전 17,046개 DB에 `미분류-검수-2026-11-27.csv`(792개)와 `미분류-검수-2026-11-27 (1).csv`(8,245개)를 반영했다. 두 파일을 채널 ID로 합치면 8,804개이고, 이 중 1,169개는 이미 DB에 있었다.
- 총 채널 수: 24,203개. 이번에 추가한 수: 7,157개.
- 추가 기준: DB에 없는 채널 중 `include`가 Y이고 `ai_type`이 8개 유형인 채널만 넣었다. 추가분의 `classificationMethod`는 gemini, `dataStatus`는 ai_reviewed(팀 검수 전)이다.
- 추가분 유형별: 엔터 1,731 · 지식 1,981 · 스포츠 1,639 · 음악 481 · 뉴스 480 · 브이로그 459 · 게임 322 · 뷰티 64
- 제외한 수: 478개. 근거가 부족해 넣지 않았다.
  - `include` 공백(신뢰도 low): 396개
  - 유형을 알 수 없음(unknown, 정보 부족 등): 82개
- DB와 이미 같은 채널 ID가 있는 1,169개: DB 값을 기본으로 유지했다. 유형이 달랐던 423개 중 CSV 신뢰도가 high인 154개만 CSV 유형으로 바꿨고(아래 목록), medium 240개 · low 27개 · unknown 2개는 DB 유형을 그대로 뒀다. 정보가 없다고 나온 채널은 정보가 있는 DB 값을 따랐다.
- 유형을 바꾼 154개는 `type`, `category8`, `category8Code`, `contentDescription`(CSV note)을 바꿨고 `classificationMethod`와 `dataStatus`는 그대로다. 모두 11/27에 추가한 Gemini 채널이고, 기존 사이트 DB 6,474개와 11/25 팀 검수분 3,037개는 바뀌지 않았다.
- ID가 같은데 이름이 다른 8개는 이름이 바뀐 채널로 보고 DB 이름을 유지했다. 이름만 같고 ID가 다른 채널은 별개 채널로 모두 넣었다(이름 겹침 29쌍).
- 모든 채널의 type과 category8Code가 8개 유형 중 하나로 일치하고, 채널 ID가 다른 채널과 겹치는 경우는 없다.
- 이번에 바뀐 파일: `data/channel-types.json`, `data/channel-types.js`, `docs/db-changelog.md`

### 유형별 채널 수

엔터테인먼트 5,891 · 음악 3,918 · 지식·교육 5,063 · 브이로그·일상 4,374 · 뷰티·패션 1,365 · 스포츠 2,304 · 게임 610 · 뉴스·시사 678

### 유형을 바꾼 채널 154개 (기존 → 변경)

또볼래?(음악→엔터), DaeHyun(엔터→게임), 짤터백작(엔터→스포츠), 개떡상(브이로그→엔터), 꾸르템템(뷰티→엔터), 예능인턴(음악→스포츠), 호랑구팔(엔터→스포츠), 1분조각(브이로그→엔터), 데일리BTS(엔터→음악), 무비썬(지식→엔터), 쇼도독(엔터→음악), 숏밍아웃(엔터→게임), 스냅봤니(브이로그→엔터), 아이돌이슈_숏츠(엔터→음악), 아이돌픽(음악→엔터), 영화미슐랭(지식→엔터), 왜케막애기가찌(음악→엔터), 유머돌고래(엔터→음악), 이민정 MJ(브이로그→스포츠), 텟카이(지식→스포츠), 트렌드룸 Trend Room(음악→엔터), 힙셀(엔터→음악), Bakey(엔터→음악), T1 Keria(스포츠→게임), 사이다썰(엔터→지식), 오늘한마디(엔터→지식), 와 여러분(엔터→음악), 무비젼(엔터→음악), 쇼츠쇼츠픽(엔터→스포츠), 펫파라치(브이로그→엔터), 밀리탐사대(엔터→지식), 숏 타임(스포츠→엔터), 이건쇼츠각(엔터→지식), 정치이슈다(엔터→뉴스), 킥맨(브이로그→엔터), 평양냉면(지식→스포츠), 시옷씨옷(엔터→음악), 힙부림(엔터→음악), K-클래스(엔터→지식), 뉴타운 미싱클럽(엔터→음악), 라면남자(브이로그→엔터), 둠치따(음악→엔터), 잼무비(엔터→음악), 에그마니(브이로그→스포츠), 오늘도꿀잼(엔터→음악), 인생숏츠(스포츠→지식), 잔향 | AFTERTONE(엔터→음악), 재미쏙(브이로그→지식), 한컷동물극장(엔터→지식), K밥정심(엔터→지식), KTV 정책 K(지식→뉴스), 하루10초(스포츠→지식), ilovekor(브이로그→지식), 골댕로그(브이로그→엔터), 냥심멍심(브이로그→엔터), 마인드모먼트(브이로그→엔터), 야! 너두심심(엔터→스포츠), 제니쫀득쿠키(엔터→음악), 탑 탤런트 코리아(음악→엔터), 핫템리포트(엔터→지식), BTS 감동드라마7(엔터→음악), י(지식→스포츠), 감동한국물결(엔터→브이로그), 고봉밥(지식→엔터), 판타지애니멀TV(브이로그→엔터), 꿀잼식빵(브이로그→엔터), 둠바룸바(스포츠→엔터), 멍때리개(스포츠→지식), 쇼팝(음악→엔터), 숏뿌라스(지식→엔터), 스타팡(엔터→음악), 신박쓰(엔터→지식), 알파컷(엔터→스포츠), 재밌는거볼사람?(브이로그→엔터), 지구리(브이로그→엔터), 지구촌동물극장(브이로그→엔터), 핑퐁(음악→엔터), 한번만줘라(음악→엔터), TVCHOSUN - TV조선(엔터→음악), 1분팝콘(뷰티→엔터), 가내수작업(지식→스포츠), 고꼬_GO(엔터→스포츠), 누리뉘리(브이로그→엔터), 도파민 케이팝(엔터→음악), 땅콩쿠키(뷰티→지식), 롤코(지식→엔터), 롤펀(브이로그→게임), 멍냥하다(브이로그→엔터), 멍다큐(지식→엔터), 복도끝(스포츠→엔터), 사고뭉치들(음악→엔터), 셀럽볼꼬양(게임→음악), 쇼숏(브이로그→엔터), 애니멀토킹(브이로그→엔터), 오늘의잼영상(브이로그→지식), 잇슈동물(브이로그→엔터), 줄세우기(엔터→음악), 집돌이(음악→엔터), 짤븐유머(엔터→지식), 짤소리(엔터→지식), 커피콩(스포츠→지식), 키킥썰(브이로그→엔터), 햅삐설윤(엔터→음악), BTS_CODE(엔터→음악), C급쇼(엔터→스포츠), FUN펀하게(스포츠→엔터), Haha Animals(브이로그→엔터), K-인사이드(음악→스포츠), 1분 양철북(엔터→음악), 364일(브이로그→지식), 귀여워서 미안하다냥(브이로그→엔터), 긴급포착(엔터→스포츠), 꾸미의 보석함 JEWCOOKME(엔터→음악), 나도그림(엔터→지식), 나이슈(지식→스포츠), 놀란한국(엔터→음악), 눈물팡(지식→엔터), 대환장(지식→엔터), 동실이(브이로그→엔터), 레드벨벳 뭐하니(음악→엔터), 롤트리뷰트(엔터→게임), 리빙블링(브이로그→엔터), 맹수관찰(브이로그→엔터), 뭉치의 개팔상팔(브이로그→엔터), 박주호 PaChuHo(브이로그→스포츠), 별별토리(뉴스→스포츠), 블루꼬꼬(엔터→스포츠), 상상출력소(지식→스포츠), 쉬는 시간(엔터→지식), 썰동그라미(브이로그→엔터), 악성 내성인 정일영(엔터→음악), 애니멀로그(브이로그→엔터), 엔티제뮤직(엔터→음악), 요즘PD(엔터→지식), 유스데스크 YOO'S DESK.(음악→엔터), 이사람좋아요(엔터→음악), 이슈읽기(엔터→스포츠), 재밋쟈나(지식→엔터), 최애소식(엔터→음악), 나는마블이다(엔터→스포츠), 탑오브쏭(음악→엔터), 테크의 정석(엔터→지식), 하얀비둘기(엔터→스포츠), 황당맨(게임→엔터), 힐링멍냥(브이로그→엔터), EBS 세계테마기행(브이로그→지식), EBS 세나개 x 고부해 - 왜그러냥? 귀엽개!(브이로그→지식), KBS 뉴스 부산(음악→지식), KBS HUMAN : 뭉클티비(엔터→지식), MBC 미스터리 : 심야괴담회 X 서프라이즈(엔터→지식), P1Harmony(엔터→음악), RESCENE log 리센느 로그(음악→브이로그), THEHITKPOP(엔터→음악), TRAINEE X(엔터→음악)

### 제외한 채널 478개

- include 공백(신뢰도 low) 396개: 신펭귄, 롤카, 루시아이, 모토레전드볼트 | 글로벌 픽, 바이커시선, 방몽, 봐써, 비빅숏츠, 젠탑, 태익, 한우주 Hanoozu, 힐드림, Appleo_o, Detalmickz, GKR 지케이알, iSharingSoft, MaviGadget, MODA DAILY, 썰헌터, 픽셀개그방, 너는 꽃이야, 하토파파, Damy Fatl, 눌러, Sassy, 유럽청년, Outdoor Adventure, Tăng Tiến Official, 잡기왕 이하늘, 제이에스 뮤직 똘똘이, 헌터K (hunter-K), CC talk about drama, MD AZHAR TECH, 곰표서커스, 담터계곡펜션 마운틴밸리, 돈키호테 TV, 食在好玩, 영혼한컷, 예쁜영어교실, 오늘도주워감, 오잉타임, 울다냥웃다멍, 웃긴꽃개, 웨이메이커, 자메이칸데요, 트빌 20Billion, 피부의 참견, 홀로홀로 | HoloHolo, 황금고블린, 黄七七, Adamrespect_svm, adrian ibariguez, Ailshire Liest, An, APTI EZIEV, Baaz Carrom, Beast Street Food, BlinZ206, C_08 PLAYS, Chandu Horror, Cover baba, DipuQRA FF, Louvor Constante, Maskblet, Mellion-SHORTS, Minh Fun TV, Real Life manish, Recover hair problem, Strength Arc, TY working, yant, Yaqub Plus, @Amit official, #빛이되자!힐링채널!!, 😺kirania😺, 경비 취업센터, 고독한너구리, 기획버튼, 김재성, 김현석 Rex, 奇闻局社, 깔끔남, 껌씹는햄스터, 꼬오옥, 꼼꼼한강쥐, 꽃을 든 남자, 꿀템, 꿀템탐구소, 나는야 김뚱땡, 나랑웃자, 낙타픽, 낭만 치사량, 농사겸댕이, 눈꼽띠고, 다락방고양이_골든, 다있냐, 다있쇼, 달달휘핑크림, 달디단쇳소리, 달아달아, 대한노인회TV, 도까꿍, 뜬구름 스튜디오, 리버모어25, 마일빵, 만수산153찬양방송, 먹숏Life, 멈추숏, 모빅트라이얼, 몸신안승재숙성꿀, 무지개 clean 토탈전문 홈케어 EcoSphere, 뭉땅, 박시, 범사에 감사, 베비너스, 별게 다 궁금해, 보름맘, 부머스 I Boomers., 부천 김기표 TV, 블루벨, 비하운드, 빵대부, 뽀잉, 살롱뷰티, 샤샤홈s, 선상메카, 손샘노트, 숏K, 수소문 surumor, 쉰소리뷰, 스튜디오진혼, 써니여행, 씨마트, 아아언니 ahaheonni, 안세라, 알고봄, 알리는 대마법사, 영스타복음TV, 영양가전 YYGJ, 영쿠쿠, 예스스, 옛잼, 오동팔TV, 오순덕 TV, 오지숲길, 완딱내스, 완전일등, 우리마이크, 우아한갱년기, 우주성, 이남원, 이랑블루, 인류구원 자비량 교회(인터넷 선교 방송), 一画先生, 재공품, 전기차한잔, 주태백이TV JTBETV, 지나고 보니, 창일요, 천년바위, 최광희, 칭사 ChingSa, 컴패션 CompassionKR, 코리안숏, 코코넛 밀크, 콩바비, 투망의 맛, 툭 Billiards_박씨아재, 파란물갸, 파란틈, 팜파린, 팩트스냅, 팩트캠, 평범한술범이, 평생운전병, 포텐티아, 포트, 폭시TV, 폰짝이TV, 폼네마, 푸른아오🌊AOBLUE, 품질지원단, 프롬TV, 픽브릿지, 픽앳홈, 픽업템 👈클릭, 하루댕냥, 핫딜헌터, 핫템중개소, 항공덕후(게임), 해축매니아, 해피밍글, 흰둥이와얼룩이, 힙포인사이트, 啊冰he, Abhishek Chourasiya, acd, Adnan Live, Airline Liveries, Ajeng Kumala, Arafat Mohmmad, ARRANGE-TV, Artbot Game, Artbot Lab, Aussie Rose, AWAZ SERHAD, Ayam_ Rich Tv, ayan das sarma, Azuré, bé mập  channel 999, Bezdat, Bharat Wings, Big diga, BILLIONAIRES LIFESTYLE, Black Canadian Wolf, Blackout Docs, BOLANGTR, Brick Pilot, BuddyonScreen, Buglisi Carles, Build Frames Scaffolding, Buildenza, carpenter c9x, Carpio G.Budayao Jr, Categoria Canal, Cathy, CC TV Incident Info, cellcare mobile repair, Cemara official, Chef Chronicles, Clash Of Amitians, Comely_Dimka, Cuộc Sống Hàng Ngày Chanel, Daegu 1분 Story, Daily drinking challenge, Daily Fun Club, Daily Yoga Life, Daniel e Família Honório, Daniel Marianodesouza, Deep Sleep MTV, Denys Lychman, Discovery Star BD, diving adventure, DJI Deutschland, DOC HARD, Dogokorea, DriftDonut33, dsikorov, Dung Nguyễn Review, elkay media, Emoções vídeos, eris, Feel Leap Outdoors, fen he, Filmax Shorts, Fishing With Supto, Fishingcommunity3, fishingspidermans, FLOW MOTION, flying free, Frank Real, Frenzycx, Fresh Main, GalloFilms, Gaming Zone BD, Garagem Master, Gia Long Official, Global Fishing Crew, Gohana Short, Gold Discovery Armin, Goldspa, Green Living, gufjnbngfkb, Gui Valadares, Hà Nga, Ha Yaun, Hằng Phạm thị, hayshiva_Rox, Hi TVD, Hiệu Nấu Ăn, Horizon Hobby, Hossain_Gaming07, HOT ABHI GAMING 54, JAY_BURR_OFFICIAL, JOÃO GRANDÃO / BIG JOHN BEATS, John-Funny1403, Kedar_editz, King king 👑, Klein Backers, Kompa Kingdom, Krishna Kumar, KRZYSZTOF TATAR, KuantanFlow, KUBC5, LAPSOFLUX, LB, Liễu Lê Thị, LingQuan Xie, Mahmud_oficcial, Marcus Chen, MISS PRETTY, Naqss, NHRL, Nika Ritshel, NoLimits AI, nomadismo online, NordishD, Nurila Satygulova, O Calheiro, Ocean Exploration | 水哥, ochat Laurine, Officially Naya Pakistan, Once again 2, Ondaum World, Only in Florida, Ononna, Perkutut Madura, PESCAR IMPORTA, Re:Born Mission, Real Camel world, Real Life Valor, Ricardo Porte, Riyan Wildlife Channel, rocketota24, ROCKMAX | Tom Kenzler, ronaldo galazeck, Rosdiana, Royal Rajendra, RpmCentralTV, Rubén de lis, SACHI TV, şafak türkeş, Sahalam world 1M, SALIM KHAMLICHI, sally vibal, sam_playz, Saqlain Mughal Laskani, ScenicMotionsBeyondVerse, Seeudefense, SHIN_CHAN🍁, Shukram Sabaliya, Siquijor Dives, SJC86ers, SJVibe, Smart Stream HUB, spirakoschania21, Splendid Concept, Starbrella, Stelarri, StewarTV, SỰ SỐNG ĐỘNG VẬT HOANG DÃ, Sunnykhan official, sweetbreadart, Sweetie Pie24, The FisherLens, Thế mạnh TV, The Rustic Pantry, The WNBA Wire, TIAGO NA RESENHA, Tiaro, TigaSodara, TIME MASTERS Готовые дизайн-решения ремонта, Tiny Giggle Club, titanquynh, Tổng Kho Vật Liệu Trang Trí Toàn Cầu, Vida selvagem 360, Village Chief Wei, Weinman Cezil, WittyWhy, Woof World, woooha, World Majesty, wow how, wuyong barg, Xio Bro 91, xthethics._.moon., Yess jamal, ZAPATA, Zen'd Out Massage Spa, Zhegus studio, Zz fun, Ангел ЧЕМПИОНСКИЙ ДУХ SPIRIT OF A CHAMPIONБОГАТЫРЬ, Вова Космос. Життя ветерана війни ПТСР, PTSD 🇺🇦, ДЕНИС ВОРОБЬЕВ., ЛЁВА ТВ, Наш Портал, хаМ, المزابي ولد العلوى, رحلة وعي, صالح الطيب, نيوز, विकास जांगिड़, บ่าวบี พาม่วน, おきなわ美らナイト, シバイク, ﾒ𝘔𝘐𝘋𝘕𝘐𝘎𝘏𝘛.ᐟ
- unknown 82개: 멍뭉이손, ItsJustOlaf, jorten540, JP_Mobile, Longhappyvibe, Mr. Popo, Mrflix, nyannyan, qwert, 鹿鸣, Elizabeth Uma, 최HS, @funnyhasan-2.0, 국민참치대박할인택배전문점, 小唐, 小李探花, 예수동행권세치유회복승리, USA CHANNEL, «a little bit of everything», 구름규릭 유튜브, 기복이, 김영욱tv, 돕파밍, 딱대우 deudeu, 세공이 만국이, 쇼티, 순금이, 얼년이, 이상봉, 인생무사, 임금님귀는 당나귀 귀, 임재윤, 자우소, 자유봉사단, 차대중, 华诚369, A J tv, Abdul Latheef, Caravature, caribo, Carlos A. Salvatierra de la cruz, Celebrity Gateman, Chandday my love, Cue & Crown, đam mê 36, Dashrath Turi, David Petty, Ddfjngyo, De PESCA, De todo con Ramon Rodriguez, Deniz Civelek, Desert Beautiful Camels, Desi snake Catcher, Destini Palacio, DK Sonnenschutz e. K., Feline Focus, GY  밤, hhvvnnfgv, Hidayat Sazili, HOOPER MIR, Liquid Electricity, lisoryb24, lj, M Younas, Manny De Guzman, Marcos Oyamada, MBFDBOX, MILIDOCHKA, Musulmon Ahli N1, Narendra Shukla, new새서울, Ngọc, Proietto Sarvas, Qamrul Huda, Ram Share, SANDREA BÜRO, shimuland, TeamRazzo, terry kingford, tg7k, The Hack Yard, Yi Chang

## 2026-11-27 · 17,046개 (Gemini 분류 추가분 7,535개 합침)

- 기존 깃허브 DB 9,511개(기존 사이트 DB 6,474개 + 팀 검수 Gemini 3,037개)는 그대로 두고, 새 Gemini 분류 파일 3개(`channel-types`, `channel-types (1)`, `channel-types (2)`)에서 추가분만 더했다. 기존 채널의 분류는 바꾸지 않았다.
- 새 파일 3개의 추가분은 각각 19개 / 5,641개 / 3,983개이고, 채널 ID 기준으로 겹치는 채널을 한 번만 세면 7,555개다. 겹치는 채널은 유형과 설명이 모두 같았다.
- 추가한 수: 7,535개. 추가분의 `classificationMethod`는 gemini 7,503개 · gemini_then_human 32개이고, `dataStatus`는 모두 ai_reviewed(팀 검수 전)이다.
- 제외한 수: 20개. 설명이 "정보 부족" 또는 "정보 부족으로 판단 불가"라 분류 근거가 없어 넣지 않았다.
  - 정보 부족(16): 학교, misae, S2, 一, 장진영 zangzin0, 칙칙폭식, Artbot Lab, hegefegevwfwtwtt, ice700t, windeuw, YoTyan Arena, 레고 tv, 만두, 진혁김, 쮸은, 𝕄𝕒𝕥𝕣𝕚𝕩𝟝𝟡𝟘𝟛.𝟝
  - 정보 부족으로 판단 불가(4): 한국아우라, 김시윤, Ai_ happycall, Arati Devi
- 충돌 3건(사랑, 다다, 말랑콩떡): 파일마다 유형이 달라 보였지만 채널 ID가 서로 다른 별개 채널이라 유형을 고르지 않고 둘 다 넣었다. 같은 채널 ID에서 유형이 다른 경우는 없었다.
  - 사랑: UCT4Eh6y…(entertain) / UCgUXIzt…(vlog)
  - 다다: UC6eTntQ…(music) / UCiaNcxP…(beauty)
  - 말랑콩떡: UChwgWOj…(vlog) / UCJPsFjr…(entertain)
- 이름만 같고 유형이 다른 새 채널이 2쌍 더 있다(오늘하루, alice). 이것도 채널 ID가 달라 둘 다 넣었다. 시청기록에 채널 ID가 있으면 ID로 매칭되고, 이름 매칭은 ID가 없을 때만 쓰인다.
- 새로 넣은 채널은 기존 DB와 채널 ID·이름이 겹치지 않고, 모든 채널의 type과 category8Code가 8개 유형 중 하나로 일치한다.
- 이번에 바뀐 파일: `data/channel-types.json`, `data/channel-types.js`, `docs/db-changelog.md`

### 유형별 채널 수

엔터테인먼트 4,167 · 음악 3,422 · 지식·교육 3,069 · 브이로그·일상 3,952 · 뷰티·패션 1,304 · 스포츠 650 · 게임 285 · 뉴스·시사 197

## 2026-11-25 · 9,511개 (팀 검수본으로 교체)

- DB수정 폴더의 `channel-types4`를 `data/channel-types.json`으로 반영했다.
- 구성: 기존 사이트 DB 6,474개 + 팀 검수를 거친 Gemini 분류 3,037개(`classificationMethod`: gemini / gemini_then_human).
- 직전 10,266개 버전에 있던 Gemini 추가분 3,792개는 이번 DB에 포함되지 않았다. 기존 6,474개는 분류가 그대로다.
- 유형별 채널 수: 엔터테인먼트 1,743 · 음악 2,000 · 지식·교육 2,214 · 브이로그·일상 1,972 · 뷰티·패션 754 · 스포츠 435 · 게임 246 · 뉴스·시사 147

## 2026-11-25 · 10,266개 (이전 버전)

- 기존 사이트 DB 6,474개(키워드 추론 5,490 + 수동 984)에 Gemini 분류 3,792개를 추가했다.
- 추가분은 11/25에 만든 DB 파일 4개를 합친 것이다. 4개 파일은 같은 채널에서 분류가 모두 일치해 충돌이 없었다.
  - channel-types2: 142개 / channel-types1: 3,519개 / channel-types: 124개 / channel-types (1): 9개 (먼저 나온 파일 순서대로 겹치는 채널을 한 번만 셌다)
- 설명이 "정보 부족", "추측 불가"인 채널 2개(멍멍짤칵, 존예핑)는 분류 근거가 없어 제외했다.
- 11/24에 만든 7,109개 버전은 합치지 않았다. 그 안에만 있던 채널 223개는 이번 DB에 없다.
- 이름이나 채널 ID가 겹치는 채널은 없고, 모든 채널의 type과 category8Code가 8개 유형 중 하나로 일치한다.
- 추가분의 확인 상태는 각 채널의 `dataStatus`(ai_reviewed)와 `classificationMethod`(gemini / gemini_then_human)를 따른다. 사람이 검수한 범위는 이 파일만으로 알 수 없다.

### 유형별 채널 수

엔터테인먼트 2,486 · 음악 2,134 · 지식·교육 2,130 · 브이로그·일상 2,012 · 뷰티·패션 687 · 스포츠 429 · 게임 232 · 뉴스·시사 156

### 파일 구조

- `data/channel-types.json`: DB 원본 (이 파일만 고치면 된다)
- `data/channel-types.js`: JSON을 바꿔 만든 자동 생성 파일 (`npm run build` 시 만들어짐)
