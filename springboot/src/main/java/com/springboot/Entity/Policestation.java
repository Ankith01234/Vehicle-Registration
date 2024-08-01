package com.springboot.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Policestation
{
    @Id
    private int stationid;

    private String stationname;
    private String stationemail;

    private String stationpassword;
    private String stationphone;
    private String stationaddress;

    @OneToOne
    @JoinColumn(name="areaid")
    private Area area;
}
