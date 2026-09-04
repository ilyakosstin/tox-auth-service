package ru.ilya.auth.util.error;

import lombok.Data;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.Map;

public class ValidationErrorResponse extends ErrorResponse {

    @Getter
    private final Map<String, List<String>> validationErrors;


    public ValidationErrorResponse(int status, String code, String message, Map<String, List<String>> validationErrors) {
        super(status, code, message);
        this.validationErrors = validationErrors;
    }

    public ValidationErrorResponse(Map<String, List<String>> validationErrors) {
        this(HttpStatus.BAD_REQUEST.value(), "VALIDATION_ERROR", "Values of some fields are not valid.", validationErrors);
    }

}
