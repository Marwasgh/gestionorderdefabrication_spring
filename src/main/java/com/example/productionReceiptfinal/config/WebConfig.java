package com.example.productionReceiptfinal.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // autorise tous les endpoints
                .allowedOrigins("http://localhost:4200") // origine du frontend Angular
                .allowedMethods("*") // autorise tous les types de requêtes : GET, POST, PUT, DELETE...
                .allowedHeaders("*") // autorise tous les headers
                .allowCredentials(true); // autorise l’envoi de cookies ou headers d’authentification
    }
}