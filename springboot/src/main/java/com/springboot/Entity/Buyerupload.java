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
public class Buyerupload
{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int fileid;

    @ManyToOne
    @JoinColumn(name="buyerid")
    private Buyer buyer;

    private String filename;
    private String uploaddate;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String filepath;

    private String status;

}
