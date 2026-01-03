# GitHub 레포지토리 생성 및 초기 설정 가이드

## 1. GitHub에서 레포지토리 생성

### 웹 브라우저에서:

1. [GitHub](https://github.com)에 로그인
2. 우측 상단의 **"+"** 버튼 클릭 → **"New repository"** 선택
3. 다음 정보 입력:
   - **Repository name**: `wedding-invitation` (또는 원하는 이름)
   - **Description**: `모바일 최적화된 인터랙티브 청첩장 웹 애플리케이션` (선택사항)
   - **Visibility**: 
     - Public (공개) - 무료
     - Private (비공개) - 무료
   - **⚠️ 중요**: 아래 옵션들은 체크하지 마세요:
     - ❌ Add a README file
     - ❌ Add .gitignore
     - ❌ Choose a license
   - (이미 프로젝트에 파일들이 있으므로)
4. **"Create repository"** 클릭

### 생성 후 표시되는 페이지에서:

GitHub가 표시하는 명령어들을 복사할 수 있지만, 아래 명령어를 사용하세요.

## 2. 로컬에서 Git 초기화 및 푸시

터미널에서 다음 명령어를 순서대로 실행하세요:

```bash
cd /Users/mac/Desktop/code/wedding-invitation

# Git 초기화 (아직 안 했다면)
git init

# 모든 파일 추가
git add .

# 첫 커밋
git commit -m "Initial commit: Wedding invitation project"

# main 브랜치로 설정
git branch -M main

# GitHub 레포지토리 연결 (YOUR_USERNAME을 실제 GitHub 사용자명으로 변경)
git remote add origin https://github.com/YOUR_USERNAME/wedding-invitation.git

# GitHub에 푸시
git push -u origin main
```

## 3. 인증 문제 해결

### Personal Access Token 사용 (권장)

GitHub에서 Personal Access Token을 생성해야 할 수 있습니다:

1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. "Generate new token (classic)" 클릭
3. 권한 선택:
   - `repo` (전체 체크)
4. "Generate token" 클릭
5. 생성된 토큰을 복사 (한 번만 표시됨!)
6. 푸시할 때 비밀번호 대신 이 토큰 사용

### 또는 SSH 키 사용

SSH 키를 설정하면 토큰 없이 사용할 수 있습니다:

```bash
# SSH URL 사용
git remote set-url origin git@github.com:YOUR_USERNAME/wedding-invitation.git
```

## 4. 확인

GitHub 레포지토리 페이지를 새로고침하면 모든 파일이 업로드된 것을 확인할 수 있습니다.

## 다음 단계

GitHub에 푸시가 완료되면 `DEPLOYMENT.md` 파일의 Railway 배포 가이드를 따라하세요.

