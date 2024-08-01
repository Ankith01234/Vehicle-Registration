package com.springboot.Repository;

import com.springboot.Entity.Adduser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface AdduserRepository extends JpaRepository<Adduser,Integer>
{
    Optional<Adduser> findByUseremail(String email);

    @Query("select ad from Adduser ad where ad.rtostaff.staffid=?1")
    List<Adduser> findByAllUser(Integer rtoid);

    @Query("select ad.username,ad.userphone,ad.useremail,ad.address,av.vehiclenumber from Adduser ad inner join Addvehicle av on ad.userid=av.adduser.userid where av.vehiclenumber=?1 ")
    List<Object> findByUserDetails(String vehno);

}
