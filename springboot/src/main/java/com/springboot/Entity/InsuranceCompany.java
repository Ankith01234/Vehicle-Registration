package com.springboot.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class InsuranceCompany
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int vehinid;

    @ManyToOne
    @JoinColumn(name="vehicleno")
    private Addvehicle addvehicle;

    @ManyToOne
    @JoinColumn(name="insuranceid")
    private Insurance insurance;

    private String startdate;
    private String enddate;
    private int amount;
    private String status;

}
