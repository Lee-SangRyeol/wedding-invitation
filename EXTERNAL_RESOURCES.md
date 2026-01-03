# 필요한 외부 리소스 가이드

현재 프로젝트는 CSS와 Framer Motion을 사용하여 모든 애니메이션을 구현했으므로, **외부 리소스 없이도 완전히 작동합니다**.

하지만 더욱 풍부하고 전문적인 느낌을 주기 위해 다음 리소스들을 추가할 수 있습니다:

## 🎨 이미지 리소스

### 필수는 아니지만 추천하는 이미지들:

1. **편지봉투 텍스처**
   - 용도: 편지봉투의 질감을 더 사실적으로 표현
   - 크기: 800x600px 이상
   - 형식: PNG (투명 배경) 또는 JPG
   - 스타일: 종이 질감, 약간의 그림자 효과
   - AI 생성 프롬프트 예시:
     ```
     "A vintage wedding envelope texture, cream colored paper with subtle texture, 
     elegant and romantic, high quality, detailed"
     ```

2. **편지지 배경 패턴**
   - 용도: 편지 내용 배경에 사용
   - 크기: 600x800px 이상 (반복 가능한 패턴)
   - 형식: PNG (투명 배경)
   - 스타일: 미묘한 줄무늬나 도트 패턴
   - AI 생성 프롬프트 예시:
     ```
     "Subtle lined paper texture, wedding invitation style, elegant and minimal, 
     cream white background, seamless pattern"
     ```

3. **꽃 장식 요소**
   - 용도: 편지 상단/하단 장식
   - 크기: 200x200px 이상
   - 형식: PNG (투명 배경)
   - 스타일: 로맨틱한 꽃 일러스트 (장미, 라벤더 등)
   - AI 생성 프롬프트 예시:
     ```
     "Elegant wedding flower illustration, romantic roses or lavender, 
     watercolor style, transparent background, minimalist"
     ```

4. **봉인 왁스 스티커**
   - 용도: 편지봉투 봉인 효과
   - 크기: 100x100px
   - 형식: PNG (투문 배경)
   - 스타일: 빨간색/골드 왁스 봉인
   - AI 생성 프롬프트 예시:
     ```
     "Vintage wax seal stamp, red or gold wax, elegant monogram, 
     wedding style, transparent background"
     ```

## 🎬 영상 리소스

### 선택사항 (현재는 CSS 애니메이션으로 구현됨):

1. **편지봉투 열리는 애니메이션**
   - 용도: 더 부드러운 봉투 열림 효과
   - 길이: 2-3초
   - 형식: MP4 또는 WebM
   - 해상도: 1920x1080px
   - 스타일: 봉투 뚜껑이 위로 열리는 애니메이션
   - AI 생성 프롬프트 예시:
     ```
     "Animated wedding envelope opening, elegant cream colored envelope, 
     flap lifting up smoothly, romantic atmosphere, 3 seconds"
     ```

2. **편지가 펼쳐지는 애니메이션**
   - 용도: 편지가 봉투에서 나오는 효과
   - 길이: 1-2초
   - 형식: MP4 또는 WebM
   - 해상도: 1920x1080px
   - AI 생성 프롬프트 예시:
     ```
     "Wedding invitation letter unfolding from envelope, elegant paper, 
     smooth animation, romantic style"
     ```

## 🎵 오디오 리소스 (선택사항)

1. **봉투 열리는 소리**
   - 용도: 봉투가 열릴 때 효과음
   - 길이: 0.5-1초
   - 형식: MP3 또는 WAV
   - 스타일: 부드러운 종이 찢어지는 소리

2. **배경 음악**
   - 용도: 전체 페이지 배경음
   - 길이: 루프 가능한 음악
   - 형식: MP3
   - 스타일: 로맨틱한 피아노 또는 현악기

## 📝 리소스 사용 방법

### 이미지 추가 방법:

1. `public/images/` 폴더에 이미지 파일 저장
2. 컴포넌트에서 이미지 사용:
   ```tsx
   <img src="/images/envelope-texture.png" alt="봉투 텍스처" />
   ```

### 영상 추가 방법:

1. `public/videos/` 폴더에 영상 파일 저장
2. 컴포넌트에서 영상 사용:
   ```tsx
   <video src="/videos/envelope-opening.mp4" autoPlay muted loop />
   ```

## 💡 AI 도구 추천

다음 AI 도구들을 사용하여 리소스를 생성할 수 있습니다:

- **이미지 생성**: Midjourney, DALL-E, Stable Diffusion, Leonardo.ai
- **영상 생성**: Runway ML, Pika Labs, Stable Video Diffusion
- **오디오 생성**: Mubert, AIVA, Soundful

## ⚠️ 주의사항

- 모든 리소스는 저작권을 확인하고 사용하세요
- 이미지/영상 크기를 최적화하여 로딩 속도를 고려하세요
- 모바일 데이터 사용량을 고려하여 파일 크기를 제한하세요
- 현재 구현은 외부 리소스 없이도 완벽하게 작동합니다

