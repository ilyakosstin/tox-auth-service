package ru.ilya.auth.util;

import lombok.Builder;
import lombok.Getter;
import ru.ilya.auth.entity.Account;

import java.io.Serializable;
import java.util.UUID;


// TODO: get rid of that
@Getter
@Builder
public class ToxUser implements Serializable {

    // Used to unite authentication completed
    // using OAuth2 client (that is used on non /api endpoints)
    // using OAuth2 resource server (that is used on /api endpoints)

    private UUID userId;

}
