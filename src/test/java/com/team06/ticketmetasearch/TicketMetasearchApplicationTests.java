package com.team06.ticketmetasearch;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcOperations;
import org.springframework.jdbc.core.JdbcTemplate;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

@SpringBootTest
class TicketMetasearchApplicationTests {
    @Autowired
    JdbcTemplate jdbcTemplate  ;

    @Test
    void contextLoads() throws SQLException {
        //  仅作 测试 使用  可删除



        String departureCity ="重庆";
        String departureDate = "2020/10%";
       String arrivalCityName="北京";
         String querySQL= "SELECT arrivalCityName  ,min(price) price FROM dwd_scheduledflight where  departureCityName= ?  and  departureDate = ?   group by  arrivalCityName  order by arrivalCityName;";
        //String querySQL1="SELECT departureDate , departureCityName, departureDate FROM  dwd_scheduledflight  where departureCityName= ?  and arrivalCityName = ? group by departureDate order by departureDate ;";
        String querySQL1 = "SELECT departureDate , avg(price) price FROM  dwd_scheduledflight  where departureCityName= ?  and arrivalCityName = ?  and departureDate LIKE  ? group by departureDate order by departureDate ; ";
        List<Map<String, Object>> list = jdbcTemplate.queryForList(querySQL1 ,departureCity,arrivalCityName,departureDate);
        System.out.println(list.toString());
        
    }

}
