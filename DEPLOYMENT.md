# Railway 배포 가이드

이 문서는 wedding-invitation 프로젝트를 Railway에 배포하는 방법을 안내합니다.

## 사전 준비

1. **GitHub 계정** 및 저장소 준비
2. **Railway 계정** ([railway.app](https://railway.app/))
3. **카카오 지도 API 키** (선택사항, 지도 기능 사용 시 필요)

## 1. GitHub에 프로젝트 푸시

### Git 초기화 (아직 안 했다면)

```bash
cd /Users/mac/Desktop/code/wedding-invitation
git init
git add .
git commit -m "Initial commit"
```

### GitHub 저장소 생성 및 푸시

1. GitHub에서 새 저장소 생성 (예: `wedding-invitation`)
2. 다음 명령어 실행:

```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/wedding-invitation.git
git push -u origin main
```

## 2. Railway에 배포

### 2.1 Railway 프로젝트 생성

1. [Railway](https://railway.app/)에 접속하여 로그인
2. "New Project" 클릭
3. "Deploy from GitHub repo" 선택
4. GitHub 계정 연결 (처음이면)
5. `wedding-invitation` 저장소 선택

### 2.2 환경 변수 설정

Railway 대시보드에서:

1. 프로젝트 선택
2. "Variables" 탭 클릭
3. 다음 환경 변수 추가:

```
NEXT_PUBLIC_KAKAO_MAP_API_KEY=your_javascript_key_here
```

**카카오 지도 API 키 발급 방법:**
- `KAKAO_MAP_API_SETUP.md` 파일 참고
- 카카오 개발자 사이트에서 JavaScript 키 발급
- Railway 도메인을 플랫폼에 등록해야 함

### 2.3 도메인 설정

1. Railway 대시보드에서 "Settings" → "Domains" 클릭
2. 생성된 Railway 도메인 확인 (예: `wedding-invitation-production.up.railway.app`)
3. 또는 커스텀 도메인 추가

**중요:** 카카오 지도 API를 사용하는 경우:
- Railway 도메인을 카카오 개발자 사이트의 플랫폼 설정에 등록해야 함
- 예: `https://wedding-invitation-production.up.railway.app`

### 2.4 배포 확인

- Railway가 자동으로 빌드 및 배포를 시작합니다
- "Deployments" 탭에서 배포 상태 확인
- 배포 완료 후 생성된 URL로 접속하여 확인

## 3. 빌드 설정

Railway는 자동으로 Next.js 프로젝트를 감지하고 빌드합니다. 

`railway.json` 파일이 있으면 해당 설정을 사용하고, 없으면 자동 감지합니다.

### 빌드 명령어
- Build: `npm run build`
- Start: `npm start`

## 4. 트러블슈팅

### 빌드 실패

- Node.js 버전 확인 (Next.js 14는 Node.js 18 이상 필요)
- `package.json`의 빌드 스크립트 확인
- Railway 로그 확인

### 카카오 지도가 표시되지 않음

- 환경 변수 `NEXT_PUBLIC_KAKAO_MAP_API_KEY`가 올바르게 설정되었는지 확인
- 카카오 개발자 사이트에서 Railway 도메인이 플랫폼에 등록되었는지 확인
- 브라우저 콘솔에서 에러 메시지 확인

### 이미지가 표시되지 않음

- `next.config.js`에서 `images.unoptimized: true` 설정 확인
- 이미지 경로가 올바른지 확인 (`/img/...`)

## 5. 추가 설정

### 커스텀 도메인

1. Railway 대시보드 → Settings → Domains
2. "Custom Domain" 추가
3. DNS 설정 (CNAME 레코드)
4. SSL 인증서 자동 발급

### 환경 변수 관리

- 프로덕션 환경 변수는 Railway 대시보드에서만 관리
- `.env.local` 파일은 로컬 개발용으로만 사용
- 민감한 정보는 절대 GitHub에 커밋하지 않음

## 참고 링크

- [Railway 공식 문서](https://docs.railway.app/)
- [Next.js 배포 가이드](https://nextjs.org/docs/deployment)
- [카카오 지도 API 설정](KAKAO_MAP_API_SETUP.md)

