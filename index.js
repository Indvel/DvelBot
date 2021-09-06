const botCode = "DVBNM1902"
const realVer = "3.4.2"
const version = "◀디벨봇 v" + realVer + "▶\n제작자 : 인디벨(fbtkdqja112)\n탄생일 : 2019.02.18 (+" + getCountDays(new Date(2019,2,18)) + "일)\n최근 업데이트 : 2021.07.24";
const lastBuild = AppData.getString("lastBuild");
const roomsList = ["디버그룸", "디벨봇방", "봇실험방",];
const denyRooms = [ "끝말잇기방"];
const logRooms = ["디벨로봇", "봇커뮤니티"];
const logPath = android.os.Environment.getExternalStorageDirectory().getAbsolutePath() + "/katalkbot/log";
const roomPath = android.os.Environment.getExternalStorageDirectory().getAbsolutePath() + "/katalkbot";
const earthquakeRooms = ["디벨로봇", "데브로봇스게임", "봇커뮤니티"];
const denyCodes = ["eval", "java.io.File", "this", "FileStream", "uneval", "response", "const", "for","for(;;)", "while","while(true)","while(1)", "android.os.Environment", "ip", "IP", "Api", "\u00", "response", "isAdmin", "replier.reply", "[]", "\uC"];
const compress = '\u200b'.repeat(500);
const RLO = "\u202e";
const ud = ["- 본관 검색 추가"];
const udLog = "◀디벨봇 " + realVer + " 업데이트 로그▶\n\n" + ud.join("\n");

var globalAct = null;

const Module = require('kaling').Kakao();
const Kakao = new Module;
Kakao.init('알아서 쓰세요');
Kakao.login('아이디', '비밀번호');

const cmdList = "◆◇◆편리 명령어◆◇◆\n\n@디벨봇 or @ㄷㅂㅂ\n@개발자호출\n@현재시간\n@디지털시계\n@나이 [생년월일] [기준날짜]\n@bmi [키] [몸무게]\n@나무위키 or @꺼무위키 [문서명]\n@검색 [검색어]\n@날씨 [지역]\n@전국날씨\n@한강\n@국가 or @나라 [나라명]\n@국가코드 [코드 or 국가명]\n@기업 or @회사 [기업명 or 기업코드]\n@기업검색 [기업명]\n@실검\n@학교 [학교명]\n@학검 [학교명]\n@사전 [단어]\n@한자 [한자음]\n@단어 [단어]\n@고사성어 or @사자성어 [고사성어]\n@구글번역 [번역할 언어] [번역할 내용]\n@파파고 [대상 언어] [번역할 언어] [번역할 내용]\n@언어감지 [내용]\n@eval [코드]\n@cpp [C언어/C++ 코드]\n@자바 [자바 코드]\n@py [파이썬 코드]\n@php [PHP 코드]\n@node [Node.js 코드]\n@영어변환 [영어로 쓴 한글]\n@이름변환 [한글]\n@폰검색 [기기명 or 모델명]\n@폰정보 [폰코드]\n@개발자위치\n@지진\n@호스트\n@아이피추적\n@위키분류 [문서명]\n@코로나\n@픽시브 [일러스트 ID]\n@군부대 [부대명]\n@애니 [제목]\n@앱검색 [앱 이름 or 패키지명]\n@주소 [지명 or 주소]\n@본관 [본관]\n\n◆◇◆낚시 명령어◆◇◆\n\n@가입\n@낚시\n@강화\n@강화점프\n@송금 [아이디:보낼양]\n@강화장금\n@낚시순위\n@코인순위\n@강화순위\n@내정보\n@니정보 [아이디 or 닉네임]\n@계정공유 [대상아이디:받을아이디]\n@칭호\n\n◆◇◆게임 명령어◆◇◆\n\n@숫자야구\n@게임 [게임명]\n@게임등급 [게임명]\n@게임순위\n@메이플 [닉네임]\n@카트 [닉네임]\n@카트2 [닉네임]\n@롤 [닉네임]\n@배그 [닉네임]\n@옵치 [닉네임]\n@로아 [닉네임]\n@레식 [닉네임]\n@대화 [내용]\n@대화초기화 or @대초\n\n◆◇◆관리자 명령어◆◇◆\n\n@로그목록\n@최근로그 [닉네임]\n@유저로그 오늘 or 어제 [닉네임]\n@날짜로그 [방이름] [날짜] [닉네임]\n@방추가 [방이름]\n@방삭제 [방이름]\n@봇리로드\n@관리자수락\n@관리자거절\n@관리자등급 [닉네임] [등급]\n@관리자목록\n@도배제한\n@명령어밴\n@명령어언밴\n@멤버검색 [닉네임 or 해시코드] [방이름]\n@2멤버검색 [닉네임] [방이름]\n@2멤버목록 [방이름]\n@멤버목록2 [방이름]\n@휴면설정\n@휴면해제\n@evad [코드]\n@낚시초기화\n@읽음\n\n◆◇◆기타 명령어◆◇◆\n\n@TMI\n@낚시정보\n@관리자신청\n@도움말 [명령어]\n@봇상태\n@봇통계\n@봇정보\n@업뎃";
const cmdHelps = [{ name : "현재시간|현재시각", value : "◀현재 시각 확인 명령어▶\n\n@현재시간 or 현재시각\n\n한국시간(UTC-8) 기준 현재 시각을 알려줌." },
   { name : "디지털시계", value : "◀디지털 시계 명령어▶\n\n@디지털시계\n\n현재 시간을 디지털 시계로 보여줌.(폰트에 따라 다를 수 있음)" },
				 { name : "나이", value : "◀나이 계산 명령어▶\n\n@나이 [생년월일] [기준날짜]\n\n생년월일로 나이와 띠를 계산해줌. 기준날짜 생략시 오늘 날짜로 인식. 단, yyyyMMdd 형식만 인식." },
   { name : "bmi", value : "◀BMI(체질량지수) 계산 명령어▶\n\n@bmi [키] [몸무게]\n\n숫자만 인식, 소수점도 입력 가능. 보건복지부 공식 기준이다." },
				 { name : "나무위키|꺼무위키", value : "◀나무위키 문서 검색 명령어▶\n\n@나무위키 or 꺼무위키 [문서명]\n\n특정 나무위키 문서의 URL을 보내줌. 띄어쓰기도 입력 가능." },
				 { name : "검색", value : "◀네이버 검색 명령어▶\n\n@검색 [검색어]\n\n해당 검색어를 네이버 검색 URL로 보내줌." },
				 { name : "날씨", value : "◀국내/세계 날씨 명령어▶\n\n@날씨 [나라명, 지명, 시/군/구/동명]\n\n네이버 날씨에 기반하여 일부 지역과 북한을 제외한 모든 날씨 정보 검색 가능. 단, 국내와 해외날씨의 나오는 정보는 각각 다름." },
				 { name : "전국날씨", value : "◀전국날씨 명령어▶\n\n@전국날씨\n\n현재 전국의 날씨를 가져옴. 네이버에서 파싱." },
				 { name : "한강", value : "◀한강 물 온도 확인 명령어▶\n\n@한강\n\n가장 최근에 측정된 한강 물 운도를 알려줌." },
				 { name : "국가|나라", value : "◀국가 정보 명령어▶\n\n@국가 or 나라 [국가명]\n\n현존하는 모든 국가의 정보를 알려줌. 두산백과에서 파싱. 단, 일부 갱신이 안 된 정보가 있을 수 있음." },
				 { name : "기업|회사", value : "◀기업 정보 명령어▶\n\n@기업 or 회사 [기업명] or [기업코드]\n\n국내 또는 해외에 존재하는 기업(회사)의 정보를 알려줌. 잡플래닛 검색을 통해 얻은 코드로도 가능. 단, 모든 기업이 나오지는 않음. 네이버에서 파싱." },
				 { name : "기업검색", value : "◀잡플래닛 기업 검색 명령어▶\n\n@기업검색 [기업명]\n\n국내 또는 해외에 존재하는 기업(회사)를 잡플래닛에서 검색 후 기업 코드를 보여줌." },
				 { name : "폰검색", value : "◀스마트폰 기기 검색 명령어▶\n\n@폰검색 [기기명 or 모델명]\n\n스마트폰 기기를 검색하여 결과를 보여줌. 검색 후 나오는 코드로 정보 검색 가능." },
				 { name : "폰정보", value : "◀스마트폰 기기 정보 명령어▶\n\n@폰정보 [폰코드]\n\n폰검색 명령어로 검색하여 나온 코드를 통해 해당 기기의 정보를 보여줌." },
				 { name : "실검", value : "◀네이버 실시간 검색어 명령어▶\n\n@실검\n\n현재 네이버의 실시간 검색어를 알려줌. 네이버 데이터랩에서 파싱." },
				 { name : "학교", value : "◀국내 학교 정보 명령어▶\n\n@학교 [초/중/고/대학교명]\n\n국내에 존재하는 초/중/고/대학교의 정보를 가져옴. 대학알리미에서 파싱. 대학교는 재학생 수, 연평균 등록금과 입학 경쟁률도 표시." },
     { name : "학검|학교검색", value : "◀국내 학교 검색 명령어▶\n\n@학검 [학교명]\n\n국내에 존재하는 초/중/고등학교를 검색해줌." },
				 { name : "사전", value : "◀네이버 백과사전 명령어▶\n\n@사전 [단어]\n\n네이버 백과사전에서 단어를 검색하여 보여줌." },
				 { name : "한자", value : "◀한자 찾기 명령어▶\n\n@한자 [한자 음/뜻 or 한자]\n\n네이버 한자 사전에 기반한 특정 한자를 검색해줌. 단, 해당 한자의 뜻(의미)은 나오지 않음. " },
				 { name : "단어", value : "◀한자 단어 찾기 명령어▶\n\n@단어 [단어명]\n\n네이버 한자 사전에 기반한 특정 한자 단어를 검색해줌. 단, 일부 단어(신조어,통신어 등)는 안 나올 수 있음." },
				 { name : "고사성어|사자성어", value : "◀고사성어 찾기 명령어▶\n\n@고사성어 or 사자성어 [고사성어]\n\n네이버 한자 사전에 기반한 특정 고사성어를 검색해줌. 단, 한자 음이 아닌 한자 자체로 검색할 경우 안 나올 수 있음." },
				 { name : "구글번역", value : "◀구글 번역 명령어▶\n\n@구글번역 [번역할 언어] [번역할 내용]\n\n해당 내용을 해당 언어로 구글 번역으로 번역해줌. 번역할 내용의 언어는 자동인식. 단, 일부는 번역이 안 될 수 있음." },
				 { name : "파파고", value : "◀파파고 번역 명령어▶\n\n@파파고 [대상 언어] [번역할 언어] [번역할 내용]\n\n해당 내용을 해당 언어로 파파고 번역으로 번역해줌. 번역할 내용의 언어는 자동인식. 단, 일부는 번역이 안 될 수 있음." },
				 { name : "언어감지", value : "◀파파고 언어감지 명령어▶\n\n@언어감지 [내용]\n\n해당 내용을 해당 내용의 언어를 감지해수 알려줌." },
				 { name : "eval", value : "◀eval(코드 실행) 명령어▶\n\n@eval [실행할 코드]\n\n자바스크립트에 있는 eval을 사용해 특정 코드를 실행하고 결과를 출력해줌. 단, 금지된 명령어(무한 루프, File 등)는 사용 불가." },
				 { name : "CPP", value : "◀C++ 코드 실행 명령어▶\n\n@cpp [C언어/C++ 코드]\n\n특정 C언어/C++ 코드를 실행해서 결과를 보여줌." },
				 { name : "자바", value : "◀자바 코드 실행 명령어▶\n\n@자바 [자바 코드]\n\n특정 자바 코드를 실행해서 결과를 보여줌." },
				 { name : "py", value : "◀파이썬 코드 실행 명령어▶\n\n@py [파이썬 코드]\n\n특정 파이썬 코드를 실행해서 결과를 보여줌." },
				 { name : "php", value : "◀PHP 코드 실행 명령어▶\n\n@php [PHP 코드]\n\n특정 PHP 코드를 실행해서 결과를 보여줌." },
				 { name : "node", value : "◀Node.js 코드 실행 명령어▶\n\n@node [Node.js 코드]\n\n특정 Node.js 코드를 실행해서 결과를 보여줌." },
				 { name : "영어변환", value : "◀영어 한글 변환 명령어▶\n\n@영어변환 [영어로 쓴 한글]\n\n한글 그대로 쓴 영어(예시: 안녕=dkssud)를 한글로 변환해줌." },
				 { name : "이름변환", value : "◀한글 인명 로마자 변환 명령어▶\n\n@이름변환 [한글]\n\n한글로 된 인명(이름)을 영어 로마자 표기로 변환해줌." },
				 { name : "국가코드", value : "◀국가 코드 조회 명령어▶\n\n@국가코드 [코드 or 코드]\n\n특정 국가 코드를 조회 하여 결과를 보여줌. 두자리는 alpha-2, 세자리는 alpha-3 이다." },
				 { name : "개발자위치", value : "◀개발자 위치 확인 명령어▶\n\n@개발자위치\n\n주인(개발자)의 현재 위치를 알려줌. 디벨봇어드밴스가 켜진 상태에서만 사용 가능." },
				 { name : "호스트", value : "◀호스트/IP 확인 명령어▶\n\n@호스트 [링크]\n\n해당 링크(URL)의 호스트와 IP를 알려줌." },
				 { name : "아이피추적", value : "◀아이피 추적 명령어▶\n\n@아이피추적 [아이피]\n\n해당 아이피를 추적해서 정보를 보여줌. 단, 정확하지 않다." },
				 { name : "실행중앱", value : "◀[개발중]실행 중인 앱 확인 명령어▶\n\n@실행중앱\n\n봇 폰(개발자의 폰)이 현재 실행하고 있는 앱의 패키지명을 알려줌. 현재 개발 중인 명령어." },
     { name : "앱검색", value : "◀설치된 앱 검색 명령어▶\n\n@앱검색 [앱 이름 or 패키지명]\n\n봇 폰(개발자의 폰)에서 설치된 앱을 검색할 수 있음." },
     { name : "대화|ㄷㅎ", value : "◀인공지능 대화 명령어▶\n\n@대화 or @ㄷㅎ [내용]\n\n인공지능과 대화를 할 수 있다. 인격을 초기화 하려면 대화초기화 명령어를 사용한다. 현재는 관리자만 사용 가능. Provided by hw3235" },
     { name : "대화초기화|대초", value : "◀인공지능 대화 초기화 명령어▶\n\n@대화초기화 or @대초\n\n인공지능의 인격을 초기화 한다. 관리자만 사용 가능." },
				 { name : "위키분류", value : "◀위키백과 분류 보기 명령어▶\n\n@위키분류 [문서명]\n\n특정 위키백과 문서의 분류를 가져와서 보여줌. 띄어쓰기도 입력 가능." },
				 { name : "코로나", value : "◀코로나19 정보 명령어▶\n\n@코로나\n\n현재 코로나바이러스감염증-19(COVID-19)의 전국 현황 정보를 보여줌. " + strike("또한 5분마다 코로나맵에서 감지하여 변동이 있을 시에 알림을 보낸다.") },
     { name : "픽시브", value : "◀픽시브 일러스트 검색 명령어▶\n\n@픽시브 [일러스트 ID]\n\n해당 ID의 일러스트를 보여줌. 단, R18 일러스트는 볼 수 없다. 21년 기준 사용 불가." },
     { name : "주소", value : "◀도로명 주소 검색 명령어▶\n\n@주소 [주소 or 지명]\n\n도로명 주소를 검색해줌. SQL 쿼리나 특수문자는 입력 불가능." },
     { name : "본관", value : "◀본관 검색 명령어▶\n\n@본관 [본관]\n\n본관(성씨)를 검색해서 유래를 보여줌. 경주김씨, 전주이씨 같은 형식으로 입력한다." },
     { name : "군부대", value : "◀대한민국 국군 부대 검색 명령어▶\n\n@군부대 [부대명]\n\n대한민국 국군(육/해/공)의 부대를 검색해줌. 육군의 경우 별칭으로도 가능. 단, 일부 해체된 부대는 나오지 않는다." },
     { name : "애니", value : "◀애니 검색 명령어▶\n\n@애니 [제목]\n\n애니를 검색해준다." },
      { name : "가입", value : "◀낚시 가입 명령어▶\n\n@가입\n\n낚시 게임에 가입한다." },
				 { name : "낚시|ㄴㅅ", value : "◀비현실적인 낚시 명령어▶\n\n@낚시\n\n제작자가 직접 만든 낚시 명령어. 기본적인 물고기들과 잡동사니, 꽝과 같은 개념인 깡통, 똥 등도 있음. 희귀 물고기(?)로 아이폰, 무기, 람보르기니 등도 있음. 정규분포를 사용하여 크기 제한은 없다. 낚을 때 마다 기본 일정 코인(낚은 크기의 절반의 절반, 전리품은 랜덤 0~5000코인)씩 추가된다." },
				 { name : "강화|ㄱㅎ", value : "◀낚시대 강화 명령어▶\n\n@강화 or ㄱㅎ\n\n자신의 낚시대를 강화함. 한 번당 현재 강화등급의 10배만큼 소모. 최대 50강까지 가능하며, 등급이 높을수록 성공 확률이 낮아진다. 성공 시 마다 기본 능력치(기본 고기 크기)가 증가하고, 실패 시에는 기본 능력치가 일정 수치 만큼 감소된다. 46강 이상은 파괴 패널티가 추가된다. 파괴 시 등급과 능력치가 초기화 된다." },
     { name : "강화점프|강점", value : "◀낚시대 강화 점프 명령어▶\n\n@강화점프 or 강점\n\n자신의 낚시대를 +10강 강화함. 그만큼 코인이 소모되며, 30강 미만만 사용 가능하다." },
     { name : "송금", value : "◀낚시 코인 송금 명령어▶\n\n@송금 [아이디:보낼양]\n\n해당 아이디의 유저에게 코인을 보내줌." },
     { name : "강화잠금", value : "◀낚시 강화 잠금 명령어▶\n\n@강화장금\n\n자신의 낚시대를 강화를 못하도록 함. 다시 입력할 시 해제된다. 1000코인 소모." },
				 { name : "내정보", value : "◀내 낚시 정보 명령어▶\n\n@내정보\n\n자신의 낚시 정보(낚시대, 코인)를 보여줌." },
     { name : "니정보", value : "◀유저 낚시 정보 명령어▶\n\n@니정보 [아이디 or 닉네임]\n\n해당 아이디를 가진 유저의 낚시 정보(낚시대, 코인)를 보여줌." },
     { name : "계정공유", value : "◀낚시 계정 공유 명령어▶\n\n@계정공유 [대상아이디:받을아이디]\n\n관리자 전용 명령어. 특정 유저의 계정을 다른 특정 계정과 공유하여 사용할 수 있게 함. 무언가를 할 때 마다 항상 공유 하는 아이디로 적용된다. 공유는 한 개씩만 가능하다. 2급 관리자 이상만 사용 가능하다." },
      { name : "칭호", value : "◀낚시 칭호 정보 명령어▶\n\n@칭호\n\n낚시에서 획득할 수 있는 칭호의 정보를 보여줌." },
				 { name : "숫자야구", value : "◀숫자야구 명령어▶\n\n@숫자야구\n\n세자리 숫자야구를 시작함." },
				 { name : "슬롯머신", value : "◀슬롯머신 명령어▶\n\n@슬롯머신\n\n세자리 숫자가 모두 같으면 당첨 되는 슬롯머신을 돌림." },
				 { name : "게임", value : "◀게임 검색 명령어▶\n\n@게임 [게임명]\n\n네이버에서 특정 게임을 검색하여 정보를 알려줌. PC, 모바일, 콘솔 가릴 것 없이 모두 검색이 가능하나, 일부 게임은 시리즈명을 정확히 입력해야 나옴. 단, 모든 게임이 나오진 않음." },
				 { name : "게임등급", value : "◀겜물위 등급 검색 명령어▶\n\n@게임등급 [게임명]\n\n게임물 관리 위원회에서 책정한 게임 등급을 조회하여 보여줌. 단, 모든 게임이 나오진 않음." },
				 { name : "게임순위", value : "◀인기 게임 순위 명령어▶\n\n@게임순위\n\n현재 인기 게임 순위를 보여줌. 게임메카에서 파싱." },
				 { name : "메이플", value : "◀메이플스토리 전적 명령어▶\n\n@메이플 [닉네임]\n\n해당 닉네임의 메이플스토리 정보를 maple.gg에서 가져와서 보여줌." },
				 { name : "카트", value : "◀카트라이더 차고 명령어▶\n\n@카트 [닉네임]\n\n해당 닉네임의 카트라이더 차고 정보를 차고 페이지에서 가져와서 보여줌." },
     { name : "카트2", value : "◀카트라이더 차고 명령어 2▶\n\n@카트2 [닉네임]\n\n해당 닉네임의 카트라이더 차고 정보를 차고 페이지에서 가져와서 카카오링크로 보여줌." },
				 { name : "롤", value : "◀리그 오브 레전드 전적 명령어▶\n\n@롤 [소환사명]\n\n해당 소환사의 롤 전적을 op.gg에서 가져옴. 파싱이 어려워서 URL로 대체." },
				 { name : "배그", value : "◀배틀그라운드 전적 명령어▶\n\n@배그 [닉네임]\n\n해당 닉네임의 배틀그라운드 전적을 dak.gg에서 가져옴. 현재 시즌 기준으로 솔로, 듀오, 스쿼드 전적을 표시." },
				 { name : "옵치", value : "◀오버워치 전적 명령어▶\n\n@옵치 [닉네임]\n\n해당 닉네임의 오버워치 전적을 overlog.gg에서 가져옴. 파싱이 복잡해서 롤과 마찬가지로 URL로 대체함." },
				 { name : "로아", value : "◀로스트아크 전적 명령어▶\n\n@로아 [닉네임]\n\n해당 닉네임의 로스트아크 전적을 loahe.com에서 가져옴." },
				 { name : "레식", value : "◀레인보우 식스 시즈 전적(PC) 명령어▶\n\n@레식 [닉네임]\n\n해당 닉네임의 레인보우 식스 시즈 전적을 r6.tracker.network에서 가져옴." },
				 { name : "지진", value : "◀지진/화산 수동 감지 명령어▶\n\n@지진\n\n기상청에서 최근 지진/화산을 파싱해서 가져옴. 이 명령어를 사용하지 않아도 약 5분 마다 봇 자체에서 자동 감지." },
				 { name : "지진감지 중지", value : "◀지진/화산 감지 중지 명령어▶\n\n관리자 전용 명령어. 자동 지진/화산 감지를 중지함. 리로드 시 다시 재개. 관리자 등급 1(일반등급) 이상 사용 가능." },
				 { name : "로그목록", value : "◀채팅 로그 목록 명령어▶\n\n@로그목록\n\n관리자 전용 명령어. 현재 채팅방에 저장된 채팅 로그 파일 목록을 보여줌. 해당 방이 로그 기록을 하지 않는 방이면 보여주지 않음. 1급 관리자 이상 사용이 가능하다." },
				 { name : "최근로그", value : "◀최근 로그 명령어▶\n\n@최근로그 [닉네임]\n\n관리자 전용 명령어. 해당 닉네임의 최근 5회의 채팅 기록을 보여줌. 닉네임을 일부만 입력해도 자동 인식. 여려명일 경우도 마찬가지. 닉네임을 입력하지 않으면 최근 채팅 5회의 기록을 보여줌. 2급 관리자 이상 사용 가능." },
				 { name : "유저로그", value : "◀유저 로그 명령어▶\n\n@유저로그 오늘 or 어제 [닉네임]\n\n관리자 전용 명령어. 해당 닉네임의 오늘 또는 어제의 총 채팅 기록을 보여줌. 최근로그와 마찬가지로 일부만 입력해도 자동인식. 2급 관리자 이상 사용 가능." },
				 { name : "날짜로그", value : "◀유저 날짜 로그 명령어▶\n\n@날짜로그 [방이름] [날짜] [닉네임]\n\n관리자 전용 명령어. 해당 방과 날짜의 특정 유저의 총 채팅 기록을 보여줌. 최근로그와 마찬가지로 일부만 입력해도 자동인식. 날짜는 yyyy-m-d(2020-01-01: X 2020-1-1: O)의 형식을 갖는다. 2급 관리자 이상 사용 가능." },
				 { name : "방추가", value : "◀봇 사용 방 추가 명령어▶\n\n@방추가 [채팅방이름]\n\n관리자 전용 명령어. 해당 채팅방에서 봇을 사용할 수 있도록 리스트에 추가함. 봇이 해당 방에 있어야 함. 1급 관리자 이상만 사용이 가능하다." },
				 { name : "방삭제", value : "◀봇 사용 방 삭제 명령어▶\n\n@방삭제 [채팅방이름]\n\n관리자 전용 명령어. 해당 채팅방에서 봇을 사용할 수 없도록 리스트에서 제거함. 봇이 해당 방에 있어야 하고, 해당 방이 리스트에 있어야 함. 1급 관리자 이상만 사용이 가능하다." },
				 { name : "봇리로드", value : "◀봇 리로드 명령어▶\n\n@봇리로드\n\n관리자 전용 명령어. 현재 봇을 리로드함. 일부 자잘한 문제(렉, eval로 인한 문제 등) 해결 가능. 1급 관리자 이상만 사용 가능하다." },
				 { name : "TMI|tmi", value : "◀TMI 명령어▶\n\n@TMI\n\n디벨봇의 명령어 사용 비율을 보여줌." },
				 { name : "낚시순위", value : "◀낚시 순위 명령어▶\n\n@낚시순위\n\n디벨봇의 낚시 순위를 보여줌." },
				 { name : "코인순위", value : "◀낚시 코인 순위 명령어▶\n\n@코인순위\n\n디벨봇의 낚시 코인 순위를 보여줌." },
				 { name : "강화순위", value : "◀낚시 강화 순위 명령어▶\n\n@강화순위\n\n디벨봇의 낚시 강화 순위를 보여줌." },
				 { name : "낚시정보", value : "◀낚시 확률 정보 명령어▶\n\n@낚시정보\n\n디벨봇의 낚시 확률표를 보여줌." },
				 { name : "관리자신청", value : "◀관리자 신청 명령어▶\n\n@관리자신청\n\n디벨봇의 관리자 신청을 함." },
				 { name : "관리자수락", value : "◀관리자 수락 명령어▶\n\n@관리자수락\n\n디벨봇의 관리자 신청한 사람을 수락함. 1급 관리자 이상만 사용 가능하다." },
				 { name : "관리자거절", value : "◀관리자 거절 명령어▶\n\n@관리자거절\n\n디벨봇의 관리자 신청한 사람을 거절함. 1급 관리자 이상만 사용 가능하다." },
				 { name : "관리자등급", value : "◀관리자 등급 변경 명령어▶\n\n@관리자등급 [닉네임] [등급]\n\n디벨봇 관리자의 관리자 등급을 변경함. 개발자만 사용 가능하다." },
				 { name : "관리자목록", value : "◀관리자 목록 명령어▶\n\n@관리자목록\n\n디벨봇의 관리자 목록을 보여줌." },
				 { name : "도배제한", value : "◀도배 제한 명령어▶\n\n@도배제한\n\n관리자 전용 명령어. 일정 횟수 이상 같은 명령어 사용 시 도배로 감지하는데 그 횟수를 설정함. 개발자만 사용 가능하다." },
				 { name : "명령어밴", value : "◀명령어 사용 제한 명령어▶\n\n@명령어밴 [명령어]\n\n관리자 전용 명령어. 디벨봇의 특정 명령어를 사용 하지 못하게 함. 개발자만 사용 가능하다." },
				 { name : "명령어언밴", value : "◀명령어 사용 제한 해제 명령어▶\n\n@명령어언밴 [명령어]\n\n관리자 전용 명령어. 디벨봇의 특정 명령어의 사용 제한을 해제함. 개발자만 사용 가능하다." },
				 { name : "멤버검색", value : "◀멤버 검색 명령어▶\n\n@멤버검색 [이름 or 해시코드] [방이름]\n\n관리자 전용 명령어. 해당 방(생략 시 현재 방)의 봇에 저장된 특정 멤버들을 검색해서 보여줌. 2급 관리자 이상 사용 가능." },
      { name : "2멤버검색", value : "◀로그 기반 멤버 검색 명령어▶\n\n@2멤버검색 [이름 or 해시코드] [방이름]\n\n관리자 전용 명령어. 해당 방(생략 시 현재 방)의 채팅 로그를 토대로 저장된 특정 멤버들을 검색해서 보여줌. 2급 관리자 이상 사용 가능." },
				 { name : "멤버목록", value : "◀멤버 목록 명령어▶\n\n@멤버목록 [방이름]\n\n관리자 전용 명령어. 해당 방의 봇에 저장 된 멤버들의 목록을 보여줌. 방이름 생략시 현재 방으로 인식. 2급 관리자 이상 사용 가능." },
      { name : "2멤버목록", value : "◀로그 기반 멤버 목록 명령어▶\n\n@2멤버목록 [방이름]\n\n관리자 전용 명령어. 해당 방의 채팅 로그를 토대로 저장 된 멤버들의 목록을 보여줌. 방이름 생략시 현재 방으로 인식. 2급 관리자 이상 사용 가능." },
				 { name : "휴면설정", value : "◀휴면 설정 명령어▶\n\n@휴면설정\n\n관리자 전용 명령어. 디벨봇은 휴면 설정하여 방에는 있으나 사용을 못 하게 함. 개발자만 사용 가능하다." },
				 { name : "휴면해제", value : "◀휴면 해제 명령어▶\n\n@휴면설정\n\n관리자 전용 명령어. 디벨봇은 휴면 설정을 해제하여 다시 사용이 가능하도록 함. 개발자만 사용 가능하다." },
				 { name : "evad", value : "◀관리자 eval 명령어▶\n\n@evad [실행할 코드]\n\n관리자 전용 eval 명령어. 1급 관리자 이상만 사용 가능하다. 단, 일부 코드는 개발자만 사용 가능하다." },
				 { name : "낚시초기화", value : "◀낚시 순위 초기화 명령어▶\n\n@TMI\n\n관리자 전용 명령어. 디벨봇의 낚시 순위를 초기화 함. 개발자만 사용 가능하다." },
				 { name : "봇끄기", value : "◀봇 끄기 명령어▶\n\n@봇끄기\n\n관리자 전용 명령어. 현재 봇을 모든 채팅방에서 사용 하지 못하도록 끔. 끈 후에는 수동으로 다시 켜주어야 함. 개발자만 사용이 가능하다." },
     { name : "읽음", value : "◀채팅 읽음 처리 명령어▶\n\n@읽음\n\n관리자 전용 명령어. 모든 방의 채팅을 읽음 처리 한다. 개발자만 사용 가능하다." },
				 { name : "도움말", value : "◀도움말 명령어▶\n\n@도움말 [명령어]\n\n해당 명령어의 도움말을 보여줌." },
				 { name : "봇상태", value : "◀봇 상태 정보 명령어▶\n\n@봇상태\n\n현재 봇을 돌리는 기기의 상태 정보를 보여줌." },
				 { name : "봇통계", value : "◀봇 통계 명령어▶\n\n@봇통계\n\n이 명령어를 추가한 시점부터 총 채팅 횟수, 명령어 사용 횟수 등의 통계를 보여줌. 통계는 실시간 반영됨." },
				 { name : "봇정보|버전정보", value : "◀봇 정보 명령어▶\n\n@봇정보\n\n해당 봇의 버전 및 개발자 정보를 보여줌." },
				 { name : "업뎃|업뎃로그|업뎃내역", value : "◀업데이트 로그 명령어▶\n\n@업뎃\n\n해당 봇의 업데이트 로그(내역)를 보여줌." }];
const fishes = ["고등어","고등어","고등어","금붕어","금붕어","금붕어","오징어","오징어","오징어","갑오징어","갑오징어","갑오징어","복어","복어","복어","붕어","붕어","붕어","돌돔","돌돔","돌돔","참돔","참돔","참돔","대하","대하","대하","문어","문어","문어","갈치","갈치","갈치","은갈치","은갈치","은갈치","가자미","가자미","가자미","깡통","바다거북","바다거북","바다거북","뱀장어","뱀장어","뱀장어","장어","장어","장어","꽁치","꽁치","꽁치","빙어","빙어","빙어","산호초","산호초","산호초","홍합","홍합","홍합","키조개","키조개","키조개","고래","고래","고래","상어","상어","상어","넙치","넙치","넙치","놀래미","놀래미","놀래미","농어","농어","농어","메기","메기","메기","멸치","멸치","멸치","명태","명태","명태","미꾸라지","미꾸라지","미꾸라지","숭어","숭어","숭어","연어","연어","연어","잉어","잉어","잉어","쏘가리","쏘가리","쏘가리","아귀","아귀","아귀","조기","조기","조기","홍어","홍어","홍어","삼치","삼치","삼치","볼락","볼락","볼락","대구","대구","대구","개복치","개복치","개복치","감성돔","감성돔","감성돔","까나리","까나리","까나리","가오리","가오리","가오리","참치","참치","참치","도다리","도다리","도다리","해마","해마","해마","미역","미역","미역","망상어","망상어","망상어","은어","은어","은어","가다랑어","가다랑어","가다랑어","꼼장어","꼼장어","꼼장어","도루묵","도루묵","도루묵","민어","민어","민어","굴","굴","굴","꼬막","꼬막","꼬막","포르쉐 911","청새치","청새치","청새치","전어","전어","전어","점성어","점성어","점성어","정어리","정어리","정어리","준치","준치","준치","쥐치","쥐치","쥐치","송어","송어","송어","날치","날치","날치","가물치","가물치","가물치","새우","새우","새우","칠리새우","칠리새우","불가사리","불가사리","불가사리","황어","황어","황어","피자조각","치킨","모짜렐라 인더버거","갤럭시 Z플립","조개","조개","조개","아귀","아귀","아귀","아이폰12 프로","봉고르기니","동원참치","동원참치","동원참치","동원참치","스팸","스팸","스팸","진라면","삼양라면","신라면","안성탕면","너구리라면","수박","떫은 감","누군가의 지갑","람보르기니 아벤타도르","마티즈","제네시스 쿠페","모나미153","똥","똥","똥","똥","똥","똥","똥","황금똥","황금똥","황금똥","청룡언월도","RTX 3080","아이언맨 슈트 마크85","묠니르","스톰브레이커","캡틴아메리카 방패","앱코 K660","로지텍 G102","김정은 미사일","차르봄바","에어팟", "갤럭시 버즈", "갤럭시 폴드", "플레이스테이션4", "엑스박스 원","닌텐도 스위치","수박","멜론","서울우유","깡통","수박","멜론","스테이크","곱창","곱창","곱창","청룡언월도","청룡언월도","지옥참마도","삼지창","삼지창","삼지창","여자친구","개발자의 사랑♥","하츠네 미쿠 브로마이드","아이유 콘서트티켓","갤럭시 S21", "입영통지서","깡통","깡통","깡통","깡통","깡통","깡통","깡통","깡통","깡통","깡통","깡통","깡통","깡통","깡통","깡통","깡통","깡통","깡통","깡통","깡통","깡통","깡통","깡통","깡통","깡통","깡통","깡통","깡통","깡통","깡통","깡통","깡통","깡통","깡통","깡통","깡통","깡통","깡통","깡통","깡통","깡통","깡통","깡통","깡통","깡통","깡통","깡통","깡통","깡통","깡통","깡통","깡통","깡통","깡통","깡통","깡통","깡통","깡통","깡통","깡통","깡통","깡통","깡통","깡통","깡통"];
const nonFishes = ["깡통", "포르쉐 911", "갤럭시 Z플립", "아이폰12 프로", "에어팟", "갤럭시 버즈", "갤럭시 폴드", "갤럭시 S21","입영통지서", "모나미153", "플레이스테이션4", "엑스박스 원", "닌텐도 스위치", "통조림", "동원참치", "스팸", "진라면", "삼양라면", "신라면", "안성탕면", "너구리라면", "서울우유", "수박", 
	"떫은 감", "스테이크", "삼지창", "누군가의 지갑", "람보르기니 아벤타도르", "제네시스 쿠페", "마티즈", "똥", "황금똥", "청룡언월도","지옥참마도", "RTX 3080", "아이언맨 슈트 마크85","묠니르", "스톰브레이커", "캡틴아메리카 방패", "앱코 K660", "로지텍 G102", "수박", "멜론", "서울유유", "김정은 미사일", "차르봄바" ,"피자조각", "치킨", "모짜렐라 인더버거", "여자친구", "개발자의 사랑♥", "봉고르기니", "하츠네 미쿠 브로마이드", "아이유 콘서트티켓"];
	const bonus = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1];
	const potential = [{code: 1, name: "랜덤 보너스 확률 증가", max: 30},
	{code: 2, name: "추가 코인 획득률", max: 200},
	{code: 3, name: "기본 크기 보너스", max: 500},
	{code: 4, name: "랜덤 보너스 추가량 증가", max: 500}];

