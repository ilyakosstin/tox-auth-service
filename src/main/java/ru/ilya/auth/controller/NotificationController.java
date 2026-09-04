package ru.ilya.auth.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.ilya.auth.service.EmailService;

@RestController
public class NotificationController {

    private final EmailService emailService;

    public NotificationController(EmailService emailService) {
        this.emailService = emailService;
    }

    @GetMapping("/notify/email")
    public ResponseEntity<?> testEmail() {
        emailService.sendEmail("hello world!", "ilyaspecial999@gmail.com");
        return ResponseEntity.ok().build();
    }

}
