package ru.ilya.auth.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestClient;
import org.springframework.web.multipart.MultipartFile;
import ru.ilya.auth.controller.dto.AvatarUploadRequest;
import ru.ilya.auth.entity.Account;
import ru.ilya.auth.repository.AccountRepository;
import ru.ilya.auth.service.FsInteractionService;
import ru.ilya.auth.util.ToxUser;
import ru.ilya.auth.util.validation.AvatarFile;

import java.util.List;
import java.util.UUID;

@RestController
@Validated
public class AvatarUploadController {

    private final FsInteractionService fsInteractionService;
    private final AccountRepository accountRepository;

    public AvatarUploadController(FsInteractionService fsInteractionService, AccountRepository accountRepository) {
        this.fsInteractionService = fsInteractionService;
        this.accountRepository = accountRepository;
    }

    @PostMapping(
            value = "/api/avatar",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<?> uploadAvatar(
            @ModelAttribute("avatar") @AvatarFile MultipartFile avatar,
            ToxUser user
    ) throws Exception {

        UUID directoryId = accountRepository.getAccount(user).getAvatarFileDirectoryId();

        if(directoryId == null) {
            directoryId = fsInteractionService.createDirectory(
                    user,
                    null,
                    true,
                    List.of(avatar)
            );
        } else {
            fsInteractionService.uploadToDirectory(
                    user,
                    directoryId,
                    List.of(avatar)
            );
        }

        Account account = accountRepository.getAccount(user);

        account.setAvatarFileDirectoryId(directoryId);

        accountRepository.save(account);

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();

        body.add("directoryId", directoryId);

        return ResponseEntity.ok(body);
    }

}
