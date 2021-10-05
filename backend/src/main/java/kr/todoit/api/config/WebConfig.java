package kr.todoit.api.config;

import kr.todoit.api.interceptor.TokenVerifyInterceptor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    private final String uploadImagePath;

    public WebConfig(@Value("${custom.path.upload-images}") String uploadImagePath) {
        this.uploadImagePath = uploadImagePath;
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000")
                .allowCredentials(true)
                .exposedHeaders("Authorization")
                .allowedMethods(
                        HttpMethod.GET.name(),
                        HttpMethod.HEAD.name(),
                        HttpMethod.POST.name(),
                        HttpMethod.PUT.name(),
                        HttpMethod.DELETE.name());
    }

    @Bean
    public TokenVerifyInterceptor tokenVerifyInterceptor() {
        return new TokenVerifyInterceptor();
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(tokenVerifyInterceptor())
                .addPathPatterns("/**")
                .excludePathPatterns("/images/**")
                .excludePathPatterns("/users/join-free")
                .excludePathPatterns ("/**/*.png", "/**/*.jpg", "/**/*.jpeg", "/**/*.gif", "/**/*.svg")
                .excludePathPatterns("/users/join-by-oauth")
                .excludePathPatterns("/auth/silent-refresh");
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/images/**")
                .addResourceLocations("file:///"+uploadImagePath+"/");
    }
}