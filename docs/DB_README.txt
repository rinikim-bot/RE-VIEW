사이트 업로드용 DB 정리본 (2026-11-18)

중요
- 이 패키지는 사이트 업로드용입니다.
- 시청기록 CSV는 포함하지 않았습니다.
- 채널별 개인 시청 횟수(takeoutWatchCount*) 및 관측 플래그(takeoutObserved*)를 제거했습니다.
- 루트의 Takeout import 통계도 제거했습니다.
- 원본 DB 파일은 수정하지 않았습니다.

미분류 처리
- category26='기타'인 채널 4,994개를 category8='미분류', category8Code='unclassified', type='unclassified'로 변경했습니다.
- 4,994개는 별도 파일 'unclassified-review-4994-20261118.csv'에 검수 대상으로 보존했습니다.
- 이 4,994개는 8개 콘텐츠 유형 중 어느 유형에도 강제로 넣지 않습니다.

채널 ID 수 정정
- channelId가 있는 채널: 10,468개
- channelId가 없는 기존 수동 DB 채널: 1,000개
- channelId가 없는 1,000개는 기존 수동 DB로서 이름 기반 매칭 대상입니다.
- takeoutChannelIds 배열은 기존 데이터 구조 보존을 위해 남겼으며, 채널별 시청 횟수는 제거했습니다.

8개 대분류 매핑 주의
아래 매핑은 팀에서 확정한 기준이 아니라 작업자가 설정한 '임시 매핑'입니다.
계획서 및 발표 자료에는 반드시 '임시 매핑(팀 검토 필요)'으로 표기하세요.

예시:
- 먹방·반려동물·여행·요리 → 브이로그·일상형
- 테크·재테크·부동산 → 지식·교육형
- 키즈·코미디·드라마/영화 → 엔터테인먼트형
- 기타 → 미분류 (강제 분류 금지)

포함 파일
- channel-types.json: 사이트용 DB
- channel-types.js: 브라우저용 DB
- category8-summary.csv: 개인 시청 횟수 없이 채널 수만 집계
- category26-to-category8-temporary.csv: 26개 분류의 임시 매핑표

별도 검수 파일
- unclassified-review-4994-20261118.csv
  이 파일은 사이트 업로드용 ZIP에 포함하지 않았습니다.

[추가 메모 - 최종 반영본]
- 사이트 DB(data/channel-types.json, .js)에서는 미분류 4,994개를 아예 제외했습니다(분류된 채널 6,474개만 포함).
- 제외해도 앱에서는 DB에 없는 채널이 미분류로 처리되므로 결과는 같고, 파일이 작아지고 단위 테스트가 통과합니다.
- 제외한 4,994개 목록은 별도 파일(unclassified-review-4994.csv)에 있으며 저장소에는 올리지 않습니다.
