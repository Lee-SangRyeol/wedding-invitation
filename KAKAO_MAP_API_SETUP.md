# 카카오 지도 API 키 발급 방법

## 1. 카카오 개발자 계정 만들기

1. [카카오 개발자 사이트](https://developers.kakao.com/)에 접속
2. 카카오 계정으로 로그인 (카카오톡 계정으로 로그인 가능)

## 2. 애플리케이션 추가하기

1. 로그인 후 상단 메뉴에서 **"내 애플리케이션"** 클릭
2. **"애플리케이션 추가하기"** 버튼 클릭
3. 다음 정보 입력:
   - **앱 이름**: 예) "웨딩 청첩장"
   - **사업자명**: 본인 이름 또는 회사명 (개인 개발자는 본인 이름)
4. **"저장"** 클릭

## 3. 플랫폼 설정

1. 생성한 애플리케이션 선택
2. 왼쪽 메뉴에서 **"앱 설정"** → **"플랫폼"** 클릭
3. **"Web 플랫폼 등록"** 클릭
4. **사이트 도메인** 입력:
   - 로컬 개발: `http://localhost:3000`
   - 실제 배포: `https://yourdomain.com` (실제 도메인 주소)
5. **"저장"** 클릭

**참고**: 여러 도메인 사용 시 각각 추가로 등록 가능

## 4. JavaScript 키 확인

1. 왼쪽 메뉴에서 **"앱 키"** 클릭
2. **"JavaScript 키"** 복사 (예: `abc123def456ghi789jkl012mno345pq`)
3. 이 키를 사용하여 환경변수 또는 코드에 설정

## 5. 환경변수 설정

### 방법 1: `.env.local` 파일 사용 (권장)

프로젝트 루트 디렉토리에 `.env.local` 파일 생성:

```env
NEXT_PUBLIC_KAKAO_MAP_API_KEY=your_javascript_key_here
```

### 방법 2: 코드에 직접 입력 (개발/테스트용)

`components/LocationSection.tsx` 파일에서:

```typescript
const APP_KEY = 'your_javascript_key_here'
```

## 6. 도메인 등록 확인

- **중요**: 등록하지 않은 도메인에서는 지도가 표시되지 않습니다
- 로컬 개발: `http://localhost:3000` 등록
- 프로덕션: 실제 배포 도메인 등록

## 7. API 사용 제한

- 카카오 지도 API는 무료로 제공되며, 일일 호출 제한이 있습니다
- 일반적인 웹사이트 사용에는 충분합니다
- 자세한 제한 사항은 [카카오 개발자 문서](https://developers.kakao.com/docs/latest/ko/getting-started/app-key) 참고

## 참고 링크

- [카카오 개발자 사이트](https://developers.kakao.com/)
- [카카오 지도 API 문서](https://apis.map.kakao.com/)
- [카카오 지도 JavaScript API 가이드](https://apis.map.kakao.com/web/guide/)

