package at.ac.tuwien.dst.mms.dal;

import java.util.List;

/**
 * Created by XLin on 25.04.2016.
 */
public interface DataWriter<T> {
	void write(List<T> objects);

	void write(T object);

	void delete(List<T> objects);
}
