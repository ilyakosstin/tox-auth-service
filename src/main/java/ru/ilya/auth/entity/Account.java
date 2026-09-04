package ru.ilya.auth.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.sql.Types;
import java.time.Instant;
import java.time.OffsetDateTime;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(
        name = "accounts",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = Account.UNIQUE_USERNAME_CONSTRAINT_NAME,
                        columnNames = "username"
                ),
                @UniqueConstraint(
                        name = Account.UNIQUE_EMAIL_CONSTRAINT_NAME,
                        columnNames = "email"
                )
        }
)
public class Account {

    public static final String UNIQUE_USERNAME_CONSTRAINT_NAME = "uc_accounts_username";
    public static final String UNIQUE_EMAIL_CONSTRAINT_NAME = "uc_accounts_email";

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @JdbcTypeCode(Types.VARCHAR)
    public UUID id;

    @Column(length = 64, nullable = false, unique = true)
    public String username;

    @Column(length = 512, nullable = false)
    public String password;

    @Column(length = 512, nullable = true, unique = true)
    public String email;

    @Column(length = 64, nullable = true, name = "profile_name")
    public String profileName;

    @CreationTimestamp
    public Instant createdAt;

    @Column(nullable = true)
    public UUID avatarFileDirectoryId;
}
