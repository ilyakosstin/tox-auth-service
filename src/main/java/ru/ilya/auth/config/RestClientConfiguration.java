package ru.ilya.auth.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientManager;
import org.springframework.security.oauth2.client.web.client.OAuth2ClientHttpRequestInterceptor;
import org.springframework.web.client.RestClient;

@Configuration
public class RestClientConfiguration {

    @Bean
    public RestClient fsRestClient(OAuth2AuthorizedClientManager authorizedClientManager) {

        OAuth2ClientHttpRequestInterceptor interceptor =
                new OAuth2ClientHttpRequestInterceptor(authorizedClientManager);

        interceptor.setClientRegistrationIdResolver((request) -> "self");

        return RestClient.builder()
                .requestInterceptor(interceptor)
                .baseUrl("http://fs.local.test:8000/admin") // TODO: transfer it to config
                .build();
    }

    @Bean RestClient selfRestClient() {
        return RestClient.builder()
                .baseUrl("http://auth.local.test:9000") // TODO: transfer it to config
                .build();
    }

}
