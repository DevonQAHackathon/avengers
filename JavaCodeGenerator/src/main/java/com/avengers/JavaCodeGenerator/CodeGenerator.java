package com.avengers.JavaCodeGenerator;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * Rest api for code generation
 * @author sulabh
 *
 */
@RestController
public class CodeGenerator {
	
	@Autowired
	private Generator generator;
	
	/**
	 * Ping service which tells service is up or not
	 * @return hello world
	 */
	@RequestMapping(value="/ping", method= RequestMethod.GET)
	public String ping(){
		return "Hello world";
	}
	
	/**
	 * Generates the code based on the file path is passed
	 * @param path
	 * @return generated java code
	 */
	@RequestMapping(value="/generateCode", method= RequestMethod.GET)
	public String generateCode(@RequestParam("file") String path){
		try {
			return generator.generator(path);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return "";
	}
	
}
