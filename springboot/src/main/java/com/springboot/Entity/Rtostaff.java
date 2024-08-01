package com.springboot.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
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
public class Rtostaff
{

    @Id
    private int staffid;

    private String staffname;
    private String staffemail;
    private String staffphone;
    private String staffpassword;
    private String staffaddress;

    @OneToMany(mappedBy = "rtostaff")
    @JsonIgnore
    private List<Adduser> adduser;

    @OneToMany(mappedBy = "rtostaff")
    @JsonIgnore
    private List<Addvehicle> addvehicle;

}
