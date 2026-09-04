package ru.ilya.auth.util.validation;


import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import jakarta.validation.ReportAsSingleViolation;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;


@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = {})
@Size(max = 128, message = "Email must be under 128 characters long")
@Email(message = "Please provide a valid email address")
public @interface AccountEmail {
    String message() default "Email is not valid";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
