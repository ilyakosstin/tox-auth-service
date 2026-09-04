package ru.ilya.auth.util.error;

import lombok.Data;

import java.time.Instant;
import java.time.LocalDateTime;

@Data
public class ErrorResponse {
    private final LocalDateTime timestamp;
    private final int status;
    private final String code;
    private final String message;

    public ErrorResponse(int status, String code, String message) {
        this.timestamp = LocalDateTime.now();
        this.status = status;
        this.code = code;
        this.message = message;
    }
}
