package at.ac.tuwien.dst.mms.jama.serialize;

import java.io.*;

/**
 *
 * @author XLin
 */
public abstract class AbstractFileSerializer<T> implements FileSerializer {

	@Override
	public void write(Object objects, String filename) {
		try {
			FileOutputStream out = new FileOutputStream(filename);
			ObjectOutputStream objOut = new ObjectOutputStream(out);
			objOut.writeObject(objects);
			objOut.close();
			out.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	@Override
	public T read(String filename) {
		T object = null;

		try {
			FileInputStream fileIn = new FileInputStream(filename);
			ObjectInputStream in = new ObjectInputStream(fileIn);
			object = (T)in.readObject();
			in.close();
			fileIn.close();
		} catch (IOException | ClassNotFoundException e) {
			e.printStackTrace();
		}

		return object;
	}
}
