package com.avengers.JavaCodeGenerator;

import java.io.StringWriter;

import javax.annotation.PostConstruct;

import org.apache.velocity.Template;
import org.apache.velocity.VelocityContext;
import org.apache.velocity.app.VelocityEngine;
import org.springframework.stereotype.Controller;

/**
 * Reads the tempate
 * 
 * @author sulabh
 *
 */
@Controller
public class TemplateUtil {

	private static final String SRC_MAIN_RESOURCES_TEMPLATES_WHEN_VM = "/src/main/resources/templates/when.vm";
	private static final String SRC_MAIN_RESOURCES_TEMPLATES_THEN_VM = "/src/main/resources/templates/then.vm";
	private static final String SRC_MAIN_RESOURCES_TEMPLATES_GIVEN_VM = "/src/main/resources/templates/given.vm";
	private static final String SRC_MAIN_RESOURCES_TEMPLATES_AND_VM = "/src/main/resources/templates/and.vm";
	private static final String SRC_MAIN_RESOURCES_TEMPLATES_CLASS_VM = "/src/main/resources/templates/class.vm";

	private VelocityEngine ve;

	@PostConstruct
	public void init() {
		ve = new VelocityEngine();
		ve.init();
	}

	/**
	 * Calls when template and return processed text
	 * 
	 * @return processed template data
	 */
	public String whenTemplate(String whenText, String method) {
		StringWriter writer = callTemplate("whenText", "methodName", whenText.trim(),
				removeWhiteSpace(whenText.trim()).toLowerCase(), SRC_MAIN_RESOURCES_TEMPLATES_WHEN_VM);
		return writer.toString();
	}

	/**
	 * Calls given template and return processed text
	 * 
	 * @return processed template data
	 */
	public String givenTemplate(String givenText, String method) {
		StringWriter writer = callTemplate("givenText", "methodName", givenText.trim(),
				removeWhiteSpace(givenText.trim()).toLowerCase(), SRC_MAIN_RESOURCES_TEMPLATES_GIVEN_VM);
		return writer.toString();
	}

	/**
	 * Calls then template and return processed text
	 * 
	 * @return processed template data
	 */
	public String thenTemplate(String thenText, String method) {
		StringWriter writer = callTemplate("thenText", "methodName", thenText.trim(),
				removeWhiteSpace(thenText.trim()).toLowerCase(), SRC_MAIN_RESOURCES_TEMPLATES_THEN_VM);
		return writer.toString();
	}

	/**
	 * Calls when template and return processed text
	 * 
	 * @return processed template data
	 */
	public String andTemplate(String andText, String method) {
		StringWriter writer = callTemplate("andText", "methodName", andText.trim(),
				removeWhiteSpace(andText.trim()).toLowerCase().toLowerCase(), SRC_MAIN_RESOURCES_TEMPLATES_AND_VM);
		return writer.toString();
	}

	/**
	 * Calls class template and return processed text
	 * 
	 * @return processed template data
	 */
	public String classTemplate(String classText, String text) {
		StringWriter writer = callTemplate("className", "classBody", classText,
				text, SRC_MAIN_RESOURCES_TEMPLATES_CLASS_VM);
		return writer.toString();
	}

	/**
	 * Calls the template
	 * 
	 * @param annotationTag
	 * @param textTag
	 * @param whenText
	 * @param method
	 * @return StringWriter
	 */
	private StringWriter callTemplate(String annotationTag, String textTag, String whenText, String method,
			String vmPath) {
		Template t = ve.getTemplate(vmPath);
		VelocityContext context = new VelocityContext();
		context.put(annotationTag, whenText);
		context.put(textTag, method);
		StringWriter writer = new StringWriter();
		t.merge(context, writer);
		return writer;
	}
	
	/**
	 * Remove the white space from the text and return
	 * @param text
	 * @return removed white space text
	 */
	public String removeWhiteSpace(String text){
		return text.replaceAll(" ", "").trim();
	}
}
