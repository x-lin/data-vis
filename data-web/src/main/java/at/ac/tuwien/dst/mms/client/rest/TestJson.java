package at.ac.tuwien.dst.mms.client.rest;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;

@XmlAccessorType(XmlAccessType.FIELD)
public class TestJson {
	private String name;

	private String mail;

	private String link;

	public TestJson(String name) {
		this.name = name;
		this.mail = "test@test.com";
		this.link = "http://www.test.com";
	}

	public String getName() {
		return name;
	}

	public String getMail() {
		return mail;
	}

	public String getLink() {
		return link;
	}

	@Override
	public String toString() {
		String string = "{name=%s mail=%s link=%s}";
		string = String.format(string, name, mail, link);
		return string;
	}
}