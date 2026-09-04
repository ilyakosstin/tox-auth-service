plugins {
	java
	id("org.springframework.boot") version "4.1.0"
	id("io.spring.dependency-management") version "1.1.7"
}

group = "ru.ilya"
version = "0.0.1-SNAPSHOT"

java {
	toolchain {
		languageVersion = JavaLanguageVersion.of(21)
	}
}

repositories {
	// maven {
	// 	url = "${project.property("nexusUrl")}/maven-releases/"
	// 	isAllowInsecureProtocol = true
	// 	credentials {
	// 		username = project.property("nexusUsername").toString()
	// 		password = project.property("nexusPassword").toString()
	// 	}
	// }
	// maven {
	// 	url = "${project.property("nexusUrl")}/maven-snapshots/"
	// 	isAllowInsecureProtocol = true
	// 	credentials {
	// 		username = project.property("nexusUsername").toString()
	// 		password = project.property("nexusPassword").toString()
	// 	}
	// }

	maven {
		name = "GitHubPackages"
		url = uri("https://maven.pkg.github.com/ilyakosstin/toxutils")
		credentials {
			username = project.findProperty("gpr.user") as String? ?: System.getenv("GITHUB_USERNAME")
			password = project.findProperty("gpr.key") as String? ?: System.getenv("GITHUB_TOKEN")
		}
	}

//	mavenLocal()
	mavenCentral()
}

dependencies {
	implementation("org.springframework.boot:spring-boot-starter-web")
	implementation("org.springframework.boot:spring-boot-starter-data-jpa")
	implementation("org.springframework.boot:spring-boot-starter-security")
	implementation("org.springframework.boot:spring-boot-starter-security-oauth2-client")
	implementation("org.springframework.boot:spring-boot-starter-security-oauth2-authorization-server")
	implementation("org.springframework.boot:spring-boot-starter-webmvc")
	implementation("org.springframework.boot:spring-boot-starter-thymeleaf")
	implementation("org.springframework.boot:spring-boot-starter-validation")
	implementation("org.springframework.session:spring-session-jdbc")
	implementation("org.springframework.session:spring-session-core")
	implementation("org.springframework.boot:spring-boot-starter-mail")

	implementation("ru.coffeetox:toxutils:1.3")

	compileOnly("org.projectlombok:lombok")
	runtimeOnly("org.postgresql:postgresql")
	runtimeOnly("com.h2database:h2")
	annotationProcessor("org.projectlombok:lombok")

	testImplementation("org.springframework.boot:spring-boot-starter-data-jpa-test")
	testImplementation("org.springframework.boot:spring-boot-starter-security-oauth2-authorization-server-test")
	testImplementation("org.springframework.boot:spring-boot-starter-security-test")
	testImplementation("org.springframework.boot:spring-boot-starter-webmvc-test")

	testCompileOnly("org.projectlombok:lombok")
	testRuntimeOnly("org.junit.platform:junit-platform-launcher")
	testAnnotationProcessor("org.projectlombok:lombok")

	implementation("org.xerial:sqlite-jdbc")
	implementation("org.hibernate.orm:hibernate-community-dialects")
}

tasks.withType<Test> {
	useJUnitPlatform()
}
