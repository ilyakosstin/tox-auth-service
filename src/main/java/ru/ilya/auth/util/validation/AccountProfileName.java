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
@Size(min = 4, max = 64, message = "Profile name must be between 4 and 64 characters long")
public @interface AccountProfileName {
    String message() default "Profile name is not valid";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
