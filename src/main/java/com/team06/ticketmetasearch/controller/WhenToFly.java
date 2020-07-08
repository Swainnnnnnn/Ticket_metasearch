package com.team06.ticketmetasearch.controller;


import com.alibaba.fastjson.JSON;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(value = "/Predict")
public class WhenToFly {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @RequestMapping(value = "/WhenToFly")
    @ResponseBody
    public List<Map<String, Object>> GetWhenToFly(HttpServletRequest request, HttpServletResponse response,
                                                  @RequestParam(value = "departureCityName")String departureCityName,
                                                  @RequestParam(value = "arrivalCityName")String arrivalCityName , @RequestParam(value = "departureMonth")String departureMonth ) throws SQLException {
        departureCityName="北京";
        arrivalCityName="成都";
        departureMonth =departureMonth+"%" ;
        PreparedStatement statement = null;
      //  String querySQL = "SELECT dt , avg(price) price FROM  ?  where Destination= ? order by dt group by dt;";
       String querySQL = "SELECT departureDate , avg(price) price FROM  dwd_scheduledflight  where departureCityName= ?  and arrivalCityName = ?  and departureDate LIKE  ? group by departureDate order by departureDate ; ";
      /*  statement.setString(1,departureCityName);
        statement.setString(2,arrivalCityName);*/
        List<Map<String, Object>> GoList = jdbcTemplate.queryForList(querySQL, departureCityName,arrivalCityName,departureMonth);
        System.out.println(GoList.toString());
      /*  statement.setString(2,departureCityName);
        statement.setString(1,arrivalCityName);*/
        List<Map<String, Object>> BackList = jdbcTemplate.queryForList(querySQL, arrivalCityName,departureCityName,departureMonth);
        System.out.println(BackList.toString());
        for (int i = 0; i < GoList.size(); i++) {
            int backAndgo=0;
            for (int j = 0; j < BackList.size(); j++){
                if ((String)GoList.get(i).get("departureDate")==(String)BackList.get(j).get("departureDate")){
                     backAndgo= (int )GoList.get(i).get("price")+(int )BackList.get(j).get("price");
                     break;
                }
            }
            if ( backAndgo==0){
                backAndgo= (int )GoList.get(i).get("price");
            }

            GoList.get(i).put("price",backAndgo);
        }
        System.out.println(GoList.toString());
        return  GoList;

}
    @RequestMapping(value = "/WhereToFly")
    @ResponseBody
    public List<Map<String, Object>> GetWhereToFly (HttpServletRequest request, HttpServletResponse response,
                                                    @RequestParam(value = "departureCity")String departureCity,
                                                    @RequestParam(value = "departureDate")String departureDate) throws SQLException {
       // PreparedStatement statement = null;
        String querySQL= "SELECT arrivalCityName  ,min(price) price FROM dwd_scheduledflight where  departureCityName= ?  and  departureDate = ?   group by  arrivalCityName  order by arrivalCityName;";
        // String querySQL= "SELECT arrivalCityName  ,min(price) price FROM dwd_scheduledflight where  departureCityName= ?  and  departureDate = ?  order by arrivalCityName  group by  arrivalCityName;";
     /*   statement.setString(1,departureCity);
        statement.setString(2,departureDate);*/
        List<Map<String, Object>> list = jdbcTemplate.queryForList(querySQL, departureCity,departureDate);
        return  list;
    }

}
