package com.team06.ticketmetasearch.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(value = "/recommended")
public class RecommendedController {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    // 获取航班信息，未指定航空公司
    @RequestMapping(value = "/matchedInfo")
    @ResponseBody
    public List<Map<String, Object>> AirlineInfo(HttpServletRequest request, HttpServletResponse response,
                                                 @RequestParam(value = "departureDate") String departureDate,
                                                 @RequestParam(value = "departureCityName") String departureCityName,
                                                 @RequestParam(value = "arrivalCityName") String arrivalCityName) throws SQLException {
//        List<Map<String, Object>> resList = new ArrayList<Map<String, Object>>();
//        ResultSet resultSet = null;
//        PreparedStatement statement = null;
//        String querySQL = "SELECT * FROM dwd_scheduledflight where departureDate = ? and departureCityName = ? and arrivalCityName = ?;";
//        statement.setString(1, departureDate);
//        statement.setString(2, departureCityName);
//        statement.setString(3, arrivalCityName);
//        System.out.println(departureDate+" "+departureCityName+" "+arrivalCityName);
        String querySQL = "SELECT * FROM dwd_scheduledflight where departureDate = '" + departureDate +
                "' and departureCityName = '" + departureCityName +
                "' and arrivalCityName = '" + arrivalCityName + "';";
        System.out.println(departureDate+" "+departureCityName+" "+arrivalCityName);
        return (List<Map<String, Object>>) jdbcTemplate.queryForList(querySQL);
    }

    // 指定航空公司
    @RequestMapping(value = "/chosenInfo")
    @ResponseBody
    public List<Map<String, Object>> AirChosenInfo(HttpServletRequest request, HttpServletResponse response,
                                                   @RequestParam(value = "departureDate") String departureDate,
                                                   @RequestParam(value = "departureCityName") String departureCityName,
                                                   @RequestParam(value = "arrivalCityName") String arrivalCityName,
                                                   @RequestParam(value = "airlineName") String airlineName) throws SQLException {
        String querySQL = "SELECT * FROM dwd_scheduledflight where departureDate = '" + departureDate +
                "' and departureCityName = '" + departureCityName +
                "' and arrivalCityName = '" + arrivalCityName +
                "' and airlineName = '" + airlineName + "';";
        System.out.println(departureDate+" "+departureCityName+" "+arrivalCityName+" "+airlineName);
        return (List<Map<String, Object>>) jdbcTemplate.queryForList(querySQL);
    }
}
