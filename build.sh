export $(cat .env | xargs) && \
docker build \
  -t auth-service \
  --secret id=github_username,env=GITHUB_USERNAME \
  --secret id=github_token,env=GITHUB_TOKEN \
  --progress=plain \
  .
