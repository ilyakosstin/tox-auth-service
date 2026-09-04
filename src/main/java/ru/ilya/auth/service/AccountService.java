package ru.ilya.auth.service;

import jakarta.transaction.Transactional;
import jakarta.validation.constraints.NotBlank;
import lombok.extern.log4j.Log4j2;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import ru.ilya.auth.controller.dto.RegisterRequest;
import ru.ilya.auth.entity.Account;
import ru.ilya.auth.entity.dto.AccountMapper;
import ru.ilya.auth.entity.dto.AccountPrivateDto;
import ru.ilya.auth.exceptions.AccountAlreadyExistsException;
import ru.ilya.auth.repository.AccountRepository;
import ru.ilya.auth.util.validation.AccountEmail;
import ru.ilya.auth.util.validation.AccountProfileName;

import java.util.List;
import java.util.UUID;

@Log4j2
@Service
@Validated
public class AccountService {

    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;

    public AccountService(AccountRepository accountRepository, PasswordEncoder passwordEncoder) {
        this.accountRepository = accountRepository;
        this.passwordEncoder = passwordEncoder;
    }

    private boolean isFaultyEmail(DataIntegrityViolationException e) {
        return e.getMessage().contains(Account.UNIQUE_EMAIL_CONSTRAINT_NAME);
    }

    private boolean isFaultyUsername(DataIntegrityViolationException e) {
        return e.getMessage().contains(Account.UNIQUE_USERNAME_CONSTRAINT_NAME);
    }

    public void setEmail(UUID accountId, @AccountEmail String email) {
        Account account = accountRepository.getAccountById(accountId);

        account.setEmail(email);

        if (email == null) {
            accountRepository.save(account);
            return;
        }

        try {
             accountRepository.saveAndFlush(account);
        } catch(DataIntegrityViolationException e) {
            if (isFaultyEmail(e)) {
                throw new AccountAlreadyExistsException("This email is taken");
            }
            throw new RuntimeException("Unknown error", e);
        }
    }

    public void setProfileName(UUID accountId, @AccountProfileName String profileName) {
        Account account = accountRepository.getAccountById(accountId);
        account.setProfileName(profileName);
        accountRepository.save(account);
    }

    @Transactional
    public AccountPrivateDto createAccount(RegisterRequest request) {
        Account account = Account
                .builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .profileName(request.getProfileName())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();

        try {
            return AccountMapper.toPrivate(accountRepository.saveAndFlush(account));
        } catch(DataIntegrityViolationException e) {

            log.info("DataIntegrityViolation while creating account: {}", e.getLocalizedMessage());

            if (isFaultyUsername(e)) {
                throw new AccountAlreadyExistsException("Username is already in use");
            }

            if (isFaultyEmail(e)) {
                throw new AccountAlreadyExistsException("Email is already in use");
            }

            throw new RuntimeException("Unknown error", e);
        }
    }
}


