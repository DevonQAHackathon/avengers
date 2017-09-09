package com.avengers.JavaCodeGenerator;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

/**
 * Used to read a Genkins file from local folder
 * and generate a java test code
 * 
 * Date : 09-Sep-2017
 * 
 * @author sulabh
 *
 */
@Controller
public class Generator {
	
	@Autowired
	private TemplateUtil templateUtil;
	
	/**
	 * Generates code and return the it
	 * @param filesPath
	 * @return generated java code
	 * @throws IOException
	 */
	public String generator(String filesPath) throws IOException{
		String output = generatorCode(filesPath);
		return output;
	}

	private String generatorCode(String path) throws IOException {
		StringBuilder generatedClass = new StringBuilder();
		StringBuilder code = new StringBuilder();
		Files.lines(Paths.get(path))
		.forEach(x -> code.append(parse(x)));
		
		String className = Files.lines(Paths.get(path.toString())).filter(text -> text.trim().startsWith("Scenario"))
		.map(text -> removeWhiteSpace(text.trim().replace("Scenario:", ""))).findFirst().orElse("TempClass");
		
		generatedClass.append(templateUtil.classTemplate(className, code.toString()));
		return generatedClass.toString();
	}
	
	private String parse(String x){
		String parsedValue = "";
		if(x.trim().startsWith("Given")){
			parsedValue = templateUtil.givenTemplate(x.replaceFirst("Given", ""), "given");
		}else if(x.trim().startsWith("When")){
			parsedValue = templateUtil.whenTemplate(x.replaceFirst("When", ""), "when");
		}else if(x.trim().startsWith("Then")){
			parsedValue = templateUtil.thenTemplate(x.replaceFirst("Then", ""), "then");
		}else if(x.trim().startsWith("And")){
			parsedValue = templateUtil.andTemplate(x.replaceFirst("And", ""), "and");
		}
		return parsedValue.trim();
	}

	/**
	 * Remove the white space from the text and return
	 * @param text
	 * @return removed white space text
	 */
	private String removeWhiteSpace(String text){
		return text.replaceAll(" ", "").trim();
	}
}
