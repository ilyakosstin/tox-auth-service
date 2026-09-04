package ru.ilya.auth.controller.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;
import ru.ilya.auth.util.validation.AccountEmail;
import ru.ilya.auth.util.validation.AccountProfileName;
import ru.ilya.auth.util.validation.AccountUsername;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegisterRequest {

    @NotBlank(message = "Username is required")
    @AccountUsername
    public String username;

    @NotBlank(message = "Password is required")
    @Size(
            min = 4,
            message = "Password must be at least 4 characters long"
    )
    public String password;

    @AccountEmail
    public String email;

    @AccountProfileName
    public String profileName;

}
