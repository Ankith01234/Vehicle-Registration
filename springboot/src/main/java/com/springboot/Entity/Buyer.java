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
public class Buyer
{

    @Id
    private int buyerid;

    private String buyername;
    private String buyeremail;
    private String buyerpassword;
    private String buyerphone;
    private String buyeraddress;

    @OneToMany(mappedBy = "buyer")
    @JsonIgnore
    private List<Buyerupload> buyerupload;

    @OneToMany(mappedBy = "buyer")
    @JsonIgnore
    private List<Transfervehicle> transfervehicle;

}
