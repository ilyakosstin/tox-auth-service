FROM eclipse-temurin:21-jdk AS builder
WORKDIR /app

COPY gradlew ./
COPY gradle ./gradle
COPY build.gradle.kts settings.gradle.kts ./

RUN chmod +x ./gradlew

# to cache it
RUN ./gradlew dependencies --no-daemon


COPY src ./src

RUN --mount=type=secret,id=github_username \
    --mount=type=secret,id=github_token \
    GITHUB_USERNAME="$(cat /run/secrets/github_username)" \
    GITHUB_TOKEN="$(cat /run/secrets/github_token)" \
    ./gradlew bootJar --no-daemon

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=builder /app/build/libs/*.jar app.jar
EXPOSE 9000
ENTRYPOINT ["java", "-jar", "app.jar"]


# # Финальный легковесный образ
# FROM eclipse-temurin:21-jre-alpine
# WORKDIR /app
# COPY --from=builder /app/build/libs/*.jar app.jar
# EXPOSE 9000
# ENTRYPOINT ["java", "-jar", "app.jar"]
