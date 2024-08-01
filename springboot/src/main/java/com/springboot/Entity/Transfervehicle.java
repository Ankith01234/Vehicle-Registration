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
public class Transfervehicle
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int transferid;

    @ManyToOne
    @JoinColumn(name = "vehno")
    private Addvehicle addvehicle;

    @ManyToOne
    @JoinColumn(name="buyerid")
    private Buyer buyer;

    private String regdate;
    private String status;

}
