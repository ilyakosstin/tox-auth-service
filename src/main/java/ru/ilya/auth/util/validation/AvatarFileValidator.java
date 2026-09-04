package ru.ilya.auth.util.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;


public class AvatarFileValidator implements ConstraintValidator<AvatarFile, MultipartFile> {

    private final int minSide;
    private final int maxSide;
    private final long maxSizeMB;
    private final List<String> allowedMediaTypes;

    public AvatarFileValidator(
            @Value("${app.avatar.side.min}") int minSide,
            @Value("${app.avatar.side.max}") int maxSide,
            @Value("${app.avatar.maxSizeMB}") long maxSizeMB,
            @Value("${app.avatar.allowedMediaTypes}") List<String> allowedMediaTypes
    ) {
        this.minSide = minSide;
        this.maxSide = maxSide;
        this.maxSizeMB = maxSizeMB;
        this.allowedMediaTypes = allowedMediaTypes;
    }

    private boolean packContextWithCustomViolation(ConstraintValidatorContext context, String message) {
        context.disableDefaultConstraintViolation();
        context.buildConstraintViolationWithTemplate(message)
                .addConstraintViolation();
        return false;
    }

    @Override
    public boolean isValid(MultipartFile value, ConstraintValidatorContext context) {
        // check size!

        if (!allowedMediaTypes.contains(value.getContentType())) {
            return packContextWithCustomViolation(
                    context,
                    "Invalid media type (" + value.getContentType() + "): only " + String.join("; ", allowedMediaTypes) + " are allowed"
            );
        }

        if(value.getSize() > maxSizeMB * 1024 * 1024) {
            return packContextWithCustomViolation(
                    context,
                    "File is too heavy: max size is " + maxSizeMB + " MB"
            );
        }

        try(InputStream inputStream = value.getInputStream()) {
            BufferedImage image = ImageIO.read(inputStream);

            if (image.getHeight() != image.getWidth()) {
                return packContextWithCustomViolation(
                        context,
                        "Image must have 1:1 aspect ratio"
                );
            }

            if (image.getHeight() < minSide || image.getHeight() > maxSide) {
                return packContextWithCustomViolation(
                        context,
                        "Image side must be between " + minSide + "px and " + maxSide + "px"
                );
            }
        } catch(IOException e) {
            return false;
        }

        return true;
    }
}
