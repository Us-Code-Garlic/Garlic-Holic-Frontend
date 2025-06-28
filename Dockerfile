# 멀티스테이지 빌드로 이미지 크기 최적화
FROM node:18-alpine AS base

# pnpm 설치
RUN npm install -g pnpm

# 의존성 설치 단계
FROM base AS deps
WORKDIR /app

# 패키지 파일들 복사
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# 빌드 단계
FROM base AS builder
WORKDIR /app

# 의존성과 소스코드 복사
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js 빌드
RUN pnpm build

# 프로덕션 이미지
FROM node:18-alpine AS runner
WORKDIR /app

# 보안을 위한 non-root 유저 생성
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 필요한 파일들만 복사
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Google Cloud 키 파일을 위한 디렉토리 생성
RUN mkdir -p /app/keys
RUN chown -R nextjs:nodejs /app/keys

# 유저 변경
USER nextjs

# 포트 노출
EXPOSE 3000

# 환경변수 설정
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV NODE_ENV=production

# 앱 실행
CMD ["node", "server.js"] 