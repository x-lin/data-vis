package at.ac.tuwien.dst.mms.config;

/**
 * @author LinX
 */
public class UserAccount {
    private final String username;

    private final String password;

    public UserAccount( final String username, final String password ) {
        this.username = username;
        this.password = password;
    }

    public String getUsername() {
        return this.username;
    }

    public String getPassword() {
        return this.password;
    }
}
