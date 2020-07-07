package com.team06.ticketmetasearch.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

@RestController
public class TransitController {
    @Autowired
    JdbcTemplate jdbcTemplate;

    @RequestMapping("/transitInfo")
    @ResponseBody
    // 中转的情况，先进行拼接
    // 航班记录的显示，airlineName,flightNumber,
    // departureDate,departureAirportName,departureTime,transitAirportName,transmitTime,arrivalAirportName,arrivalTime,price(dwd_transit.*)
    // 所需字段已经拼接在dwd_transit表里面
    public List<Map<String, Object>> TransitInfo(HttpServletRequest request, HttpServletResponse response,
                                                 @RequestParam(value = "departureDate") String departureDate,
                                                 @RequestParam(value = "departureCityName") String departureCityName,
                                                 @RequestParam(value = "arrivalCityName") String arrivalCityName) throws SQLException {
        String querySQL = "SELECT * FROM dwd_transit where departureDate = '" + departureDate +
                "' and departureCityName = '" + departureCityName +
                "' and arrivalCityName = '" + arrivalCityName + "';";
        System.out.println(departureDate+" "+departureCityName+" "+arrivalCityName);
        return (List<Map<String, Object>>) jdbcTemplate.queryForList(querySQL);
    }

}
