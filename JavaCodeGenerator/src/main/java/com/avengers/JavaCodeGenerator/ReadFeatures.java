package com.avengers.JavaCodeGenerator;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

/**
 * Reads the feature file
 * @author sulabh
 *
 */
@Component
public class ReadFeatures {

	/**
	 * Reads the feature file and return the content
	 * @param path
	 * @return the content of the feature file
	 * @throws IOException 
	 */
	public String readFeature(String path) throws IOException{
		return Files.lines(Paths.get(path)).collect(Collectors.joining());
	}
}
