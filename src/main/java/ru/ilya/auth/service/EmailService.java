package ru.ilya.auth.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender javaMailSender;
    private final String localMailAddress;

    public EmailService(JavaMailSender javaMailSender, @Value("${spring.mail.username}") String localMailAddress) {
        this.javaMailSender = javaMailSender;
        this.localMailAddress = localMailAddress;
    }

    public void sendEmail(String body, String to) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(localMailAddress);
        message.setTo(to);
        message.setSubject("Notification from coffeetox");
        message.setText(body);
        javaMailSender.send(message);
    }

}