var chats = AppData.getInt("totalChats");
var calls = AppData.getInt("totalCalls");
var cmds = AppData.getInt("totalUses");
var earthquake = AppData.getString("earthquake");
var checkEq = AppData.getInt("totalCheckEq");
var totalEq = AppData.getInt("totalEarthquake");
var coronaInfo = AppData.getString("coronaInfo");
var adminDB = AppData.getString("imageDB");
var cmdLimit = AppData.getInt("commandLimits");
var totalFish = AppData.getInt("totalFishes");

if(cmdLimit < 1) {
	cmdLimit = 15;
	AppData.putInt("commandLimits");
}

var democracy = false;
var botSize = byteCalculation(new java.io.File(roomPath + "/Bots/DvelBot/index.js").length());

var prevCmds = [];
var prevRooms = [];

var rooms = [];
var tmi = [];
var admin = [];
var tempAdmin = "";
var members = [];
var fish = [];
var fishInfos = [];
var bannedCmds = [];
var army_units = [{"name":"육군미사일사령부","nick":"무극|미사일사","pos":""},{"name":"육군항공작전사령부","nick":"불사조|항작사","pos":"이천"},{"name":"제1항공여단","nick":"","pos":"하남"},{"name":"의무후송항공대","nick":"메디온","pos":"용인"},{"name":"국군의무사렁부","nick":"의무사","pos":"성남"},{"name":"육군군수사령부","nick":"칠성대|군수사","pos":"유성"},{"name":"탄약지원사령부","nick":"탄약사","pos":"대덕"},{"name":"육군인사사령부","nick":"인사사","pos":"계룡"},{"name":"육군사관학교","nick":"화랑대|육사","pos":"노원"},{"name":"육군3사관학교","nick":"충성대|3사","pos":"영천"},{"name":"육군수도방위사령부","nick":"방패|수방사","pos":"관악"},{"name":"제52보병사단","nick":"화살|52사단","pos":"광명"},{"name":"제56보병사단","nick":"북한산|56사단","pos":"고양"},{"name":"제1방공여단","nick":"솔개","pos":"과천"},{"name":"제1경비단","nick":"","pos":"서울"},{"name":"제10방공단","nick":"","pos":"안양"},{"name":"제11방공단","nick":"하늘지기","pos":"파주"},{"name":"제15방공단","nick":"","pos":"포천"},{"name":"제1방공여단","nick":"솔개","pos":"과천"},{"name":"제35특공대대","nick":"독거미","pos":"관악"},{"name":"육군특수전사령부","nick":"사자|특전사","pos":"이천"},{"name":"제1공수특전여단","nick":"독수리","pos":"강서"},{"name":"제13특수임무여단","nick":"흑표","pos":"증평"},{"name":"국제평화지원단","nick":"온누리","pos":"계양"},{"name":"레바논평화유지단","nick":"동명","pos":""},{"name":"아프간재건지원단","nick":"오쉬노|아세나","pos":""},{"name":"UAE군사훈련협력단","nick":"아크","pos":""},{"name":"남수단재건지원단","nick":"한빛","pos":""},{"name":"필리핀재해복구단","nick":"아라우","pos":""},{"name":"제707특수임무단","nick":"백호","pos":""},{"name":"육군교육사령부","nick":"창조대","pos":"자운대"},{"name":"육군훈련소","nick":"연무대","pos":"논산"},{"name":"육군기계화학교","nick":"기계교","pos":"상무대"},{"name":"육군보병학교","nick":"보병교","pos":"상무대"},{"name":"육군포병학교","nick":"포병교","pos":"상무대"},{"name":"육군방공학교","nick":"방공교","pos":"세종"},{"name":"육군공병학교","nick":"공병교","pos":"상무대"},{"name":"육군정보학교","nick":"정보교","pos":"이천"},{"name":"육군정보통신학교","nick":"정통교","pos":"자운대"},{"name":"육군항공학교","nick":"항공교","pos":"논산"},{"name":"육군화생방학교","nick":"화생방교","pos":"상무대"},{"name":"육군종합행정학교","nick":"남성대|종행교","pos":"충남"},{"name":"육군과학화전투훈련단","nick":"KCTC|과훈단","pos":"화천"},{"name":"전투지휘훈련단","nick":"전지단|BCTP","pos":"자운대"},{"name":"육군학생군사학교","nick":"학군교|문무대|ROTC|학군단","pos":"괴산"},{"name":"육군부사관학교","nick":"부사교","pos":"익산"},{"name":"동원전력사령부","nick":"동원사","pos":"용인"},{"name":"해병대 교육훈련단","nick":"해병교","pos":"포항"},{"name":"지상작전사령부","nick":"지작사|GOC","pos":"용인"},{"name":"제36보병사단","nick":"백호","pos":"원주"},{"name":"제55보병사단","nick":"봉화","pos":"용인"},{"name":"제3기갑여단","nick":"번개","pos":"홍천"},{"name":"제1군수지원사령부","nick":"황소|1군지사","pos":"원주"},{"name":"수도군단","nick":"충의","pos":"안양"},{"name":"제17보병사단","nick":"번개","pos":"부평"},{"name":"제51보병사단","nick":"전승","pos":"화성,평택"},{"name":"수도포병여단","nick":"충의포병","pos":"시흥"},{"name":"제1군단","nick":"광개토","pos":"고양"},{"name":"제1보병사단","nick":"전진","pos":"파주"},{"name":"제9보병사단","nick":"백마","pos":"고양"},{"name":"제25보병사단","nick":"비룡","pos":"양주"},{"name":"제30기계화보병사단{해체}","nick":"필승","pos":"고양"},{"name":"제2기갑여단","nick":"충성","pos":"파주"},{"name":"제1공병여단","nick":"독립문","pos":"고양"},{"name":"제1포병여단","nick":"비호포병","pos":"고양"},{"name":"제1군수지원여단","nick":"삼마|1군지단","pos":"원주"},{"name":"제2군단","nick":"쌍용","pos":"춘천"},{"name":"제7보병사단","nick":"칠성","pos":"화천"},{"name":"제15보병사단","nick":"승리","pos":"화천"},{"name":"제27보병사단","nick":"이기자","pos":"화천"},{"name":"제2공병여단","nick":"쌍용공병","pos":"춘천"},{"name":"제2포병여단","nick":"쌍용포병","pos":"춘천"},{"name":"제3군단","nick":"산악","pos":"인제"},{"name":"제2신속대응사단","nick":"노도","pos":"양평"},{"name":"제12보병사단","nick":"을지","pos":"인제"},{"name":"제21보병사단","nick":"백두산","pos":"양구"},{"name":"제3공병여단","nick":"산악공병","pos":"인제"},{"name":"제3포병여단","nick":"산악포병","pos":"인제"},{"name":"제3군수지원여단","nick":"청마|3군지단","pos":"인제"},{"name":"제5군단","nick":"승진","pos":"포천"},{"name":"제3보병사단","nick":"백골","pos":"철원"},{"name":"제6보병사단","nick":"청성","pos":"철원"},{"name":"제1기갑여단","nick":"전격","pos":"포천"},{"name":"제5공병여단","nick":"승진공병","pos":"포천"},{"name":"제5포병여단","nick":"승진포병","pos":"포천"},{"name":"제5군수지원여단","nick":"천보산|5군지단","pos":"의정부"},{"name":"제6군단","nick":"진군","pos":"포천"},{"name":"제5보병사단","nick":"열쇠","pos":"연천"},{"name":"제28보병사단","nick":"무적태풍","pos":"연천"},{"name":"제73동원보병사단","nick":"충일","pos":"남양주"},{"name":"제5기갑여단","nick":"철풍","pos":"양주"},{"name":"제6공병여단","nick":"진군공병","pos":"포천"},{"name":"제6포병여단","nick":"진군포병","pos":"동두천"},{"name":"제7기동군단","nick":"7군단|북진선봉","pos":"이천"},{"name":"수도기계화보병사단","nick":"맹호","pos":"가평"},{"name":"제8기동사단","nick":"오뚜기","pos":"양주"},{"name":"제11기동사단","nick":"화랑","pos":"홍천"},{"name":"제20기계화보병사단{해체}","nick":"결전","pos":"양평"},{"name":"제7공병여단","nick":"태극공병|북진공병","pos":"이천"},{"name":"제7포병여단","nick":"북진포병","pos":"남양주"},{"name":"제8군단","nick":"동해충용","pos":"양양"},{"name":"제22보병사단","nick":"율곡","pos":"고성"},{"name":"제23보병사단","nick":"철벽","pos":"삼척"},{"name":"제102기갑여단","nick":"일출","pos":"양양"},{"name":"제2작전사령부","nick":"무열대|2작사","pos":"수성"},{"name":"제31보병사단","nick":"충장","pos":"광주"},{"name":"제32보병사단","nick":"백룡","pos":"세종"},{"name":"제35보병사단","nick":"충경","pos":"임실"},{"name":"제37보병사단","nick":"충용","pos":"증평"},{"name":"제39보병사단","nick":"충무","pos":"함안"},{"name":"제50보병사단","nick":"강철","pos":"대구"},{"name":"제53보병사단","nick":"충렬","pos":"해운대"},{"name":"제201특공여단","nick":"황금독수리","pos":"경산"},{"name":"제203특공여단","nick":"용효","pos":"세종"},{"name":"제5군수지원사령부","nick":"오성|5군지사","pos":"수성"},{"name":"백야전사령부","nick":"","pos":""},{"name":"국군화생방방호사령부","nick":"화생방사|국화사","pos":"서초"},{"name":"국군지휘통신사령부","nick":"빛가온|지휘통신사","pos":"과천"},{"name":"사이버작전사령부","nick":"사이버사","pos":"용산"},{"name":"제205특공여단","nick":"백호","pos":"사천"},{"name":"제100건설공병단","nick":"다산","pos":""},{"name":"국군재정관리단","nick":"재정단","pos":"용산"},{"name":"계룡대 근무지원단","nick":"계근단","pos":"계룡대"},{"name":"상무대 근무지원단","nick":"상근단","pos":"상무대"},{"name":"자운대 근무지원단","nick":"자근단","pos":"자운대"},{"name":"국방부 유해발굴감식단","nick":"국유단|유해발굴단","pos":"서울"},{"name":"국군복지단","nick":"복지단","pos":"용산"},{"name":"국군체육부대","nick":"불사조","pos":"문경"},{"name":"국군교도소","nick":"희망대","pos":"이천"},{"name":"공군항공정보단","nick":"","pos":"오산"},{"name":"공군항공지원작전단","nick":"","pos":"원주"},{"name":"공군기상단",nick:"","pos":"계룡"},{"name":"제7항공통신전대","nick":"7전대|금성대","pos":"평택"},{"name":"공군공중기동정찰사령부","nick":"공중기동사","pos":"부산"},{"name":"제3훈련비행단","nick":"3훈비|토성대","pos":"사천"},{"name":"제5공중기동비행단","nick":"5비|해성대","pos":"부산"},{"name":"제15특수임무비행단","nick":"15비|한성대","pos":"성남"},{"name":"제6탐색구조비행전대","nick":"","pos":"청주"},{"name":"제39정찰비행단","nick":"","pos":""},{"name":"제51항공통제비행전대","nick":"","pos":"부산"},{"name":"공군공중전투사령부","nick":"","pos":"대구"},{"name":"제1전투비행단","nick":"1비|남성대","pos":"광주"},{"name":"제8전투비행단","nick":"8비|명성대","pos":"원주"},{"name":"제10전투비행단","nick":"10비|화성대","pos":"수원"},{"name":"제11전투비행단","nick":"11비|광성대","pos":"대구"},{"name":"제16전투비행단","nick":"16비|예성대","pos":"예천"},{"name":"제17전투비행단","nick":"17비|천성대","pos":"청주"},{"name":"제18전투비행단","nick":"18비|동성대","pos":"강릉"},{"name":"제19전투비행단","nick":"19비|은성대","pos":"충주"},{"name":"제20전투비행단","nick":"20비|용성대","pos":"서산"},{"name":"제29전술개발훈련비행전대","nick":"","pos":""},{"name":"제38전투비행전대","nick":"38전대","pos":"군산"},{"name":"공군방공유도탄사령부","nick":"유도탄사","pos":"평택"},{"name":"공군방공관제사령부","nick":"방공사","pos":"평택"},{"name":"제319방공관제대대","nick":"","pos":"울릉"},{"name":"공군군수사령부","nick":"","pos":"대구"},{"name":"공군교육사령부","nick":"공교사|비성대","pos":"진주"},{"name":"공군기본군사훈련단","nick":"기훈단","pos":"진주"},{"name":"공군군수1학교","nick":"","pos":"진주"},{"name":"공군군수2학교","nick":"","pos":"진주"},{"name":"공군방공포병학교","nick":"방포교","pos":"대구"},{"name":"공군정보통신학교","nick":"","pos":"진주"},{"name":"공군행정학교","nick":"","pos":"진주"},{"name":"보라매리더십센터","nick":"청주"},{"name":"제27예비단","nick":"","pos":"진주"},{"name":"해군특수전전단","nick":"UDT|SSU","pos":"창원"},{"name":"해양정보단","nick":"한산대","pos":"창원"},{"name":"제1함대","nick":"선봉함대|1함대","pos":"동해"},{"name":"제2함대","nick":"필승함대|2함대","pos":"평택"},{"name":"인천해역방어사령부","nick":"인방사","pos":"인천"},{"name":"제3함대","nick":"상승함대|3함대","pos":"영암"},{"name":"잠수함사령부","nick":"잠수함사","pos":"창원"},{"name":"진해기지사령부","nick":"한산대|진기사","pos":"진해"},{"name":"제5성분전단","nick":"5전단","pos":"창원"},{"name":"제6항공전단","nick":"6전단","pos":"포항"},{"name":"제7기동전단","nick":"7전단","pos":"제주"},{"name":"제8전투훈련단","nick":"8전단","pos":"창원"}];

if(FileStream.read(roomPath + "/rooms.txt") == "") {
	rooms[0] = "똥서버";
	FileStream.write(roomPath + "/rooms.txt", JSON.stringify(rooms));
} else {
	rooms = JSON.parse(FileStream.read(roomPath + "/rooms.txt"));
}
if(FileStream.read(roomPath + "/tmi.txt") != "") {
	tmi = JSON.parse(FileStream.read(roomPath + "/tmi.txt"));
}
if(FileStream.read(roomPath + "/admin.txt") != "") {
	admin = JSON.parse(FileStream.read(roomPath + "/admin.txt"));
}
if(FileStream.read(roomPath + "/fish_rank.txt") != "") {
	fish = JSON.parse(FileStream.read(roomPath + "/fish_rank.txt"));
} else {
FileStream.write(roomPath + "/fish_rank.txt", JSON.stringify(fishInfos));
}
if(FileStream.read(roomPath + "/fish_info.txt") != "") {
	fishInfos = JSON.parse(FileStream.read(roomPath + "/fish_infos.txt"));
}
if(new java.io.File(roomPath + "/bannedCmds.txt").exists()) {
	bannedCmds = JSON.parse(FileStream.read(roomPath + "/bannedCmds.txt"));
} else {
	saveFile(roomPath + "/bannedCmds.txt", "[]", true);
}
/*if(FileStream.read(roomPath + "/armyunits.txt") != "") {
  army_units = JSON.parse(FileStream.read(roomPath + "/armyunits.txt"));
}*/

var timer = new java.util.Timer();
var task = new java.util.TimerTask({
	run : function() {
		var cm = Api.getContext().getSystemService(Api.getContext().CONNECTIVITY_SERVICE);
		var info = cm.getActiveNetworkInfo();
	
		if(info != null) {
			getEarthquakes(false);
   checkEq++;
   AppData.putInt("totalCheckEq", checkEq);
		}
	}
});
if(!democracy) {
timer.scheduleAtFixedRate(task, 0, 300000);
}

function onStartCompile() {
  AppData.putString("lastBuild", getTimes("fulltime2"));
  //lastBuild = AppData.getString("lastBuild");
	 if(timer != null || task != null) {
	 	 timer.cancel();
	 	 task.cancel();
	 	 timer = null;
	 	 task = null;
	 }
}

function getCountDays(date) {
  return Math.floor((new Date().getTime() - date.getTime()) / 1000 / 60 / 60 / 24);
}

function getNames() {
  return Api.getScriptNames();
}

