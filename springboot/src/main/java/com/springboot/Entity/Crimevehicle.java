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
public class Crimevehicle
{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int crid;

    @OneToOne
    @JoinColumn(name="crimeid")
    private Crimeadd crimeadd;

    @ManyToOne
    @JoinColumn(name="vehno")
    private Addvehicle addvehicle;

    private String crimedate;
    private String status;

}
