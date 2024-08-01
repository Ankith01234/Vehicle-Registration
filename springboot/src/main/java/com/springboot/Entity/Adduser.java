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
public class Adduser
{

    @Id
    private int userid;

    private String username;
    private String userphone;
    private String useremail;
    private String userpswd;

    private String address;

    @ManyToOne
    @JoinColumn(name="staffid")
    private Rtostaff rtostaff;

    @OneToMany(mappedBy = "adduser")
    @JsonIgnore
    private List<Addvehicle> addvehicle;

}
