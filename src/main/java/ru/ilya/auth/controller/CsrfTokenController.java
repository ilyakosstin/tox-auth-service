package ru.ilya.auth.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CsrfTokenController {

    // TODO: need to set up CORS for that!
    @GetMapping("/api/csrf")
    public CsrfToken getToken(CsrfToken csrfToken) {
        return csrfToken;
    }


}