function response(room, msg, sender, isGroupChat, replier, imageDB) {
      	if(isGroupChat) {

if(logRooms.indexOf(room) != -1) {
  	   if(!new java.io.File(logPath + "/" + room).exists()) {
  	   	  makeFile(logPath + "/" + room);
  	   } else {
		saveFile(logPath + "/" + room + "/" + getTimes("nowday2") + ".txt", "[" + getTimes("fulltime2") + "] " + "<" + sender + "> " + msg + "\n", true);
     }
   }

	if(rooms.indexOf(room) != -1) {
		replier.reply("");
		
		chats++;
		
		AppData.putInt("totalChats", chats);
		
		/*if(msg == "@테스트" && isAdmin(imageDB, 2)) {
			Kakao.send(room, { "link_ver": "4.0", "template_id": 25191, "template_args": { logo_image: "https://logo.clearbit.com/president.go.kr", title: "테스트", description: "카링 테스트입니다."}}, "custom");
		}*/
		
		if(!new java.io.File(logPath + "/" + room).exists()) {
		  makeFile(logPath + "/" + room);
		  saveFile(logPath + "/" + room + "/members.txt", "[]", false);
	    } else if(!new java.io.File(logPath + "/" + room + "/members.txt").exists()) {
			saveFile(logPath + "/" + room + "/members.txt", "[]", false);
		}
		if(FileStream.read(logPath + "/" + room + "/members.txt") != "") {
			try {
			members = JSON.parse(FileStream.read(logPath + "/" + room + "/members.txt"));
			} catch(e) {
				 Log.e(e);
			}
		}
		var index = -1;
		if(members != null) {
			index = members.findIndex((item, idx) => {
				return item.hash == imageDB.getProfileHash(); 
				});
		}
  //Log.d(index);
		if(index == -1) {
			members.push({name: sender, hash: new java.lang.String(imageDB.getProfileImage()).hashCode(), regTime: getTimes("fulltime2"), id: createId()});
			FileStream.write(logPath + "/" + room + "/members.txt", JSON.stringify(members));
		} else {
    //Log.d(index + " : " + members[index]);
    if(members[index] != undefined) {
      if(members[index].id == undefined || members[index].id == null) {
      members[index].id = createId();
      FileStream.write(logPath + "/" + room + "/members.txt", JSON.stringify(members));
    }
    }
  }
      	 	msg = msg.trim();

if(msg == "@휴면해제" && democracy && isAdmin(imageDB, 2)) {
      democracy = false;
      replier.reply("디벨봇 휴면 상태 해제. 사용이 가능합니다.");
   } 
 if(msg == "@휴면설정" && !democracy && isAdmin(imageDB, 2)) {
      democracy = true;
      replier.reply("디벨봇 휴면 상태. 사용이 불가능합니다.");
   }
   
   var cmdIdx = cmdHelps.findIndex((item, idx) => {
   	 if(item.name.includes("|")) {
   	 	 return item.name.split("|").indexOf(msg.split(" ")[0].replace("@", "")) != -1;
   	 } else {
   	 	 return item.name == msg.toLowerCase().split(" ")[0].replace("@", "");
   	 }
   });

   if(democracy) {
      if(cmdIdx != -1 && msg.startsWith("@")) {
         replier.reply("");
         return;
      }
    } else {
      	 	
      	 	if(cmdIdx != -1 && msg.startsWith("@")) {
      	 		if(bannedCmds.indexOf(msg.split("@")[1].split(" ")[0]) != -1) {
      	 			 replier.reply("현재 사용 중지된 명령어 입니다.");
      	 			 return;
      	 		}
      	 		if(prevCmds.length >= 1 && (prevCmds.indexOf(msg.split(" ")[0]) == -1 || prevRooms.indexOf(room) == -1)) {
      	 	 	prevCmds.splice(prevCmds.indexOf(msg.split(" ")[0]), 1);
      	 	 	prevRooms.splice(room, 1);
      	 	 	} else if(prevCmds.length >= 0 && !democracy) {
      	 	 		prevCmds.push(msg.split(" ")[0]);
      	 	 		prevRooms.push(room);
            //replier.reply(prevCmds[prevCmds.length-1]);
					var cmd = msg.split("")[0].replace("@", "");
					var index = tmi.findIndex((item, idx) => {
							return item.name === cmd; 
						});
					if(index == -1) {
						tmi.push({name: cmd, count: 1});
						FileStream.write(roomPath + "/tmi.txt", JSON.stringify(tmi));
					} else if(index != -1){
						tmi[index].count++;
						//Log.d(tmi[index].name + " : " + tmi[index].count);
						tmi.sort(function (a, b) {
							return a.count > b.count ? -1 : a.count < b.count ? 1 : 0;
						});
						FileStream.write(roomPath + "/tmi.txt", JSON.stringify(tmi));
					}
      	 	 	}
      	 	
      	 	if(prevCmds.length >= cmdLimit && prevRooms.indexOf(room) != -1) {
      	 		 rooms.splice(rooms.indexOf(room), 1);
				   		FileStream.write(roomPath + "/rooms.txt", JSON.stringify(rooms));
				   		prevCmds = [];
				   		Api.reload();
      	 	replier.reply("명령어 도배가 감지되어 해당 방을 봇 사용 방 목록에서 삭제합니다.");
      	 	return;
      	 	} else if(prevCmds.indexOf(msg.split(" ")[0]) != -1 && prevCmds.length >= (cmdLimit - 5) && prevCmds.length < (cmdLimit + 5) && prevRooms.indexOf(room) != -1) {
      	 		replier.reply("같은 명령어를 " + prevCmds.length + "회 사용하셨습니다. " + cmdLimit + "회 누적 시 봇 사용이 금지 됩니다.");
      	 	}
        }
      	 	
      	 	if(msg == "@디벨봇" || msg == "@ㄷㅂㅂ" || msg == "@ㄷㄷㅂ") {
      	 		if(denyRooms.indexOf(room) != -1) {
 		 if(!isAdmin(imageDB, null)) {
 		  	replier.reply("");
 		  	return;
 		 }
 	}
				calls++;
				AppData.putInt("totalCalls", calls);
      	 		 var str = "";
      	 		 str += "◀디벨봇 v3 명령어▶" + compress + "\n\n";
				 str += cmdList;
      	 		   replier.reply(str);
      	 		} 
      		  if(msg == "@현재시간" || msg == "@현재시각") {
      		  	
      		  	if(denyRooms.indexOf(room) != -1) {
 		 if(!isAdmin(imageDB, null)) {
 		  	replier.reply("");
 		  	return;
 		 }
 	}
      		  	   replier.reply(getTimes("fulltime"));
				   cmds++;
				   AppData.putInt("totalUses", cmds);
      		  	}
    if(msg == "@제작자호출" || msg == "@개발자호출" || msg == "@관리자호출") {
      		  	
      		  	if(denyRooms.indexOf(room) != -1) {
 		 if(!isAdmin(imageDB, null)) {
 		  	replier.reply("");
 		  	return;
 		 }
 	}
             Api.makeNoti(room, sender + "님이 호출하셨습니다.");
             ttsTest(sender + "님이 호출하셨습니다.", null, null);
      		  	   replier.reply("개발자를 호출하였습니다.");
				   cmds++;
				   AppData.putInt("totalUses", cmds);
      		  	}
      		  	if(msg == "@봇정보" || msg == "@버전정보") {
      		  		if(denyRooms.indexOf(room) != -1) {
 		 if(!isAdmin(imageDB, null)) {
 		  	replier.reply("");
 		  	return;
 		 }
 	}
      		  		replier.reply(version + "\n최근 컴파일 : " + lastBuild);
      		  		//Log.d(new java.lang.String(imageDB.getProfileImage()).hashCode());
					cmds++;
				   AppData.putInt("totalUses", cmds);
      		  	}
      		  	if(msg == "@업뎃" || msg == "@업뎃로그" || msg == "업뎃내역") {
      		  		if(denyRooms.indexOf(room) != -1) {
 		 if(!isAdmin(imageDB, null)) {
 		  	replier.reply("");
 		  	return;
 		 }
 	}
      		  		replier.reply(udLog);
      		  		//Log.d(new java.lang.String(imageDB.getProfileImage()).hashCode());
					cmds++;
				   AppData.putInt("totalUses", cmds);
      		  	}
      		  	if(msg.indexOf("@나무위키") != -1 || msg.indexOf("@꺼무위키") != -1) {
      		  		if(denyRooms.indexOf(room) != -1) {
 		 if(!isAdmin(imageDB, null)) {
 		  	replier.reply("");
 		  	return;
 		 }
		}
             split = msg.split(" ");
      		  		  if(split[1] != null) {
      		  		  	 replier.reply("namu.wiki/go/" + msg.replace("@나무위키 ", "").replace("@꺼무위키 ", "").replace(/ /g, "%20"));
      		  		  } else if(split[1] == null) {
      		  		  	   replier.reply("◀나무위키 명령어 사용법▶\n@나무위키 또는 @꺼무위키 [문서명]");
      		  		  }
					  cmds++;
					AppData.putInt("totalUses", cmds);
      		  	}
  if(msg.indexOf("@위키분류") != -1) {
      		  		if(denyRooms.indexOf(room) != -1) {
 		 if(!isAdmin(imageDB, null)) {
 		  	replier.reply("");
 		  	return;
 		 }
		}
             split = msg.split(" ");
      		  		  if(split[1] != null) {
      		  		  	 replier.reply(getCatlinks(msg.replace("@위키분류", "")));
      		  		  } else if(split[1] == null) {
      		  		  	   replier.reply("◀위키백과 분류 명령어 사용법▶\n@위키분류 [문서명]");
      		  		  }
					  cmds++;
					AppData.putInt("totalUses", cmds);
      		  	}
           if(msg.indexOf("@픽시브") != -1) {
      		  		if(denyRooms.indexOf(room) != -1) {
 		 if(!isAdmin(imageDB, null)) {
 		  	replier.reply("");
 		  	return;
 		 }
		}
             split = msg.split(" ");
      		  		  if(split[1] != null) {
      		  		  	 try {
                  msg = msg.replace('@픽시브 ', '');
                  let json = JSON.parse(org.jsoup.Jsoup.connect('http://apis.hunhee.tk/api1/pixiv/illust.json?id=' + msg).ignoreContentType(true).get().text());
                  if(json.illust.sanity_level >= 6) {
                    replier.reply("R18 일러스트는 볼 수 없습니다.");
                    return;
                  }
                 let tag = ''; json.illust.tags.forEach(e => { tag += '#' + (e.translated_name ? e.translated_name : e.name) + ' '; });
                 Kakao.send(room, {
                 'link_ver': '4.0',
                 'template_id': 38424,
                 'template_args': {
                   '${IMG}': 'http://apis.hunhee.tk/api1/pixiv/image.json?url=' + encodeURIComponent(json.illust.image_urls[0].original.replace('https://i.pximg.net/', '')),
                   '${PROFILE_IMAGE}': 'http://apis.hunhee.tk/api1/pixiv/image.json?url=' + encodeURIComponent(json.illust.user.profile_image_urls.medium.replace('https://i.pximg.net/', '')),
                   '${PROFILE_NAME}': json.illust.user.name,
                   '${PROFILE_ID}': json.illust.user.id,
                   '${TITLE}': json.illust.title, 
                   '${EXPLAIN}': tag,
                   '${LIKES}': json.illust.total_bookmarks,
                   '${VIEWS}': json.illust.total_view,
                   '${COMMENTS}': json.illust.total_comments,
                   '${ARTWORK_ID}': json.illust.id } }, 'custom');
             } catch(e) {
               replier.reply("해당 일러스트를 찾을 수 없습니다.");
             }
      		  		  } else if(split[1] == null) {
      		  		  	   replier.reply("◀픽시브 일러스트 명령어 사용법▶\n@픽시브 [일러스트 ID]");
      		  		  }
					  cmds++;
					AppData.putInt("totalUses", cmds);
      		  	}
     if(msg.indexOf("@군부대") != -1) {
      		  		if(denyRooms.indexOf(room) != -1) {
 		 if(!isAdmin(imageDB, null)) {
 		  	replier.reply("");
 		  	return;
 		 }
		}
             split = msg.split(" ");
      		  		  if(split[1] != null) {
      		  		  	 replier.reply(getArmyUnit(msg.replace("@군부대 ", "")));
      		  		  } else if(split[1] == null) {
      		  		  	   replier.reply("◀대한민국 국군 부대 검색 명령어 사용법▶\n@군부대 [부대명]");
      		  		  }
					  cmds++;
					AppData.putInt("totalUses", cmds);
      		  	}
          if(msg.indexOf("@주소") != -1) {
      		  		if(denyRooms.indexOf(room) != -1) {
 		 if(!isAdmin(imageDB, null)) {
 		  	replier.reply("");
 		  	return;
 		 }
		}
             split = msg.split(" ");
      		  		  if(split[1] != null) {
      		  		  	 replier.reply(searchAddress(msg.replace("@주소 ", "")));
      		  		  } else if(split[1] == null) {
      		  		  	   replier.reply("◀도로명 주소 검색 명령어 사용법▶\n@주소 [주소 or 지명]");
      		  		  }
					  cmds++;
					AppData.putInt("totalUses", cmds);
      		  	} 
           if(msg.indexOf("@본관") != -1) {
      		  		if(denyRooms.indexOf(room) != -1) {
 		 if(!isAdmin(imageDB, null)) {
 		  	replier.reply("");
 		  	return;
 		 }
		}
             split = msg.split(" ");
      		  		  if(split[1] != null) {
      		  		  	 replier.reply(searchHometown(msg.replace("@본관 ", "")));
      		  		  } else if(split[1] == null) {
      		  		  	   replier.reply("◀본관 검색 명령어 사용법▶\n@본관 [본관]");
      		  		  }
					  cmds++;
					AppData.putInt("totalUses", cmds);
      		  	} 
    if(msg.indexOf("@애니") != -1) {
      		  		if(denyRooms.indexOf(room) != -1) {
 		 if(!isAdmin(imageDB, null)) {
 		  	replier.reply("");
 		  	return;
 		 }
		}
             split = msg.split(" ");
      		  		  if(split[1] != null) {
                var res = getAnim(msg.replace("@애니 ", "").replace(" ", "%20"));
                if(res.length == 0) { 
                  replier.reply("애니가 없음");
                  return;
                  }
      		  		  	 Kakao.send(room, {"link_ver": "4.0", "template_id": 41985, "template_args": res}, "custom");
      		  		  } else if(split[1] == null) {
      		  		  	   replier.reply("◀애니 검색 명령어 사용법▶\n@애니 [제목]");
      		  		  }
					  cmds++;
					AppData.putInt("totalUses", cmds);
      		  	}
				if(msg.indexOf("@검색") != -1) {
					if(denyRooms.indexOf(room) == -1) {
						if(!isAdmin(imageDB, null)) {
							replier.reply("");
							return;
						}
				    }
						 split = msg.split(" ");
								  if(split[1] != null) {
									 replier.reply("https://m.search.naver.com/search.naver?query=" + msg.replace("@검색 ", "").replace(/ /g, "%20"));
								  } else if(split[1] == null) {
									   replier.reply("◀네이버 검색 명령어 사용법▶\n@검색 [검색어]");
								  }
								  cmds++;
								AppData.putInt("totalUses", cmds);
					}
					if(msg.split(" ")[0] == "@카트") {
      		  		if(denyRooms.indexOf(room) != -1) {
 		 if(!isAdmin(imageDB, null)) {
 		  	replier.reply("");
 		  	return;
 		 }
		}
             split = msg.split(" ");
      		  		  if(split[1] != null) {
      		  		  	 replier.reply(getKartGarage(msg.replace("@카트 ", "")));
      		  		  } else if(split[1] == null) {
      		  		  	   replier.reply("◀카트라이더 차고 명령어 사용법▶\n@카트 [닉네임]");
      		  		  }
					  cmds++;
					AppData.putInt("totalUses", cmds);
      		  	}
           if(msg.split(" ")[0] == "@카트2") {
      		  		if(denyRooms.indexOf(room) != -1) {
 		 if(!isAdmin(imageDB, null)) {
 		  	replier.reply("");
 		  	return;
 		 }
		}
             split = msg.split(" ");
      		  		  if(split[1] != null) {
      		  		  	 getKartKaling(msg.replace("@카트2 ", ""), room);
      		  		  } else if(split[1] == null) {
      		  		  	   replier.reply("◀카트라이더 차고 명령어 2 사용법▶\n@카트2 [닉네임]");
      		  		  }
					  cmds++;
					AppData.putInt("totalUses", cmds);
      		  	}
      		  	if(msg.indexOf("@메이플") != -1) {
      		  		if(denyRooms.indexOf(room) != -1) {
 		 if(!isAdmin(imageDB, null)) {
 		  	replier.reply("");
 		  	return;
 		 }
 	}
      		  		  var split = msg.split(' ');
      		  		  if(split[1] != null) {
      		  		  	
      		  		  	if(include(split[1])) {
      		  		  		 replier.reply("성드립이 감지되어 명령을 취소합니다.");
      		  		  		 return;
      		  		  	}
      		  		  	  replier.reply(getMapleInfo(remove(split[1])));
      		  		  } else if(split[1] == null) {
      		  		  	  replier.reply("◀메이플 종합통계 명령어 사용법▶\n@메이플 [닉네임]");
      		  		  }
					  cmds++;
				   AppData.putInt("totalUses", cmds);
      		  	}
      		  if(msg.indexOf("@배그") != -1) {
      		  	if(denyRooms.indexOf(room) != -1) {
 		 if(!isAdmin(imageDB, null)) {
 		  	replier.reply("");
 		  	return;
 		 }
 	}
      		  	  var split = msg.split(' ');
      		  	  if(split[1] != null) {
      		  	  	
      		  	  	if(include(split[1])) {
      		  		  		 replier.reply("성드립이 감지되어 명령을 취소합니다.");
      		  		  		 return;
      		  		  	}
      		  	  	  replier.reply(getPUBGInfo(remove(split[1])));
      		  	  } else if(split[1] == null) {
      		  	  	  replier.reply("◀배틀그라운드 전적 명령어 사용법▶\n@배그 [닉네임]");
      		  	  }
				  cmds++;
				   AppData.putInt("totalUses", cmds);
      		  	}
      		  	if(msg.indexOf("@롤") != -1) {
      		  		if(denyRooms.indexOf(room) != -1) {
 		 if(!isAdmin(imageDB, null)) {
 		  	replier.reply("");
 		  	return;
 		 }
 	}
      		  		var split = msg.split(' ');
      		  		if(split[1] != null) {
      		  			
      		  			if(include(split[1])) {
      		  		  		 replier.reply("성드립이 감지되어 명령을 취소합니다.");
      		  		  		 return;
      		  		  	}
      		  			
      		  			replier.reply("https://op.gg/summoner/userName=" + remove(split[1]));
      		  		} else if(split[1] == null) {
      		  			replier.reply("◀롤 전적 명령어 사용법▶\n@롤 [닉네임]");
      		  		}
					cmds++;
				   AppData.putInt("totalUses", cmds);
      		  	}
      		  if(msg.indexOf("@옵치") != -1) {
      		  	if(denyRooms.indexOf(room) != -1) {
 		 if(!isAdmin(imageDB, null)) {
 		  	replier.reply("");
 		  	return;
 		 }
 	}
      		  	  var split = msg.split(' ');
      		  	  if(split[1] != null) {
      		  	  	
      		  	  	if(include(split[1])) {
      		  		  		 replier.reply("성드립이 감지되어 명령을 취소합니다.");
      		  		  		 return;
      		  		  	}
      		  	  	  replier.reply("https://overlog.gg/search?playerName=" + remove(split[1]));
      		  	  } else if(split[1] == null) {
      		  	  	  replier.reply("◀오버워치 전적 명령어 사용법▶\n@옵치 [닉네임]");
      		  	  }
				  cmds++;
				   AppData.putInt("totalUses", cmds);
      		  	}
      		  	if(msg.indexOf("@날씨") != -1) {
      		  		if(denyRooms.indexOf(room) != -1) {
 		 if(!isAdmin(imageDB, null)) {
 		  	replier.reply("");
 		  	return;
 		 }
 	}
      		  		var split = msg.split(' ');
     		  		if(split[1] != null) {
     		  			
     		  			if(include(split[1])) {
      		  		  		 replier.reply("성드립이 감지되어 명령을 취소합니다.");
      		  		  		 return;
      		  		  	}
     		  			
     		  			var input = msg.replace(split[0] + " ", "");
      		  		var res = getWeatherInfo(remove(input));
      		  		if(res == null) {
      		  			replier.reply(input + "의 날씨 정보가 없습니다.");
      		  		} else {
      		  			replier.reply(res);
      		  		}
      		  	} else if(split[1] == null) {
      		  		replier.reply("◀날씨 명령어 사용법▶\n@날씨 [지역]");
      		 	}
				cmds++;
				   AppData.putInt("totalUses", cmds);
      	 }
      	 if(msg == "@실검") {
      	 	if(denyRooms.indexOf(room) != -1) {
 		 if(!isAdmin(imageDB, null)) {
 		  	replier.reply("");
 		  	return;
 		 }
 	}
      	 	 replier.reply(getRealTimeKeyword());
			 cmds++;
				   AppData.putInt("totalUses", cmds);
      	 }
      	 if(msg.indexOf("@나이") != -1) {
      	 	if(denyRooms.indexOf(room) != -1) {
 		 if(!isAdmin(imageDB, null)) {
 		  	replier.reply("");
 		  	return;
 		 }
 	}
      	 	var split = msg.split(' ');
			var res;
			if(split.length >= 2) {
				if(split[1] != null && split[2] == null) {
					res = calcAge(split[1], null);
				} else if(split[1] != null && split[2] != null) {
					res = calcAge(split[1], split[2]);
				}
				if(res == null) {
					replier.reply("생년월일 형식이 잘못되었습니다.");
				} else {
					replier.reply(res);
				}
			} else if(split.length < 2) {
      	 		replier.reply("◀나이 계산 명령어 사용법▶\n@나이 [생년월일] [기준날짜]");
      	 	}
			cmds++;
			AppData.putInt("totalUses", cmds);
      	 }
      	 if(msg.indexOf("@bmi") != -1) {
      	 	if(denyRooms.indexOf(room) != -1) {
 		 if(!isAdmin(imageDB, null)) {
 		  	replier.reply("");
 		  	return;
 		 }
 	}
      	 	 var split = msg.split(' ');
      	 	 if(split[1] != null && split[2] != null) {
          if(isNaN(split[1]) || isNaN(split[2])) {
           replier.reply("숫자를 입력해 주세요.");
           } else {
      	 	 	replier.reply(sender + "님의 " + BMICalc(parseInt(split[1]), parseInt(split[2])));
           }
      	 	 } else if(split[1] == null || split[2] == null) {
      	 	 	replier.reply("◀BMI 계산 명렁어 사용법▶\n@bmi [키] [몸무게]");
      	 	 }
			 cmds++;
				   AppData.putInt("totalUses", cmds);
      	 }
      	 if(msg.indexOf("@로아") != -1) {
      	 	if(denyRooms.indexOf(room) != -1) {
 		 if(!isAdmin(imageDB, null)) {
 		  	replier.reply("");
 		  	return;
 		 }
 	}
      	 	var split = msg.split(' ');
      	 	if(split[1] != null) {
      	 		
      	 		if(include(split[1])) {
      		  		  		 replier.reply("성드립이 감지되어 명령을 취소합니다.");
      		  		  		 return;
      		  		  	}
      	 		 replier.reply(getLostArkInfo(remove(split[1])));
      	 	} else if(split[1] == null) {
      	 		 replier.reply("◀로스트아크 전적 명령어 사용법▶\n@로아 [닉네임]")
      	 	}
			cmds++;
				   AppData.putInt("totalUses", cmds);
      	 }
		 if(msg.indexOf("@레식") != -1) {
      	 	if(denyRooms.indexOf(room) != -1) {
 		 if(!isAdmin(imageDB, null)) {
 		  	replier.reply("");
 		  	return;
 		 }
 	}
      	 	var split = msg.split(' ');
      	 	if(split[1] != null) {
      	 		
      	 		if(include(split[1])) {
      		  		  		 replier.reply("성드립이 감지되어 명령을 취소합니다.");
      		  		  		 return;
      		  		  	}
      	 		 replier.reply(getR6Info(remove(split[1])));
      	 	} else if(split[1] == null) {
      	 		 replier.reply("◀레식 전적(PC) 명령어 사용법▶\n@레식 [닉네임]")
      	 	}
			cmds++;
				   AppData.putInt("totalUses", cmds);
      	 }
      	 if((msg.indexOf("@나라") != -1 || msg.indexOf("@국가") != -1) && msg.indexOf("@국가코드") == -1) {
      	 	if(denyRooms.indexOf(room) != -1) {
 		 if(!isAdmin(imageDB, null)) {
 		  	replier.reply("");
 		  	return;
 		 }
 	}
      	 	var split = msg.split(' ');
      	 	if(split[1] != null) {
      	 		
      	 		if(include(split[1])) {
      		  		  		 replier.reply("성드립이 감지되어 명령을 취소합니다.");
      		  		  		 return;
      		  		  	}
      	 		replier.reply(getNationInfo2(remove(split[1])));
      	 	} else if(split[1] == null) {
      	 		replier.reply("◀나라(국가) 정보 명령어 사용법▶\n@나라 또는 @국가 [나라명]");
      	 	}
			cmds++;
				   AppData.putInt("totalUses", cmds);
      	 }
      	 if(msg == "@낚시" || msg == "@ㄴㅅ") {
         if(denyRooms.indexOf(room) != -1 && !isAdmin(imageDB)) {
          replier.reply("");
          } else {
      	 	
      	 	replier.reply(fishing(imageDB, room));
          }
		  cmds++;
				   AppData.putInt("totalUses", cmds);
      	 }
      	 if(msg == "@강화" || msg == "@ㄱㅎ") {
         if(denyRooms.indexOf(room) != -1 && !isAdmin(imageDB)) {
          replier.reply("");
          } else {
      	 	
      	 	replier.reply(upgradeFishing(imageDB, false));
          }
		  cmds++;
				   AppData.putInt("totalUses", cmds);
      	 }
        if(msg == "@강화점프" || msg == "@강점") {
         if(denyRooms.indexOf(room) != -1 && !isAdmin(imageDB)) {
          replier.reply("");
          } else {
      	 	
      	 	replier.reply(upgradeFishing(imageDB, true));
          }
		  cmds++;
				   AppData.putInt("totalUses", cmds);
      	 }
        if(msg.includes("@송금")) {
         if(denyRooms.indexOf(room) != -1 && !isAdmin(imageDB)) {
          replier.reply("");
          } else {
      	 	
      	 var split = msg.split(" ");
        if(!split[1].includes(":")) {
          replier.reply("형식을 정확히 입력해 주세요. (아이디:보낼양)");
        } else {
         split = split[1].split(":");
	replier.reply(sendCoin(imageDB, split[0], Number(split[1])));
          }
        }
		  cmds++;
				   AppData.putInt("totalUses", cmds);
      	 }
        if(msg.includes("@계정공유")) {
         if(denyRooms.indexOf(room) != -1 && !isAdmin(imageDB)) {
          replier.reply("");
          } else {
            if(isAdmin(imageDB, 2)) {
      	 	
      	 var split = msg.split(" ");
        if(split[1] == undefined) { 
          replier.reply("대상아이디와 받을아이디를 입력해 주세요.");
          return;
          }
        if(!split[1].includes(":")) {
          replier.reply("형식을 정확히 입력해 주세요. (대상아이디:받을아이디)");
        } else {
         split = split[1].split(":");
	replier.reply(shareUser(split[0], split[1]));
           }
          } else {
            replier.reply("2급 관리자 이상만 사용 가능한 명령어입니다.");
          }
        }
		  cmds++;
				   AppData.putInt("totalUses", cmds);
      	 }
        if(msg == "@강화잠금") {
         if(denyRooms.indexOf(room) != -1 && !isAdmin(imageDB)) {
          replier.reply("");
          } else {
      	 	
      	 	replier.reply(lockFish(imageDB));
          }
		  cmds++;
				   AppData.putInt("totalUses", cmds);
      	 }
        if(msg == "@가입") {
         if(denyRooms.indexOf(room) != -1 && !isAdmin(imageDB)) {
          replier.reply("");
          } else {
      	 	
      	 	replier.reply(joinFish(sender, imageDB.getProfileHash()));
          }
		  cmds++;
				   AppData.putInt("totalUses", cmds);
      	 }
      	 if(msg == "@내정보" || msg == "@ㄴㅈㅂ") {
         if(denyRooms.indexOf(room) != -1 && !isAdmin(imageDB)) {
          replier.reply("");
          } else {
      	 	
      	 	replier.reply(myInfo(sender, imageDB.getProfileHash(), ""));
          }
		  cmds++;
				   AppData.putInt("totalUses", cmds);
      	 }
        if(msg.includes("@니정보")) {
         if(denyRooms.indexOf(room) != -1 && !isAdmin(imageDB)) {
          replier.reply("");
          } else {
            var split = msg.split(" ");
      	 	if(split[1] != undefined || split[1] != null || split[1] != "") {
           if(split[1].search(/[a-z]/) == -1 && split[1].search(/[0-9]/) == -1) {
           replier.reply(myInfo(split[1], "", ""));
         } else {
      	 	 replier.reply(myInfo("", "", split[1]));
          }
         } else {
           replier.reply("아이디 또는 닉네임을 정확히 입력해 주세요.");
         }
          }
		  cmds++;
				   AppData.putInt("totalUses", cmds);
      	 }
		 if(msg == "@낚시초기화" && isAdmin(imageDB, 3)) {
         if(denyRooms.indexOf(room) != -1 && !isAdmin(imageDB)) {
          replier.reply("");
          } else {
			  fish = [];
			  FileStream.write(roomPath + "/fish_rank.txt", JSON.stringify(fish));
      	 	  replier.reply("관리자에 의해 낚시 순위가 초기화 되었습니다.");
			  Api.reload("DvelBot.js");
          }
		  cmds++;
				   AppData.putInt("totalUses", cmds);
      	 }
		 if(msg.indexOf("@한자") != -1) {
		 	if(denyRooms.indexOf(room) != -1) {
 		 if(!isAdmin(imageDB, null)) {
 		  	replier.reply("");
 		  	return;
 		 }
 	}
			 if(include(msg)) {
      		  		  		 replier.reply("성드립이 감지되어 명령을 취소합니다.");
      		  		  		 return;
      		  }
			 var split = msg.split(' ');
			 if(split[1] != null) {
				 replier.reply(getHanja(remove(msg.replace("@한자 ", "").replace(" ", "%20"))));
			 } else if(split[1] == null) {
				 replier.reply("◀한자 명령어 사용법▶\n@한자 [한자음]");
		    }
			cmds++;
				   AppData.putInt("totalUses", cmds);
        }
		if(msg.split(" ")[0] == "@기업" || msg.split(" ")[0] == "@회사") {
			if(denyRooms.indexOf(room) != -1) {
 		 if(!isAdmin(imageDB, null)) {
 		  	replier.reply("");
 		  	return;
 		 }
 	}
			if(include(msg)) {
      		  		  		 replier.reply("성드립이 감지되어 명령을 취소합니다.");
      		  		  		 return;
      		  }
			 var split = msg.split(' ');
			 if(split[1] != null) {
				 if(split[1].search(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/) != -1 || split[1].search(/[A-Za-z]/) != -1) {
					replier.reply(getCompanyInfo(remove(msg.replace("@기업 ", "").replace(" ", "%20"))));
				 } else if(split[1].search(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/) == -1 && split[1].search(/[A-Za-z]/) == -1 && split[1].search(/[0-9+]/) != -1) {
					 replier.reply(getJobplanetInfo(remove(msg.replace("@기업 ", ""))));
				 }
			 } else if(split[1] == null) {
				 replier.reply("◀기업 정보 명령어 사용법▶\n@기업 [기업명 or 기업코드]");
			 }
			 cmds++;
				   AppData.putInt("totalUses", cmds);
		}
		if(msg.split(" ")[0] == "@기업검색") {
			if(denyRooms.indexOf(room) != -1) {
 		 if(!isAdmin(imageDB, null)) {
 		  	replier.reply("");
 		  	return;
 		 }
 	}
			if(include(msg)) {
      		  		  		 replier.reply("성드립이 감지되어 명령을 취소합니다.");
      		  		  		 return;
      		  }
			 var split = msg.split(' ');
			 if(split[1] != null) {
				 replier.reply(getJobplanetSearch(remove(msg.replace("@기업검색", ""))));
			 } else if(split[1] == null) {
				 replier.reply("◀잡플래닛 기업 검색 명령어 사용법▶\n@기업검색 [기업명]");
			 }
			 cmds++;
				   AppData.putInt("totalUses", cmds);
		}
		if(msg.split(" ")[0] == "@폰검색") {
			if(denyRooms.indexOf(room) != -1) {
 		 if(!isAdmin(imageDB, null)) {
 		  	replier.reply("");
 		  	return;
 		 }
 	}
			if(include(msg)) {
      		  		  		 replier.reply("성드립이 감지되어 명령을 취소합니다.");
      		  		  		 return;
      		  }
			 var split = msg.split(' ');
			 if(split[1] != null) {
				 replier.reply(getPhoneSearch(remove(msg.replace("@폰검색 ", ""))));
			 } else if(split[1] == null) {
				 replier.reply("◀스마트폰 검색 명령어 사용법▶\n@폰검색 [기기명 or 모델명]");
			 }
			 cmds++;
				   AppData.putInt("totalUses", cmds);
		}
		if(msg.split(" ")[0] == "@폰정보") {
			if(denyRooms.indexOf(room) != -1) {
 		 if(!isAdmin(imageDB, null)) {
 		  	replier.reply("");
 		  	return;
 		 }
 	}
			if(include(msg)) {
      		  		  		 replier.reply("성드립이 감지되어 명령을 취소합니다.");
      		  		  		 return;
      		  }
			 var split = msg.split(' ');
			 if(split[1] != null) {
				 var result = getPhoneInfo(remove(msg.replace("@폰정보 ", "")));
     if(typeof result == "string") {
       if(result.includes("없습니다")) {
        replier.reply("해당 기기 정보가 없습니다.");
       } else if(result.includes("오류")) {
         replier.reply(result);
       }
     } else {
				  Kakao.send(room, {"link_ver": "4.0", "template_id": 51124, "template_args": result}, "custom");
     }
			 } else if(split[1] == null) {
				 replier.reply("◀스마트폰 정보 명령어 사용법▶\n@폰정보 [기기코드]");
			 }
			 cmds++;
				   AppData.putInt("totalUses", cmds);
		}
		if(msg.indexOf("@학교") != -1) {
			if(denyRooms.indexOf(room) != -1) {
 		 if(!isAdmin(imageDB, null)) {
 		  	replier.reply("");
 		  	return;
 		 }
 	}
			if(include(msg)) {
      		  		  		 replier.reply("성드립이 감지되어 명령을 취소합니다.");
      		  		  		 return;
      		  }
			 var split = msg.split(' ');
			 if(split[1] != null) {
				 getSchoolInfo(remove(msg.replace("@학교", "")), room);
			 } else if(split[1] == null) {
				 replier.reply("◀초/중/고/대학교 정보 명령어 사용법▶\n@학교 [학교명]");
			 }
			 cmds++;
				   AppData.putInt("totalUses", cmds);
		}
  if(msg.indexOf("@학검") != -1) {
			if(denyRooms.indexOf(room) != -1) {
 		 if(!isAdmin(imageDB, null)) {
 		  	replier.reply("");
 		  	return;
 		 }
 	}
			if(include(msg)) {
      		  		  		 replier.reply("성드립이 감지되어 명령을 취소합니다.");
      		  		  		 return;
      		  }
			 var split = msg.split(' ');
			 if(split[1] != null) {
				 replier.reply(searchSchools(msg.replace("@학검 ", "")));
			 } else if(split[1] == null) {
				 replier.reply("◀국내 학교 검색 명령어 사용법▶\n@학검 [학교명]");
			 }
			 cmds++;
				   AppData.putInt("totalUses", cmds);
		}
		if(msg == "@디지털시계") {
			
			if(denyRooms.indexOf(room) != -1) {
 		 if(!isAdmin(imageDB, null)) {
 		  	replier.reply("");
 		  	return;
 		 }
 	}
      	 	replier.reply(getTimes("nowday") + " " + getAP() + digital(getTimes("hour").toString() + getTimes("minute").toString(), 0));
			cmds++;
				   AppData.putInt("totalUses", cmds);
      	 }
		if(msg == "@한강") {
			
			if(denyRooms.indexOf(room) != -1) {
 		 if(!isAdmin(imageDB, null)) {
 		  	replier.reply("");
 		  	return;
 		 }
 	}
      	 	replier.reply(getHangangTemp());
			cmds++;
				   AppData.putInt("totalUses", cmds);
      	 }
    if(msg == "@전국날씨") {
			
			if(denyRooms.indexOf(room) != -1) {
 		 if(!isAdmin(imageDB, null)) {
 		 	replier.reply("");
 		  	return;
 		 }
 	}
      	 	replier.reply("◀현재 전국 날씨▶\n\n" + getAllWeather());
			cmds++;
				   AppData.putInt("totalUses", cmds);
      	 }
      	 if(msg == "@실행중앱") {
			
			if(denyRooms.indexOf(room) != -1) {
 		 if(!isAdmin(imageDB, null)) {
 		 	replier.reply("");
 		  	return;
 		 }
 	}
      	 	replier.reply(getTopActivity());
			cmds++;
				   AppData.putInt("totalUses", cmds);
      	 }
        if(msg.indexOf("@앱검색") != -1) {
				if(denyRooms.indexOf(room) != -1) {
				 if(!isAdmin(imageDB, null)) {
					replier.reply("");
					return;
					}
				}
			if(include(msg)) {
      		  	replier.reply("성드립이 감지되어 명령을 취소합니다.");
      		  	return;
      		  }
			 var split = msg.split(' ');
			 if(split[1] != null) {
				 replier.reply(searchApps(remove(msg.replace("@앱검색 ", ""))));
			 } else if(split[1] == null) {
				 replier.reply("◀설치된 앱 검색 명령어 사용법▶\n@앱검색 [앱 이름 or 패키지명]");
			 }
			 cmds++;
				   AppData.putInt("totalUses", cmds);
		}
		 if(msg.indexOf("@영어변환") != -1) {
		 	if(denyRooms.indexOf(room) != -1) {
 		 if(!isAdmin(imageDB, null)) {
 		  	replier.reply("");
 		  	return;
 		 }
 	}
			 if(include(msg)) {
      		  		  		 replier.reply("성드립이 감지되어 명령을 취소합니다.");
      		  		  		 return;
      		  }
			 var split = msg.split(' ');
			 if(split[1] != null) {
				 replier.reply("◀변환 결과▶\n\n" + convertEngToKor(remove(msg.replace("@영어변환 ", ""))));
			 } else if(split[1] == null) {
				 replier.reply("◀영어 한글 변환 명령어 사용법▶\n@영어변환 [영어로 된 한글]");
		    }
			cmds++;
				   AppData.putInt("totalUses", cmds);
        }
       if(msg.indexOf("@이름변환") != -1) {
		 	if(denyRooms.indexOf(room) != -1) {
 		 if(!isAdmin(imageDB, null)) {
 		  	replier.reply("");
 		  	return;
 		 }
 	}
			 if(include(msg)) {
      		  		  		 replier.reply("성드립이 감지되어 명령을 취소합니다.");
      		  		  		 return;
      		  }
			 var split = msg.split(' ');
			 if(split[1] != null) {
			 	 if(split[1].search(/[A-Za-z]/) != -1) {
			 	 	replier.reply("한글 인명을 입력해 주세요.");
			 	 	return;
			 	 }
				 replier.reply(conNameRoma(remove(msg.replace("@이름변환 ", ""))));
			 } else if(split[1] == null) {
				 replier.reply("◀한글 인명 로마자 변환 명령어 사용법▶\n@이름변환 [한글 인명]");
		    }
			cmds++;
				   AppData.putInt("totalUses", cmds);
        }
      	 if(msg.indexOf("@게임") != -1 && msg.indexOf("순위") == -1 && msg.indexOf("등급") == -1)  {
  if(denyRooms.indexOf(room) != -1) {
 		 if(!isAdmin(imageDB, null)) {
 		  	replier.reply("");
 		  	return;
 		 }
 	}
			if(include(msg)) {
      		  		  		 replier.reply("성드립이 감지되어 명령을 취소합니다.");
      		  		  		 return;
      		  }
			 var split = msg.split(' ');
			 if(split[1] != null) {
				 replier.reply(getGameInfo(remove(msg.replace("@게임", "").replace(" ", "%20"))));
			 } else if(split[1] == null) {
				 replier.reply("◀게임 정보 명령어 사용법▶\n@게임 [게임명]");
			 }
			 cmds++;
				   AppData.putInt("totalUses", cmds);
		}
		   if(msg === "@게임순위") {
			    if(denyRooms.indexOf(room) != -1) {
				   if(!isAdmin(imageDB, null)) {
					replier.reply("");
					return;
					}
				}
				if(include(msg)) {
					replier.reply("성드립이 감지되어 명령을 취소합니다.");
					return;
				}
				replier.reply(getGameRanking());
			cmds++;
			AppData.putInt("totalUses", cmds);
			}
			if(msg.indexOf("@사전") != -1) {
				if(denyRooms.indexOf(room) != -1) {
				 if(!isAdmin(imageDB, null)) {
					replier.reply("");
					return;
					}
				}
			if(include(msg)) {
      		  	replier.reply("성드립이 감지되어 명령을 취소합니다.");
      		  	return;
      		  }
			 var split = msg.split(' ');
			 if(split[1] != null) {
				 replier.reply(getDictionary(remove(msg.replace("@사전 ", ""))));
			 } else if(split[1] == null) {
				 replier.reply("◀사전 명령어 사용법▶\n@사전 [검색어]");
			 }
			 cmds++;
				   AppData.putInt("totalUses", cmds);
		}
  }
			if(msg === "@개발자위치") {
			cmds++;
			AppData.putInt("totalUses", cmds);
			}
      if(msg.indexOf("@단어") != -1) {
   if(denyRooms.indexOf(room) != -1) {
 		 if(!isAdmin(imageDB, null)) {
 		  	replier.reply("");
 		  	return;
 		 }
 	}
			 if(include(msg)) {
      		  		  		 replier.reply("성드립이 감지되어 명령을 취소합니다.");
      		  		  		 return;
      		  }
			 var split = msg.split(' ');
			 if(split[1] != null) {
				 replier.reply(getWords(remove(msg.replace("@단어 ", "").replace(" ", "%20"))));
			 } else if(split[1] == null) {
				 replier.reply("◀한자 단어 명령어 사용법▶\n@단어 [단어]");
		    }
			cmds++;
				   AppData.putInt("totalUses", cmds);
        }
     if(msg.indexOf("@고사성어") != -1 || msg.indexOf("@사자성어") != -1) {
    if(denyRooms.indexOf(room) != -1) {
 		 if(!isAdmin(imageDB, null)) {
 		 	replier.reply("");
 		  	return;
 		 }
 	}
			 if(include(msg)) {
      		  		  		 replier.reply("성드립이 감지되어 명령을 취소합니다.");
      		  		  		 return;
      		  }
			 var split = msg.split(' ');
			 if(split[1] != null) {
				 replier.reply(getIdiom(remove(msg.replace("@고사성어 ", "").replace("@사자성어 ", "").replace(" ", "%20"))));
			 } else if(split[1] == null) {
				 replier.reply("◀고사성어 명령어 사용법▶\n@고사성어 [고사성어]");
		    }
			cmds++;
				   AppData.putInt("totalUses", cmds);
        }
    if(msg.indexOf("@국가코드") != -1) {
    if(denyRooms.indexOf(room) != -1) {
 		 if(!isAdmin(imageDB, null)) {
 		 	replier.reply("");
 		  	return;
 		 }
 	}
			 if(include(msg)) {
      		  		  		 replier.reply("성드립이 감지되어 명령을 취소합니다.");
      		  		  		 return;
      		  }
			 var split = msg.split(' ');
			 if(split[1] != null) {
			 	var r = getCountryByCode(split[1], split[2]);
			 	if(r.split("/")[0].length == 0) {
			 		 replier.reply("해당 국가 코드를 찾을 수 없습니다.");
			 	} else {
				  replier.reply("◀국가 코드 조회▶\n\n" + "국가명 : " + r.split("/")[0] + "\n" + "alpha-2 : " + r.split("/")[1] + "\nalpha-3 : " + r.split("/")[2]);
				  }
			 } else if(split[1] == null) {
				 replier.reply("◀국가 코드 명령어 사용법▶\n@국가코드 [코드 or 국가명]");
		    }
			cmds++;
				   AppData.putInt("totalUses", cmds);
        }
    if(msg == "@슬롯머신") {
			if(denyRooms.indexOf(room) != -1) {
 		 if(!isAdmin(imageDB, null)) {
 		 	replier.reply("");
 		  	return;
 		 }
 	}
			cmds++;
			AppData.putInt("totalUses", cmds);
      	 	 replier.reply(slotMachine(sender));
      	 }
		 if(msg.toUpperCase() == "@TMI") {
			if(denyRooms.indexOf(room) != -1) {
 		 if(!isAdmin(imageDB, null)) {
 		 	replier.reply("");
 		  	return;
 		 }
 	}
			cmds++;
			AppData.putInt("totalUses", cmds);
      	 	 replier.reply(getTMI());
      	 }
		 if(msg == "@낚시순위") {
			if(denyRooms.indexOf(room) != -1) {
 		 if(!isAdmin(imageDB, null)) {
 		 	replier.reply("");
 		  	return;
 		 }
 	}
			cmds++;
			AppData.putInt("totalUses", cmds);
      	 	 replier.reply(getFishRank());
      	 }
      	 if(msg == "@코인순위") {
			if(denyRooms.indexOf(room) != -1) {
 		 if(!isAdmin(imageDB, null)) {
 		 	replier.reply("");
 		  	return;
 		 }
 	}
			cmds++;
			AppData.putInt("totalUses", cmds);
      	 	 replier.reply(getCoinRank());
      	 }
      	 if(msg == "@강화순위") {
			if(denyRooms.indexOf(room) != -1) {
 		 if(!isAdmin(imageDB, null)) {
 		 	replier.reply("");
 		  	return;
 		 }
 	}
			cmds++;
			AppData.putInt("totalUses", cmds);
      	 	 replier.reply(getUpgRank());
      	 }
		 if(msg == "@낚시정보") {
			if(denyRooms.indexOf(room) != -1) {
 		 if(!isAdmin(imageDB, null)) {
 		 	replier.reply("");
 		  	return;
 		 }
 	}
			cmds++;
			AppData.putInt("totalUses", cmds);
      	 	 replier.reply(getFishInfo());
      	 }
        if(msg == "@칭호") {
			if(denyRooms.indexOf(room) != -1) {
 		 if(!isAdmin(imageDB, null)) {
 		 	replier.reply("");
 		  	return;
 		 }
 	}
			cmds++;
			AppData.putInt("totalUses", cmds);
   var list = [];
   list.push("[나는⭐오성] : 낚시대 5성(50강) 달성 시 획득. 효과는 없다.");
   list.push("[강화🏅장인] : 능력치(기본 크기) 40000 이상 달성 시 획득. 강화 비용이 절반으로 삭감된다.");
   list.push("[코인💵부자] : 500만 코인 달성 시 획득. 랜덤 보너스 추가 크기가 2000cm 추가된다.");
   list.push("[특급⚡피셔] : 낚시대 5성(50강) 달성 & 낚시 순위 TOP 10 이내에 들면 영구획득. 낚시 시 5000코인 추가 및 강화 확률이 10% 증가된다.");
   list.push("[⚜명예 낚시꾼⚜] : 나는오성, 코인부자, 특급피셔 칭호 획득 & 기본 능력치 50000 이상 달성 시 획득. 효과는 없으나 디벨봇 낚시 베테랑이 되었다는 의미로 만들어졌다.");
   list.push("[🎖낚시 지배자🎖] : 낚시 순위에 10개 이상 등재 시 획득. 효과는 없으나 디벨봇 낚시왕이 되었다는 의미로 만들어졌다.");
      	 	 replier.reply("디벨봇 낚시 칭호 목록" + compress + "\n\n" + list.join("\n\n"));
      	 }
		if(msg == "@봇통계") {
			if(denyRooms.indexOf(room) != -1) {
 		 if(!isAdmin(imageDB, null)) {
 		 	replier.reply("");
 		  	return;
 		 }
 	}
			cmds++;
			AppData.putInt("totalUses", cmds);
      	 	 replier.reply(getTotals());
      	 }
		 if(msg == "@봇상태") {
		 	if(denyRooms.indexOf(room) != -1) {
 		 if(!isAdmin(imageDB, null)) {
 		 	replier.reply("");
 		  	return;
 		 }
 	}
			cmds++;
			AppData.putInt("totalUses", cmds);
      	 	 replier.reply(getStatus());
      	 }
		 if(msg.indexOf("@구글번역") != -1) {
		 	if(denyRooms.indexOf(room) != -1) {
 		 if(!isAdmin(imageDB, null)) {
 		 	replier.reply("");
 		  	return;
 		 }
 	}
      	 	 var split = msg.split(' ');
      	 	 if(split[1] != null && split[2] != null) {
      	 	 	replier.reply(googleTranslate(split[1], msg.replace("@구글번역 " + split[1], "")));
      	 	 } else if(split[1] == null || split[2] == null) {
      	 	 	replier.reply("◀구글 번역 명령어 사용법▶\n@구글번역 [번역할 언어] [번역할 내용]");
      	 	 }
			cmds++;
			AppData.putInt("totalUses", cmds);
      	 }
		 if(msg.indexOf("@파파고") != -1) {
		 	if(denyRooms.indexOf(room) != -1) {
 		 if(!isAdmin(imageDB, null)) {
 		 	replier.reply("");
 		  	return;
 		 }
 	}
      	 	 var split = msg.split(' ');
      	 	 if(split[1] != null && split[2] != null && getLangCodeByName(split[2]) == "") {
      	 	 	replier.reply(PapagoNMT(null, split[1], msg.replace("@파파고 " + split[1], "")));
      	 	 } else if(split[1] != null && split[2] != null && getLangCodeByName(split[2]) != "") {
           replier.reply(PapagoNMT(split[1], split[2], msg.replace("@파파고 " + split[1] + " " + split[2] + " ", "")));
          } else if(split[1] == null || split[2] == null) {
      	 	 	replier.reply("◀파파고 번역 명령어 사용법▶\n@파파고 [대상 언어] [번역할 언어] [번역할 내용]");
      	 	 }
			cmds++;
			AppData.putInt("totalUses", cmds);
      	 }
   if(msg.indexOf("@언어감지") != -1) {
   if(denyRooms.indexOf(room) != -1) {
 		 if(!isAdmin(imageDB, null)) {
 		  	replier.reply("");
 		  	return;
 		 }
 	}
			 if(include(msg)) {
      		  		  		 replier.reply("성드립이 감지되어 명령을 취소합니다.");
      		  		  		 return;
      		  }
			 var split = msg.split(' ');
			 if(split[1] != null) {
				 replier.reply("◀파파고 언어감지 결과▶\n\n" + msg.substr(6) + "\n→ " + getLangCodeByName(PapagoDetect(remove(msg.replace("@언어감지 ", "").replace(" ", "%20")))));
			 } else if(split[1] == null) {
				 replier.reply("◀파파고 언어감지 명령어 사용법▶\n@언어감지 [내용]");
		    }
			cmds++;
				   AppData.putInt("totalUses", cmds);
        }
		if(msg.indexOf("@호스트") != -1) {
   if(denyRooms.indexOf(room) != -1) {
 		 if(!isAdmin(imageDB, null)) {
 		  	replier.reply("");
 		  	return;
 		 }
 	}
			 if(include(msg)) {
      		  		  		 replier.reply("성드립이 감지되어 명령을 취소합니다.");
      		  		  		 return;
      		  }
			 var split = msg.split(' ');
			 if(split[1] != null) {
				 replier.reply(getHostAndIP(msg.replace("@호스트 ", "")));
			 } else if(split[1] == null) {
				 replier.reply("◀호스트/IP 명령어 사용법▶\n@호스트 [링크]");
		    }
			cmds++;
				   AppData.putInt("totalUses", cmds);
        }
		if(msg.indexOf("@아이피추적") != -1) {
   if(denyRooms.indexOf(room) != -1) {
 		 if(!isAdmin(imageDB, null)) {
 		  	replier.reply("");
 		  	return;
 		 }
 	}
			 if(include(msg)) {
      		  		  		 replier.reply("성드립이 감지되어 명령을 취소합니다.");
      		  		  		 return;
      		  }
			 var split = msg.split(' ');
			 if(split[1] != null) {
				 replier.reply(trackingIP(msg.replace("@아이피추적 ", "")));
			 } else if(split[1] == null) {
				 replier.reply("◀아이피 추적 명령어 사용법▶\n@아이피추적 [아이피]");
		    }
			cmds++;
				   AppData.putInt("totalUses", cmds);
        }
		 if(msg == "@지진") {
			  	replier.reply(getEarthquakes(true));
    }
    if(msg == "@지진초기화") {
   if(isAdmin(imageDB, 2)) {
     earthquake = "";
     AppData.putString("earthquake", earthquake);
			   replier.reply("관리자에 의해 최근 지진/화산이 초기화 됩니다.");
   } else {
     replier.reply("");
    return;
    }
		 }
		   if(msg == "@자동감지 중지") {
			 if(isAdmin(imageDB, 2)) {
				timer.cancel();
			  	replier.reply("관리자에 의해 신종 코로나바이러스 감지가 중지 되었습니다.");
			 } else {
               replier.reply("");
               return;
             }
           }
  if(msg == "@코로나") {
			  	var url = getCovidImg();
      Kakao.send(room, { "link_ver": "4.0", "template_id": 25191, "template_args": { logo_image: url, title: "현재 코로나 정보", description: "최근 코로나 정보 입니다."}}, "custom");
    }
		 if(msg.indexOf("@로그목록") != -1) {
		 	 var roomName = room;
   if(isAdmin(imageDB, 2)) {
   	if(msg.split(" ")[1] != undefined) {
   		roomName = msg.replace("@로그목록 ", "").trim();
   	}
			  if(logRooms.indexOf(roomName) != -1) {
				  var file = new java.io.File(logPath + "/" + roomName).listFiles();
				  var result = [];
				  var size = 0;
				  for(var i = 0; i < file.length; i++) {
					  result[i] = file[i].getName() + "(" + byteCalculation(file[i].length()) + ")";
					  size += file[i].length();
				  }
				 replier.reply("◀해당(현재) 방에 기록된 로그 파일 목록▶\n\n" + "총 " + file.length + "개(" + byteCalculation(size) + ")" + compress + "\n\n" + result.join("\n"));
			 } else {
				 replier.reply("로그 기록을 하지 않는 방 입니다.");
			 }
   } else {
     replier.reply("");
    return;
    }
		 }
		 if(msg.indexOf("@최근로그") != -1) {
    if(isAdmin(imageDB, 1)) {
			   try {
				   var split = msg.split(" ");
				   var txt = readFile(logPath + "/" + room + "/" + getTimes("nowday2") + ".txt");
					   var result = [];
				   if(split[1] == null) {
					    var n = 0;
					    for(var i = txt.length; i > 0; i--) {
						    	if(n > 5) {
					    			 break;
					    		} else {
          if(txt[i] != undefined) {
					    				result.push(txt[i].replace("\u202e", "\u202d"));
          }
					    		n++;
					    		}
					    }
					    
					   if(result != "") {
					    	replier.reply("◀" + room + "의 오늘자 최근 채팅▶\n\n" + result.reverse().join("\n").trim());
					    } else {
					    	 replier.reply("오늘자 최근 채팅이 없습니다.");
					    }
				   } else {
					    var n = 0;
						var name = [];
					    for(var i = txt.length; i > 0; i--) {
					    	if(java.lang.String(txt[i]).split(">")[0].indexOf(msg.replace("@최근로그 ", "")) != -1) {
					    		
					    		if(n > 5) {
					    			 break;
					    		} else {
          if(txt[i] != undefined) {
					    			 	result.push(txt[i].replace("\u202e", "\u202d"));
           }
					    		n++;
					    		}
								var temp = java.lang.String(txt[i]).split(">")[0].split("<")[1];
								if(name.indexOf(temp) == -1) {
									 name.push(temp);
								}
					    	}
					    }
					    
					   if(result != "") {
					    	replier.reply("◀" + name.reverse().join(",").replace("\u202e", "") + "의 오늘자 최근 채팅▶\n\n" + result.reverse().join("\n"));
					    } else {
					    	 replier.reply("해당 유저의 채팅을 찾을 수 없습니다.");
					    }
				   }
			   } catch(e) {
				   replier.reply("◀에러 발생▶\n\n" + e + " #" + e.lineNumber);
			 }
		   } else {
			replier.reply("");
			return;
			}
		}
		 if(msg.indexOf("@유저로그 오늘") != -1) {
    if(isAdmin(imageDB, 1)) {
			   try {
				   var split = msg.split(" ");
				   if(split[2] == null) {
					   replier.reply("매개변수를 정확히 입력해 주세요.");
				   } else {
					    var txt = readFile(logPath + "/" + room + "/" + getTimes("nowday2") + ".txt");
					    
					    var result = [];
						var name = [];
					    for(var i = 0; i < txt.length; i++) {
					    	if(java.lang.String(txt[i]).split(">")[0].indexOf(msg.replace("@유저로그 오늘 ", "")) != -1) {
          if(txt[i] != undefined) {
					    		 result.push(txt[i].replace("\u202e", "\u202d"));
          }
								var temp = java.lang.String(txt[i]).split(">")[0].split("<")[1];
									if(name.indexOf(temp) == -1) {
          name.push(temp);
        }
					    	}
					    }  
					    
					   if(result.length != 0) {
					    	replier.reply("◀" + name.join(", ").replace("\u202e", "") + "의 오늘자 총 채팅(" + result.length + "회" + ")▶" + compress + "\n\n" + result.join("\n"));
					    } else {
					    	 replier.reply("해당 유저의 채팅을 찾을 수 없습니다.");
					    }
				   }
			   } catch(e) {
				   replier.reply("◀에러 발생▶\n\n" + e + " #" + e.lineNumber);
			 }
   } else {
    replier.reply("");
    return;
    }
		 }
		 if(msg.indexOf("@유저로그 어제") != -1) {
    if(isAdmin(imageDB, 1)) {
			   try {
				   var split = msg.split(" ");
				   if(split[2] == null) {
					   replier.reply("매개변수를 정확히 입력해 주세요.");
				   } else {
					    var txt = readFile(logPath + "/" + room + "/" + getTimes("yesterday2") + ".txt");
					    if(txt == undefined) {
            return "해당 방의 어제 채팅 기록이 없습니다.";
         }
					    var result = [];
						var name = [];
					    for(var i = 0; i < txt.length; i++) {
					    	if(java.lang.String(txt[i]).split(">")[0].indexOf(msg.replace("@유저로그 어제 ", "")) != -1) {
					    		if(txt[i] != undefined) {
          result.push(txt[i].replace("\u202e", "\u202d"));
         }
								var temp = java.lang.String(txt[i]).split(">")[0].split("<")[1];
									if(name.indexOf(temp) == -1) {
        name.push(temp);
        }
					    	}
					    }  
					    
					   if(result.length != 0) {
					    	replier.reply("◀" + name.join(", ").replace("\u202e", "") + "의 어제자 총 채팅(" + result.length + "회" + ")▶" + compress + "\n\n" + result.join("\n"));
					    } else {
					    	 replier.reply("해당 유저의 채팅을 찾을 수 없습니다.");
					    }
				   }
			   } catch(e) {
				   replier.reply("◀에러 발생▶\n\n" + e + " #" + e.lineNumber);
			 }
   } else {
    replier.reply("");
    return;
    }
		 }
		if(msg.indexOf("@날짜로그") != -1) {
    if(isAdmin(imageDB, 1)) {
			   try {
				   var split = msg.split(" ");
				   if(split[1] == null || split[2] == null || split[3] == null) {
					   replier.reply("매개변수를 정확히 입력해 주세요.");
				   } else {
					    var txt = readFile(logPath + "/" + split[1] + "/" + split[2] + ".txt");
					    if(txt === undefined || txt.length == 0) {
					    	 replier.reply("해당 날짜의 로그 파일을 찾을 수 없습니다.");
					    	 return;
					    }
					    
					    var result = [];
						var name = [];
					    for(var i = 0; i < txt.length; i++) {
					    	if(java.lang.String(txt[i]).split(">")[0].indexOf(split[3]) != -1) {
          if(txt[i] != undefined) {
					    		 result.push(txt[i].replace("\u202e", "\u202d"));
          }
								var temp = java.lang.String(txt[i]).split(">")[0].split("<")[1];
									if(name.indexOf(temp) == -1) {
          name.push(temp);
        }
					    	}
					    }  
					    
					   if(result.length != 0) {
					    	replier.reply("◀" + name.join(", ").replace("\u202e", "") + "의 '" + split[2] + "'일자 총 채팅(" + result.length + "회" + ")▶" + compress + "\n\n" + result.join("\n"));
					    } else {
					    	 replier.reply("해당 날짜와 유저의 채팅을 찾을 수 없습니다.");
					    }
				   }
			   } catch(e) {
				   replier.reply("◀에러 발생▶\n\n" + e + " #" + e.lineNumber);
			 }
   } else {
    replier.reply("");
    return;
    }
		 }
		 if(msg.indexOf("@eval") != -1 && msg.startsWith("@")) {
   if(denyRooms.indexOf(room) == -1) {
				   var split = msg.split(" ");
				   if(split[1] == null) {
					   replier.reply("코드를 정확히 입력해 주세요.");
				   } else if(split[1] != null){
				   	var code = msg.replace("@eval ", "").replace("\n", "");
				   	 if(code.search(/.*eval.*/g) !== -1 || code.search(/.*while.*/g) !== -1 || (code.search(/.*f.*/g) !== -1 && code.search(/.*or.*/g) !== -1) || code.search(/[\n\r]/g) !== -1 || code.search(/.*\\x.*/g) !== -1 || code.search(/.*eval.*/g) !== -1 || code.search(/.*decode.*/g) !== -1 || code.search(/.*CharCode.*/g) !== -1 || code.indexOf("[]") != -1) {
						replier.reply("금지된 코드가 포함되어 있습니다.");
						return;
				   	} else {
				   		
						var cx = org.mozilla.javascript.Context.enter();
						var scope = cx.initSafeStandardObjects(); 
						cx.setInstructionObserverThreshold(3000);
//cx.setMaximumInterpreterStackDepth(1000);
cx.setOptimizationLevel(-1);
				   		var result;
				   		var stop = false;
      var start = java.lang.System.currentTimeMillis();
						var thread =		new java.lang.Thread({
				   			run: function() {
				   				try {
				   			 result = null;
				   				while(result == null) {
									
									result = cx.evaluateString(scope, code, "<cmd>",1, null);
				   					
				   					if(result != undefined) {
				   						  break;
				   					}
				   				 if(((java.lang.System.currentTimeMillis() - start) / 1000) >= 5) {
				   				 	java.lang.Thread.currentThread().interrupt();
									Api.reload("DvelBot.js");
				   				 	replier.reply("무한 루프 혹은 무한 스레드가 감지되어 해당 루프/스레드를 강제 종료합니다.");
				   				 	break;
									return;
				   				 	}
				   				 }
				   				 var end = java.lang.System.currentTimeMillis();
				   		
				   		if(String(result).search(/.*response.*/g) !== -1 || String(result).search(/.*isAdmin.*/g) !== -1 || result == undefined) {
				   			 replier.reply("위험이 감지되어 봇을 자동 리로드 합니다.");
				   			 Api.reload("DvelBot.js");
				   		} else {
					   replier.reply("◀eval 출력 결과(" + ((end - start) / 1000) + "초)▶\n\n" + result);
					   }
					   } catch(e) {
				   replier.reply("◀에러 발생▶\n\n" + e + " #" + e.lineNumber);
					}
				}
				   		}).start();
					   }
				   }
    } else {
      replier.reply("");
      return;
    }
   }
   if(msg.indexOf("@evad") != -1) {
   if(denyRooms.indexOf(room) == -1 && isAdmin(imageDB, 2)) {
				   var split = msg.split(" ");
				   if(split[1] == null) {
					   replier.reply("코드를 정확히 입력해 주세요.");
				   } else if(split[1] != null) {
				   	try {
				   	var code = msg.replace("@evad ", "").replace("\n", "");
				   	if(code.includes("File") || code.includes("replier") || code.includes("reply") || code.includes("delete") || code.includes("cmdLimit") || code.includes("bannedCmds") || code.includes("[]") || code.includes("response")) {
				   		 if(!isAdmin(imageDB, 3)) {
				   		 	 replier.reply("해당 코드는 개발자만 사용이 가능합니다.");
				   		 	 return;
				   		 }
				   	}
				   	var start = java.lang.System.currentTimeMillis();
				   	var result = eval(code);
				   	var end = java.lang.System.currentTimeMillis();
				   	replier.reply("◀관리자 eval 출력 결과(" + ((end - start) / 1000) + "초)▶\n\n" + result);
				   	 } catch(e) {
				   	 	replier.reply("◀에러 발생▶\n\n" + e + " #" + e.lineNumber);
				   	 }
				   	}
				   }
				  }
   if(msg.split(" ")[0].toLowerCase() == "@py") {
   	if(msg.split(" ")[1] == null) {
   		 replier.reply("코드를 정확히 입력해 주세요.");
   	} else {
   try {
var res = JSON.parse(org.jsoup.Jsoup.connect("https://rextester.com/rundotnet/api").data("LanguageChoice","24").data("Program",msg.substr(4)).ignoreContentType(true).post().text());
if(res.Errors == null){
replier.reply("◀파이썬 실행결과▶\n\n" + res.Result + "\n----------\n"+res.Stats);
} else {
replier.reply("◀에러 발생▶\n" + res.Warnings + "\n오류: " + res.Errors);
}
} catch(e) {
	  if(String(e).indexOf("SocketTimeout") != -1) {
	  	  replier.reply("타임아웃이 발생하였습니다.");
	  }
}
}
}
if(msg.split(" ")[0].toLowerCase() == "@php") {
	if(msg.split(" ")[1] == null) {
   		 replier.reply("코드를 정확히 입력해 주세요.");
   	} else {
   try {
var res = JSON.parse(org.jsoup.Jsoup.connect("https://rextester.com/rundotnet/api").data("LanguageChoice","8").data("Program",msg.substr(5)).ignoreContentType(true).post().text());
if(res.Errors == null){
replier.reply("◀PHP 실행결과▶\n\n" + res.Result + "\n----------\n"+res.Stats);
} else {
replier.reply("◀에러 발생▶\n" + res.Warnings + "\n오류: " + res.Errors);
}
} catch(e) {
	  if(String(e).indexOf("SocketTimeout") != -1) {
	  	  replier.reply("타임아웃이 발생하였습니다.");
	  }
}
}
}
if(msg.split(" ")[0] == "@자바") {
	if(msg.split(" ")[1] == null) {
   		 replier.reply("코드를 정확히 입력해 주세요.");
   	} else {
   try {
var res = JSON.parse(org.jsoup.Jsoup.connect("https://rextester.com/rundotnet/api").data("LanguageChoice","4").data("Program",msg.substr(4)).data("CompilerArgs","javac /Rextester.java").ignoreContentType(true).post().text());
if(res.Errors == null){
replier.reply("◀자바 실행결과▶\n\n" + res.Result + "\n----------\n"+res.Stats);
} else {
replier.reply("◀에러 발생▶\n" + res.Warnings + "\n오류: " + res.Errors);
}
} catch(e) {
	  if(String(e).indexOf("SocketTimeout") != -1) {
	  	  replier.reply("타임아웃이 발생하였습니다.");
	  }
}
}
}
if(msg.split(" ")[0].toLowerCase() == "@node") {
   	if(msg.split(" ")[1] == null) {
   		 replier.reply("코드를 정확히 입력해 주세요.");
   	} else {
   		try {
var res = JSON.parse(org.jsoup.Jsoup.connect("https://rextester.com/rundotnet/api").data("LanguageChoice","23").data("Program",msg.substr(6)).ignoreContentType(true).post().text());
if(res.Errors == null){
replier.reply("◀Node.js 실행결과▶\n\n" + res.Result + "\n----------\n"+res.Stats);
} else {
replier.reply("◀에러 발생▶\n" + res.Warnings + "\n오류: " + res.Errors);
}
} catch(e) {
	  if(String(e).indexOf("SocketTimeout") != -1) {
	  	  replier.reply("타임아웃이 발생하였습니다.");
	  }
}
}
}
if(msg.split(" ")[0].toLowerCase() == "@cpp") {
   	if(msg.split(" ")[1] == null) {
   		 replier.reply("코드를 정확히 입력해 주세요.");
   	} else {
   		try {
var res = JSON.parse(org.jsoup.Jsoup.connect("https://rextester.com/rundotnet/api").data("LanguageChoice","7").data("Program",msg.substr(5)).data("CompilerArgs","-o a.out source_file.cpp").ignoreContentType(true).post().text());
if(res.Errors == null){
replier.reply("◀C++ 실행결과▶\n\n" + res.Result + "\n----------\n"+res.Stats);
} else {
replier.reply("◀에러 발생▶\n" + res.Warnings + "\n오류: " + res.Errors);
}
} catch(e) {
	  if(String(e).indexOf("SocketTimeout") != -1) {
	  	  replier.reply("타임아웃이 발생하였습니다.");
	  }
}
}
}
		 if(msg == "@봇리로드") {
   //Log.d(new java.lang.String(imageDB.getProfileImage()).hashCode());
   if(isAdmin(imageDB, 2)) {
     java.lang.Thread.currentThread().interrupt();
			   Api.reload();
			   replier.reply("관리자에 의해 디벨봇이 리로드 되었습니다.");
   } else {
     replier.reply("");
    return;
    }
		 }
   if(msg == "@읽음") {
   if(isAdmin(imageDB, 3)) {
			   replier.reply(setAllRead());
   } else {
     replier.reply("");
    return;
    }
		 }
		 if(msg == "@관리자신청") {
			 if(denyRooms.indexOf(room) != -1) {
				 replier.reply("");
				 return;
			 }
   if(tempAdmin != "") {
     replier.reply("이미 관리자 신청자가 있습니다.");
   } else if(tempAdmin == "" && isAdmin(imageDB, null)) {
      replier.reply(sender + "님은 이미 관리자 입니다.");
   } else {
   		tempAdmin = sender + "HASH" + java.lang.String(imageDB.getProfileImage()).hashCode();
			  replier.reply(sender + "님이 관리자 신청을 하셨습니다.");
   }
		 }
		 if(msg == "@관리자수락") {
			 if(isAdmin(imageDB, 2)) {
      var idx = members.findIndex(e => e.hash == tempAdmin.split("HASH")[1]);
      if(idx != -1) {
				  admin.push({name: tempAdmin.split("HASH")[0], hash: tempAdmin.split("HASH")[1], level: 0, id: members[idx].id});
				 FileStream.write(roomPath + "/admin.txt", JSON.stringify(admin));
				 replier.reply(tempAdmin.split("HASH")[0] + "(" + tempAdmin.split("HASH")[1] + ")" + " 님이 관리자가 되셨습니다.");
				 tempAdmin = "";
				 Api.reload("DvelBot.js");
     }
			 } else {
				 replier.reply("");
				 return;
			 }
		 }
		 if(msg == "@관리자거절") {
			 if(isAdmin(imageDB, 2)) {
    if(tempAdmin.length != 0) {
				 replier.reply(tempAdmin.split("HASH")[0] + "님의 관리자 신청이 거절되었습니다.");
				 tempAdmin = "";
    }
			 } else {
				 replier.reply("");
				 return;
			 }
		 }
		 if(msg.indexOf("@관리자등급") != -1) {
 		 if(!isAdmin(imageDB, 3)) {
 		  	replier.reply("");
 		  	return;
 		 }
			 var split = msg.replace("@관리자등급 ", "").split(' ');
			 if(split[0] != null && split[1] != null) {
				 if(Number(split[1]) <= 3) {
					 if(admin.findIndex(i => i.name == split[0]) == -1 && admin.findIndex(i => i.hash == split[0]) == -1) {
						   replier.reply("해당 관리자를 찾을 수 없습니다.");
					 } else {
						 if(!isNaN(split[1])) {
       var idx = admin.findIndex(i => i.name == split[0]);
       if(idx == -1) {
        idx = admin.findIndex(i => i.hash == split[0]);
       }
       if(idx == -1) { replier.reply("오류가 발생하였습니다."); }
							admin[idx].level = Number(split[1]);
							FileStream.write(roomPath + "/admin.txt", JSON.stringify(admin));
							replier.reply(admin[idx].name + "님의 관리자 등급이 " + adminLevel[split[1]].name + "으로 변경되었습니다.");
							Api.reload("DvelBot.js");
						 } else {
							 replier.reply("등급 코드를 정확히 입력해 주세요.");
						 }
					 }
				 } else {
					 replier.reply("관리자 등급은 최대 3 입니다.");
				 }
			 } else if(split[1] == null) {
				 replier.reply("◀관리자 등급 설정 사용법▶\n@관리자등급 [닉네임] [등급]");
		    }
			cmds++;
				   AppData.putInt("totalUses", cmds);
        }
		 if(msg == "@관리자신청자") {
			 if(isAdmin(imageDB, 1)) {
    if(tempAdmin != "") {
				 replier.reply("최근 관리자 신청자 : \n" + tempAdmin.split("HASH")[0] + "(" + tempAdmin.split("HASH")[1] + ")");
    } else {
     replier.reply("최근 관리자 신청자가 없습니다.");
    }
			 } else {
				 replier.reply("");
				 return;
			 }
		 }
		 if(msg == "@관리자목록") {
			 if(isAdmin(imageDB, null)) {
				 replier.reply(getAdmin());
			 } else {
				 replier.reply("");
				 return;
			 }
		 }
		 if(msg.indexOf("@관리자삭제") != -1) {
   if(denyRooms.indexOf(room) != -1) {
 		 if(!isAdmin(imageDB, null)) {
 		  	replier.reply("");
 		  	return;
 		 }
 	}
   if(isAdmin(imageDB, 3)) {
			 var split = msg.split(' ');
			 if(split[1] != null) {
			 	var idx = admin.findIndex(i => i.name == split[1]);
     if(idx == -1) {
      idx = admin.findIndex(i => i.hash == split[1]);
     }
				  if(idx != -1) {
				  	admin.splice(idx, 1);
				  	FileStream.write(roomPath + "/admin.txt", JSON.stringify(admin));
				  	replier.reply("해당 관리자가 삭제되었습니다.");
				  	Api.reload("DvelBot.js");
				  } else {
				  	replier.reply("해당 관리자를 찾을 수 없습니다.");
				  }
			 } else if(split[1] == null) {
				 replier.reply("◀관리자 삭제 명령어 사용법▶\n@관리자삭제 [닉네임]");
		    }
    } else {
      replier.reply("");
    }
        }
		if(msg.split(" ")[0] == "@도움말") {
			if((denyRooms.indexOf(room) != -1 && isAdmin(imageDB)) || (denyRooms.indexOf(room) == -1)) {
				var cmd = msg.replace("@도움말 ", "");
				if(msg.split(" ")[1] != null) {
					var idx = cmdHelps.findIndex((item, idx) => {
					 if(item.name.includes("|")) {
						 return item.name.split("|").indexOf(msg.split(" ")[1]) != -1;
					 } else {
						 return item.name === msg.split(" ")[1];
					 }
					});
					if(idx != -1) {
						replier.reply(cmdHelps[idx].value);
					} else {
						replier.reply("해당 명령어를 찾을 수 없습니다.");
					}
				} else {
					replier.reply("◀도움말 명령어 사용법▶\n\n@도움말 [명령어]");
				}
			} else {
				replier.reply("");
				return;
			}
		}
     }
     if(msg.startsWith("@멤버검색")) {
    if(isAdmin(imageDB, 1)) {
				   var split = msg.replace("@멤버검색 ", "");
				   if(split.length <= 0) {
					   replier.reply("정확히 입력해 주세요.");
				   } else {
         if(split.split(" ").length >= 2) {
           replier.reply(searchMembers(split.split(" ")[0], split.split(" ")[1]));
         } else {
					   replier.reply(searchMembers(split, room));
        }
				   }
   } else {
   replier.reply("");
    return;
    }
		 }
   if(msg.startsWith("@2멤버검색")) {
    if(isAdmin(imageDB, 1)) {
				   var split = msg.replace("@2멤버검색 ", "");
				   if(split.length <= 0) {
					   replier.reply("정확히 입력해 주세요.");
				   } else {
         if(split.split(" ").length >= 2) {
           replier.reply(searchMembers2(split.split(" ")[0], split.split(" ")[1]));
         } else {
					   replier.reply(searchMembers2(split, room));
        }
				   }
   } else {
   replier.reply("");
    return;
    }
		 }
		 if(msg.startsWith("@멤버목록")) {
    if(isAdmin(imageDB, 1)) {
				   var split = msg.replace("@멤버목록 ", "");
				   if(!split.equals("")) {
					   replier.reply(getAllMembers(split));
				   } else {
					   replier.reply(getAllMembers(room));
				   }
   } else {
   replier.reply("");
    return;
    }
		 }
   if(msg.startsWith("@2멤버목록")) {
    if(isAdmin(imageDB, 1)) {
				   var split = msg.replace("@2멤버목록 ", "");
				   if(!split.equals("")) {
					   replier.reply(getAllMembers2(split));
				   } else {
					   replier.reply(getAllMembers2(room));
				   }
   } else {
   replier.reply("");
    return;
    }
		 }
		 if(msg.indexOf("@명령어밴") != -1) {
    if(isAdmin(imageDB, 3)) {
				   var split = msg.replace("@명령어밴 ", "");
				   if(split.length == 0 || split.indexOf(" ") != -1) {
					   replier.reply("정확히 입력해 주세요.");
				   } else if(bannedCmds.indexOf(split) != -1) {
				   	replier.reply("이미 사용 중지된 명령어 입니다.");
				   } else {
				   	bannedCmds.push(split);
				   	FileStream.write(roomPath + "/bannedCmds.txt", JSON.stringify(bannedCmds));
				   	replier.reply("해당 명령어가 사용 중지 되었습니다.");
				   	Api.reload("DvelBot.js");
				   }
   } else {
   replier.reply("");
    return;
    }
		 }
		 if(msg.indexOf("@명령어언밴") != -1) {
    if(isAdmin(imageDB, 3)) {
				   var split = msg.replace("@명령어언밴 ", "");
				   if(split.length == 0 || split.indexOf(" ") != -1) {
					   replier.reply("정확히 입력해 주세요.");
				   } else if(bannedCmds.indexOf(split) == -1) {
				   	replier.reply("해당 명령어를 찾을 수 없습니다.");
				   } else {
				   	bannedCmds.splice(bannedCmds.indexOf(split), 1);
				   	FileStream.write(roomPath + "/bannedCmds.txt", JSON.stringify(bannedCmds));
				   	replier.reply("해당 명령어가 다시 사용 가능합니다.");
				   	Api.reload("DvelBot.js");
				   }
   } else {
   replier.reply("");
    return;
    }
		 }
     if(msg.indexOf("@도배제한") != -1) {
    if(isAdmin(imageDB, 3)) {
				   var split = msg.split(" ");
				   if(split[1] == null || isNaN(split[1])) {
					   replier.reply("숫자를 입력해 주세요.");
				   } else {
				   	cmdLimit = Number(split[1]);
				   	AppData.putInt("commandLimits", cmdLimit);
				   	replier.reply("명령어 도배 제한이 " + split[1] + "회로 변경 되었습니다.");
				   }
   } else {
   replier.reply("");
    return;
    }
		 }
 }
  if(msg.indexOf("@방추가") != -1) {
    if(isAdmin(imageDB, 2)) {
				   var split = msg.split(" ");
				   if(split[1] == null) {
					   replier.reply("방 이름을 입력해 주세요.");
				   } else {
				   	if(rooms.indexOf(msg.replace("@방추가 ", "")) == -1) {
				   		rooms.push(msg.replace("@방추가 ", ""));
				   		FileStream.write(roomPath + "/rooms.txt", JSON.stringify(rooms));
				   		Api.reload();
				   		replier.reply("봇 사용 방 목록에서 해당 방이 추가되었습니다.");
				   		} else {
				   			 replier.reply("이미 추가 된 방 입니다.");
				   		}
				   }
   } else {
   replier.reply("");
   return;
    }
	}
		 if(msg.indexOf("@방삭제") != -1) {
    if(isAdmin(imageDB, 2)) {
				   var split = msg.split(" ");
				   if(split[1] == null) {
					   replier.reply("방 이름을 입력해 주세요.");
				   } else {
				   	if(rooms.indexOf(msg.replace("@방삭제 ", "")) != -1) {
				   		rooms.splice(rooms.indexOf(msg.replace("@방삭제 ", "")), 1);
				   		FileStream.write(roomPath + "/rooms.txt", JSON.stringify(rooms));
				   		Api.reload();
				   		replier.reply("봇 사용 방 목록에서 해당 방이 제외되었습니다.");
				   	} else {
					   replier.reply("해당 방을 찾을 수 없습니다.");
					   }
				   }
   } else {
    replier.reply("");
	return;
    }
	}
}

