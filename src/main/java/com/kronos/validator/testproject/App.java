package com.kronos.validator.testproject;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import java.util.stream.Collectors;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.xml.sax.SAXException;

/**
 * Hello world!
 *
 */
public class App 
{
	
	static DocumentBuilder builder;

	private static final Logger LOGGER = LogManager.getLogger(App.class);

    public static void main( String[] args )
    {
    	DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
    	factory.setValidating(false);
    	factory.setNamespaceAware(true);
    	List<File> failedFile = new ArrayList<>();
    	try {
    		builder= factory.newDocumentBuilder();
			builder.setErrorHandler(new SimpleErrorHandler());
		} catch (ParserConfigurationException e) {
			LOGGER.error("error occured while creating builder {}", e.getMessage());
			
		}
    	File policiesSourceFolder = new File(ApplicationsConstants.SOURCE+
    			File.separator+"policies");
    	File resourcesSourceFolder = new File(ApplicationsConstants.SOURCE+File.separator+"resources");
    	
    	List<File> xmlFiles = Arrays.stream(policiesSourceFolder.listFiles()).collect(Collectors.toList());
    	xmlFiles.stream().forEach(i->{
    		try {
				builder.parse(i);
			} catch (SAXException|IOException e) {
				LOGGER.error("error occured while pasring XML {}", e.getMessage());
				failedFile.add(i);
			}
    	});
    	List<Object> jsFiles = Arrays.stream(policiesSourceFolder.listFiles()).collect(Collectors.toList());
    	if(Objects.nonNull(failedFile) && !failedFile.isEmpty())
    	{
    		failedFile.stream().forEach(file->System.out.println("xml validation failed for "+file.getName()));
    	}
        System.out.println( "Hello World!" );
    }
}
