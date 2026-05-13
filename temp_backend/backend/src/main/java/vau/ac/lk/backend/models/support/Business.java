package vau.ac.lk.backend.models.support;

public class Business {
    private String name;
    private String description;
    private String contactPhone;
    private String documents;

    /* Constructors */
    // No Arg Constructor
    public Business() {}
    // All Arg Constructor
    public Business(String name, String description, String contactPhone, String documents) {
        this.name = name;
        this.description = description;
        this.contactPhone = contactPhone;
        this.documents = documents;
    }

    // String - name
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    // String - description
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }

    // String - contactPhone
    public String getContactPhone() {
        return contactPhone;
    }
    public void setContactPhone(String contactPhone) {
        this.contactPhone = contactPhone;
    }

    // String - documents
    public String getDocuments() {
        return documents;
    }
    public void setDocuments(String documents) {
        this.documents = documents;
    }
}
