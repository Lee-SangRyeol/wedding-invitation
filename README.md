# 모바일 청첩장

모바일 최적화된 인터랙티브 청첩장 웹 애플리케이션입니다.

## 주요 기능

- 📮 **편지봉투 애니메이션**: 페이지 진입 시 편지봉투가 나타남
- 👆 **터치/스크롤 인터랙션**: 스크롤하거나 위로 드래그하여 봉투 열기
- ✉️ **편지 내용 표시**: 봉투가 열리면 편지 내용이 표시됨
- 📱 **모바일 최적화**: 터치 제스처와 반응형 디자인 지원

## 시작하기

### 설치

```bash
npm install
# 또는
pnpm install
# 또는
yarn install
```

### 개발 서버 실행

```bash
npm run dev
# 또는
pnpm dev
# 또는
yarn dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 빌드

```bash
npm run build
npm start
```

## 편지 내용 수정

`app/page.tsx` 파일의 `letterContent` 객체를 수정하여 청첩장 내용을 변경할 수 있습니다:

```typescript
const letterContent = {
  groomName: '신랑 이름',
  brideName: '신부 이름',
  date: '2024년 12월 25일 (토)',
  time: '오후 2시',
  location: '장소명',
  address: '주소',
  message: '메시지 내용',
}
```

## 기술 스택

- **Next.js 14**: React 프레임워크
- **TypeScript**: 타입 안정성
- **Styled Components**: 스타일링
- **Framer Motion**: 애니메이션
- **GSAP**: 고급 애니메이션

## 필요한 외부 리소스

프로젝트를 더욱 풍부하게 만들기 위해 다음 리소스들이 필요할 수 있습니다:

### 이미지
- 편지봉투 텍스처 이미지 (선택사항)
- 배경 패턴 이미지 (선택사항)
- 꽃 장식 이미지 (선택사항)

### 영상
- 봉투가 열리는 애니메이션 영상 (선택사항, 현재는 CSS로 구현)

현재는 CSS와 Framer Motion을 사용하여 모든 애니메이션을 구현했으므로, 외부 리소스 없이도 작동합니다.

## 배포하기

### Railway에 배포하기

1. **GitHub에 프로젝트 푸시**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/your-username/wedding-invitation.git
   git push -u origin main
   ```

2. **Railway 계정 생성 및 프로젝트 연결**
   - [Railway](https://railway.app/)에 접속하여 계정 생성
   - "New Project" 클릭
   - "Deploy from GitHub repo" 선택
   - GitHub 저장소 선택

3. **환경 변수 설정**
   - Railway 대시보드에서 프로젝트 선택
   - "Variables" 탭 클릭
   - 다음 환경 변수 추가:
     ```
     NEXT_PUBLIC_KAKAO_MAP_API_KEY=your_javascript_key_here
     ```
   - 카카오 지도 API 키 발급 방법은 `KAKAO_MAP_API_SETUP.md` 참고

4. **도메인 설정**
   - Railway 대시보드에서 "Settings" → "Domains" 클릭
   - 생성된 Railway 도메인 또는 커스텀 도메인 설정
   - 카카오 개발자 사이트에서 해당 도메인을 플랫폼에 등록

5. **배포 확인**
   - Railway가 자동으로 빌드 및 배포를 시작합니다
   - 배포 완료 후 생성된 URL로 접속하여 확인

### 환경 변수

프로젝트 루트에 `.env.local` 파일을 생성하거나 Railway에서 환경 변수를 설정하세요:

```env
NEXT_PUBLIC_KAKAO_MAP_API_KEY=your_javascript_key_here
```

자세한 설정 방법은 `KAKAO_MAP_API_SETUP.md` 파일을 참고하세요.

