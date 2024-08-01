package com.springboot.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Addvehicle
{
    @Id
    private String vehiclenumber;

    private String vehiclename;
    private String vehicletype;
    private String vehiclecompany;

    @ManyToOne
    @JoinColumn(name="rtostaffid")
    private Rtostaff rtostaff;

    @ManyToOne
    @JoinColumn(name="userid")
    private Adduser adduser;

    @OneToMany(mappedBy = "addvehicle")
    @JsonIgnore
    private List<InsuranceCompany> insuranceCompany;

    @OneToMany(mappedBy = "addvehicle")
    @JsonIgnore
    private List<Crimevehicle> crimevehicle;

    @OneToMany(mappedBy = "addvehicle")
    @JsonIgnore
    private List<Transfervehicle> transfervehicle;

}
