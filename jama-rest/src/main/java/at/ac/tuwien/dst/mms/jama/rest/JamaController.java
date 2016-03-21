package at.ac.tuwien.dst.mms.jama.rest;

import at.ac.tuwien.dst.mms.jama.model.Item;
import at.ac.tuwien.dst.mms.jama.model.Project;
import at.ac.tuwien.dst.mms.jama.model.Relationship;
import at.ac.tuwien.dst.mms.jama.rest.model.RelationshipResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by XLin on 02.03.2016.
 */
@RestController
public class JamaController {
    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    JameProjectExtractor projectExtractor;

    @Autowired
    JamaItemExtractor itemExtractor;

    @Autowired
    JamaRelationshipExtractor relationshipExtractor;

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @RequestMapping(value = "/projects", method= RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    List<Project> getAllProjects(
//            @RequestParam("webhook") String webhook
    ) {
        return projectExtractor.getAllProjects();
    }

    @RequestMapping(value = "/items", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    List<Item> getItems(
            @RequestParam("project") Integer projectId,
            @RequestParam(value="webhook", required=false) String webhook
    ) {
        //List<Item> items = itemExtractor.getAllItemsForProject(projectId);

        //this.writeItems(items);

        boolean isWebhook = (webhook != null && webhook.length() > 0);

        List<Item> pvcsb = this.getForFile("items_pvcsb.txt");
        List<Item> pvcsc = this.getForFile("items_pvcsc.txt");

        if(isWebhook) {
            restTemplate.postForEntity(webhook, pvcsb, Object.class);
            restTemplate.postForEntity(webhook, pvcsc, Object.class);
            return new ArrayList<>();
        } else {
            return pvcsb;
        }
    }

    private List<Item> getForFile(String filename) {
        List<Item> items = this.readItems(filename);

        List<Item> filteredItems = new ArrayList<>();

        for(Item item : items) {
            if(item.getStatus() == null ||
                    (item.getStatus() != null && !item.getStatus().equals("Deleted") && !item.getStatus().equals("Rejected"))) {
                filteredItems.add(item);

                if(item.getItemType().getKey().equals("FEAT") && (item.getKey().contains("-WP-") || item.getName().trim().startsWith("[WP]"))) {
                    logger.info("is work package");
                    item.setItemType(-1);
                }

                //this.extractRelationships(item);
            }
        }

        return filteredItems;
    }

    private void extractRelationships(Item item) {
        System.out.println(item.getItemType());

        if(item.getItemType() != null && !item.getItemType().getKey().equals("FLD") && !item.getItemType().getKey().equals("SET")) {
            RelationshipResponse initialResponse = relationshipExtractor.getRelationshipsForItem(item.getJamaId());

            if(initialResponse != null && initialResponse.getRelationships() != null) {
                RelationshipsTempStorage.get().add(initialResponse.getRelationships());
            }
        } else {
            logger.info("Folder or Set detected, not extracting.");
        }
    }

    @RequestMapping(value = "/relationships", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    List<Relationship> getRelationships(
            @RequestParam("project") Integer projectId,
            @RequestParam(value="webhook", required=false) String webhook
    ) {

        List<Relationship> relationships = this.readObjects();

        boolean isWebhook = (webhook != null && webhook.length() > 0);

        if(isWebhook) {

            restTemplate.postForEntity(webhook, relationships, Object.class);

            return new ArrayList<>();
        } else {
            return relationships;
        }
    }

    private void writeItems(List<Item> items, String filename) {
        try {
            FileOutputStream out = new FileOutputStream(filename);
            ObjectOutputStream objOut = new ObjectOutputStream(out);
            objOut.writeObject(items);
            objOut.close();
            out.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private List<Item> readItems(String filename) {
        List<Item> items = new ArrayList<>();

        try {
            FileInputStream fileIn = new FileInputStream(filename);
            ObjectInputStream in = new ObjectInputStream(fileIn);
            items = (List<Item>)in.readObject();
            in.close();
            fileIn.close();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }

        return items;
    }

    private void writeObjects(List<Relationship> relationships) {
        try {
            FileOutputStream out = new FileOutputStream("relationships.txt");
            ObjectOutputStream objOut = new ObjectOutputStream(out);
            objOut.writeObject(relationships);
            objOut.close();
            out.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private List<Relationship> readObjects() {
        List<Relationship> relationships = new ArrayList<Relationship>();

        try {
            FileInputStream fileIn = new FileInputStream("relationships.txt");
            ObjectInputStream in = new ObjectInputStream(fileIn);
            relationships = (List<Relationship>)in.readObject();
            in.close();
            fileIn.close();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }

        return relationships;
    }

    private void writeFile() {
        try(FileWriter writer = new FileWriter("output.txt")) {
            for(Relationship rel: RelationshipsTempStorage.get().getAll()) {
                writer.write(rel.toString());
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private String readFile() {
        StringBuilder sb = new StringBuilder();

        try(BufferedReader br = new BufferedReader(new FileReader("output.txt"))) {
            String line = br.readLine();

            while (line != null) {
                sb.append(line);
                sb.append(System.lineSeparator());
                line = br.readLine();
            }
            String everything = sb.toString();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return sb.toString();
    }

    private List<Relationship> convertToObjects(String data) {
        List<Relationship> relationships = new ArrayList<>();

        String[] tokens = data.split("}");
        for(String token : tokens) {
            if(token.trim().length() > 0) {
                token = token.substring(13);

                String[] fromTo = token.split(", ");
                String from = fromTo[0].substring(5);
                String to = fromTo[1].substring(3);
                relationships.add(new Relationship(Long.parseLong(from), Long.parseLong(to)));
            }
        }

        return relationships;
    }
}