function setAllRead() {
  var count = 0;
  for(var i = 0; i < rooms.length; i++) {
     var c = Api.markAsRead(rooms[i]);
     if(c) count++;
  }
  return "전체 방 읽음처리 완료(" + rooms.length + "개 중 " + count + "개)";
}

function isAdmin(imageDB, level) {
  var profile = imageDB;
  if(isNaN(imageDB)) {
    profile = imageDB.getProfileHash();
  }
  var ind = -1;
  var idx = -1;
	if(profile.length != 0) {
	for(var i in admin) {
		if(admin[i].hash == profile) {
    ind = i;
    }
  }
  //idx = members.findIndex(e => e.hash == admin[ind].hash);
			if(level != null && admin[ind] != undefined) {
				if(Number(admin[ind].level) >= Number(level)) {
					return true;
				} else {
					return false;
				}
			} else if(level == null && admin[ind] != undefined) {
				return true;
   } else {
     return false;
   }
	return true;
 }
}
var tts = new android.speech.tts.TextToSpeech(Api.getContext(), null);
function ttsTest(msg, pitch, rate) {
	if(pitch != null && !isNaN(pitch)) tts.setPitch(pitch);
	if(rate != null && !isNaN(rate)) tts.setSpeechRate(rate);
tts.speak(msg, tts.QUEUE_ADD, null);
}

var adminLevel = [{level: 0, name: "🥉3급"}, {level: 1, name: "🥈2급"}, {level: 2, name: "🥇1급"}, {level: 3, name: "🎖개발자"}];

/*지진, 화산 알림(기상청 사이트)
Copyright 2021, Indvel All rights reserved.*/
function getEarthquakes(isCmd) {
	var doc = org.jsoup.Jsoup.connect("https://www.weather.go.kr/weather/earthquake_volcano/domesticlist.jsp").get();
 var td = doc.select("table.table_develop > tbody > tr").first().select("td");
 var result = [];
 for(var i = 0; i < td.size(); i++) {
 	result.push(String(td.get(i).text()));
 }
 var content = "발생시각 : " + result[1] + "\n" + "규모 : " + result[2] + "\n" + "깊이 : " + result[3] + "\n" + "최대진도 : " + result[4] + "\n" + "위치 : " + result[7] + "\n\n" + "map.naver.com/?lat=" + result[5].replace(/[A-z]/g, "").trim() + "&lng=" + result[6].replace(/[A-z]/g, "").trim();
	//var pic = doc.select("div.css-1dbjc4n.r-18u37iz.r-thb0q2 img").attr("src");
	
	if(content != earthquake) {	
		earthquake = content;
		AppData.putString("earthquake", earthquake);
		totalEq++;
		AppData.putInt("totalEarthquake", totalEq);
 //Log.d("New Earthquake");
result = "◀디벨봇 지진/화산 알림▶\n\n" + earthquake;

		if(isCmd) {
			return result;
		} else {
    for(var i = 0; i < earthquakeRooms.length; i++) {
        Api.replyRoom(earthquakeRooms[i], result, true);
    }
    ttsTest("지진이 발생하였습니다.", null, null);
  }
	} else if(content == earthquake) {
		if(isCmd) {
			result = "◀디벨봇 최근 지진/화산 정보▶\n\n" + earthquake;
			return result;
		}
	}
}

/*신종 코로나바이러스(COVID-19) 확진자 감지
Copyright 2020, Indvel All rights reserved.*/
function getCoronaInfo(isCmd) {
	try {
	var doc = org.jsoup.Jsoup.connect("https://coronamap.site").timeout(2000).get();
 var content = doc.select("div.content");
 var item = doc.select("div.item-go");
 var clear = doc.select("div.content1.clear");
 var 
	result = "확진자 : " + content.get(0).text() + "명\n(" + clear.text() + ")\n의심환자 : 총 " + content.get(1).text() + "명\n(" + item.select("div.content1").get(1).text() + ", " + item.select("div.content1").get(0).text() + ")";
	var url = "coronamap.site";
	
	if(!result.equals(coronaInfo)) {	
		coronaInfo = result;
		AppData.putString("coronaInfo", coronaInfo);
 Log.d("코로나 확진자 추가");
		if(isCmd) {
			return "◀코로나19 변동 알림▶\n\n" + result + "\n\n" + doc.select("div.hohow > div").get(0).text().split(":")[1].replace( "출처", "").trim() + "\n\n" + url;
		} else {
			if(!democracy) {
			 for(var i of rooms) {
			 	 if(Api.canReply(i)) {
			 	 	 Api.replyRoom(i, "◀코로나19 변동 알림▶\n\n" + result + "\n\n" + doc.select("div.hohow > div").get(0).text().split(":")[1].replace( "출처", "").trim() + "\n\n" + url, false);
			 	 }
			 	}
			 }
		}
	} else if(result.equals(coronaInfo)) {
		if(isCmd) {
			return "◀코로나19 정보▶\n\n" +  result + "\n\n" + doc.select("div.hohow > div").get(0).text().split(":")[1].replace( "출처", "").trim() + "\n\n" + url;
		}
	}
	} catch(e) {
		 Log.e(e + " #" + e.lineNumber);
	}
}

function getCovidImg() {
  const mk = 'YF7eLDCVKMlEPIOc16cNTgAAAIQ';
  const parse = org.jsoup.Jsoup.connect('https://m.search.daum.net/qsearch2?mk=' + mk + '&uk=' + mk + '&q=%EC%BD%94%EB%A1%9C%EB%82%9819&DA=VGQ&cfg=1&dataType=json&qsearch=true&m=VGQ&cuid=59f0bd295c5977d09ba926d9bea3ed57deecbc25&query=%EB%B0%9C%EC%83%9D%ED%98%84%ED%99%A9+%EC%95%88%EB%82%B4&sessionId=3af7ebb8d60c88ad72583fa5e81d40581b76f6cf%5E1616829996076&trackerId=1616829996076&blockId=5G33E33GD617GC0001306391&botType=covid').ignoreContentType(true).get().text();
  const json = JSON.parse(parse);
  return json.chatbot.messages[0].image.url;
  }
  
 function searchAddress(str) {
  var check = checkSearchedWord(str);
    if(check != "pass") {
      return check;
    } else {
     var result = org.jsoup.Jsoup.connect("https://www.juso.go.kr/addrlink/addrLinkApiJsonp.do").data({"confmKey":  "devU01TX0FVVEgyMDIxMDUwMTE3NDkyNDExMTExNzA=", "currentPage": "1", "countPerPage": "30", "keyword": str, "resultType":  "json"}).ignoreContentType(true).get().text();
     result = JSON.parse(result.substring(1).substring(0, result.lastIndexOf(")") - 1));
     
     if(result["results"].common.errorMessage != "정상") {
       return result["results"].common.errorMessage;
     }
     
     var juso = result["results"]["juso"];
     var rep = [];
     for(var i = 0; i < juso.length; i++) {
       rep.push(juso[i].roadAddr);
     }
     if(rep.length > 10) {
  return "◀주소 검색 결과▶" + compress + "\n\n" + rep.join("\n");
} else {
  return "◀주소 검색 결과(" + rep.length + "개)▶\n\n" + rep.join("\n");
}
    }
  }
  
  //특수문자, 특정문자열(sql예약어의 앞뒤공백포함) 체크
  function checkSearchedWord(obj){ 	if(obj.length > 0) { //특수문자 제거
    var expText = /[%=><]/ ; 		if(expText.test(obj) == true) {
      return "특수문자를 입력할 수 없습니다.";
    }
    //특정문자열(sql예약어의 앞뒤공백포함) 체크
    var sqlArray = new Array("OR", "SELECT", "INSERT", "DELETE", "UPDATE", "CREATE", "DROP", "EXEC", "UNION", "FETCH", "DECLARE", "TRUNCATE");
    var regex;
    for(var i = 0; i < sqlArray.length; i++) {
      regex = new RegExp(sqlArray[i], "gi") ;
      if(regex.test(obj)) {
        return sqlArray[i] + "와(과) 같은 특정문자로 검색할 수 없습니다.";
        }
      }
    }
    return "pass";
  }

/*대괄호 제거*/
function remove(str) {
return str.replace(/[\[\]]/gi, "");
}

/*RLO 제거*/
function removeRLO(str) {
	return str.replace(/.*‮.*/g, "");
}

/*현재 위치 가져오기
Copyright 2019, Indvel All rights reserved.*/
function getLocation() {
	var locationManager = Api.getContext().getSystemService(android.content.Context.LOCATION_SERVICE);
	//locationManager.requestLocationUpdates(android.location.LocationManager.NETWORK_PROVIDER, 1000*60*1, 10, new android.location.LocationListener);
	
	 if (locationManager != null) {

       var location = locationManager.getLastKnownLocation(android.location.LocationManager.NETWORK_PROVIDER);

        if (location != null) {
          var lat = location.getLatitude();
          var lon = location.getLongitude();

          return "위도 : " + lat + "\n경도 : " + lon;

        }

     }
}

