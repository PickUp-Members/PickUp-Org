package vau.ac.lk.backend.models.support;

import lombok.Data;

@Data
public class Address {
    private String street;
    private String city;
    private String province;
    private String zipCode;
    private boolean isDefault;
}
