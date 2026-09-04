package ru.ilya.auth.util.validation;


import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import jakarta.validation.ReportAsSingleViolation;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;


@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = {})
@Size(
        min = 4,  max = 64,
        message = "Username must be between 4 and 64 characters long"
)
@Pattern(
        regexp = "^[a-z0-9_-]+$",
        message = "Username can only contain lowercase letters, numbers, underscores, and hyphens"
)
public @interface AccountUsername {
    String message() default "Username is not valid";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