/*학교 검색(초~고)
*Code provided by doami2005
*Code modified by Indvel
*/
function searchSchools(str) {
  if(str.length == 0 || str == undefined) {
    return "학교 이름을 정확히 입력해 주세요.";
  }
 var json = JSON.parse(org.jsoup.Jsoup.connect("http://hcs.eduro.go.kr/v2/searchSchool?orgName=" + str).ignoreContentType(true).get().text()).schulList;

var result = [];
var srh = json.filter(e => e.kraOrgNm.includes(str));
for(var i  = 0; i < srh.length; i++) {
  result.push("[" + srh[i].orgCode + "] " + srh[i].kraOrgNm + "(" + srh[i].addres.split(" ")[0].split(")")[1] + " " + srh[i].addres.split(" ")[1] + ")");
}
if(result.length > 10) {
  return "◀학교 검색 결과(" + result.length + "개)▶" + compress + "\n\n" + result.join("\n");
} else if(result.length == 0) {
  return "해당 학교를 찾을 수 없습니다.";
} else {
  return "◀학교 검색 결과(" + result.length + "개)▶\n\n" + result.join("\n");
}
}


const gloveRp = [0,70,150,240,340,465,615,790,990,1215,1490,1815,2190,2615,3090,3640,4265,4965,5740,6590,7540,8590,9740,10990,12340,13815,15415,17140,18990,20965,23115,25440,27940,30615,33465,36540,39840,43365,47115,51090,55340,59865,64665,69740,75090,80765,86765,93090,99740,106715,114065,121790,129890,138365,147215,156490,166190,176315,186865,197840,210340,222840,235340,247840,260340,273340,286340,299340,312340,325340,338840,352340,365840,379340,392840,406840,420840,434840,448840,462840,477340,491840,506340,520840,535340,550340,565340,580340,595340,610340,650340,695340,745340,800340,860340,925340,1000340,1085340,1180340,1285340,1400340,1525340,1665340,1820340,1990340,2175340,2375340,2590340];

/*카트라이더 차고 정보 가져오기 v2(kart.nexon.com/Garage)
Copyright 2019-2020, Indvel All rights reserved.*/
function getKartGarage(nick) {
	try {
		var err = "";
		var url =  "http://kart.nexon.com/Garage/Main?strRiderID=" + java.net.URLEncoder.encode(nick, "UTF-8");
		var itemUrl = "http://kart.nexon.com/Garage/Item?strRiderID=" + java.net.URLEncoder.encode(nick, "UTF-8");
		var recordUrl = "http://kart.nexon.com/Garage/Record?strRiderID=" + java.net.URLEncoder.encode(nick, "UTF-8");
		var conn = new java.net.URL(url).openConnection();
		conn.setRequestMethod("GET");
		conn.setDoOutput(true);
		conn.setDoInput(true);
		conn.setUseCaches(false);
		conn.setDefaultUseCaches(false);
				
		var is = conn.getInputStream();
		var builder = new java.lang.StringBuilder();
		var reader = new java.io.BufferedReader(new java.io.InputStreamReader(is, "UTF-8"));
		var line = "";
		while((line = reader.readLine()) != null) {
			builder.append(line + "\n");
		}
		if(builder.toString().includes("alert")) {
			err = builder.substring(builder.indexOf("('") + 2, builder.indexOf("');"));
		}
		
		var doc = org.jsoup.Jsoup.connect(url).get();
		var object = {};
		object['riderName'] = doc.select("span#RiderName").text();
		object['gloveImage'] = doc.select("div#GloveImg > img").attr("src");
		object['level'] = String(Number(object['gloveImage'].replace("https://ssl.nx.com/s2/game/kart/kart/hands/hand_", "").replace("_23.gif", "")) - 5);
		var rpr = doc.select("div#RiderInfo > dl.rp > dd > span").attr("class");
		if(rpr.length != 0) {
			object['level'] = doc.select("div#RiderInfo > dl.rp > dd > span").get(0).text();
		}
		object['rp'] = doc.select("div#RecordRp > span.RecordData2").text().replace("점", "");
		object['club'] = doc.select("span#GuildName").text();
		if(object['club'].includes("없습니다")) {
			object['club'] = "가입 클럽 없음";
		} else if(object['club'].includes("대기중입니다")) {
			object['club'] = "가입 대기중";
		}
		if(!object['level'].includes("급")) {
			var per = 0;
			var next = "";
			
			if(Number(object['level']) == 108) {
				per = 100;
				next = "-";
			} else {
				per = ((Number(object['rp']) - gloveRp[Number(object['level'] - 1)]) /
						(Number(gloveRp[Number(object['level'])] - Number(gloveRp[Number(object['level']) - 1])))) * 100.0;
				next = gloveRp[Number(object['level'])];
			}
			if(per > 100 || per < 0 || Number(object['rp']) == 0) {
				object['rpPer'] = object['rp'] + " / " + next + " (갱신중)";
			} else {
				object['rpPer'] = object['rp'] + " / " + next + " (" + Math.floor(per) + "%)";
			}
		}
		object['emblem'] = doc.select("dl.EmblemNum > dd").html().split("<b>")[1].split("<")[0];
		
		doc = org.jsoup.Jsoup.connect(itemUrl).get();
		var itemPrivate = doc.select("div.ItemClosed");
		if(itemPrivate.text().length != 0) {
			object['items'] = "아이템 비공개";
		} else {
			var arr = [];
			var count = doc.select("div#CntItemDet > dl > dd");
			for(var i = 0; i < count.size(); i++) {
				arr.push(count.get(i).text());
			}
			object['items'] = {character: arr[0], kart: arr[1], equip: arr[2], deco: arr[3], etc: arr[4]};
		}
		doc = org.jsoup.Jsoup.connect(recordUrl).get();
		var arr = [];
		var rec = doc.select("dl.CntRecord21 > dd");
		for(var j = 0; j < rec.size(); j++) {
			arr.push(rec.get(j).text());
		}
		rec = doc.select("dl.CntRecord22 > dd");
		for(var k = 0; k < rec.size(); k++) {
			arr.push(rec.get(k).text());
		}
		object['records'] = {startDate: arr[0], driveTime: arr[1], exeCount: arr[2], lastDate: arr[3], record: arr[4]};
		
		var result = "◀" + object['riderName'] + "님의 차고▶\n\n";
                if (object['level'].includes("급")) {
                    result += "랭킹 RP : " + object['level'] + "\n";
					result += "RP : " + object['rp'] + "\n";
                } else {
                    result += "Lv." + object['level'] + "\n";
					result += "RP : " + object['rpPer'] + "\n";
                }
                result += "클럽 : " + object['club'] + "\n\n";
				result += "엠블럼 : " + object['emblem'] + "\n";
				if(object['items'] == "아이템 비공개") {
					result += object['items'] + "\n\n";
				} else {
                result += "캐릭터 : " + object['items']['character'] + "\n"
						+ "카트바디 : " + object['items']['kart'] + "\n"
						+ "착용 : " + object['items']['equip'] + "\n"
						+ "치장 : " + object['items']['deco'] + "\n"
						+ "기타 : " + object['items']['etc'] + "\n\n";
				}
                result += "게임 시작일 : " + object['records']['startDate'] + "\n"
						+ "주행 시간 : " + object['records']['driveTime'] + "\n"
						+ "게임 실행 횟수 : " + object['records']['exeCount'] + "\n"
						+ "최근 접속일 : " + object['records']['lastDate'] + "\n"
						+ "총 전적 : " + object['records']['record'] + "\n\n";
                result += "http://kart.nexon.com/Garage/Main?strRiderID=" + nick;
		
		return result;
	} catch(e) {
		if (err.length != 0) {
			Log.e(e + " #" + e.lineNumber);
			return err;
        } else {
			Log.e(e + " #" + e.lineNumber);
			return "에러가 발생하였습니다.";
        }
	}
}

/*카트라이더 차고 정보 카카오링크 Ver.
Copyright 2021, Indvel All rights reserved.*/
function getKartKaling(nick, room) {
  try {
  var url =  "http://kart.nexon.com/Garage/Main?strRiderID=" + java.net.URLEncoder.encode(nick, "UTF-8");
  var doc = org.jsoup.Jsoup.connect(url).get();
  var gloveImg = doc.select("div#GloveImg > img").attr("src");
  if(gloveImg.length == 0) {
    Kakao.send(room, {
                 'link_ver': '4.0',
                 'template_id': 48631,
                 'template_args': {
                   '${error}': "해당 유저를 찾을 수 없습니다.",
                   "${desc}": "닉네임을 디시 한 번 확인해 주세요." }}, 'custom');
                   return null;
  }
  var level = String(Number(gloveImg.replace("https://ssl.nx.com/s2/game/kart/kart/hands/hand_", "").replace("_23.gif", "")) - 5);
  var rpr = doc.select("div#RiderInfo > dl.rp > dd > span").attr("class");
		if(rpr.length != 0) {
			level = doc.select("div#RiderInfo > dl.rp > dd > span").get(0).text();
		}
  lstr = level;
	 var rp = doc.select("div#RecordRp > span.RecordData2").text().replace("점", "");
		var club = doc.select("span#GuildName").text();
		if(club.includes("없습니다")) {
			club = "가입 클럽 없음";
		} else if(club.includes("대기중입니다")) {
			club = "가입 대기중";
		}
  var result = "";
		if(!level.includes("급")) {
			var per = 0;
			var next = "";
			
			if(Number(level) == 108) {
				per = 100;
				next = "-";
			} else {
				per = ((Number(rp) - gloveRp[Number(level) - 1]) /
						(Number(gloveRp[Number(level)] - Number(gloveRp[Number(level) - 1])))) * 100.0;
				next = gloveRp[Number(level)];
			}
			if(per > 100 || per < 0 || Number(rp) == 0) {
				result = rp + " / " + next + " (갱신중)";
			} else {
				result = rp + " / " + next + " (" + Math.floor(per) + "%)";
			}
   lstr = "Lv." + level;
		} else {
    result = rp;
  }
  Kakao.send(room, {
                 'link_ver': '4.0',
                 'template_id': 48620,
                 'template_args': {
                   '${avatar}': doc.select("span#RiderImg > img").attr("src"),
                   '${levelImg}': gloveImg,
                   '${riderName}': lstr + " " + doc.select("span#RiderName").text(),
                   '${id}': doc.select("span#RiderName").text(),
                   '${title}': "RP : " + result,
                   '${desc}': "클럽 : " + club, 
                   '${comment}': doc.select("div#CmntInfoSec > span.Cmnt").text().replace(/[^0-9]/g, ""),
                   '${view}': doc.select("dl#VisitTotal > dd").text() }}, 'custom');
  } catch(e) {
    return "해당 유저를 찾을 수 없거나 오류가 발생하였습니다.\n" + e + " #" + e.lineNumber;
  }
}

/*카트라이더 전적 가져오기(tmi.nexon.com)
Copyright 2019, Indvel All rights reserved.*/
function getKartInfo(nick, type) {
	var ti = (type == "팀") ? 3 : 1;
	var doc = org.jsoup.Jsoup.connect("http://tmi.nexon.com/kart/user?nick=" + nick + "&matchType=" + ti).get();
	Log.i(doc);
}
/*메이플스토리 종합통계 가져오기(maple.gg)
Copyright 2019, Indvel All rights reserved.*/
function getMapleInfo(nick) {
	try {
		var result = "";
		var doc = Utils.getWebText("https://maple.gg/u/"+nick, null, false, false);
		
		if(doc.trim().indexOf("검색결과가 없습니다.") != -1) {
			result = nick + " 유저를 찾을 수 없습니다.";
		} else {
			var name = doc.split("<b class=\"align-middle\"")[1].split("</b>")[0].replace(/<[^>]+>/g, "").replace(/\s/gi, "").split(">")[1];
			var world = doc.split("<img class=\"align-middle\"")[1].split("alt=\"")[1].split("\"")[0];
			var usersum = doc.split("<ul class=\"user-summary-list\">")[1].split("<li class=\"user-summary-item is-share")[0];
			var level = usersum.split("<li class=\"user-summary-item\">")[1].split("</li>")[0].replace(/<[^>]+>/g, "");
			var job = usersum.split("<li class=\"user-summary-item\">")[2].split("</li>")[0].replace(/<[^>]+>/g, "");
			var famous = usersum.split("<li class=\"user-summary-item\">")[3].split("</li>")[0].replace(/<[^>]+>/g, "").replace("인기도", "");
			var useradd = doc.split("<div class=\"row row-normal user-additional\">")[1].split("</section>")[0];
			var guild = "", allrank = "", worldrank = "", jobrankw = "", jobranka = "";
			if(useradd.indexOf("<a href") != -1) {
				guild = useradd.split(">길드</b>")[1].split("class=\"text-yellow text")[1];
				if(guild == undefined) {
					 guild = "없음";
				} else {
					guild = guild.split("</a>")[0].split(">")[1]	;
					}
				allrank = useradd.split("<b>종합랭킹</b>")[1].split("</span>")[0].replace(/<[^>]+>/g, "").replace(/\s/gi, "");
				worldrank = useradd.split("<b>월드랭킹</b>")[1].split("</span>")[0].replace(/<[^>]+>/g, "").replace(/\s/gi, "");
				jobrankw = useradd.split("<b>직업랭킹(월드)</b>")[1].split("</span>")[0].replace(/<[^>]+>/g, "").replace(/\s/gi, "");
				jobranka = useradd.split("<b>직업랭킹(전체)</b>")[1].split("</span>")[0].replace(/<[^>]+>/g, "").replace(/\s/gi, "");
			}
			var dojo = doc.split("<h1 class=\"user-summary-floor font-weight-bold\">")[1];
			if(dojo != undefined) {
				dojo = dojo.split("</h1>")[0] + "(" + doc.split("<small class=\"user-summary-duration\">")[1].split("</small>")[0] + ")";
			} else {
				dojo = "기록 없음";
			}
			
			result = "◀" + name + "님의 메이플▶\n\n월드 : " + world + "\n" + level + " " + job + "\n인기도 : " + famous + "\n길드 : " + guild + "\n무릉 최고기록 : " + dojo + "\n\n전체랭킹 : " + allrank + "\n월드랭킹 : " + worldrank + "\n직업랭킹(월드) : " + jobrankw + "\n직업랭킹(전체) : " + jobranka + "\n\nmaple.gg/u/" + nick;
		}
		return result;
	} catch(e) {
		 Log.e(e + " #" + e.lineNumber);
	}
}

/*로스트아크 전적 가져오기(loahe.com)
Copyright 2019, Indvel All rights reserved.*/
function getLostArkInfo(nick) {
	try {
		var doc = Utils.getWebText("https://loahae.com/profile/" + nick, null, false, false);
		
		if(doc.trim().indexOf("한번도 검색되지 않은 유저입니다.") != -1) {
			return nick + " 유저를 찾을 수 없습니다.";
		}
		var last = doc.split("<p class=\"last-update\">")[1].split("<h2>")[1].split("<span>")[0];
		var profile = doc.split("<div class=\"profile-info\">")[1].split("<div class=\"ranking\">")[0];
		var b = profile.split("<div class=\"b\">")[1].split("</span>")[1].split("</div>")[0];
		var ranking = doc.split("<div class=\"ranking\">")[1].split("<div class=\"ilv-history\">")[0];
		
		var result = [];
		
		result[0] = "서버 : " + profile.split("<div class=\"b\">")[1].split("</span>")[1].split("</div>")[0].replace(/\s/gi, "");
		result[1] = "길드 : " + profile.split("<div class=\"b\">")[2].split("</span>")[1].split("</div>")[0].replace(/\s/gi, "");
		result[2] = "클래스 : " + profile.split("<div class=\"b\">")[3].split("</span>")[1].split("</div>")[0].replace(/\s/gi, "");
		result[3] = "칭호 : " + profile.split("<div class=\"b\">")[4].split("</span>")[1].split("</div>")[0].replace(/\s/gi, "");
		result[4] = "\ni-Lv." + profile.split("<div class=\"b\">")[7].split("<span>")[1].split("</div>")[0].replace(/<[^>]+>/g, "").replace(/\s/gi, "");
		result[5] = "원정대 Lv." + profile.split("<div class=\"b\">")[6].split("<span>")[1].split("</span>")[0].replace(/<[^>]+>/g, "").replace(/\s/gi, "");
		result[6] = "PVP : " + profile.split("<div class=\"b\">")[5].split("<span>")[1].split("</span>")[0].replace(/<[^>]+>/g, "").replace(/\s/gi, "");
		result[7] = "\n통합 순위(모든 서버) : " + ranking.split("<p>")[1].split("</p>")[0].replace(/<[^>]+>/g, "");
		result[8] = "직업 순위(모든 서버) : " + ranking.split("<p>")[2].split("</p>")[0].replace(/<[^>]+>/g, "");
		result[9] = "통합 순위(서버 내) : " + ranking.split("<p>")[3].split("</p>")[0].replace(/<[^>]+>/g, "");
		result[10] = "직업 순위(서버 내) : " + ranking.split("<p>")[4].split("</p>")[0].replace(/<[^>]+>/g, "");
		
		return "◀" + nick + "님의 로스트아크▶\n\n" + result.join("\n") + "\n\nloahae.com/profile/" + nick;
	} catch(e) {
		Log.e(e);
	}
}

/*배틀그라운드 전적 가져오기(dak.gg)
Copyright 2019, Indvel All rights reserved.*/
function getPUBGInfo(nick) {
	try {
		var doc = Utils.getWebText("https://dak.gg/profile/" + nick + "?hl=ko-KR", null, false, false);
		
		if(doc.trim().indexOf("플레이어를 찾을 수 없습니다.") != -1) {
			return nick + "유저를 찾을 수 없습니다.";
		} else {
			
			var solo = doc.split("<section class=\"solo modeItem\">")[1].split("</section>")[0];
			if(solo.split("<h1>")[1].split("</div>")[0].indexOf("grade-info") == -1) {
				solo = null;
			}
			
			var duo = doc.split("<section class=\"duo modeItem\">")[1].split("</section>")[0];
			if(duo.split("<h1>")[1].split("</div>")[0].indexOf("grade-info") == -1) {
				duo = null;
				}
			
			var squad = doc.split("<section class=\"squad modeItem\">")[1].split("</section>")[0];
			if(squad.split("<h1>")[1].split("</div>")[0].indexOf("grade-info") == -1) {
				squad = null;
			}
			
			var result = [];
			var str = "";
			
			result[0] = doc.split("<div class=\"userData\">")[1].split("<p>")[1].split("</p>")[0].replace(/<[^>]+>/g, "").trim().replace(": ", " : ");
			result[1] = "서버 : " + doc.split("<div class=\"regions\">")[1].split("class=\"active\">")[1].split(">")[1].split("</a>")[0].replace(/<[^>]+>/g, "").replace("</a", "").trim() + "\n";
			result[2] = doc.split("<div class=\"seasons\">")[1].split("class=\"active\">")[1].split("<a href")[1].split(">")[1].split("<")[0].trim() + "\n";
			
			if(solo != null) {
			str += "솔로 : " + solo.split("<h1>")[1].split("<em>")[1].split("</em>")[0] + "\n=> " + doc.split("<p class=\"grade-name\" style=\"font-size:11px;\">")[1].split("</p>")[0] + " / " + solo.split("<span class=\"value\">")[1].split("</span>")[0] + "(" + solo.split("<span class=\"top\">")[1].split("</span>")[0] + ")".trim() + "\n=> 킬뎃 " + solo.split("<h1>")[1].split("<p class=\"value\">")[1].split("</p>")[0].trim() + ", 승률 " + solo.split("<h1>")[1].split("<p class=\"value\">")[2].split("</p>")[0] + "\n=> 헤드샷 " + solo.split("<h1>")[1].split("<p class=\"value\">")[7].split("</p>")[0].trim() + ", 저격 " + solo.split("<h1>")[1].split("<p class=\"value\">")[8].split("</p>")[0].trim() + "\n\n";
	}
			if(duo != null) {
				str += "듀오 : " + duo.split("<h1>")[1].split("<em>")[1].split("</em>")[0] + "\n=>" + duo.split("<p class=\"grade-name\" style=\"font-size:11px;\">")[1].split("</p>")[0] + " / " + duo.split("<span class=\"value\">")[1].split("</span>")[0] + "(" + duo.split("<span class=\"top\">")[1].split("</span>")[0] + ")".trim() + "\n=> 킬뎃 " + duo.split("<h1>")[1].split("<p class=\"value\">")[1].split("</p>")[0].trim() + ", 승률 " + duo.split("<h1>")[1].split("<p class=\"value\">")[2].split("</p>")[0] + "\n=> 헤드샷 " + duo.split("<h1>")[1].split("<p class=\"value\">")[7].split("</p>")[0].trim() + ", 저격 " + duo.split("<h1>")[1].split("<p class=\"value\">")[8].split("</p>")[0].trim() + "\n\n";
		}
			if(squad != null) {
				str += "스쿼드 : " + squad.split("<h1>")[1].split("<em>")[1].split("</em>")[0] + "\n=>" + squad.split("<p class=\"grade-name\" style=\"font-size:11px;\">")[1].split("</p>")[0] + " / " + squad.split("<span class=\"value\">")[1].split("</span>")[0] + "(" + squad.split("<span class=\"top\">")[1].split("</span>")[0] + ")".trim() + "\n=> 킬뎃 " + squad.split("<h1>")[1].split("<p class=\"value\">")[1].split("</p>")[0].trim() + ", 승률 " + squad.split("<h1>")[1].split("<p class=\"value\">")[2].split("</p>")[0] + "\n=> 헤드샷 " + squad.split("<h1>")[1].split("<p class=\"value\">")[7].split("</p>")[0].trim() + ", 저격 " + squad.split("<h1>")[1].split("<p class=\"value\">")[8].split("</p>")[0].trim() + "\n\n";
		}
		
		str = str.substring(0, str.lastIndexOf("\n\n"));
			
			return "◀" + nick + "님의 배틀그라운드▶\n\n" + result.join("\n") + "\n" + str + "\n\ndak.gg/profile/" + nick;
		}
	} catch (e) {
		Log.e(e + " #" + e.lineNumber);
		return nick + " 유저를 찾을 수 없습니다.";
	}
}

/*레인보우 식스 시즈 전적(PC) 가져오기(r6.tracker.network)
Copyright 2019, Indvel All rights reserved.*/
function getR6Info(nick) {
	try {
		var doc = org.jsoup.Jsoup.connect("https://r6.tracker.network/profile/pc/" + nick).userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36").timeout(5000).get();
		if(doc.select("div#profile").isEmpty()) {
			return "해당 유저를 찾을 수 없습니다.";
		} else {
			var nick = doc.select("h1.trn-profile-header__name > span").text();
			var data = doc.select("div.trn-defstat.mb0");
			var stats = doc.select("div.trn-defstat.trn-defstat--large");
			var matches = doc.select("div.trn-card__header-subline").text().replace("Matches", "");
			var result = [];
			
			result.push("매치 : " + matches + "회");
			result.push("레벨 : " + data.get(0).select("div.trn-defstat__value").text().trim());
			result.push("최고 MMR 레이팅 : " + data.get(1).select("div.trn-defstat__value").text().trim());
			result.push("순위 : " + data.get(2).select("div.trn-defstat__value").text().trim());
			if(doc.html().indexOf("Top Operators") != -1) {
				var operator = doc.html().split("Top Operators")[1].split("trn-defstat__value")[1].split("</div>")[0].split("img");
				var op = [];
				for(var i = 1; i < operator.length; i++) {
					op.push(operator[i].split("title=\"")[1].split("\"")[0]);
				}
				result.push("평균 시즌 MMR : " + data.get(3).select("div.trn-defstat__value").text().trim());
				result.push("주 오퍼레이터 : " + op.join(", ") + "\n");
			} else {
				result.push("평균 시즌 MMR : " + data.get(3).select("div.trn-defstat__value").text().trim() + "\n");
			}
			
			result.push("승리 : " + stats.get(0).select("div.trn-defstat__value").text().trim());
			result.push("승률 : " + stats.get(1).select("div.trn-defstat__value").text().trim());
			result.push("킬 : " + stats.get(2).select("div.trn-defstat__value").text().trim());
			result.push("킬뎃 : " + stats.get(3).select("div.trn-defstat__value").text().trim());
			
			return "◀" + nick + "의 레식 전적▶\n\n" + result.join("\n") + "\n\nhttps://r6.tracker.network/profile/pc/" + nick;
		}
	} catch (e) {
		return "에러 발생 : \n" + e + " #" + e.lineNumber;
	}
}

function getGameInfo(text) {

try {
		var doc = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?query=" + text).userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36").get();
		if(doc.select("section._cs_newgame").isEmpty()) {
			return "해당 게임 정보가 없습니다.";
		} else {
			var div = doc.select("div.api_subject_bx");
			var name = div.select("div.title_area > h2 > a > strong").text();
			var ganre = div.select("div.title_area > div.sub_title > span.txt").text();
			var content = div.select("div.cm_content_area > div.cm_info_box > div.detail_info > dl > div");
			var result = [];
			var site = "";
			for(var i = 0; i < content.size(); i++) {
				if(content.get(i).select("dt").text() == "공식") {
					site = content.get(i).select("dt").text() + " : " + content.get(i).select("dd > a").first().attr("href");
				} else {
					result.push(content.get(i).select("dt").text() + " : " + content.get(i).select("dd").text().replace("구매하기", ""));
				}
			}
			result.push(site);
			return name + "\n\n" + result.join("\n");
		}
	} catch(e) {
		Log.e(e + " #" + e.lineNumber);
		return "해당 게임 정보가 없습니다.";
	}
}

/*게임물 관리 위원회 등급 검색
Made by Sabaoth, Modified by Indvel*/
function getGameRank(str) {
 var api = "http://www.grac.or.kr/WebService/GameSearchSvc.asmx/game?gametitle=" + str + "&amp;rateno=&amp;display=100&amp;pageno=1";
 var data = Utils.parse(api);
 var items = data.select("item");
 var responseMsg = "겜물위 등급 검색\n\n";
 if(items.get(0).select("gametitle").isEmpty()) {
 	return "해당 게임을 찾을 수 없습니다.";
 }
 
 for(i = 0;i < items.size(); ++i)
 {
 	responseMsg += "게임 명 : " + items.get(i).select("gametitle").text() + "\n";
responseMsg += "회사 명 : " + items.get(i).select("entname").text() + "\n";
responseMsg += "등급 분류 기관 : " + items.get(i).select("orgname").text() + "\n";
responseMsg += "게임 등급 : " + items.get(i).select("givenrate").text() + "\n";
responseMsg += "게임 등록 번호 : " + items.get(i).select("rateno").text() + "\n";
responseMsg += "게임 등록일 : " + items.get(i).select("rateddate").text() + "\n";
}

return responseMsg;
}

/*실시간 검색어(네이버 DataLab)
Copyright 2019, Indvel All rights reserved.*/
function getRealTimeKeyword() {
	try {
		var doc = org.jsoup.Jsoup.connect("https://m.datalab.naver.com/realtimeList.naver?where=main").userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36").get();
		
		var li = doc.select("div.field_list").get(0).select("li.ranking_item");
		
		var result = "◀21.02.25 기준 실시간 검색어(네이버)▶\n\n";
		
		for(var i = 0; i < li.size(); i++) {
			result += li.get(i).select("span.item_num").text() + ". " + li.get(i).select("span.item_title_wrap > span.item_title").text() + "\n";
		}
		return result.trim();
	} catch(e) {
		Log.e(e);
	}
}

/*인기 게임 순위 가져오기
Copyright 2019-2020, Indvel All rights reserved.*/
function getGameRanking(count) {
	try {
		var doc = org.jsoup.Jsoup.connect("http://ws.api.thelog.co.kr/service/info/rank/" + getTimes("nowday2"))
				.ignoreContentType(true)
				.get();
		var json = doc.select("body").text();
		if(json.length == 0) {
			doc = org.jsoup.Jsoup.connect("http://ws.api.thelog.co.kr/service/info/rank/" + getTimes("yesterday2"))
				.ignoreContentType(true)
				.get();
		}
		var job = new org.json.JSONObject(json);
		var jarr = job.getJSONArray("list");
		var result = "";
		var c = 20;
		if(count != null) c = Number(count);
		
		for(var i = 0; i < c; i++) {
			try {
				var object = jarr.getJSONObject(i);
				var ud = "";
				if(object.getString("gameRankUpDown").includes("+")) {
					ud = "▲" + object.getString("gameRankUpDown").replace(/[+|-]/, "");
				} else if(object.getString("gameRankUpDown").includes("-")) {
					ud = "▼" + object.getString("gameRankUpDown").replace(/[+|-]/, "");
				} else if(object.getString("gameRankUpDown").equals("0")) {
					ud = "";
				}
				result += "\n" + object.getString("gameRank") + "위 " + object.getString("gameName") + " [점유율 : " + object.getString("gameShares") + "] " + ud
                       + "\n" + object.getString("gameTypeName") + ", " + object.getString("publisher") + "\n";
			} catch(e) {
				Log.e(e);
			}
		}
		//return result.trim();
		return "◀현재 PC 게임 순위▶" + compress + "\n\n" + result.trim();
	} catch(e) {
		Log.e(e);
	}
}

/*한자 검색(네이버 한자 사전)
Copyright 2019, Indvel All rights reserved.
*/
function getHanja(text) {
	try {
		var doc = org.jsoup.Jsoup.connect("https://hanja.dict.naver.com/search/keyword?query=" + text + "&mflag=1").userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36").get().html();
		var div = doc.split("<ul class=\"oprate\">")[1];
		if(div == undefined) {
			return "해당 한자를 찾을 수 없습니다.";
		} else {
			div = div.split("<div class=\"more\">")[0];
		}
		
		var dt = div.split("<dl>")[1].split("</dl>")[0].split("<dt");
		
		var dd = div.split("<dl>")[1].split("</dl>")[0].split("<dd>");
		
		var result = [];
		
		for(var i = 1; i < dt.length; i++) {
			result[i] = dt[i].split("</a>")[0].replace(/<[^>]+>/g, "").replace(">", "").trim() + "\n" + dd[i].split("</span>")[0].replace(/<[^>]+>/g, "").trim();
		}
		
		if(result.length > 6) {

		return "◀\'" + text.replace("%20", " ") + "\' 한자 검색 결과(" + result.length + "개)▶" + compress + "\n\n" + result.join("\n\n").trim();
		} else if(result.length <= 6) {
			return "◀\'" + text.replace("%20", " ") + "\' 한자 검색 결과▶\n\n" + result.join("\n\n").trim();
		}
	} catch(e) {
		Log.e(e);
	}
}
/*한자 단어 검색(네이버 한자 사전)
Copyright 2019, Indvel All rights reserved.
*/
function getWords(text) {
	try {
		var doc = org.jsoup.Jsoup.connect("https://hanja.dict.naver.com/search/word?query=" + text + "&mflag=1").userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36").get().html();
			var div = doc.split("<div class=\"result_chn_words result_nobg line_b_none\">")[1];
			if(div == undefined) {
				return "해당 한자단어를 찾을 수 없습니다.";
			} else {
				div = doc.split("</h5>")[1];
			}
			var dt = div.split("<dl>")[1].split("</dl>")[0].split("<dt>");
		
		var dd = div.split("<dl>")[1].split("</dl>")[0].split("<dd>");
		
		if(dd == undefined) {
			dd = div.split("<dl>")[1].split("</dl>")[0].split("<dd class=\"long\">");
		}
		
		var mean = div.split("<dl>")[1].split("</dl>")[0].split("<dd class=\"meaning\">");
		
		var result = [];

 //Log.i(dt.length + " " + dd.length + " " + mean.length);
		
		for(var i = 1; i < dd.length; i++) {
			result[i] = dt[i].split("</a>")[0].replace(/<[^>]+>/g, "").replace(">", "").trim() + "[" + dd[i].split("</span>")[0].replace(/<[^>]+>/g, "").replace(">", "").trim() + "]\n" + mean[i].split("</dd>")[0].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
		}
		
		if(result.length > 3) {

		return "◀\'" + text.replace("%20", " ") + "\' 한자단어 검색 결과▶" + compress + "\n\n" + result.join("\n\n").trim();
		} else if(result.length <= 3) {
			return "◀\'" + text.replace("%20", " ") + "\' 한자단어 검색 결과▶\n\n" + result.join("\n\n").trim();
		}
	} catch(e) {
	//Log.e(e + " #" + e.lineNumber);
		return "해당 한자단어를 찾을 수 없습니다.";
	}
}
/*고사성어(사자성어) 검색(네이버 한자 사전)
Copyright 2019, Indvel All rights reserved.
*/
function getIdiom(text) {
	try {
		var doc = org.jsoup.Jsoup.connect("https://hanja.dict.naver.com/search/idiom?query=" + text + "&mflag=1").userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36").get().html();
			var div = doc.split("<div class=\"entry_txt\">")[1];
			var div2 = doc.split("<div class=\"result_chn_words result_nobg line_b_none\">")[1];
			if(div == undefined && div2 == undefined) {
				return "해당 고사성어를 찾을 수 없습니다.";
			} else {
				var result = "";
				if(div != undefined) {
				
				result = div.split("<div class=\"myword\">")[1].split("<span class=\"hanja\">")[1].split("</span>")[0] + "\n" + div.split("<p>")[1].split("</p>")[0].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
				} else if(div2 != undefined){
					result = div2.split("<dt>")[1].split("\">")[1].split("</a>")[0] + "\n" + div2.split("<dd class=\"meaning\">")[1].split("</dd>")[0].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
				}
			}
		return "◀\'" + text.replace("%20", " ") + "\' 고사성어 검색 결과▶" + "\n\n" + result;
	} catch(e) {
		Log.e(e);
	}
}

