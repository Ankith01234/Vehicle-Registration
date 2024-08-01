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
public class Transferownership
{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int ownershipid;

    @ManyToOne
    @JoinColumn(name="userid")
    private Adduser user;

    @ManyToOne
    @JoinColumn(name="buyerid")
    private Buyer buyerid;

    @ManyToOne
    @JoinColumn(name="vehno")
    private Addvehicle vehicle;

    private String transferdate;
    private String status;

}
