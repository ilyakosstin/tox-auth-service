package ru.ilya.auth.controller;

import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.security.web.savedrequest.HttpSessionRequestCache;
import org.springframework.security.web.savedrequest.RequestCache;
import org.springframework.security.web.savedrequest.SavedRequest;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ru.ilya.auth.controller.dto.RegisterRequest;
import ru.ilya.auth.entity.Account;
import ru.ilya.auth.entity.dto.AccountPrivateDto;
import ru.ilya.auth.service.AccountService;
import ru.ilya.auth.util.UserDetailsImpl;

import java.util.Map;

@RestController
public class RegisterController {

    private final AccountService accountService;
    private final SecurityContextRepository securityContextRepository;

    private final RequestCache requestCache = new HttpSessionRequestCache();

    public RegisterController(AccountService accountService, SecurityContextRepository securityContextRepository) {
        this.accountService = accountService;
        this.securityContextRepository = securityContextRepository;
    }

    @PostMapping("/api/register")
    public ResponseEntity<AccountPrivateDto> register(
            @RequestBody @Valid RegisterRequest request
    ) {
        AccountPrivateDto dto = accountService.createAccount(request);
        return ResponseEntity.ok(dto);
    }

}
