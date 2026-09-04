package ru.ilya.auth.util;

import org.springframework.core.MethodParameter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;
import ru.ilya.auth.entity.Account;
import ru.ilya.auth.repository.AccountRepository;

import java.nio.file.AccessDeniedException;
import java.security.Principal;
import java.util.UUID;
import java.util.regex.Pattern;

public class ToxHandlerArgumentResolver implements HandlerMethodArgumentResolver {

    private static final Pattern STRICT_UUID_REGEX =
            Pattern.compile("^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$");

    private final AccountRepository accountRepository;

    public ToxHandlerArgumentResolver(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    private boolean isCorrectUUID(String uuidStr) {
        return STRICT_UUID_REGEX.matcher(uuidStr).matches();
    }

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.getParameterType().equals(ToxUser.class);
    }

    @Override
    public Object resolveArgument(
            MethodParameter parameter,
            ModelAndViewContainer mavContainer,
            NativeWebRequest webRequest,
            WebDataBinderFactory binderFactory
    ) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null) {
            return null;
        }

        String uuidStr = authentication.getName();

        if (uuidStr == null) {
            return null;
        } else if(!isCorrectUUID(uuidStr)) {
            throw new AccessDeniedException("Invalid UUID was provided");
        }

        UUID userId = UUID.fromString(uuidStr);

        accountRepository.findAccountById(userId)
                .orElseThrow(() -> new AccessDeniedException("Could not find account with provided UUID"));

        return ToxUser.builder()
                .userId(userId)
                .build();
    }
}
