package ru.ilya.auth.util.validation;


import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = AvatarFileValidator.class)
public @interface AvatarFile {
    String message() default "The file is not suitable for avatar";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
