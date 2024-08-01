package com.springboot.Repository;

import com.springboot.Entity.Buyerupload;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface BuyeruploadRepository extends JpaRepository<Buyerupload,Integer>
{
    @Query("select bu from Buyerupload bu where bu.buyer.buyerid=?1 and bu.status=?2")
    List<Buyerupload> findAllFiles(Integer id,String status);

    @Query("select bu from Buyerupload bu where bu.buyer.buyerid=?1")
    Optional<Buyerupload> findByBuyerBuyerid(Integer id);

    @Query("select bu from Buyerupload bu where bu.buyer.buyerid=?1 and bu.status=?2")
    List<Buyerupload> findByBuyerBuyeridAndStatus(Integer id,String status);


}