/*
날씨 정보 불러오기(해외날씨 포함)
Copyright 2019, Indvel All rights reserved.
*/
function getWeatherInfo(pos) {
	try {
		var doc = Utils.getWebText("https://m.search.naver.com/search.naver?query=" + pos + "%20날씨", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36", false, false);
		var href = org.jsoup.Jsoup.parse(doc).select("div.csm_more_wrap > a.csm_more").attr("href");
		if(href.length == 0) {
			 href = org.jsoup.Jsoup.parse(doc).select("a.api_more").attr("href");
		}
		var code = href.substring(href.indexOf("=") + 1, href.length).replace(/[0-9]/g, "");
		var country;
		if(code.includes("WD")) {
			country = getCountryByCode(code.replace("WD", "")).split("/")[0];
		} else {
			country = "";
		}
		var region = org.jsoup.Jsoup.parse(doc).select("h2.title").text();
		doc = Utils.getWebText(href, "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36", false, false);
		if(region.length == 0) {
			region = org.jsoup.Jsoup.parse(doc).select("a.title > strong").text();
		}
		if(country == "중화인민공화국") {
			country = "중국";
		}
		if(region.indexOf("(") != -1) {
			region = region.substring(0, region.indexOf("(")).split(' ');
		} else {
			region = region.split(' ');
		}
if(country == region[0]) {
  country = "";
}
		if(region[1] == undefined) {
			region = country + " " + region[0];
		} else if(region[2] == undefined) {
			region = country + " " + region[0] + " " + region[1];
		} else {
			region = country + " " + region[0] + " " + region[1] + " " + region[2];
		}
		var infos = [];
		var card = doc.split("<div class=\"weather_set\"")[1].split("\"card card_graph\"")[0];
		var detail = card.split("<div class=\"weather_set_detail\">")[1].split("</div>")[0];
		
		if(detail.indexOf("미세먼지") != -1) {
		
			infos[0] = "상태 : " + doc.split("<div class=\"weather_set_summary\">")[1].split("<br>")[0].replace(/\s/gi, "").trim();
			infos[1] = "현재 온도 : " + card.split("<div class=\"set set_text\">")[1].split("</em>")[0].replace(/<[^>]+>/g,"").replace("현재온도", "").trim() + "℃";
			infos[2] = "체감 온도 : " + card.split("<div class=\"set set_text\">")[1].split("<span class=\"day_feel\">")[1].split("</em>")[0].replace(/<[^>]+>/g,"").replace("체감 ", "").replace("도", "").trim() + "℃";
			infos[3] = "미세먼지 : " + detail.split("<li class=\"finedust\">")[1].split("<span ")[1].split("</span>")[0].replace(/<[^>]+>/g,"").replace(/class=\"(.*?)\">/, "");
			infos[4] = "초미세먼지 : " + detail.split("<li class=\"finedust\">")[1].split("<span ")[2].split("</span>")[0].replace(/<[^>]+>/g,"").replace(/class=\"(.*?)\">/, "");;
			infos[5] = doc.split("<span class=\"text text_location\">")[1].split("</span>")[0].trim();
		} else if(detail.indexOf("미세먼지") == -1) {
			infos[0] = "상태 : " +  doc.split("<div class=\"weather_set_summary\">")[1].split("</div>")[0].replace(/\s/gi, "").trim();
			infos[1] = "현재 온도 : " + card.split("<div class=\"set set_text\">")[1].split("</em>")[0].replace(/<[^>]+>/g,"").replace("현재온도", "").trim() + "℃";
			infos[2] = "체감 온도 : " + card.split("<div class=\"set set_text\">")[1].split("<span class=\"day_feel\">")[1].split("</em>")[0].replace(/<[^>]+>/g,"").replace("체감 ", "").replace("도", "").trim() + "℃";
			infos[3] = "습도 : " + detail.split("<span class=\"description_list_inner\">")[1].split("</span>")[0].replace(/<[^>]+>/g,"").replace("습도 ", "");
			infos[4] = "풍속 : " + detail.split("<span class=\"description_list_inner\">")[2].split("</span>")[0].replace(/<[^>]+>/g,"");
			infos[5] = detail.split("<span class=\"description_list time\">")[1].split("</span>")[0].replace(/<[^>]+>/g,"");
			infos[6] = doc.split("<span class=\"text text_location\">")[1].split("</span>")[0].replace("<span>", "").trim();
		}
	return "◀" + region.trim() + " 날씨▶\n\n" + infos.join("\n");
	} catch(e) {
Log.e(e + " #" + e.lineNumber);
		return null;
	}
}

/*국가코드로 국가명 가져오기
매개변수 : 코드, 타입(0: alpha-2, 1: alpha-3)
Copyright 2019, Indvel All rights reserved.*/
function getCountryByCode(code) {
	try {
		var doc = Utils.getWebText("https://devbible.tistory.com/350", null, false, false);
		
		var result = "";
		
		var tbody = doc.split("<tbody>")[1].split("</tbody>")[0];
		
		for(var i = 1; i <= 245; i++) {
			var tr = tbody.split("<tr>")[i].split("</tr>")[0];
			var td;
			if(code.length == 2 && code.search(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/) == -1) {
				code = code.toUpperCase();
				td = tr.split("<td style=")[4].split("td>")[0].replace(/&<[^>]+>/g,"").split(">")[1].split("<")[0].trim();
			} else if(code.length == 3 && code.search(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/) == -1) {
				code = code.toUpperCase();
				td = tr.split("<td style=")[3].split("td>")[0].replace(/<[^>]+>/g,"").split(">")[1].split("<")[0].trim();
			} else if(code.search(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/) != -1) {
				code = code.replace("북한", "조선민주주의인민공화국").replace("한국", "대한민국").replace("중국", "중화인민공화국").replace("대만", "중화민국");
				td = tr.split("<a href")[2].split("\">")[1].split("</a>")[0].trim().replace(/ /g, "");
				}
			
			if(code == td) {
					result = tr.split("<a href")[2].split("\">")[1].split("</a>")[0].trim() + "/" + tr.split("<td style=")[4].split("td>")[0].replace(/&<[^>]+>/g,"").split(">")[1].split("<")[0].trim() + "/" + tr.split("<td style=")[3].split("td>")[0].replace(/<[^>]+>/g,"").split(">")[1].split("<")[0].trim();
				break;
			}
		}
		return result;
	} catch(e) {
Log.e(e + " #" + e.lineNumber);
	}
}

/*한강 물 온도 가져오기
Copyright 2019-2021, Indvel All rights reserved.*/
function getHangangTemp() {
	try {
		var doc = org.jsoup.Jsoup.connect("https://hangang.life/api/").get();
  var temp = doc.select("#tem").text();
		var time = doc.select("#timestemp").text();
		
		return "◀한강 물 온도 정보▶\n\n온도 : " + temp.replace(" ", "") + "\n측정 : " + time;
	} catch(e) {
		Log.e(e);
		return "한강 온도를 가져오는 데 오류가 발생하였습니다.";
	}
}

/*전국 날씨 by lam*/
function getAllWeather() {
	var html = Utils.getWebText("https://m.search.naver.com/search.naver?sm=mtp_sly.hst&where=m&query=전국날씨&acr=0").split("전국날씨</strong>")[1].split("<div class=\"wt_notice\">")[0].replace(/(<([^>]+)>)/g, "").replace(/^ +/gm,"").replace(/도씨/g,"°C").split("단위")[0].trim()
.replace(/ /g, " ");

return html;
}

/*구글 번역
Copyright 2019, Indvel All rights reserved.*/
function googleTranslate(content, language) {
	try {

		var doc = org.jsoup.Jsoup.connect("https://www.google.co.kr/search?q=" + "translate%20" + content + "%20" + language).userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36").get();
		if(doc.html().split("Google 번역에서 열기") == undefined) {
			return "해당 번역 결과가 없습니다.";
		} else {
			var tr1 = doc.select("textarea#tw-source-text-ta").text();
			var sp1 = doc.select("pre#tw-source-rmn > span").text();
			sp1 = (sp1.length == 0) ? "%NOS%" : sp1;

			var tr2 = doc.select("pre#tw-target-text > span").text();
			var sp2 = doc.select("pre#tw-target-rmn > span").text();
			sp2 = (sp2.length == 0) ? "%NOS%" : sp2;
			sp1 = (sp1 == tr2) ? "%NOS%" : sp1;

			var lang1 = doc.select("div#tw-sl > span.source-language").text();
			var lang2 = doc.select("div#tw-tl > span.target-language").text();

			sp1 = (lang2 == "한국어") ? "%NOS%" : sp1;

			var result = "◀구글 번역 결과▶\n\n" + tr1 + "\n" + sp1 + "\n\n" + lang1 + " ↑↓ " + lang2 + "\n\n" + tr2 + "\n" + sp2;
			result = result.replace("%NOS%", "").replace("\n\n\n", "\n\n").trim();

			return result;
		}
	} catch (e) {
	Log.e(e + " #" + e.lineNumber);
	return "에러가 발생하였습니다.";
	}
}

/*나라(국가) 정보 가져오기
Copyright 2019, Indvel All rights reserved.*/
function getNationInfo(name) {
	try {
	 var doc = Utils.getWebText("https://m.search.naver.com/search.naver?query=" + name, "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36", false, false);
	 var title = doc.split("<h2 class=\"api_title\">")[1].split("</h2>")[0];
	 if(title.indexOf("정보") == -1 ) {
	 	return "해당 국가 정보가 없습니다";
	 } else {
	 	var box = doc.split("<div class=\"nation_bx\">")[1].split("<div class=\"api_more_wrap\">")[0];
	 	var result = [];
	 	
	 	result[0] = box.split("<span class=\"nt_txt\">")[1].split("</span>")[0] + "\n" + box.split("<span class=\"eng\">")[1].split("</span>")[0] + "\n";
	 	if(title.indexOf("북한") == -1) {
	 	result[1] = box.split("<dt class=\"\">")[1].split("</dt>")[0].replace(/\s/gi, "") + " : " + box.split("<dd>")[1].split("city_name\">")[1].split("<")[0];
	 	result[2] = box.split("<dt class=\"\">")[2].split("</dt>")[0].replace(/\s/gi, "") + " : " + box.split("<dd>")[2].split("</dd>")[0].replace(/<\s*(\w+).*?>/, '<$1>').replace(/<[^>]+>/g,"").replace("사전 전체보기", "").replace(/\s/gi, "").trim().replace(/,/gi, ", ");
	 	result[3] = box.split("<dt class=\"\">")[3].split("</dt>")[0].replace(/\s/gi, "") + " : " + box.split("<dd>")[3].split("<a")[0].trim() + "(" + box.split("<dd>")[3].split(">")[1].split("<")[0] + ")";
	 	result[4] = box.split("<dt class=\"\">")[4].split("</dt>")[0].replace(/\s/gi, "") + " : " + box.split("<dd>")[4].split("<a")[0].trim() + "(" + box.split("<dd>")[4].split(">")[1].split("<")[0] + ")";
	 	result[5] = box.split("<dt class=\"\">")[5].split("</dt>")[0].replace(/\s/gi, "") + " : " + box.split("<dd>")[5].split("<a")[0].trim() + "(" + box.split("<dd>")[5].split(">")[1].split("<")[0] + ")";
	 	result[6] = box.split("<dt class=\"\">")[6].split("</dt>")[0].replace(/\s/gi, "") + " : " + box.split("<dd>")[6].split("<a")[0].trim() + "(" + box.split("<dd>")[6].split(">")[1].split("<")[0] + ")";
	 	if(result[6].indexOf("전화") != -1) {
	 		result[6] = result[6].replace("(전화 거는 법)", "");
	 	}
	 	}	else if(title.indexOf("북한") != -1) {
	 		result[1] = "수도 : " + box.split("<dd>")[1].split("city_name\">")[1].split("<")[0];
	 	result[2] = box.split("<dt class=\"\">")[1].split("</dt>")[0].replace(/\s/gi, "") + " : " + box.split("<dd>")[2].split(">")[1].split("<")[0];
	 	result[3] = box.split("<dt class=\"\">")[2].split("</dt>")[0].replace(/\s/gi, "") + " : " + box.split("<dd>")[3].split("<a")[0].trim() + "(" + box.split("<dd>")[3].split(">")[1].split("<")[0] + ")";
	 	result[4] = box.split("<dt class=\"\">")[3].split("</dt>")[0].replace(/\s/gi, "") + " : " + box.split("<dd>")[4].split("<a")[0].trim() + "(" + box.split("<dd>")[4].split(">")[1].split("<")[0] + ")";
	 	result[5] = box.split("<dt class=\"\">")[4].split("</dt>")[0].replace(/\s/gi, "") + " : " + box.split("<dd>")[5].split("</dd>")[0].trim();
	 	}
	}
	} catch(e) {
		Log.e(e + " #" + e.lineNumber);
	}
	return result.join("\n");
}

/*나라(국가) 정보 가져오기 v2
Copyright 2019, Indvel All rights reserved.*/
function getNationInfo2(name) {
	var doc = org.jsoup.Jsoup.connect("https://terms.naver.com/search.nhn?query=" + name + "&dicType=1").userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36").get();
	if(doc.html().indexOf("검색결과가 없습니다.") != -1) {
		return "해당 국가 정보를 찾을 수 없습니다.";
	} else {
		try {
			var url = doc.html().split("<div class=\"info_area\">")[1].split("<a href=")[1].split(" target")[0].replace("\"", "");
			doc = org.jsoup.Jsoup.connect("https://terms.naver.com" + url).userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36").get().html();
			var result = [];
			var section = doc.split("<div class=\"section_wrap \">")[1].split("참조항목")[0];
			var tbody = section.split("wr_tmp_profile")[1];
			if(tbody == undefined) {
				return "해당 국가 정보를 찾을 수 없습니다.";
			} else {
				tbody = tbody.split("<tbody>")[1].split("</tbody>")[0];
			}
			result[0] = section.split("<div class=\"headword_title\">")[1].split("</h2>")[0].replace(/<[^>]+>/g,"").trim().replace("두산백과", "").replace(/\s/gi, "") + "\n";
   var code = getCountryByCode(result[0].trim().replace("타이완", "중화민국"));
   if(code.split("/") != undefined) {
     result[0] = code.split("/")[2] + getCountryFlagByCode(code.split("/")[1]) +  " " + result[0];
   }
			result[1] = section.split("<p class=\"word\"")[1].split("</p>")[0].replace(/<[^>]+>/g,"").replace(/\s+/g, " ").replace(" ,", ", ").replace("[", "").replace("]", "").replace(">", "").replace("음성듣기", "").replace("\n", "").replace(",  ", ", ").replace(" ,", ",").trim() + "\n\n";
			result[2] = tbody.split("<span class=\"title\">원어명</span>")[1];
			if(result[2] == undefined) {
				result[2] = "";
			} else {
				result[2] = "원어명 : " + result[2].split("<td")[1].split("</td>")[0].replace(/<[^>]+>/g,"").replace(">", "").trim() + "\n";
			}
			result[3] = "위치 : " + tbody.split("<span class=\"title\">위치</span>")[1];
			if(result[3] == undefined) {
				result[3] = "";
			} else {
				result[3] = "위치 : " + result[3].split("<td")[1].split("</td>")[0].replace(/<[^>]+>/g,"").replace(">", "").trim() + "\n";
			}
			result[4] = "면적 : " + numberWithCommas(tbody.split("<span class=\"title\">면적(㎢)</span>")[1].split("<td")[1].split("</td>")[0].replace(/<[^>]+>/g,"").replace(">", "").trim()) + "㎢" + "\n";
			result[5] = "시간대 : " + tbody.split("<span class=\"title\">시간대</span>")[1].split("<td")[1].split("</td>")[0].replace(/<[^>]+>/g,"").replace(">", "").trim() + "\n";
			result[6] = "수도 : " + tbody.split("수도")[1].split("<td")[1].split("</td>")[0].replace(/<[^>]+>/g,"").replace(">", "").trim() + "\n";
			result[7] = tbody.split("<span class=\"title\">공용어</span>")[1];
			if(result[7] == undefined) {
				result[7] = "";
			} else {
				result[7] = "공용어 : " + result[7].split("<td")[1].split("</td>")[0].replace(/<[^>]+>/g,"").replace(">", "").trim() + "\n";
			}
			result[8] = tbody.split("<span class=\"title\">건국일</span>")[1];
			if(result[8] == undefined) {
				result[8] = "";
			} else {
				result[8] = "건국일 : " + result[8].split("<td")[1].split("</td>")[0].replace(/<[^>]+>/g,"").replace(">", "").trim() + "\n";
			}
			result[9] =  tbody.split("<span class=\"title\">국가원수/국무총리</span>")[1];
		  if(result[9] == undefined) {
		  result[9] = "";
		  } else {
		  result[9] = "국가원수/총리 : " + result[9].split("<td")[1].split("</td>")[0].replace(/<[^>]+>/g,"").replace(">", "").trim() + "\n";
		  }
			result[10] = "정체 : " + tbody.split("<span class=\"title\">정체</span>")[1].split("<td")[1].split("</td>")[0].replace(/<[^>]+>/g,"").replace(">", "").trim() + "\n";
			result[11] = "통화 : " + tbody.split("<span class=\"title\">통화</span>")[1].split("<td")[1].split("</td>")[0].replace(/<[^>]+>/g,"").replace(">", "").trim() + "\n";
			result[12] = "인구 : " + tbody.split("<span class=\"title\">인구(명)</span>")[1].split("<td")[1].split("</td>")[0].replace(/<[^>]+>/g,"").replace(">", "").trim().replace("(", "명(") + "\n";
			result[13] = "평균수명 : " + tbody.split("<span class=\"title\">평균수명(세)</span>")[1].split("<td")[1].split("</td>")[0].replace(/<[^>]+>/g,"").replace(">", "").trim().replace("(", "세(");
			
			return result.join("");
		} catch(e) {
			//Log.e(e + " #" + e.lineNumber);
			return "해당 국가 정보를 찾을 수 없습니다.";
		}
	}
}

function getCountryFlagByCode(code) {
  code = code.toUpperCase();
  var offset = 0x1F1E6;
  var ascii = 0x41;
  var first = java.lang.Character.codePointAt(new java.lang.String(code), 0) - ascii + offset;
  var sec = java.lang.Character.codePointAt(new java.lang.String(code), 1) - ascii + offset;
  return java.lang.String(java.lang.Character.toChars(first)) + java.lang.String(java.lang.Character.toChars(sec));
}

/*기업 정보 가져오기
Copyright 2019, Indvel All rights reserved.*/
function getCompanyInfo(text) {
	try {
		var doc = Utils.getWebText("https://m.search.naver.com/search.naver?query=" + text, "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36", false, false);
		var check = doc.split("<h2 class=\"blind\">기업</h2>");
		if(check == undefined) {
			return "해당 기업 정보가 없습니다.";
		} else {
			var report = doc.split("<div class=\"report_area\">")[1].split("<ul class=\"list_report\">")[1].split("</ul>")[0];
			var name = report.split("<span class=\"info_txt \">")[1].split("</span>")[0].replace(/<[^>]+>/g,"");
			report = doc.split("<div class=\"report_area\">")[1].split("<div class=\"report_notify\">")[0].split("<li>");
			var result = [];
			
			result[0] = name + "\n\n";
			for(var i = 1; i < report.length; i++) {
				result[i] = report[i].split("<em ")[1].split("</em>")[0].replace(/<[^>]+>/g,"").replace("class=\"report \">", "") + " : " + report[i].split("<span ")[1].split("</span>")[0].replace(/<[^>]+>/g,"").replace("class=\"info_txt \">", "").replace("&amp;", "&").trim() + "\n";
			}
			if(result[report.length - 1].indexOf("관련정보") != -1) {
				result[report.length -1] = "";
			} else {
				result[report.length -1] = result[report.length - 1].replace("\n", "");
			}
		}
		return result.join("").trim();
	} catch(e) {
		//Log.e(e + " #" + e.lineNumber);
		return "해당 기업 정보가 없습니다.";
	}
}

/*잡플래닛 기업 검색
Copyright MatSoGeum All rights reserved.
Modified by Indvel
*/
function getJobplanetSearch(str) {
	try {
		var doc = org.jsoup.Jsoup.connect("https://www.jobplanet.co.kr/search/companies/" + str).get();
		var dd = doc.select("dt[class='us_titb_l3']");
		if(dd.size() == 0) {
			return "해당 기업을 찾을 수 없습니다.";
		} else {
			var r = [];
			for(var i = 0; i < dd.size(); i++){
				var info = dd.get(i).select("a").attr("href");
				r[i] = info.split("/")[2].trim() + " " + decodeURI(info.split("/")[4].split("?")[0]);
			}
			return "◀기업 검색 결과▶\n\n" + r.join("\n").trim();
		}
	} catch(e) {
		Log.e(e + " #" + e.lineNumber);
		return "에러가 발생하였습니다.";
	}
}

/*잡플래닛 기업 정보
Copyright MatSoGeum All rights reserved.
Modified by Indvel
*/
function getJobplanetInfo(str) {
	try {
		var doc = org.jsoup.Jsoup.connect("https://www.jobplanet.co.kr/companies/" + str + "/landing/").userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36")
				.get();
		var r = [];
		var name = doc.select("div.company_name > h1 > a").text();
		var category = doc.select("div.about_company > div.info > span").get(0).text();
		var li = doc.select("ul.basic_info_list > li");
		if(name.length == 0) {
			return "해당 기업 정보가 없습니다.";
		} else {
			for(var i = 0; i < li.size(); i++){
				r[i] = li.get(i).select("span").text();
				r[i] = r[i] + " : " + li.get(i).text().replace(r[i], "").trim() + "\n";
			}
			li = doc.select("ul.basic_info_more > li");
			for(var i = 0; i < 4; i++) {
				r[r.length + 1] = li.get(i).select("dt.item_subject").text() + " : " + li.get(i).select("dd").text() + "\n";
			}
			doc = org.jsoup.Jsoup.connect("https://www.jobplanet.co.kr/companies/" + str + "/salaries/").userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36")
				.get();
			r[r.length + 1] = "평균연봉 : " + doc.select("section.vsb_sec1 > div.vsbanner > span.sal_num").text().trim() + "\n";
			var data = doc.select("section.vsb_sec2 div.data");
			for(var i = 0; i < data.size(); i++) {
				r[r.length + 1] = data.get(i).select("span.sal_txtrk").text() + " : " + data.get(i).select("span.rank").text() + "\n";
			}
			
			return name + "\n\n" + "분류 : " + category + "\n" + r.join("").trim();
		}
	} catch(e) {
		return "에러가 발생하였습니다.\n" + e + " #" + e.lineNumber;
		Log.e(e + " #" + e.lineNumber);
	}
}

/*본관 검색 by Indvel(한국인의족보.com)
*/
function searchHometown(str) {
  try {
  var doc = org.jsoup.Jsoup.connect("http://한국인의족보.com").get();
  var token = doc.select("div.search-area > form#frmSearch > input[name=_token]").attr("value");
  var res = org.jsoup.Jsoup.connect("http://한국인의족보.com/search?_token=" + token + "&Word=" + str).followRedirects(true).userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36").get();
  var doc2 = org.jsoup.Jsoup.connect("http://한국인의족보.com" + res.select("div.guide_box ul.tab.tab-mn2 > li").get(0).select("a").attr("title")).get().select("div.box.view").text();
  var result = doc2.split("[가문의 유래]")[1];
  if(result.length >= 200) {
    return "◀" + str + "의 유래▶\n\n" + result.substring(0, 200) + "...";
  } else {
    return "◀" + str + "의 유래▶\n\n" + result;
  }
  } catch(e) {
    return "해당 성씨와 본관을 찾을 수 없습니다. OOO씨 같은 형식을 지켜 주세요.";
  }
}

/*IT기기 검색(review.cetizen.com)
Copyright 2019, Indvel All rights reserved.*/
function getPhoneSearch(str) {
	try {
	 var doc = org.jsoup.Jsoup.connect("https://review.cetizen.com/_system/module/ajax_query.php?cat=&search_type=&q=" + java.net.URLEncoder.encode(str, "EUC_KR") + "&limit_qry=").get();
	 var item = doc.select("items > item");
	 if(item.size() == 0) {
	 	 return "해당 기기를 찾을 수 없습니다.";
	 } else {
	 	 var result = [];
	 	 
	 	 for(var i = 0; i < item.size(); i++) {
	 	 	var comp = java.net.URLDecoder.decode(item.get(i).text()).split("|");
	 	 	if(comp.length != 0) {
	 	 		 if(comp[7].length != 0 && comp[7].indexOf("text03") != -1) {
	 	 		 	 comp = comp[7].split("text03")[1].split(">")[1].split("<")[0] + " ";
	 	 		 } else {
	 	 		 	comp = "";
	 	 		 }
	 	 	}
			 if(item.get(i).text().indexOf("p13 b") != -1) { 
   result[i] = comp + java.net.URLDecoder.decode(item.get(i).text().split("|")[8], "UTF-8").replace("^", "-") + " (" + java.net.URLDecoder.decode(item.get(i).text().split("|")[7].split(">")[1].split("<")[0], "UTF-8").trim().replace("U", "U+") + ")\n" + java.net.URLDecoder.decode(item.get(i).text().split("|")[10].split("%20")[0], "UTF-8").replace("^", "-") + " / 코드 : " +  item.get(i).text().split("|")[0] + "\n";
			 } else {
				result[i] = comp + java.net.URLDecoder.decode(item.get(i).text().split("|")[8], "UTF-8").replace("^", "-") + "\n" + java.net.URLDecoder.decode(item.get(i).text().split("|")[10].split("%20")[0], "UTF-8").replace("^", "-") + " / 코드 : " +  item.get(i).text().split("|")[0] + "\n";
			 }
	 	 }
		 if(result.length > 10) {
			return "◀IT기기 검색 결과▶" + "(" + result.length + "개)" + compress + "\n\n" + result.join("\n").trim();
		 } else {
			 return "◀IT기기 검색 결과▶" + "(" + result.length + "개)" + "▶\n\n" + result.join("\n").trim();
		 }
	 }
	 } catch(e) {
	 	 Log.e(e + " #" + e.lineNumber);
	 	 return "에러가 발생하였습니다.";
	 }
}

const phoneCom = [
{name: "삼성전자", url: "mdsmobile.ae"},
{name: "LG전자", url: "lg.com"},
{name: "애플", url: "apple.com"},
{name: "팬택", url: "ivega.co.kr"},
{name: "소니", url: "sony.jp"},
{name: "SONY", url: "sony.jp"},
{name: "Xiaomi", url: "mi.com"},
{name: "Google", url: "google.com"},
{name: "Huawei", url: "huawei.com"},
{name: "Microsoft", url: "microsoft.com"},
{name: "노키아", url: "nokia.com"},
{name: "KT Tech", url: "kt.com"},
{name: "Asus", url: "asuskart.com"},
{name: "HTC", url: "htc.com"}
]

/*스마트폰 정보(review.cetizen.com)
Copyright 2019-2021, Indvel All rights reserved.*/
function getPhoneInfo(str) {
 try {
	 var doc = org.jsoup.Jsoup.connect("https://review.cetizen.com/" + str + "/view/3/" + str + "/review").timeout(2000).get();
	 var name = doc.select("span.p18").text();
	 if(name.length == 0) {
	 	  return "해당 기기 정보가 없습니다.";
	 } else {
	 	 var result = {};
		 var os = doc.html().split("출시 OS")[1].split("p14 clr100")[1].split(">")[1].split("<")[0].trim();
		 if(os.indexOf("|") != -1) {
			 os = os.substring(os.lastIndexOf("|") + 1, os.length).trim();
		 }
   var made = doc.select("a.p11.clr05").attr("href").split(",")[2].split(")")[0].replace(/[\']/g, "").trim();
   var sub = doc.select("a.p11.clr05").attr("href").split(",")[1].replace(/[\']/g, "").trim();
   var idx = phoneCom.findIndex(e => e.name.includes(made) || e.name.includes(sub.split(" ")[0]));
   var url = "";
   if(idx != -1) {
     url = "http://logo.clearbit.com/" + phoneCom[idx].url;
   }
		 result['img'] = doc.select("a.p11.clr05 > img").attr("src");
   result['thum'] = url;
		 result['phone_name'] = doc.select("span.p18.clr100.b.ln22").text() + " (" + doc.html().split("모델명 : ")[1].split(">")[1].split("<")[0].split(" ")[0] + ")";
   result["model_name"] = sub;
		 result["description"] = "출시: " + doc.select("div#product_specview span.p14.clr100").get(1).text() + " / 출고가: " + doc.select("div#product_specview span.p14.clr100").get(2).text() + " / " + "OS: " + os;
		 result['favorite'] = doc.select("span.p15.clr02").get(0).text().replace(/[()]/gi, "");
	 	 result['link'] = "review.php?pid=" + str + "&q=view&vcat=3&pno=" + str;
		 return result;
	 }
 } catch(e) {
   //Log.e(e +  " #" + e.lineNumber);
   return "오류가 발생하였습니다 :\n" + e.message + " #" + e.lineNumber + "\n다시 시도해주세요.";
 }
}

String.prototype.splice = function(idx, rem, str) { return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem)); };

/*학교 정보 가져오기(대학교 포함) KakaoLink Ver.
Copyright 2019-2020, Indvel All rights reserved.
*/
function getSchoolInfo(text, room) {
	try {
		var doc = Utils.getWebText("https://m.search.naver.com/search.naver?query=" + text.replace(" ", "%20"), "Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Mobile Safari/537.36", false, false);
		if(doc.indexOf("school_inform") == -1 && doc.indexOf("대학교</span>") == -1) {
			Api.replyRoom(room, "해당 학교 정보가 없습니다.", false);
		} else if(doc.indexOf("school_inform") != -1 && (doc.indexOf("cs_university") == -1 || text.indexOf("대학") == -1)) {
				var dt = doc.split("<div class=\"school_inform\">")[1].split("</div>")[0].split("<dl>")[1].split("<dt>");
				var dd = doc.split("<div class=\"school_inform\">")[1].split("</div>")[0].split("<dl>")[1].split("<dd>");
				var name = doc.split("<div class=\"school_site\">")[1].split("<h3>")[1].split("</h3>")[0].replace(/<[^>]+>/g,"");
				var result = [];
				
				var home = doc.split("\" class=\"school_name\"")[1].split("href=\"")[1].split("\"")[0].trim();
				
				result[0] = dd[1].split("<strong>")[1].split("</strong>")[0] + "(" + dd[1].split("<span class=\"school_ico\">")[1].split("</span>")[0] + ")";
				for(var i = 2; i < dt.length; i++) {
					result[i - 1] = dd[i].split("</dd>")[0].replace(/<[^>]+>/g,"").trim().replace("\n", "/").replace(/\s\s+/g, "");
				}
				Kakao.send(room, { "link_ver": "4.0", "template_id": 25192, "template_args": { school_name: name, info_default: result[0], info_date: result[1], info_student: result[2].splice(result[2].indexOf("명") + 1, 0, " (") + ")", info_teacher: result[3].splice(result[3].indexOf("명") + 1, 0, " (") + ")", info_address: result[4]}}, "custom");
		} else if(doc.indexOf("school_inform") == -1 && (doc.indexOf("cs_university") != -1 || doc.indexOf("대학교</span>") != -1)) {
				doc = org.jsoup.Jsoup.connect("https://www.academyinfo.go.kr/search/search.do?kwd=" + text + "&category=TOTAL&pageNum=1&pageSize=3&schlSize=&preKwd=" + text)
				.userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36").get();
				var code = doc.select("div.college-name-wrap > div.right-wrap > a").attr("onClick").split("'")[1].split("',")[0];
				var site = doc.select("div.college-info-wrap > div.info-row").get(0).select("a").text().trim();
				var th = doc.select("div.tbl-wrap > table.tbl-col.small").get(0).select("thead > tr > th");
				var td = doc.select("div.tbl-wrap > table.tbl-col.small").get(0).select("tbody > tr > td");
				var doc2 = org.jsoup.Jsoup.connect("https://www.academyinfo.go.kr/popup/pubinfo1690/list.do?schlId=" + code).get();
				var doc3 = org.jsoup.Jsoup.connect("https://www.academyinfo.go.kr/pubinfo/pubinfo1600/doInit.do?schlId=" + code).get();
				var college = doc2.select("div.college-info-box > div.college-info-inner > div.info-box");
				var info = doc2.select("div.competition-info-wrap > div.info-box");
				
				var image = "https://academyinfo.go.kr/" + doc.select("div.img-box > img").attr("src");
				
				var result = [];
				var titles = [];
				result.push(college.select("div.college-name-wrap > span.college-name").text().split("관심")[0].trim().replace("[본교]", ""));
				result.push(college.select("div.college-info-wrap > div.info-row").get(2).select("span.info-cell").get(1).select("span.info-value").text() + " " + college.select("div.college-info-wrap > div.info-row").get(2).select("span.info-cell").get(0).select("span.info-value").text());
				result.push(college.select("div.college-info-wrap > div.info-row").get(2).select("span.info-cell").get(2).select("span.info-value").text());
				result.push(college.select("div.college-info-wrap > div.info-row").get(0).select("span.info-cell > span.info-value").text().split("(우")[0].trim());
				result.push(info.get(0).select("div.info-inner > div.list-group > ul > li").get(0).select("span.count").text().trim());
				for(var i = 0; i < th.size(); i++) {
					if(th.get(i).text().indexOf("경쟁률") != -1 || th.get(i).text().indexOf("취업률") != -1 || th.get(i).text().indexOf("등록금") != -1) {
						titles.push(th.get(i).text().replace(/\s+/g, " "));
						result.push(td.get(i).text());
					}
				}
				Kakao.send(room, { "link_ver": "4.0", "template_id": 25194, "template_args": { logo_image: image, univ_name: result[0], info_default: result[1] + " (" + result[2] + " 설립)", info_student: result[4], info_ratio_title: titles[0].replace("신입생", "").trim() + " / " + titles[1], info_ratio: result[5] + " / " + result[6], info_cost_title: titles[2], info_cost: result[7], info_address: result[3]}}, "custom");
				//Api.replyRoom(room, JSON.stringify(result), false);
		}
	} catch(e) {
	 //Log.e(e + " # " + e.lineNumber);
		Api.replyRoom(room, "해당 학교 정보가 없습니다.\n" + e + " #" + e.lineNumber, false);
	}
}

function getCatlinks(text) {
	try {
	var doc = org.jsoup.Jsoup.connect("https://ko.wikipedia.org/wiki/" + encodeURI(text)).userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36").get();
	 	 	 var li = doc.select("div.catlinks ul > li");
	 	 	 var head = doc.select("h1.firstHeading").text();
	 	 	 var result = [];
	 	 	 for(var i = 0; i < li.size(); i++) {
	 	 	 	 result.push(li.get(i).select("a").text());
	 	 	}
	 	 if(result.length <= 10) {
	 	 	 return "◀" + head + " 문서의 분류(" + result.length + "개)▶\n\n" + result.join("\n");
	 	 	} else if(result.length >= 11) {
	 	 		 return "◀" + head + " 문서의 분류(" + result.length + "개)▶" + compress + "\n\n" + result.join("\n");
	 	 	}
	 	 } catch(e) {
	 	 	 Log.e(e);
	 	 }
}

function ip6to4(i6) {
  var s=i6.split(':');
  if(s.filter(x=>x.length==0).length>1)
  {
    return null;
  }
  if(s.includes(''))
  {
    s[s.indexOf('')]=new Array(8-s.length+1).fill('0').join(':');
    s=s.join(':').split(':');
  }
  s=s.map(x=>x.padStart(4,'0')).join('').substring(24).split(/(.{2})/).filter(String).map(x=>parseInt(x,16)).join('.');
  return s;
}

function getHostAndIP(str) {
	if(!isNaN(str) || str.length < 0) {
		return "올바른 URL을 입력해 주세요.";
	}
	try {
		var url = new java.net.URL(str);
		var host = url.getHost();
		var address = java.net.Inet4Address.getByName(host).getHostAddress();//.toString().split("/")[1];
  if(address.includes(":")) {
    address = ip6to4(address);
  }
		
		return "◀호스트/IP 정보▶\n\n" + "호스트 : " + host + "\nIP : " + address;
	} catch(e) {
		return "오류가 발생하였습니다.\n\n" + e.message;
	}
}

function convertV6toV4(value) {
  var split_str = value.split(':');
  value = split_str[6] + split_str[7];
  var ip_1 = ~parseInt(value.substring(0,2),16) & 0xFF;
  var ip_2 =~parseInt(value.substring(2,4),16) & 0xFF;
  var ip_3 =~parseInt(value.substring(4,6),16) & 0xFF;
  var ip_4 =~parseInt(value.substring(6,8),16) & 0xFF;
  return ip_1 + "." + ip_2 + "." + ip_3 + "." + ip_4;
}

function trackingIP(ip) {
	try {
		var response = JSON.parse(org.jsoup.Jsoup.connect("http://api.ipstack.com/" + ip + "?access_key=b224af95d7c71c60bc7ab5c154992cd1&hostname=1")
						.method(org.jsoup.Connection.Method.GET)
						.ignoreContentType(true)
						.execute().parse().text());
		var result = [];
		result.push("IP : " + response["ip"]);
		result.push("호스트 : " + response["hostname"]);
		result.push("타입 : " + response["type"]);
		result.push("국가코드 : " + response["country_code"]);
		result.push("국가 : " + response["country_name"]);
		result.push("국기(이모지) : " + response["location"]["country_flag_emoji"]);
		result.push("지역 : " + response["region_name"]);
		result.push("도시 : " + response["city"]);
		result.push("위치 : " + "maps.google.com/maps?q=" + response["latitude"] + "," + response["longitude"]);
		
		return "◀아이피 추적 결과▶\n\n" + result.join("\n");
	} catch (e) {
		return "오류가 발생하였습니다.\n\n" + e.message;
	}
}

function SearchClass(str) {
	try {
		var doc = org.jsoup.Jsoup.connect("https://developer.android.com/s/results?q=" + str).get();
		var div = doc.select("devsite-reference-results");
		Log.d(div);
		if(div.size() == 0) {
			return "해당 클래스를 찾을 수 없습니다.";
		} else {
			var result = [];
			var li = div.select("ul.devsite-reference-results-list > li");
			
			for(var i = 0; i < li.size(); i++) {
				result.push(li.select("a").text());
			}
			if(result.length > 5) {
				return "◀클래스 검색 결과▶(" + result.length + "개)" + compress + "\n\n" + result.join("\n");
			} else {
				return "◀클래스 검색 결과▶(" + result.length + "개)\n\n" + result.join("\n");
			}
		}
	} catch (e) {
		return "오류가 발생하였습니다.\n\n" + e.message;
	}
}

/*대한민국 국군 부대 검색 v1.0.0 by Indvel
*Based on Wikipedia
*/
function getArmyUnit(name) {
  try {
    var name = name.toUpperCase();
    if(FileStream.read(roomPath + "/armyunits.txt") == "" || !new java.io.File(roomPath + "/armyunits.txt").exists()) {
	var doca = org.jsoup.Jsoup.connect("https://ko.m.wikipedia.org/wiki/%EB%8C%80%ED%95%9C%EB%AF%BC%EA%B5%AD_%EC%9C%A1%EA%B5%B0%EC%9D%98_%EB%B6%80%EB%8C%80_%EC%A1%B0%EC%A7%81_%EB%B0%8F_%ED%8E%B8%EC%84%B1_%EB%AA%A9%EB%A1%9D").get();
 var docaf = org.jsoup.Jsoup.connect("https://ko.m.wikipedia.org/wiki/%EB%8C%80%ED%95%9C%EB%AF%BC%EA%B5%AD_%EA%B3%B5%EA%B5%B0%EC%9D%98_%EB%B6%80%EB%8C%80_%EC%A1%B0%EC%A7%81_%EB%B0%8F_%ED%8E%B8%EC%84%B1_%EB%AA%A9%EB%A1%9D").get();
 var docn = org.jsoup.Jsoup.connect("https://ko.m.wikipedia.org/wiki/%EB%8C%80%ED%95%9C%EB%AF%BC%EA%B5%AD_%ED%95%B4%EA%B5%B0%EC%9D%98_%EB%B6%80%EB%8C%80_%EC%A1%B0%EC%A7%81_%EB%B0%8F_%ED%8E%B8%EC%84%B1_%EB%AA%A9%EB%A1%9D").get();
 var json = [];
 var nicks = doca.html().split("multicol")[1].split("</section><h2")[0].split("/wiki/");
 var table2 = docaf.select("section.mf-section-2 a");
 var table3 = docn.select("section.mf-section-2 li");
 for(var i = 1; i < nicks.length; i++) { 
  var txt = nicks[i].split(">")[1].split("</a")[0].trim();
  if(txt != "") { 
    if(nicks[i].split("</a> \"")[1] != undefined) {
    json.push({name: txt, nick: nicks[i].split("</a> \"")[1].split("\"")[0].trim()});
    } else {
      json.push({name: txt, nick: ""});
    }
  }
}
for(var a = 0; a < table2.size(); a++) {
  var txt2 = table2.get(a).text().replace("편집", "").trim();
  if(txt2 != "") json.push({name: txt2, nick: ""});
}
for(var n = 0; n < table3.size(); n++) {
  var txt3 = table3.get(n).text().replace("편집", "").trim();
  if(txt3.split("⭐") != undefined) {
    txt3 = txt3.split("⭐")[0];
  }
  if(txt3.split("[") != undefined) {
    txt3 = txt3.split("[")[0];
  }
  if(txt3.split("-") != undefined) {
    txt3 = txt3.split("-")[0];
  }
  if(txt3 != "") json.push({name: txt3, nick: ""});
 }
FileStream.write(roomPath + "/armyunits.txt", JSON.stringify(json));
army_units = json;
}
 var result = [];
 for(var j = 0; j < army_units.length; j++ ) {
   if(army_units[j].nick.includes("|")) {
     var sp = army_units[j].nick.split("|");
     if(sp.includes(name)) {
     	
     	if(army_units[j].pos != "") {
     		 result.push(army_units[j].name + "(" + army_units[j].nick.replace("|", "/") + ") [" + army_units[j].pos + "]");
     	} else {
     		result.push(army_units[j].name);
     	}
     }
   } else {
   if(army_units[j].name.includes(name) || army_units[j].nick.includes(name) || army_units[j].pos == name || army_units[j].name == name) {
     if(army_units[j].pos != "") {
     		 result.push(army_units[j].name + "(" + army_units[j].nick.replace("|", "/") + ") [" + army_units[j].pos + "]");
     	} else {
     		result.push(army_units[j].name);
     	}
   }
  }
 }
 if(result.length > 10) {
				return "◀군부대 검색 결과(" + result.length + "개)▶" + compress + "\n\n" + result.join("\n").trim();
			} else if(result.length == 0) {
				 return "해당 부대를 찾을 수 없습니다.";
			} else {
				return "◀군부대 검색 결과(" + result.length + "개)▶\n\n" + result.join("\n").trim();
			}
 } catch(e) {
   Log.e(e + " #" + e.lineNumber);
 }
}

function getAnim(name) {
  var json = JSON.parse(org.jsoup.Jsoup.connect("https://laftel.net/api/search/v1/keyword/?keyword=" + name).header("Laftel", "TeJava").ignoreContentType(true).get().body().text());
  var list = json["results"];
  var temp = {};
  if(json["count"] == 0) return temp;
  var len = list.length >= 5 ? 5 : list.length;
  for(var i = 0; i < len; i++) {
    temp["link" + (i+1)] = list[i].id;
    temp["title" + (i+1)] = list[i].name;
    temp["tag" + (i+1)] = list[i].genres.map(item => "#" + item).join("");
    temp["img" + (i+1)] = list[i].img;
    temp["keyword"] = name;
  }
  return temp;
}

function slotMachine(sender) {
	var a = Math.floor(Math.random()*7+1)
    var b = Math.floor(Math.random()*7+1)
    var c = Math.floor(Math.random()*7+1);
    var o = ['□■□','■■□','□■□','□■□','□■□']
    var t = ['■■■','□□■','■■■','■□□','■■■']
    var th = ['■■■','□□■','■■■','□□■','■■■']
    var f = ['■□■','■□■','■■■','□□■','□□■']
    var fi = ['■■■','■□□','■■■','□□■','■■■']
    var s = ['■■■','■□□','■■■','■□■','■■■']
    var se = ['■■■','□□■','□□■','□□■','□□■']
    var ca = {1:o,2:t,3:th,4:f,5:fi,6:s,7:se}
    var first = ca[a]; var second = ca[b]; var third = ca[c]
    var list = ""
    for(var i = 0;i<5;i++){
        list += first[i]+'  '+second[i]+'  '+third[i]+"\n"
    }
list = list.replace(/□/g,"░").replace(/■/g,"█")
    if(a == b && b == c) {
        return list + "\n" + sender +"님이 당첨되셨습니다! 축하드립니다!\n(돈) (돈) (돈) (돈) (돈) (돈) (돈)";
    } else {
        return list + "\n꽝!! 아쉽네요 ㅠㅠ..\n숫자 세 개가 모두 같아야 당첨입니다!";
    }
}

function getTotals() {
  var dir = new java.io.File(logPath).listFiles();
  var sum  = 0;
  for(var i = 0; i < dir.length; i++) {
    sum += new java.io.File(dir[i]).list().length;
    }
	var result = [];
	result[0] = "◀디벨봇 통계▶\n";
	result[1] = "활성화 된 채팅방 : " + rooms.length + "개";
	result[2] = "로그 사용 채팅방 : " + logRooms.length + "개";
 result[3] = "총 로그파일 개수 : " + numberWithCommas(sum) + "개"
	result[4] = "총 명령어 개수 : " + cmdHelps.length + "개";
	result[5] = "명령어 제한 채팅방 : " + denyRooms.length + "개";
	result[6] = "전체 총 채팅 횟수 : " + numberWithCommas(AppData.getInt("totalChats")) + "회";
	result[7] = "디벨봇을 부른 횟수 : " + numberWithCommas(AppData.getInt("totalCalls")) + "회";
	result[8] = "명령어 사용 횟수 : " + numberWithCommas(AppData.getInt("totalUses")) + "회";
	result[9] = "지진/화산 확인 횟수 : " + numberWithCommas(AppData.getInt("totalCheckEq")) + "회";
	result[10] = "지진/화산 감지 횟수 : " + numberWithCommas(AppData.getInt("totalEarthquake")) + "회";
 result[11] = "디벨봇 용량 : " + botSize;

	return result.join("\n");
}

function getTMI() {
	var result = "";
	var total = 0;
	for (var key in tmi) {
		total += tmi[key].count;
	}
	for(var i = 0; i < tmi.length; i++) {
		var ratio = ((tmi[i].count / total) * 100).toFixed(2);
		result += (i + 1) + ". " + tmi[i].name + " [" + numberWithCommas(tmi[i].count) + "회, " + ratio + "%]\n";
	}
	if(tmi.length > 10) {
		return "◀디벨봇 명령어 사용 비율▶" + compress + "\n\n" + "총 " + numberWithCommas(total) + "회\n\n" + result.trim();
	} else {
		return "◀디벨봇 명령어 사용 비율▶\n\n" + "총 " + numberWithCommas(total) + "회\n\n" + result.trim();
	}
}

function searchMembers(query, room) {
	var result = [];
	var members = JSON.parse(FileStream.read(logPath + "/" + room + "/members.txt"));
	for(var i = 0; i < members.length; i++) {
		if(members[i].name.indexOf(query) != -1 || members[i].hash == query) {
			if(isAdmin(members[i].hash, null)) {
				result.push(members[i].name + "(" + members[i].hash + ", ID: " + members[i].id + ")[관리자] / 등록: " + members[i].regTime);
			} else {
				result.push(members[i].name + "(" + members[i].hash + ", ID: " + members[i].id + ") / 등록: " + members[i].regTime);
			}
		}
	}
	if(result.length >= 10) {
		return "◀멤버 검색 결과▶" + compress + "\n\n" + "총 " + numberWithCommas(result.length) + "명\n\n" + result.join("\n");
	} else {
		return "◀멤버 검색 결과▶\n\n" + "총 " + numberWithCommas(result.length) + "명\n\n" + result.join("\n");
	}
	}
 
 function searchMembers2(query, room) {
   var result = [];
	var members = JSON.parse(FileStream.read(logPath + "/" + room + "/logMembers.txt"));
 if(members == null) {
   return "먼저 로그 분석을 해주세요.";
 }
	for(var i = 0; i < members.length; i++) {
		if(members[i].name.indexOf(query) != -1) {	
				result.push(members[i].name + " / 등록: " + members[i].regTime);
		}
	}
	if(result.length >= 10) {
		return "◀멤버 검색 결과▶" + compress + "\n\n" + "총 " + numberWithCommas(result.length) + "명\n\n" + result.join("\n");
	} else {
		return "◀멤버 검색 결과▶\n\n" + "총 " + numberWithCommas(result.length) + "명\n\n" + result.join("\n");
	}
 }
	
	function getAllMembers(room) {
	var result = [];
	var members = JSON.parse(FileStream.read(logPath + "/" + room + "/members.txt"));
	for(var i = 0; i < members.length; i++) {
			if(isAdmin(members[i].hash, null)) {
				result.push(members[i].name + "(" + members[i].hash + ")[관리자] / 등록: " + members[i].regTime);
			} else {
				result.push(members[i].name + "(" + members[i].hash + ") / 등록: " + members[i].regTime);
			}
		}
	
	if(result.length >= 10) {
		return "◀" + room + "의 멤버 목록▶" + compress + "\n\n" + "총 " + numberWithCommas(result.length) + "명\n\n" + result.join("\n");
	} else {
		return "◀" + room + "의 멤버 목록▶\n\n" + "총 " + numberWithCommas(result.length) + "명\n\n" + result.join("\n");
	}
}

function getAllMembers2(room) {
	var result = [];
	var members = JSON.parse(FileStream.read(logPath + "/" + room + "/logMembers.txt"));
 if(members == null) {
   return "먼저 로그 분석을 해주세요.";
 }
	for(var i = 0; i < members.length; i++) {
				result.push(members[i].name + " / 등록: " + members[i].regTime);
		}
	
	if(result.length >= 10) {
		return "◀" + room + "의 멤버 목록▶" + compress + "\n\n" + "총 " + numberWithCommas(result.length) + "명\n\n" + result.join("\n");
	} else {
		return "◀" + room + "의 멤버 목록▶\n\n" + "총 " + numberWithCommas(result.length) + "명\n\n" + result.join("\n");
	}
}

function checkFishRank(id) {
  var idx = fishInfos.findIndex(e => e.id == id);
  var count = 0;
  for(var i = 0; i < fish.length; i++) {
    if(fish[i].who == fishInfos[idx].name) {
      count++;
    }
  }
  if(count >= 10) {
    return true;
  } else {
    return false;
  }
}

function getFishRank() {
	var result = "";
	var total = fish.length;
	var sum = 0;
	for(var i = 0; i < fish.length; i++) {
		var prefix = "";
		if(i == 0) {
			 prefix = "🥇";
		} else if(i == 1) {
			 prefix = "🥈";
		} else if(i == 2) {
			 prefix = "🥉";
		} else {
			 prefix = (i + 1) + ".";
		}
		result += prefix + " " + fish[i].name + " " + fish[i].size + "cm [ " + fish[i].who.split("")[0] + "** ]\n";
		sum += Number(fish[i].size);
	}
	var avg = (sum / total).toFixed(2);
	if(result.split("\n").length > 10) {
		return "◀디벨봇 낚시 순위▶" + compress + "\n\n" + "총 " + numberWithCommas(total) + "개\n평균 크기 : " + avg + "cm\n\n" + result.trim();
	} else {
		return "◀디벨봇 낚시 순위▶\n\n" + "총 " + numberWithCommas(total) + "개\n\n" + result.trim();
	}
}

function getCoinRank() {
	var result = "";
	var total = fishInfos.length;
	var sum = 0;
	var sorted = fishInfos.sort(function (a, b) {
								return a.coin > b.coin ? -1 : a.coin < b.coin ? 1 : 0;
							});
	for(var i = 0; i < sorted.length; i++) {
		var prefix = "";
		if(i == 0) {
			 prefix = "🥇";
		} else if(i == 1) {
			 prefix = "🥈";
		} else if(i == 2) {
			 prefix = "🥉";
		} else {
			 prefix = (i + 1) + ".";
		}
		result += prefix + " " + sorted[i].name.split("")[0] + "** : " + setWon(numberWithCommas(sorted[i].coin)).replace("원", "") + "코인\n";
		sum += Number(sorted[i].coin);
	}
	var avg = Math.floor(sum / total);
	if(result.length > 10) {
		return "◀디벨봇 낚시 코인 순위▶" + compress + "\n\n" + "평균 " + setWon(numberWithCommas(avg)).replace("원", "") + " 코인\n\n" + result.trim();
	} else {
		return "◀디벨봇 낚시 코인 순위▶\n\n" + "평균 " + setWon(numberWithCommas(avg)).replace("원", "") + " 코인\n\n" + result.trim();
	}
}

function getUpgRank() {
	var result = "";
	var sorted = fishInfos.sort(function (a, b) {
								return a.ability > b.ability ? -1 : a.ability < b.ability ? 1 : 0;
							});
	for(var i = 0; i < sorted.length; i++) {
		var prefix = "";
		if(i == 0) {
			 prefix = "🥇";
		} else if(i == 1) {
			 prefix = "🥈";
		} else if(i == 2) {
			 prefix = "🥉";
		} else {
			 prefix = (i + 1) + ".";
		}
		result += prefix + " " + sorted[i].name.split("")[0] + "** : " + sorted[i].grade + "강 [기본 크기 +" + sorted[i].ability + "]\n"
	}
	if(result.length > 10) {
		return "◀디벨봇 낚시 강화 순위▶" + compress + "\n\n" + result.trim();
	} else {
		return "◀디벨봇 낚시 강화 순위▶\n\n" + result.trim();
	}
}

function getFishInfo() {
	var result = {};
	var list = fishes.sort();
	var fixed = Array.from(new Set(list));
	var fishCount = 0;
	
		for(var i of list) {
				 
				 if(result[i]) result[i] += 100 / list.length;
				 else result[i] = 100 / list.length;
		}
		for(var j of fixed) {
			 if(nonFishes.indexOf(j) == -1) {
			 	 fishCount++;
			 }
		}
		var brat = 0;
		for(var k of bonus) {
			 if(Number(k) == 1) {
			 	 brat += 100 / bonus.length;
			 }
		}
		
		var resrt = [];
		for(var k in result) resrt.push(k + " : " + result[k].toFixed(2) + "%");
	 
	return "◀디벨봇 낚시 확률 정보▶" + compress + "\n\n" + "총 물고기 수 : " + numberWithCommas(fishCount) + "개\n" + "잡동사니 개수 : " + nonFishes.length + "개\n낚은 물고기 수 : " + numberWithCommas(totalFish) + "개\n랜덤 보너스 확률 : " + brat.toFixed(2) + "%\n\n" + resrt.join("\n");
}

function getAdmin() {
	var result = [];
	for(var i = 0; i < admin.length; i++) {
		result.push(admin[i].name + " (" + admin[i].hash + ", ID: " + admin[i].id + ") [" + adminLevel[admin[i].level].name + "]");
	}
	return "◀디벨봇 관리자 목록▶" + compress + "\n\n" + result.join("\n");
}

function test() {
	 var doc = org.jsoup.Jsoup.connect("https://developers.kakao.com/sdk/js/kakao.min.js").ignoreContentType(true).get().text();
	 eval(doc);
	 return Kakao;
}

function getStatus() {
	var result = [];
	var charging = Device.isCharging() ? "Yes" : "No";
	var speed = "";
	var isWifi = false;
	var freq = "";
	var network = "";
	var cm = Api.getContext().getSystemService(android.content.Context.CONNECTIVITY_SERVICE);
	var ssid = "";
	var wifi = cm.getNetworkInfo(android.net.ConnectivityManager.TYPE_WIFI);
	var mobile = cm.getNetworkInfo(android.net.ConnectivityManager.TYPE_MOBILE);
	
	if(wifi.isConnectedOrConnecting()) {
		isWifi = true;
		speed = Api.getContext().getSystemService(android.content.Context.WIFI_SERVICE).getConnectionInfo().getLinkSpeed() + "Mbps";
		freq = (Api.getContext().getSystemService(android.content.Context.WIFI_SERVICE).getConnectionInfo().getFrequency() * 0.001).toFixed(1) + "Ghz";
		network = "Wi-Fi";
		var act = cm.getActiveNetworkInfo();
		if(act != null && act.isConnected()) {
			ssid = act.getExtraInfo();
		}
	} else if(mobile.isConnectedOrConnecting()){
		isWifi = false;
		speed = "";
		network = "모바일 데이터";
	} else {
		isWifi = false;
		speed = "";
		network = "연결 없음";
	}
	
	var profile = java.lang.Class.forName("com.android.internal.os.PowerProfile").getConstructor(android.content.Context).newInstance(Api.getContext());
	var capacity = java.lang.Class.forName("com.android.internal.os.PowerProfile").getMethod("getBatteryCapacity").invoke(profile).toFixed(4).replace(/(0+$)/, "").replace("\.", "");
	
	var name = android.provider.Settings.Global.getString(Api.getContext().getContentResolver(), "device_name");
 var time = java.lang.System.currentTimeMillis();
 var bool = java.net.InetAddress.getByName("1.1.1.1").isReachable(1000);
 var ms;
 if(bool) { ms = (java.lang.System.currentTimeMillis() - time) + "ms";
 } else {
   ms = "-";
 }
	
	result[0] = "◀현재 디벨봇 상태▶\n\n";
	result[1] = "모델명 : " + android.os.Build.MODEL + "(" + name + ")\n";
	result[2] = "안드로이드 버전 : " + android.os.Build.VERSION.RELEASE + "\n";
	result[3] = "\n메모리 사용 : " + getMemoryInfo() + "\n";
	result[4] = "저장공간 : " + getSpaceInfo() + "\n";
	result[5] = "\n배터리 충전여부 : " + charging + "\n";
	result[6] = "배터리 용량 : " + capacity + "mAh\n";
	result[7] = "배터리 잔량 : " + Device.getBatteryLevel() + "%\n";
	result[8] = "배터리 온도 : " + (Device.getBatteryTemperature() / 10) + "℃\n";
if(Device.getPlugType() != "unknown") {
 result[9] = "플러그 타입 : " + Device.getPlugType().toUpperCase() + "\n";
} else {
 result[9] = "";
}
	result[10] = "배터리 전압 : " + (Device.getBatteryVoltage() * 0.001).toFixed(2) + "V\n";
if(speed != "") {
	 result[11] = "네트워크 연결 : " + network + "\n";
	 result[12] = "SSID : " + ssid + "\n";
	 result[13] = "네트워크 속도 : " + speed + "\n";
	 result[14] = "네트워크 주파수 : " + freq + "\n";
  result[15] = "핑 : " + ms;
} else {
 result[11] =  "네트워크 연결 : " + network + "\n";
 result[12] = "SSID : " + cm.getActiveNetworkInfo().getExtraInfo() + "\n";
 result[13] = "핑 : " + ms;
}
	
	return result.join("");
}

 const pm = Api.getContext().getPackageManager();
 var pkgs = null;

function searchApps(str) {
  if(pkgs == null) {
    pkgs = pm.getInstalledPackages(0);
  }
 var result = [];
 for(var i  = 0; i < pkgs.size(); i++) {
   var p = pkgs.get(i);
   var label = p.applicationInfo.loadLabel(pm).toString();
   var pkg = p.applicationInfo.packageName;
   if(String(label).includes(str) || String(pkg).includes(str)) {
     result.push(String(label) + "\n" + String(pkg));
   }
  }
   if(result.length > 5) {
     return "◀앱 검색 결과(" + result.length + "개)▶" + compress + "\n\n" + result.join("\n\n");
   } else if(result.length == 0) {
     return "해당 앱을 찾을 수 없습니다.";
   } else {
     return "◀앱 검색 결과(" + result.length + "개)▶\n\n" + result.join("\n\n");
   }
 }

function getTopActivity() {
	var av = Api.getContext().getSystemService(Api.getContext().ACTIVITY_SERVICE);
	var rti = av.getRunningTasks(999);
	var result = [];
	
	for(var i = 0; i < rti.size(); i++) {
		result.push(rti.get(i).topActivity.getClassName());
	}
	
	return "◀봇이 실행 중인 앱 목록▶" + compress + "\n\n" + result.join("\n");
}

function getCpuInfo() {
	 try {
let args = ["/system/bin/cat", "/proc/cpuinfo"];
let cmd = new java.lang.ProcessBuilder(args);
let process = cmd.start();
let isr = new java.io.InputStreamReader(process.getInputStream());
let br = new java.io.BufferedReader(isr);
let result = br.readLine();
let test = "";
while ((test = br.readLine()) != null){ 
result += "\n" + test;
}
isr.close();
br.close();
return result;
	} catch(e) {
		 Log.e(e + " #" + e.lineNumber);
	}
}

function digital(a, c){
var b=[["■■■","■□■","■□■","■□■","■■■"],
["□■□","■■□","□■□","□■□","■■■"],
["■■■","□□■","■■■","■□□","■■■"], 
["■■■","□□■","■■■","□□■","■■■"], 
["■□■","■□■","■■■","□□■","□□■"], 
["■■■","■□□","■■■","□□■","■■■"], 
["■■■","■□□","■■■","■□■","■■■"], 
["■■■","■□■","□□■","□□■","□□■"],
["■■■","■□■","■■■","■□■","■■■"], 
["■■■","■□■","■■■","□□■","■■■"], 
["□□□","□□□","□□□","□□□","□□□"], 
["□","■","□","■","□"]];

var a1=b[Number(a[0].replace("e",10))];
var a2=b[Number(a[1].replace("e",10))];
var a3=b[Number(a[2].replace("e",10))];
var a4=b[Number(a[3].replace("e",10))];
var log="";
if(c==0){
for(var i=0 ; i<5 ; i++){
log+="\n"+a1[i]+" "+a2[i]+" "+b[11][i]+" "+a3[i]+" "+a4[i];
}
}else{
for(var i=0 ; i<5 ; i++){
log+="\n"+a1[i]+" "+a2[i]+" "+a3[i]+" "+a4[i];
}
}
return log.replace(/□/g,"░").replace(/■/g,"█");
}

function conNameRoma(value) {
	try {
		var clientId = "NsAftFi1Y8K_KzII3Uk6";//애플리케이션 클라이언트 아이디값";
		var clientSecret = "HArOtEagWo";//애플리케이션 클라이언트 시크릿값";
		var text = java.net.URLEncoder.encode(value, "UTF-8");
		var apiURL = "https://openapi.naver.com/v1/krdict/romanization?query="+ text;
		var url = new java.net.URL(apiURL);
		var con = url.openConnection();
		con.setRequestMethod("GET");
		con.setRequestProperty("X-Naver-Client-Id", clientId);
		con.setRequestProperty("X-Naver-Client-Secret", clientSecret);
		var responseCode = con.getResponseCode();
		var br;
		if(responseCode == 200) { // 정상 호출
			br = new java.io.BufferedReader(new java.io.InputStreamReader(con.getInputStream()));
		} else { // 에러 발생
			br = new java.io.BufferedReader(new java.io.InputStreamReader(con.getErrorStream()));
			return "오류가 발생하였습니다.";
		}
		var inputLine;
		var response = new java.lang.StringBuffer();
		while ((inputLine = br.readLine()) != null) {
			response.append(inputLine);
		}
		br.close();

		var str = "◀\""+value+"\"의 로마자 표기▶\n\n";
		var t = JSON.parse(response);
		var u = t['aResult'][0]['aItems'];
		for(var a in u){
			var v = t['aResult'][0]['aItems'][a]
			str += v['name'] + " - 사용빈도: " + v['score']+"%\n";
		}
		return str.trim();
	} catch(e) {
		  Log.e(e);
		  return "에러가 발생하였습니다.";
	}
}

function PapagoNMT(source, target, value) {
	try {
		var srcLang = "";
		var tarLang = getLangCodeByName(target);
		if(tarLang == "") {
			return "번역 대상 언어가 잘못되었습니다.";
		}
  if(source != null) {
   srcLang = getLangCodeByName(source);
  } else {
		 srcLang = PapagoDetect(value.trim());
  }
		var clientId = "NsAftFi1Y8K_KzII3Uk6";//애플리케이션 클라이언트 아이디값";
		var clientSecret = "HArOtEagWo";//애플리케이션 클라이언트 시크릿값";
		var text = java.net.URLEncoder.encode(value.trim(), "UTF-8");
		var apiURL = "	https://openapi.naver.com/v1/papago/n2mt";
		var url = new java.net.URL(apiURL);
		var con = url.openConnection();
		con.setRequestMethod("POST");
		con.setRequestProperty("X-Naver-Client-Id", clientId);
		con.setRequestProperty("X-Naver-Client-Secret", clientSecret);
		
		var params = "source=" + srcLang + "&target=" + tarLang + "&text=" + text;
		con.setDoInput(true);
		var wr = new java.io.DataOutputStream(con.getOutputStream());
		wr.writeBytes(params);
		wr.flush();
		wr.close();
		var responseCode = con.getResponseCode();
		var br;
		if(responseCode == 200) { // 정상 호출
			br = new java.io.BufferedReader(new java.io.InputStreamReader(con.getInputStream()));
		} else { // 에러 발생
			br = new java.io.BufferedReader(new java.io.InputStreamReader(con.getErrorStream()));
		}
		var inputLine;
		var response = new java.lang.StringBuffer();
		while ((inputLine = br.readLine()) != null) {
			response.append(inputLine);
		}
		br.close();
		if(response.indexOf("errorMessage") != -1) {
			return JSON.parse(response)["errorMessage"] + "\n\n대상 언어 : " + getLangCodeByName(srcLang);
		} else {
			var json = JSON.parse(response);
			var src = getLangCodeByName(json.message.result["srcLangType"]);
			var tar = getLangCodeByName(json.message.result["tarLangType"]);
			var tr = json.message.result["translatedText"];
			return "◀파파고 번역 결과▶\n\n" + value.trim() + "\n\n" + src + " ↑↓ " + tar + "\n\n" + tr;
		}
	} catch(e) {
		Log.e(e + " #" + e.lineNumber);
		return "에러가 발생하였습니다.";
	}
}

function PapagoDetect(value) {
	var clientId = "NsAftFi1Y8K_KzII3Uk6";//애플리케이션 클라이언트 아이디값";
	var clientSecret = "HArOtEagWo";//애플리케이션 클라이언트 시크릿값";
	var text = java.net.URLEncoder.encode(value, "UTF-8");
	var apiURL = "	https://openapi.naver.com/v1/papago/detectLangs";
	var url = new java.net.URL(apiURL);
	var con = url.openConnection();
	con.setRequestMethod("POST");
	con.setRequestProperty("X-Naver-Client-Id", clientId);
	con.setRequestProperty("X-Naver-Client-Secret", clientSecret);
	
	var params = "query=" + text;
	con.setDoInput(true);
	var wr = new java.io.DataOutputStream(con.getOutputStream());
	wr.writeBytes(params);
	wr.flush();
	wr.close();
	var responseCode = con.getResponseCode();
	var br;
	if(responseCode == 200) { // 정상 호출
		br = new java.io.BufferedReader(new java.io.InputStreamReader(con.getInputStream()));
	} else { // 에러 발생
		br = new java.io.BufferedReader(new java.io.InputStreamReader(con.getErrorStream()));
	}
	var inputLine;
	var response = new java.lang.StringBuffer();
	while ((inputLine = br.readLine()) != null) {
		response.append(inputLine);
	}
	br.close();
	
	return JSON.parse(response)["langCode"];
}

function getDictionary(value) {
	try {
		var clientId = "NsAftFi1Y8K_KzII3Uk6";//애플리케이션 클라이언트 아이디값";
		var clientSecret = "HArOtEagWo";//애플리케이션 클라이언트 시크릿값";
		var text = java.net.URLEncoder.encode(value, "UTF-8");
		var apiURL = "https://openapi.naver.com/v1/search/encyc.xml?query="+ text + "&display=1&start=1&sort=sim";
		var url = new java.net.URL(apiURL);
		var con = url.openConnection();
		con.setRequestMethod("GET");
		con.setRequestProperty("X-Naver-Client-Id", clientId);
		con.setRequestProperty("X-Naver-Client-Secret", clientSecret);
		var responseCode = con.getResponseCode();
		var br;
		if(responseCode == 200) { // 정상 호출
			br = new java.io.BufferedReader(new java.io.InputStreamReader(con.getInputStream()));
		} else { // 에러 발생
			br = new java.io.BufferedReader(new java.io.InputStreamReader(con.getErrorStream()));
			return "오류가 발생하였습니다.";
		}
		var inputLine;
		var response = new java.lang.StringBuffer();
		while ((inputLine = br.readLine()) != null) {
			response.append(inputLine);
		}
		br.close();
		
		var result = "";
		var doc = org.jsoup.Jsoup.parse(response.toString());
		var title = doc.select("item > title").text().replace(/(<([^>]+)>)/g, "");
		if(doc.select("item").isEmpty()) {
			result = value + "에 대한 결과가 없습니다.";
		} else {
			result = "◀" + value + "에 대한 사전 결과▶\n\n";
			result += "<" + title + ">\n";
			result += doc.select("item > description").text().replace(/(<([^>]+)>)/g, "") + "\n\n";
			result += response.toString().split("<item>")[1].split("<link>")[1].split("<")[0].trim();
		}
		return result;
	} catch(e) {
		  Log.e(e);
		  return "에러가 발생하였습니다.";
	}
}

var convertEngToKor = function(args) {

	var engChosung = "rRseEfaqQtTdwWczxvg"

	var engChosungReg = "[" + engChosung + "]";

	var engJungsung = {k:0,o:1,i:2,O:3,j:4,p:5,u:6,P:7,h:8,hk:9,ho:10,hl:11,y:12,n:13,nj:14,np:15,nl:16,b:17,m:18,ml:19,l:20};

	var engJungsungReg = "hk|ho|hl|nj|np|nl|ml|k|o|i|O|j|p|u|P|h|y|n|b|m|l";

	var engJongsung = {"":0,r:1,R:2,rt:3,s:4,sw:5,sg:6,e:7,f:8,fr:9,fa:10,fq:11,ft:12,fx:13,fv:14,fg:15,a:16,q:17,qt:18,t:19,T:20,d:21,w:22,c:23,z:24,x:25,v:26,g:27};

	var engJongsungReg = "rt|sw|sg|fr|fa|fq|ft|fx|fv|fg|qt|r|R|s|e|f|a|q|t|T|d|w|c|z|x|v|g|";

	var regExp = new RegExp("("+engChosungReg+")("+engJungsungReg+")(("+engJongsungReg+")(?=("+engChosungReg+")("+engJungsungReg+"))|("+engJongsungReg+"))","g");



	var converter = function (args, cho, jung, jong) {

		return String.fromCharCode(engChosung.indexOf(cho) * 588 + engJungsung[jung] * 28 + engJongsung[jong] + 44032);

	};

	var result = args.replace(regExp, converter);

	return result;
}

function downFile(url, path, fileName, activity) {
var ctx = activity;
ctx.runOnUiThread(new java.lang.Runnable( {run: function(){
try{
var uri = new android.net.Uri.parse(url)
var request = new android.app.DownloadManager.Request(uri);
request.setTitle(fileName);
request.setDestinationInExternalPublicDir(path, fileName);
ctx.getSystemService(android.content.Context.DOWNLOAD_SERVICE).enqueue(request);
}catch(e){Log.e(e)}
}}));
}

function BMICalc(height, weight) {
	var bmi = weight / Math.pow(height, 2) * 10000;
	bmi = bmi.toFixed(2);
	
	if(isNaN(bmi)) {
		return "키와 몸무게를 정확히 입력해 주세요.";
	}

	 var result;

	   if (bmi < 18.5) {
	       result = "저체중";

	   } else if (bmi >= 18.5 && bmi <= 22.9) {
	       result = "정상체중";

	   } else if (bmi >= 23 && bmi <= 24.9) {
	       result = "과체중";

	   } else if (bmi >= 25) {
	       result = "비만";

	   } else {
	      result = "고도비만";
	   }
 return "BMI는 " + bmi + "이며, " + result + " 입니다.";
}

function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); 
}

function calcAge(birth, bDate) {
	var date = new Date();
	if(bDate != null) {
		if(bDate.replace('-', '').replace('-', '').length != 8) {
			return "기준 날짜를 정확히 입력해 주세요.";
		} else {
			date = new Date(bDate.substr(0, 4), bDate.substr(4, 2) - 1, bDate.substr(6, 2));
		}
	}
    var year = date.getFullYear();
    var month = (date.getMonth() + 1);
    var day = date.getDate();       
    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;
    var monthDay = month + day;
    var birthDate = new Date(birth.substr(0, 4), birth.substr(4, 2) - 1, birth.substr(6, 2));
    var time = date.getTime() - birthDate.getTime(); 
    birth = birth.replace('-', '').replace('-', '');
    if(birth.length != 8) return null;
    
    var birthdayy = birthDate.getFullYear();
    var birthdaymd = birth.substr(4, 4);
    var name = "경신임계갑을병정무기"[birthdayy%10]+"신유술해자축인묘진사오미"[birthdayy%12]+"년";

    if(birthdayy > year) return null;
	
	var age = Math.floor((time / 1000 / 60 / 60 / 24) / 365);
	if(isNaN(age)) {
		return null;
	}
 var days = Math.floor((date.getTime() - birthDate.getTime()) / 1000 / 60 / 60 / 24);
	var result = [];
	result.push(year + "년 " + month + "월 " + day + "일 기준");
	result.push("만 " + age + "세(총 " + days + "일)");
 result.push(name + ", " + getPet(birthdayy) + " 입니다.");
	
	return result.join("\n");
}

function getPet(year) {
	switch(year % 12) {
		case 1:
		return "닭띠";
		break;
		case 2:
		return "개띠";
		break;
		case 3:
		return "돼지띠";
		break;
		case 4:
		return "쥐띠";
		break;
		case 5:
		return "소띠";
		break;
		case 6:
		return "호랑이띠";
		break;
		case 7:
		return "토끼띠";
		break;
		case 8:
		return "용띠";
		break;
		case 9:
		return "뱀띠";
		break;
		case 10:
		return "말띠";
		break;
		case 11:
		return "양띠";
		break;
		default:
		return "원숭이띠";
		break;
	}
}

function getLangCodeByName(name) {
	var lang = [
			{name: "한국어", code: "ko"},
			{name: "영어", code: "en"},
			{name: "일본어", code: "ja"},
			{name: "중국어간체", code: "zh-CN"},
			{name: "중국어번체", code: "zh-TW"},
			{name: "스페인어", code: "es"},
			{name: "프랑스어", code: "fr"},
			{name: "러시아어", code: "ru"},
			{name: "베트남어", code: "vi"},
			{name: "태국어", code: "th"},
			{name: "인도네시아어", code: "id"},
			{name: "독일어", code: "de"},
			{name: "이탈리아어", code: "it"},
			{name: "힌디어", code: "hi"},
			{name: "포르투갈어", code: "pt"},
			{name: "페르시아어", code: "fa"},
			{name: "아랍어", code: "ar"},
			{name: "미얀마어", code: "mm"},
			{name: "알 수 없음", code: "unk"},];
	var result = "";
	
	for(var i = 0; i < lang.length; i++) {
		if(lang[i].name == name) {
			result = lang[i].code;
			break;
		} else if(lang[i].code == name) {
			result = lang[i].name;
			break;
		}
	}
	return result;
}

function fishing(db, room) {
	try {
	var h = db.getProfileHash();
	var idx = idx = fishInfos.findIndex((item, ind) => {
		return item.hash == h;
	});
	if(idx != -1) {
   if(fishInfos[idx].share != "n") {
       idx = fishInfos.findIndex((item, id) => {
     return item.id == fishInfos[idx].share;
   });
     }
		var sender = fishInfos[idx].name;
	var rand = Math.floor(Math.random() * fishes.length);
	var rand2 = r();
	var rand3 = Math.floor(Math.random() * bonus.length);
	var isNew = false;
 var exc = 0;
	
	if(Number(bonus[rand3]) == 1) {
		if(nonFishes.indexOf(fishes[rand]) == -1) {
		 var plus = Math.random() * 1000;
   if(fishInfos[idx].coin >= 5000000) {
     plus += 2000;
   }
		 rand2 += plus;
		 Api.replyRoom(room, "랜덤 보너스가 적용되어 크기가 " + plus.toFixed(2) + "cm 추가됩니다!", false);
		}
	}
 
 if(fishInfos[idx].sfh) {
   exc = 5000;
 }
	
	rand2 += fishInfos[idx].ability;
	rand2 = rand2.toFixed(2);
	
	//rand = 102;
	
	if(nonFishes.indexOf(fishes[rand]) != -1) {
		var rd = Math.floor(Math.random() * 5000);
		if(fishes[rand] == "깡통" || fishes[rand] == "똥") {
			rd = 0;
		}
		fishInfos[idx].coin += rd + exc;
				FileStream.write(roomPath + "/fish_infos.txt", JSON.stringify(fishInfos));
		return sender + "님이 " + fishes[rand] + "을(를) 낚으셨습니다. (+" + (rd + exc) + "코인)";
	} else {
		var index = -1;
		totalFish++;
		AppData.putInt("totalFishes", totalFish);
			if(fish != null) {
			index = fish.findIndex((item, idx) => {
								return item.name === fishes[rand]; 
							});
		}
		if(index != -1) {
			if(parseFloat(rand2) >= parseFloat(fish[index].size)) {
				isNew = true;
				fish[index].who = sender;
				fish[index].size = rand2;
				fish.sort(function (a, b) {
								return parseFloat(a.size) > parseFloat(b.size) ? -1 : parseFloat(a.size) < parseFloat(b.size) ? 1 : 0;
							});
				FileStream.write(roomPath + "/fish_rank.txt", JSON.stringify(fish));
			} else {
				 isNew = false;
			}
		} else {
			isNew = false;
				fish.push({name: fishes[rand], who: sender, size: rand2});
								fish.sort(function (a, b) {
								return parseFloat(a.size) > parseFloat(b.size) ? -1 : parseFloat(a.size) < parseFloat(b.size) ? 1 : 0;
							});
				FileStream.write(roomPath + "/fish_rank.txt", JSON.stringify(fish));
		}
		if(isNew) {
			fishInfos[idx].coin += Math.floor(rand2 / 3) + exc;
				FileStream.write(roomPath + "/fish_infos.txt", JSON.stringify(fishInfos));
			 return sender + "님이 " + fishes[rand] + " " + rand2 + "cm를 낚으셨으며, 기록이 갱신 되었습니다! (+" + (Math.floor(rand2 / 3) + exc) + "코인)";
		} else {
			fishInfos[idx].coin += Math.floor(rand2 / 3) + exc;
				FileStream.write(roomPath + "/fish_infos.txt", JSON.stringify(fishInfos));
	return sender + "님이 " + fishes[rand] + " " + rand2 + "cm를 낚으셨습니다. (+" + (Math.floor(rand2 / 3) + exc) + "코인)";
	 }
	}
	} else {
		return "먼저 가입을 해주세요. (@가입)";
	}
	} catch(e) {
		return e;
	}
}

function r() {
  var r = [];
  var average = 0;
  for(var i = 0; i < 5; i++) {
    r[i] = Math.random();
    average += r[i];
  }
	average /= 5;

	var result = 0;
	r.map(function(e) {
		result += Math.pow(e - average, 2);
	});

return 700 / result;
}

function upgradeFishing(d, g) {
	var h = d.getProfileHash();
	var idx = idx = fishInfos.findIndex((item, ind) => {
		return item.hash == h;
	});
	if(idx != -1) {
   if(fishInfos[idx].share != "n") {
       idx = fishInfos.findIndex((item, id) => {
     return item.id == fishInfos[idx].share;
   });
     }
   if(fishInfos[idx].lock) {
     return "강화 잠금 상태에서는 강화를 할 수 없습니다.";
   }
   if(fishInfos[idx].ability >= 50000) {
     return "더 이상 강화할 수 없습니다.";
   }
		var max = 0;
		var ratio = 0;
		var price = fishInfos[idx].grade * 100;
  if(g) {
    if(fishInfos[idx].grade < 30) {
     price = (fishInfos[idx].grade + 1) * 1500;
    } else {
      return "강화점프는 30강 미만만 사용 가능합니다."
    }
    if(fishInfos[idx].ability >= 40000) {
      price /= 2;
    }
  }
		if(fishInfos[idx].coin < price) {
			return "코인이 부족하여 강화를 할 수 없습니다. (" + (price - fishInfos[idx].coin) + "코인 부족)";
		}
		if(fishInfos[idx].grade <= 4) {
			max = 50;
			ratio = 3;
		} else if(fishInfos[idx].grade >= 5 && fishInfos[idx].grade <= 9) {
			max = 100;
			ratio = 5;
		} else if(fishInfos[idx].grade >= 10 && fishInfos[idx].grade <= 19) {
			max = 300;
			ratio = 8;
		} else if(fishInfos[idx].grade >= 20 && fishInfos[idx].grade <= 29) {
			max = 500;
			ratio = 10;
		} else if(fishInfos[idx].grade >= 30 && fishInfos[idx].grade <= 39) {
			max = 800;
			ratio = 14;
		} else if(fishInfos[idx].grade >= 40 && fishInfos[idx].grade <= 44) {
			max = 1000;
			ratio = 17;
		} else if(fishInfos[idx].grade >= 45 && fishInfos[idx].grade <= 49) {
			max = 2000;
			ratio = 30;
		} else if(fishInfos[idx].grade >= 50) {
    max = 3000;
    ratio = 38;
  }
  if(fishInfos[idx].sfh) {
    ratio -= 18;
  }
		var rd1 = Math.floor(Math.random() * ratio);
		var rd2 = Math.floor(Math.random() * (max - (max / 1.2) + 1) + (max / 1.2));
  if(g) {
    fishInfos[idx].coin -= price;
    fishInfos[idx].grade += 10;
    fishInfos[idx].ability += rd2*15;
    if(fishInfos[idx].ability >= 50000) {
      fishInfos[idx].ability = 50000;
    }
			FileStream.write(roomPath + "/fish_infos.txt", JSON.stringify(fishInfos));
			return "[점프] " + fishInfos[idx].name + "님이 낚시대 강화점프를 하셨습니다! 능력치 +" + (rd2*10) + " (-" + price + "코인)";
  } else {
		fishInfos[idx].coin -= price;
		if(rd1 <= 10) {
			if(fishInfos[idx].grade < 50) {
				fishInfos[idx].grade++;
			}
			fishInfos[idx].ability += rd2;
   if(fishInfos[idx].ability >= 50000) {
      fishInfos[idx].ability = 50000;
    }
			FileStream.write(roomPath + "/fish_infos.txt", JSON.stringify(fishInfos));
			return "[성공] " + fishInfos[idx].name + "님이 낚시대 강화에 성공하셨습니다! 능력치 +" + rd2 + " (-" + price + "코인)";
		} else if(fishInfos[idx].grade >= 46 && fishInfos[idx].grade < 50 && rd1 >= (ratio - 1)) {
				fishInfos[idx].grade = 0;
				fishInfos[idx].ability = 0;
				FileStream.write(roomPath + "/fish_infos.txt", JSON.stringify(fishInfos));
				return fishInfos[idx].name + "님의 낚시대가 파괴되었습니다. 등급과 능력치가 초기화 됩니다.";
		} else {
			if(fishInfos[idx].grade > 0) {
				fishInfos[idx].grade--;
			}
			if(fishInfos[idx].ability >= rd2) {
				fishInfos[idx].ability -= Math.floor(rd2 / 1.3);
			}
			FileStream.write(roomPath + "/fish_infos.txt", JSON.stringify(fishInfos));
			return "[실패] " + fishInfos[idx].name + "님이 강화에 실패하여 등급 및 능력치가 하락하였습니다. 능력치 -" + Math.floor(rd2 / 1.3) + " (-" + price + "코인)";
		}
  }
	} else {
		return "먼저 가입을 해주세요. (@가입)";
	}
}

function sendCoin(s, r, a) {
  var idx = fishInfos.findIndex((item, ind) => {
    return item.id == r;
  });
  if(idx == -1) {
    if(fishInfos[idx].share != "n") {
       idx = fishInfos.findIndex((item, id) => {
     return item.id == fishInfos[idx].share;
   });
     }
    return "해당 유저를 찾을 수 없습니다.";
  } else {
    var h = s.getProfileHash();
    var me = fishInfos.findIndex((item, ind) => {
      return item.hash == h;
    });
    if(!isNaN(a)) {
     fishInfos[me].coin -= a;
     fishInfos[idx].coin += a;
     FileStream.write(roomPath + "/fish_infos.txt", JSON.stringify(fishInfos));
     return fishInfos[idx].name + "에게 " + setWon(numberWithCommas(a)) + "코인을 송금했습니다.";
    } else {
      return "보낼양을 정확히 입력해 주세요.";
    }
  }
}

function myInfo(s, d, id) {
	var h = d;
	var idx = 	idx = fishInfos.findIndex((item, ind) => {
		return item.hash == h || item.id == id || item.name == s;
	});
 var share = "";
	var result = [];
	var prefix = "";
 var ratio = 0;
	if(idx != -1) {
   if(fishInfos[idx].share != "n") {
       idx = fishInfos.findIndex((item, id) => {
     return item.id == fishInfos[idx].share;
      });
      share = fishInfos[idx].shareto;
     }
     if(fishInfos[idx].shareto != "n") {
       share = fishInfos[idx].shareto;
     }
  if(fishInfos[idx].sfh && fishInfos[idx].coin >= 5000000 && fishInfos[idx].ability >= 50000) {
    result.push("[⚜명예 낚시꾼⚜]");
  }
  if(checkFishRank(fishInfos[idx].id)) {
    result.push("[🎖낚시 지배자🎖]");
  }
  if(!fishInfos[idx].sfh) {
    checkSuperFisher(fishInfos[idx].id);
    }
  if(fishInfos[idx].sfh) {
    result.push("[특급⚡피셔]");
  }
  if(fishInfos[idx].coin >= 5000000) {
    result.push("[코인💵부자]");
  }
  if(fishInfos[idx].ability >= 40000) {
    result.push("[강화🌟장인]");
  }
  if(fishInfos[idx].grade >= 50) {
    result.push("[나는⭐오성]");
  }
		result.push(fishInfos[idx].name + "의 정보");
  result.push("ID : " + fishInfos[idx].id);
  if(share != "") {
    result.push("↔️ " + share + "(공유중)\n");
  } else {
    result.push("");
  }
		result.push("코인 : " + setWon(numberWithCommas(fishInfos[idx].coin)).replace("원", "") + " 코인\n");
  result.push("🎣");
		if(fishInfos[idx].grade < 5) {
			prefix = "낡은";
		} else if(fishInfos[idx].grade >= 5 && fishInfos[idx].grade <= 9) {
			prefix = "평범한";
		} else if(fishInfos[idx].grade >= 10 && fishInfos[idx].grade <= 19) {
			prefix = "중수의";
   result.push("⭐");
		} else if(fishInfos[idx].grade >= 20 && fishInfos[idx].grade <= 29) {
			prefix = "고수의";
   result.push("⭐⭐");
		} else if(fishInfos[idx].grade >= 30 && fishInfos[idx].grade <= 39) {
			prefix = "장인의";
   result.push("⭐⭐⭐");
		} else if(fishInfos[idx].grade >= 40 && fishInfos[idx].grade <= 49) {
			prefix = "강태공의";
   result.push("⭐⭐⭐⭐");
		} else if(fishInfos[idx].grade == 50) {
			prefix = "불멸의";
   result.push("⭐⭐⭐⭐⭐");
		}
  if(fishInfos[idx].lock) {
		 result.push(prefix + " 낚시대 (+" + fishInfos[idx].grade + ") 🔒");
  } else {
    result.push(prefix + " 낚시대 (+" + fishInfos[idx].grade + ")");
  }
		result.push("ㄴ기본 크기 +" + fishInfos[idx].ability);
  if(fishInfos[idx].grade <= 5) {
			ratio = 3;
		} else if(fishInfos[idx].grade >= 6 && fishInfos[idx].grade <= 10) {
			ratio = 5;
		} else if(fishInfos[idx].grade >= 11 && fishInfos[idx].grade <= 20) {
			ratio = 8;
		} else if(fishInfos[idx].grade >= 21 && fishInfos[idx].grade <= 30) {
			ratio = 10;
		} else if(fishInfos[idx].grade >= 31 && fishInfos[idx].grade <= 40) {
			ratio = 14;
		} else if(fishInfos[idx].grade >= 41 && fishInfos[idx].grade <= 45) {
			ratio = 17;
		} else if(fishInfos[idx].grade >= 46 && fishInfos[idx].grade <= 49) {
			ratio = 30;
		} else if(fishInfos[idx].grade >= 50) {
    ratio = 48;
  }
  if(fishInfos[idx].sfh) {
    ratio -= 18;
  }
  var calc = new Array(ratio + 10).fill(0);
  var brat = 0;
  var dest = 0;
  for(var i = 0; i < 10; i++) {
    calc[i] = 1;
  }
  if(ratio >= 30 && ratio < 48) {
   calc[calc.length - 1] = 2;
   calc[calc.length] = 2;
  }
  for(var k of calc) {
    if(Number(k) == 1) {
      brat += 100 / calc.length;
      }
    if(Number(k) == 2) {
      dest += 100 / calc.length;
    }
  }
  result.push("강화 성공확률 : " + Math.floor(brat) + "%");
  result.push("파괴 확률 : " + Math.floor(dest) + "%");
		return result.join("\n");
	} else {
		return "해당 유저를 찾을 수 없습니다. 또는 가입을 해주세요. (@가입)"
	}
	}
 
 function joinFish(s, h) {
   var idx = 	idx = fishInfos.findIndex((item, ind) => {
		return item.hash == h;
	});
 if(idx != -1) {
   return s + "님은 이미 가입되어 있습니다.";
 } else {
   fishInfos.push({name: s, hash: h, coin: 0, grade: 0, ability: 0, id: createId(), lock: false, share: "n", shareto: "n", sfh: false});
		FileStream.write(roomPath + "/fish_infos.txt", JSON.stringify(fishInfos));
		Api.reload("DvelBot.js");
		return s + "님 낚시 가입 완료. 재미있게 즐겨주세요!.";
  }
 }
 
 function checkSuperFisher(id) {
   var idx = fishInfos.findIndex(e => e.id == id);
   var idx2 = fish.findIndex(e => e.who == fishInfos[idx].name);
   if(idx != -1 && idx2 != -1) {
     if(fishInfos[idx].grade >= 50 && idx2 <= 10) {
       if(!fishInfos[idx].sfh) {
         fishInfos[idx].sfh = true;
         FileStream.write(roomPath + "/fish_infos.txt", JSON.stringify(fishInfos));
       }
     }
   }
 }
 
 function shareUser(s, t) {
   var idx = fishInfos.findIndex((item, id) => {
     return item.id == s;
   });
   var idx2 = fishInfos.findIndex((item, id) => {
     return item.id == t;
   });
   if(idx == -1 || idx2 == -1) {
     return "해당 아이디를 찾을 수 없습니다.";
   }
   if((fishInfos[idx].share != "n" || fishInfos[idx2].share != "n") && (fishInfos[idx].shareto != "n" || fishInfos[idx2].shareto != "n")) {
     if(fishInfos[idx].id == fishInfos[idx2].share) {
      fishInfos[idx].share = "n";
      fishInfos[idx].shareto = "n";
      fishInfos[idx2].share = "n";
      fishInfos[idx2].shareto = "n";
     }
   } else {
     if(fishInfos[idx].id != fishInfos[idx2].share) {
       fishInfos[idx].shareto = fishInfos[idx2].id;
       fishInfos[idx2].share = fishInfos[idx].id;
     }
   }
FileStream.write(roomPath + "/fish_infos.txt", JSON.stringify(fishInfos));
   return fishInfos[idx].name + "님과 " + fishInfos[idx2].name + "님의 계정 상태가 업데이트 되었습니다.";
 }
 
 function lockFish(d) {
   var h = d.getProfileHash();
   var idx = fishInfos.findIndex((item, id) => {
     return item.hash == h;
   });
   if(idx != -1) {
     if(fishInfos[idx].share != "n") {
       idx = fishInfos.findIndex((item, id) => {
     return item.id == fishInfos[idx].share;
   });
     }
     var bool = Boolean(fishInfos[idx].lock);
     if(bool) {
       fishInfos[idx].lock = false;
       fishInfos[idx].coin -= 1000;
       FileStream.write(roomPath + "/fish_infos.txt", JSON.stringify(fishInfos));
       return fishInfos[idx].name + "님이 강화 잠금을 해제하셨습니다. (-1000코인)";
     } else {
       fishInfos[idx].lock = true;
       fishInfos[idx].coin -= 1000;
       FileStream.write(roomPath + "/fish_infos.txt", JSON.stringify(fishInfos));
       return fishInfos[idx].name + "님이 강화 잠금을 설정하셨습니다. (-1000코인)";
     }
   } else {
     return "hash 오류";
   }
 }
 
 function createId() {
   var ap = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
   var front = "";
   for(var i = 0; i < 3; i++) {
     front += ap[Math.floor(Math.random() * ap.length)];
    }
   var rn = Math.floor(Math.random() * (99999 - 10000 + 1) + 10000);
   return front + rn;
 }
 
function setWon(pWon) {
    var won  = (pWon+"").replace(/,/g, "");
    var arrWon  = ["원", "만", "억", "조", "경", "해", "자", "양", "구", "간", "정"];
    var changeWon = "";
    var pattern = /(-?[0-9]+)([0-9]{4})/;
    while(pattern.test(won)) {                  
        won = won.replace(pattern,"$1,$2");
    }
    var arrCnt = won.split(",").length-1;
    for(var ii=0; ii<won.split(",").length; ii++) {
        if(arrWon[arrCnt] == undefined) {
            alert("값의 수가 너무 큽니다.");
            break;
        }
  var tmpwon=0;
  for(i=0;i<won.split(",")[ii].length;i++){
   var num1 = won.split(",")[ii].substring(i,i+1);
   tmpwon = tmpwon+Number(num1);
  }
  if(tmpwon > 0){
    changeWon += won.split(",")[ii]+arrWon[arrCnt];
  }
        arrCnt--;
    }
 return changeWon;
}
	
function include(str) {
	var filter = ["섹스","섹수","후장","자지","보지","자지털","보지털","자위","오럴","정액","보짓물","강간","근친상간","꼬추","좆","짬지","잠지","음경","잦이","봊이","잦지","봊지"];
	for(var i = 0; i < filter.length; i++) {
		if(str.indexOf(filter[i]) != -1) {
			return true;
		}
	}
	return false;
}

function getTimes(type) {

var date = new Date();
var yester = new Date(date.getTime() - (1*24*60*60*1000));
var year = date.getFullYear();
var month = date.getMonth()+1;
var day = date.getDate();
var hour = date.getHours();
var minute = date.getMinutes();
var second = date.getSeconds();

if(hour != 12) {
		
		hour = hour%12;
	}
	
	if(hour < 10) {
		
		hour = "0"+hour;
	}
	
	if(minute == 0) {
		
		minute = "00";
	}
	
	if(second < 10) {
		
		second = "0"+second;
	}
	
	if(minute < 10 && minute != 0) {
		
		minute = "0"+minute;
	}
 
 if(month < 10) month = "0" + month;
 if(day < 10) day = "0" + day;

switch(type) {

case "date":

return date;
break;

case "year":

return year;
break;

case "month":

return month;
break;

case "day":

return day;
break;

case "hour":

return hour;
break;

case "minute":

return minute;
break;

case "second":

return second;
break;

case "nowtime":

return getAP()+" "+hour+"시 "+minute+"분 "+second+"초";
break;

case "nowday":

return year+"년 "+month+"월 "+day+"일 "+getDays();
break;

case "nowday2":

return year+"-"+month+"-"+day;
break;

case "nowday3":
return year + month + day;
break;

case "yesterday2":

return yester.getFullYear()+"-"+(yester.getMonth() + 1)+"-"+yester.getDate();
break;

case "fulltime":

return year+"년 "+month+"월 "+day+"일 "+getDays()+"\n"+getAP()+" "+hour+"시 "+minute+"분 "+second+"초";
break;

case "fulltime2":

return year+"-"+month+"-"+day+"-"+hour+":"+minute+":"+second;
break;
}
}

function getDays() {
	
var d = new Date();
var arr = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];

return arr[d.getDay()];
}

function getAP() {
	
	var d = new Date();
	
	if(d.getHours() < 12) {
		
		return "오전";
	} 	else if(d.getHours() >= 12) {
		
		return "오후";
	}
}

function readFile(path) {
	try {
		var file = new java.io.File(path);
		var reader = new java.io.FileReader(file);
		var buffer = new java.io.BufferedReader(reader);
		
		var line = "";
		var result = [];
		while((line = buffer.readLine()) != null) {

   result.push(line);
   }
 buffer.close();
	} catch(e) {
		 Log.e(e);
	}
	return result;
}

function makeFile(path){
try{
var file = new java.io.File(path);
if(file.mkdirs()){
Log.d(path+" 으로 파일생성 완료");
}
else{}
}catch(e){
Log.e(e + " #" + e.lineNumber);
}
}

function saveFile(path,content,bool){
try{
var file = new java.io.File(path);
if(!file.exists()){ Log.e("유요하지 않은 폴더");}
var fw = new java.io.FileWriter(file,bool);
var bw = new java.io.BufferedWriter(fw);
var str = new java.lang.String(content);
bw.write(str);
bw.close();
fw.close();
}catch(e){
Log.e(e + " #" + e.lineNumber);
}
}

function byteCalculation(bytes) {
        var bytes = parseInt(bytes);
        var s = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
        var e = Math.floor(Math.log(bytes)/Math.log(1024));
       
        if(e == "-Infinity") return "0 "+s[0]; 
        else 
        return (bytes/Math.pow(1024, Math.floor(e))).toFixed(2)+""+s[e];
}

function getMemoryInfo() {
	 var am = Api.getContext().getSystemService(Api.getContext().ACTIVITY_SERVICE);
	var mem = new android.app.ActivityManager.MemoryInfo();
	am.getMemoryInfo(mem);
	
	var useMem = Math.floor((mem.totalMem - mem.availMem));
	
	var percent = Math.floor((useMem / mem.totalMem) * 100);
	
	return byteCalculation(useMem) + " / " + byteCalculation(mem.totalMem) + "(" + percent + "%)";
}

function getSpaceInfo() {
	var root = android.os.Environment.getExternalStorageDirectory().getAbsolutePath();
		var totalSpace = new java.io.File(root).getTotalSpace();
		var freeSpace = new java.io.File(root).getUsableSpace();
		var usableSpace = totalSpace - freeSpace;
		var percent = Math.floor((usableSpace / totalSpace) * 100);
		
		return byteCalculation(usableSpace) + " / " + byteCalculation(totalSpace) + "(" + percent + "%)";
}

function appInstalled( package )
{
var installed = false;
var pm = Api.getContext().getPackageManager();
try
{
pm.getPackageInfo( package, android.content.pm.PackageManager.GET_ACTIVITIES );
installed = true;
}
catch( e )
{
installed = false;
}
return installed;
}

function strike(Note) {
   var stk = "̶";
   var con="";
   for (var i=0;i<Note.length;i++) {
      con += Note[i] + stk;
   }
   return con;
}

function getBase64String(bitmap) {
  var baos = new java.io.ByteArrayOutputStream();
  bitmap.compress(android.graphics.Bitmap.CompressFormat.PNG, 100, baos);
  return android.util.Base64.encodeToString(baos.toByteArray(), android.util.Base64.NO_WRAP);
}

function decodeBitmap(str) {
  var array = android.util.Base64.decode(str, android.util.Base64.NO_WRAP);
  return android.graphics.BitmapFactory.decodeByteArray(array, 0, array.length);
}

function memberListCard(bitmap, name, date, act) {
  try {
    var main = new android.widget.LinearLayout(act);
    main.setOrientation(1);
  var layout = new android.widget.LinearLayout(act);
  layout.setOrientation(0);
 
 main.setGravity(android.view.Gravity.START);
  main.setLayoutParams(new android.widget.LinearLayout.LayoutParams(android.widget.LinearLayout.LayoutParams.MATCH_PARENT, android.widget.LinearLayout.LayoutParams.WRAP_CONTENT));
  layout.setGravity(android.view.Gravity.START);
  layout.setLayoutParams(new android.widget.LinearLayout.LayoutParams(android.widget.LinearLayout.LayoutParams.MATCH_PARENT, android.widget.LinearLayout.LayoutParams.WRAP_CONTENT));
  layout.setPadding(24,23,24,24);
  var inlay = new android.widget.LinearLayout(act);
  inlay.setOrientation(1);
  inlay.setGravity(android.view.Gravity.START);
  var img = new android.widget.ImageView(act);
  img.setLayoutParams(new android.widget.LinearLayout.LayoutParams(android.widget.LinearLayout.LayoutParams.WRAP_CONTENT, android.widget.LinearLayout.LayoutParams.WRAP_CONTENT));
  img.setPadding(16,16,16,16);
  img.setImageBitmap(bitmap);
  inlay.addView(img);
  var inlay2 = new android.widget.LinearLayout(act);
  inlay2.setOrientation(1);
  inlay2.setGravity(android.view.Gravity.START);
  inlay2.setLayoutParams(new android.widget.LinearLayout.LayoutParams(android.widget.LinearLayout.LayoutParams.WRAP_CONTENT, android.widget.LinearLayout.LayoutParams.WRAP_CONTENT));
  inlay2.setPadding(16,16,16,16);
  var txt = new android.widget.TextView(act);
  txt.setText(name); txt.setTextColor(android.graphics.Color.WHITE);
  var txt2 = new android.widget.TextView(act);
  txt2.setText(date); txt2.setTextColor(android.graphics.Color.WHITE);
  
  var line = new android.widget.TextView(act);
  line.setText("");
  line.setBackgroundColor(android.graphics.Color.GRAY);
  line.setLayoutParams(new android.widget.LinearLayout.LayoutParams(android.widget.LinearLayout.LayoutParams.MATCH_PARENT, act.getResources().getDisplayMetrics().density * 1));
  
  inlay2.addView(txt);
  inlay2.addView(txt2);
  layout.addView(inlay);
  layout.addView(inlay2);
  main.addView(layout);
  main.addView(line);
  return main;
  } catch(e) {
    Log.e(e + " #" + e.lineNumber);
  }
}

//이 아래 6가지 메소드는 스크립트 액티비티에서 사용하는 메소드들
function onCreate(savedInstanceState, activity) {
	try {
		var mainLayout = new android.widget.LinearLayout(activity);
		mainLayout.setOrientation(1);
  var scr = new android.widget.ScrollView(activity);
	var layout = new android.widget.LinearLayout(activity);
	layout.setOrientation(1);
	//layout.setGravity(android.view.Gravity.CENTER);
	
		var params = new android.widget.LinearLayout.LayoutParams(android.widget.LinearLayout.LayoutParams.MATCH_PARENT,android.widget.LinearLayout.LayoutParams.MATCH_PARENT);
	var params2 = new android.widget.LinearLayout.LayoutParams(android.widget.LinearLayout.LayoutParams.WRAP_CONTENT,android.widget.LinearLayout.LayoutParams.WRAP_CONTENT);
	var params3 = new android.widget.LinearLayout.LayoutParams(android.widget.LinearLayout.LayoutParams.MATCH_PARENT,android.widget.LinearLayout.LayoutParams.WRAP_CONTENT);
	
	mainLayout.setGravity(android.view.Gravity.CENTER);
	mainLayout.setLayoutParams(params);
 scr.setLayoutParams(new android.widget.LinearLayout.LayoutParams(android.widget.LinearLayout.LayoutParams.MATCH_PARENT,android.widget.LinearLayout.LayoutParams.WRAP_CONTENT, 1));
 //scr.setGravity(android.view.Gravity.CENTER); layout.setGravity(android.view.Gravity.CENTER);
 layout.setLayoutParams(params3);
	
	/*var ed = new android.widget.EditText(activity);
	ed.setHint("검색어");
	ed.setLayoutParams(params3);
	layout.addView(ed);
	layout.setLayoutParams(new android.widget.LinearLayout.LayoutParams(android.widget.LinearLayout.LayoutParams.MATCH_PARENT, android.widget.LinearLayout.LayoutParams.WRAP_CONTENT));
	var list = new android.widget.ListView(activity);
	list.setLayoutParams(new android.widget.LinearLayout.LayoutParams(android.widget.LinearLayout.LayoutParams.MATCH_PARENT, activity.getWindowManager ().getDefaultDisplay().getHeight() / 1.3));*/
	var spinner = new android.widget.Spinner(activity);
	//var spinner2 = new android.widget.Spinner(activity);
	var arr;
	var adapter = new android.widget.ArrayAdapter(activity, android.R.layout.simple_list_item_1, new java.util.ArrayList(rooms));
	//var adp2 = new android.widget.ArrayAdapter(activity, android.R.layout.simple_spinner_dropdown_item, new java.util.ArrayList(logRooms));
	var adp3;
	var str = "";
	var ad;
	var tv = new android.widget.TextView(activity);
	tv.setTextSize(12);
	
		//list.setTextFilterEnabled(true);
		
	spinner.setAdapter(adapter);
	spinner.setOnItemSelectedListener(new android.widget.AdapterView.OnItemSelectedListener({
		onItemSelected: function(av, v, i, l) {
			/*var arr = new java.io.File(logPath + "/" + spinner.getSelectedItem().toString()).list();
			java.util.Arrays.sort(arr, java.util.Collections.reverseOrder());
			 adp3 = new android.widget.ArrayAdapter(activity, android.R.layout.simple_spinner_dropdown_item, arr);
			 spinner2.setAdapter(adp3);
			 str = spinner.getSelectedItem().toString();*/
    layout.removeAllViews();
    var members = JSON.parse(FileStream.read(logPath + "/" + spinner.getSelectedItem().toString() + "/members.txt"));
    
    for(var i = 0; i < members.length; i++) {
      layout.addView(memberListCard(members[i].profile != undefined ? decodeBitmap(members[i].profile) : null, members[i].name, "등록 : " + members[i].regTime, activity));
    }
		}
	}));
	/*spinner2.setOnItemSelectedListener(new android.widget.AdapterView.OnItemSelectedListener({
		onItemSelected: function(av, v, i, l) {
			if(spinner2.getSelectedItem().toString() != "") {
			 adapter = new android.widget.ArrayAdapter(activity, android.R.layout.simple_list_item_1, new java.util.ArrayList(readFile(logPath + "/" + str + "/" + spinner2.getSelectedItem().toString())));
			 list.setAdapter(adapter);
			 ad = list.getAdapter();
			 tv.setText("총 " + numberWithCommas(ad.getCount()) + "개");
			 }
		}
	}));*/
/*list.setOnItemClickListener(new android.widget.AdapterView.OnItemClickListener({
		 onItemClick: function(av, v, i, l) {
		 	 var str = list.getItemAtPosition(i).toString();
		 	 makeDialog("로그 확인", str, activity);
		 }
	}));
	
	ed.addTextChangedListener(new android.text.TextWatcher({

beforeTextChanged: function(s,start,count,after) {
},

onTextChanged:

function(s,start,before,count) {
	
try {
ad.getFilter().filter(s.toString(), new android.widget.Filter.FilterListener({
	onFilterComplete: function(count) {
		 tv.setText("총 " + numberWithCommas(count) + "개");
	}
}));
} catch(err) { Log.e("에러:\n "+err+""+err.lineNumber); }
} ,

afterTextChanged: function(s) {
	
try {

if(ed.getText().length == 0) {
ad.getFilter().filter(null, new android.widget.Filter.FilterListener({
	onFilterComplete: function(count) {
		tv.setText("총 " + numberWithCommas(count + "개"));
	}
}));
}
} catch(err) { Log.e("에러:\n "+err+""+err.lineNumber); }
}
}));
layout.addView(tv);
	layout.addView(list);
 */
 
 scr.addView(layout);
	
	var lay2 = new android.widget.LinearLayout(activity);
	lay2.setGravity(android.view.Gravity.BOTTOM);
	lay2.setLayoutParams(params3);
	spinner.setLayoutParams(params3);
	lay2.addView(spinner);
	//spinner2.setLayoutParams(params2);
	//lay2.addView(spinner2);
	
 mainLayout.addView(scr);
	mainLayout.addView(lay2);
	activity.setContentView(mainLayout);
 
 globalAct = activity;
	} catch(e) {
		 Log.e(e + " #" + e.lineNumber);
	}
	//downFile("https://item.kakaocdn.net/dw/2214286.thum_001.png", "/Download", "thum_001.png", activity);
}

function makeDialog(title,str,act) {
	act.runOnUiThread(new java.lang.Runnable({
run: function(){
try{
var dialog = new android.app.AlertDialog.Builder(act);
dialog.setTitle(title);
dialog.setMessage(str);
dialog.setNegativeButton("확인", null);
dialog.show();
}
catch(e){
Log.e(e+", "+e.lineNumber);
}
}
}));
}
function onStart(activity) {}
function onResume(activity) {}
function onPause(activity) {}
function onStop(activity) {}
function onDestroy(activity) {}
