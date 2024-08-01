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
public class Crimeadd
{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int cid;

    @ManyToOne
    @JoinColumn(name="stationid")
    private Policestation policestation;

    @ManyToOne
    @JoinColumn(name="ctid")
    private Crimetype crimetype;

    private String crimename;
    private String crimedesc;
    private String crimedate;

    private String status;

}
