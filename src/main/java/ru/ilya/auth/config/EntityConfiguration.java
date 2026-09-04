package ru.ilya.auth.config;

import jakarta.annotation.PostConstruct;
import org.springframework.context.annotation.Configuration;
import ru.ilya.auth.controller.dto.RegisterRequest;
import ru.ilya.auth.repository.AccountRepository;
import ru.ilya.auth.service.AccountService;

@Configuration
public class EntityConfiguration {

    private final AccountService accountService;
    private final AccountRepository accountRepository;

    public EntityConfiguration(AccountService accountService, AccountRepository accountRepository) {
        this.accountService = accountService;
        this.accountRepository = accountRepository;
    }

    @PostConstruct
    private void addDefaultUser() {
        if (accountRepository.existsAccountByUsername("admin")) {
            return;
        }

        RegisterRequest request = RegisterRequest.builder()
                .username("admin")
                .password("1234")
                .build();

        accountService.createAccount(request);
    }
}
