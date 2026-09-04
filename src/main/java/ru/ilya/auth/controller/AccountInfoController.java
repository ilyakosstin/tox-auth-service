package ru.ilya.auth.controller;


import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import ru.coffeetox.toxutils.dto.auth.AccountPublicDto;
import ru.ilya.auth.entity.Account;
import ru.ilya.auth.entity.dto.AccountMapper;
import ru.ilya.auth.entity.dto.AccountPrivateDto;
import ru.ilya.auth.exceptions.ResourceNotFoundException;
import ru.ilya.auth.repository.AccountRepository;
import ru.ilya.auth.service.AccountService;
import ru.ilya.auth.util.ToxUser;
import ru.ilya.auth.util.validation.AccountEmail;
import ru.ilya.auth.util.validation.AccountProfileName;
import ru.ilya.auth.util.validation.AccountUsername;

import java.util.*;

@Slf4j
@RestController
public class AccountInfoController {

    private final AccountRepository accountRepository;
    private final AccountService accountService;

    public AccountInfoController(AccountRepository accountRepository, AccountService accountService) {
        this.accountRepository = accountRepository;
        this.accountService = accountService;
    }

    public record ChangeEmailDto(@AccountEmail String value) { }
    public record ChangeUsernameDto(@AccountUsername String value) { }
    public record ChangeProfileNameDto(@AccountProfileName String value) { }

    @PatchMapping("/api/account/username")
    public ResponseEntity<?> changeUsername(
            ToxUser user,
            @RequestBody @Valid ChangeUsernameDto dto
    ) {
        Objects.requireNonNull(user);
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Changing username is not yet allowed");
    }

    @PatchMapping("/api/account/email")
    public ResponseEntity<Void> changeEmail(
            ToxUser user,
            @Valid @RequestBody ChangeEmailDto dto
    ) {
        log.info("Email patching by {} (value={})", accountRepository.getAccount(user).getUsername(), dto.value());
        Objects.requireNonNull(user);
        accountService.setEmail(user.getUserId(), dto.value());
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/api/account/profileName")
    public ResponseEntity<Void> changeProfileName(
            ToxUser user,
            @Valid @RequestBody ChangeProfileNameDto dto
    ) {
        Objects.requireNonNull(user);
        accountService.setProfileName(user.getUserId(), dto.value());
        return ResponseEntity.ok().build();
    }

    // accessing the current account
    @GetMapping("/api/account")
    public AccountPrivateDto accessCurrentAccount(
            ToxUser user
    ) {
        Objects.requireNonNull(user);
        Account account = accountRepository.getAccountById(user.getUserId());
        return AccountMapper.toPrivate(account);
    }

    @GetMapping("/api/account/{accountId}")
    public AccountPublicDto accessSpecifiedAccount(@PathVariable UUID accountId) {
        return AccountMapper.toPublic(accountRepository.getAccountById(accountId));
    }
    @GetMapping("/api/account/populate")
    public Map<UUID, AccountPublicDto> populateMultipleAccounts(
            @RequestParam List<UUID> ids
    ) {
        Map<UUID, AccountPublicDto> result = new HashMap<>();

        for(Account account : accountRepository.findAllById(ids)) {
            result.put(account.getId(), AccountMapper.toPublic(account));
        }

        return result;
    }



}
