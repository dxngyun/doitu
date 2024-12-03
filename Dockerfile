# frontend/Dockerfile

# Node.js 이미지를 사용해 빌드 및 실행
FROM node:18-alpine

# 작업 디렉토리 설정
WORKDIR /app

# package.json과 package-lock.json 복사
COPY package.json package-lock.json ./

# 의존성 설치
RUN npm install

# 애플리케이션 소스 코드 복사
COPY . .

# 포트 개방
EXPOSE 8080

# Vue 개발 서버 실행
CMD ["npm", "run", "serve"]
