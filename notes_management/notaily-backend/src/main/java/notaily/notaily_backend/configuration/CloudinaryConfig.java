package notaily.notaily_backend.configuration;

import com.cloudinary.Cloudinary;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class CloudinaryConfig {
    @Bean
    public Cloudinary cloudinary() {
        final Map<String, String> config = new HashMap<String, String>();
        config.put("cloud_name", "dozyhynkf");
        config.put("api_key", "762659122749954");
        config.put("api_secret", "SbB7VreMcVHq9ciG_LGZ2hIi1pk");
        return new Cloudinary(config);
    }
}
