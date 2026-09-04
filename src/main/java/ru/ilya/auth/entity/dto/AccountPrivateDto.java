package ru.ilya.auth.entity.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import ru.ilya.auth.entity.Account;

import java.time.Instant;
import java.time.OffsetDateTime;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
public class AccountPrivateDto {

    public UUID id;
    public String username;
    public String profileName;
    public String email;
    public Instant createdAt;
    private UUID avatarFileDirectoryId;

}
