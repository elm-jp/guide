#!/bin/bash

set -eux

git remote add evancz https://github.com/evancz/guide.elm-lang.org.git
git fetch evancz

DIFF_FILES=`git diff HEAD...evancz/master --name-only | sed -e 's/^/\\\\\\\\n/' | xargs echo`
TRAVIS_BUILD_URL="https://travis-ci.org/${TRAVIS_REPO_SLUG}/builds/${TRAVIS_BUILD_ID}"

if test -n "${DIFF_FILES}"; then
  curl \
    -H "Content-Type: application/json" \
    -X POST \
    -d "{\"content\": \"以下のファイルで原文の更新がありました。${DIFF_FILES} \n${TRAVIS_BUILD_URL}\"}" \
    ${DISCORD_WEBHOOK_URL}
  exit 1
fi
