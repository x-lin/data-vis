package at.ac.tuwien.dst.mms.jama.extract.rest.message.response;

import at.ac.tuwien.dst.mms.jama.extract.rest.message.model.Item;
import at.ac.tuwien.dst.mms.jama.extract.rest.message.model.Meta;
import at.ac.tuwien.dst.mms.jama.extract.rest.message.model.PageInfo;
import at.ac.tuwien.dst.mms.jama.extract.rest.message.model.Status;

/**
 * @author LinX
 */
public abstract class SingleResponse<T> {
    private T data;

    private Meta meta;

    public PageInfo getPageInfo() {
        return this.meta.getPageInfo();
    }

    public T getData() {
        return this.data;
    }

    public static final class SingleItemResponse extends SingleResponse<Item> {
    }

    public static final class SingleStatusResponse extends SingleResponse<Status> {
    }
}
