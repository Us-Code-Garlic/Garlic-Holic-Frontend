import type { UserConfig } from "@commitlint/types";
import { RuleConfigSeverity } from "@commitlint/types";

const Configuration: UserConfig = {
  extends: ["@commitlint/config-conventional"],
  parserPreset:{
    parserOpts:{
        headerPattern: "^\\[([a-z]+)\\]: (.+)$",
        headerCorrespondence: ["type", "subject"],
    },
    },
  formatter: "@commitlint/format",
  rules: {
    "type-enum": [
      RuleConfigSeverity.Error,
      "always",
      [
        "feat",      // 기능 추가
        "fix",       // 버그 수정
        "docs",      // 문서 업데이트
        "refactor",  // 코드 리팩토링
        "chore",     // 기타 변경사항
        "style",     // 코드 스타일 변경
        "test",      // 테스트 코드 작성 및 수정
        "perf",      // 성능 개선
        "setting",   // 라이브러리 추가 및 설정 추가
        "ci",        // CI/CD 관련 작업
        "build",     // 빌드 시스템 및 의존성 변경
        "revert",    // 이전 커밋으로 되돌림
        "merge",     // 병합 관련 작업
        "hotfix",    // 긴급 수정사항
        "improve",   // 코드 개선 및 최적화
      ],
    ],
    "subject-max-length": [RuleConfigSeverity.Error, "always", 50],
    "header-max-length": [RuleConfigSeverity.Error, "always", 72],
    "body-max-line-length": [RuleConfigSeverity.Warning, "always", 72],
    "scope-case": [RuleConfigSeverity.Warning, "always", "lower-case"],
    "type-case": [RuleConfigSeverity.Error, "always", "lower-case"],
    "type-empty": [RuleConfigSeverity.Error, "never"],
    "subject-empty": [RuleConfigSeverity.Error, "never"],
  },
};

export default Configuration;