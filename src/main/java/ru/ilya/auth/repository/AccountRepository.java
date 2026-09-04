package ru.ilya.auth.repository;

import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.repository.CrudRepository;
import ru.ilya.auth.entity.Account;
import ru.ilya.auth.exceptions.ResourceNotFoundException;
import ru.ilya.auth.util.ToxUser;

import java.util.Optional;
import java.util.UUID;

public interface    AccountRepository extends JpaRepository<Account, UUID> {
    Optional<Account> findAccountByUsername(String username);

    Optional<Account> findAccountById(UUID id);

    default Account getAccountById(UUID id) {
        return findAccountById(id)
                .orElseThrow(() -> new ResourceNotFoundException("user", "id", id));
    }

    default Account getAccount(ToxUser user) {
        return getAccountById(user.getUserId());
    }

    boolean existsAccountByUsername(String username);

    boolean existsAccountByEmail(String email);

}
