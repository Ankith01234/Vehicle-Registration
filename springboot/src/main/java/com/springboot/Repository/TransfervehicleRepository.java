package com.springboot.Repository;

import com.springboot.Entity.Transfervehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TransfervehicleRepository extends JpaRepository<Transfervehicle,Integer>
{
    Optional<Transfervehicle> findByAddvehicleVehiclenumberAndStatus(String vehiclenumber,String status);

    @Query("select tv.addvehicle.vehiclenumber,tv.regdate,b.buyername from Transfervehicle tv inner join Buyer b on b.buyerid=tv.buyer.buyerid inner join Addvehicle av on av.vehiclenumber=tv.addvehicle.vehiclenumber where av.rtostaff.staffid=?1 and tv.status=?2")
    List<Object> findByTransVeh(Integer id,String status);

    Optional<Transfervehicle> findByAddvehicleVehiclenumber(String vehno);

}
