package ru.ilya.auth.entity.dto;


import ru.coffeetox.toxutils.dto.auth.AccountPublicDto;
import ru.ilya.auth.entity.Account;

public abstract class AccountMapper {


    public static AccountPublicDto toPublic(Account user) {
        return AccountPublicDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .profileName(user.getProfileName())
                .avatarFileDirectoryId(user.getAvatarFileDirectoryId())
                .build();
    }

    public static AccountPrivateDto toPrivate(Account user) {
        return AccountPrivateDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .profileName(user.getProfileName())
                .email(user.getEmail())
                .createdAt(user.getCreatedAt())
                .avatarFileDirectoryId(user.getAvatarFileDirectoryId())
                .build();
    }
}
