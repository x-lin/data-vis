package at.ac.tuwien.dst.mms.dal;

/**
 * Created by XLin on 25.04.2016.
 */
public interface DataConverter<S, T> {
	T convert(S sourceObject);

	T convert(S sourceObject, T targetObject);
}
