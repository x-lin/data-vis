package at.ac.tuwien.dst.mms.jama.serialize;

/**
 * Created by XLin on 25.04.2016.
 */
public interface FileSerializer<T> {
	void write(T objects, String filename);

	T read(String filename);
}
