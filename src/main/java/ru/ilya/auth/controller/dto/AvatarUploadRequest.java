package ru.ilya.auth.controller.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class AvatarUploadRequest {

    private MultipartFile avatar;


}
