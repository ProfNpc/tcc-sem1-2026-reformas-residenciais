

package br.com.belval.refores;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * PARA FAZER A LIGAÇÃO DO BACK END COM O FRONT END.
 */

/**
 * CORS=Cross origin resource sharing/
 * Compartilhamento cruzado de origem d recurso
 * 
 *  */

@Configuration
public class CorsConfig implements WebMvcConfigurer {
	@Override
	
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**")
		.allowedOrigins("http://localhost:5173")
		.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH" )
		.allowedHeaders("*");
	
	}
	
}

