package com.springboot.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Insurance
{
    @Id
    private int companyid;

    private String companyname;
    private String companyemail;
    private String companyphone;

    private String password;
    private String companyaddress;

    @OneToMany(mappedBy = "insurance")
    @JsonIgnore
    private List<InsuranceCompany> insuranceCompany;

}
