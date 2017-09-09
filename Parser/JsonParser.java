package com.Hackathon.JavaCode;
import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;

import org.json.JSONArray;
import org.json.JSONObject;

public class JsonParser {

	public static void parser(String jsonFile, String filePath) throws IOException{

		FileWriter fr = new FileWriter(filePath);
		BufferedWriter br = new BufferedWriter(fr);
		
		JSONObject obj = new JSONObject(jsonFile);
		JSONArray featureCont = obj.getJSONArray("feature"); 
		JSONArray sceContents = obj.getJSONArray("scenario");

		String blog = featureCont.getJSONObject(0).toString();
		br.write("Feature:");
		br.write(blog);
		br.newLine();
		String blogDesc = featureCont.getJSONObject(1).toString();
		br.write(blogDesc);
		br.newLine();
		
		JSONArray condContents = sceContents.getJSONArray(0);

		br.write("Scenario: ");
		String nameContents = sceContents.getJSONArray(1).toString();
		br.write(nameContents);
		br.newLine();

		String value="", key="";
		for(int i=0; i<condContents.length();i++){
			key = condContents.getJSONArray(1).toString();
			br.write(key);
			br.write(" ");
			value = condContents.getJSONArray(0).toString();
			br.write(value);
			br.write(" ");
			br.newLine();
		}
		
		br.close();

	}
	
	public static void main(String[] args) {
		try {
			parser("D:\\sample.json","D:\\demo.txt");
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
}
