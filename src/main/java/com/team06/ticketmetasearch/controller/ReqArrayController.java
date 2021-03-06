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
@RequestMapping(value = "/filter")
public class ReqArrayController {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    // 获取航班信息，未指定航空公司按时间升序排序
    @RequestMapping(value = "/matchedTimeAsc")
    @ResponseBody
    public List<Map<String, Object>> AirlineTimeInfo(HttpServletRequest request, HttpServletResponse response,
                                                 @RequestParam(value = "departureDate") String departureDate,
                                                 @RequestParam(value = "departureCityName") String departureCityName,
                                                 @RequestParam(value = "arrivalCityName") String arrivalCityName) throws SQLException {
        String querySQL = "SELECT * FROM dwd_scheduledflight where departureDate = '" + departureDate +
                "' and departureCityName = '" + departureCityName +
                "' and arrivalCityName = '" + arrivalCityName + "'order by arrivalTime asc;";

//        List<Map<String,Object>> lists = jdbcTemplate.queryForList(querySQL);
//        for(int i=0;i<lists.size();i++){
//            System.out.println(lists.get(i).get("departureTime"));
//        }
        System.out.println(departureDate+" "+departureCityName+" "+arrivalCityName);
        return (List<Map<String, Object>>) jdbcTemplate.queryForList(querySQL);
    }

    // 获取航班信息，未指定航空公司按时间降序排序
    @RequestMapping(value = "/matchedTimeDesc")
    @ResponseBody
    public List<Map<String, Object>> AirlineTimeDInfo(HttpServletRequest request, HttpServletResponse response,
                                                     @RequestParam(value = "departureDate") String departureDate,
                                                     @RequestParam(value = "departureCityName") String departureCityName,
                                                     @RequestParam(value = "arrivalCityName") String arrivalCityName) throws SQLException {
        String querySQL = "SELECT * FROM dwd_scheduledflight where departureDate = '" + departureDate +
                "' and departureCityName = '" + departureCityName +
                "' and arrivalCityName = '" + arrivalCityName + "'order by arrivalTime dwsc;";

//        List<Map<String,Object>> lists = jdbcTemplate.queryForList(querySQL);
//        for(int i=0;i<lists.size();i++){
//            System.out.println(lists.get(i).get("departureTime"));
//        }
        System.out.println(departureDate+" "+departureCityName+" "+arrivalCityName);
        return (List<Map<String, Object>>) jdbcTemplate.queryForList(querySQL);
    }

    // 获取航班信息，未指定航空公司按价格升序排序
    @RequestMapping(value = "/matchedSynAsc")
    @ResponseBody
    public List<Map<String, Object>> AirlineSynInfo(HttpServletRequest request, HttpServletResponse response,
                                                 @RequestParam(value = "departureDate") String departureDate,
                                                 @RequestParam(value = "departureCityName") String departureCityName,
                                                 @RequestParam(value = "arrivalCityName") String arrivalCityName) throws SQLException {
        String querySQL = "SELECT * FROM dwd_scheduledflight where departureDate = '" + departureDate +
                "' and departureCityName = '" + departureCityName +
                "' and arrivalCityName = '" + arrivalCityName + "'order by price asc;";
        // dump without feature map
//        String[] model_dump = booster.getModelDump(null, false);
//// dump with feature map
//        String[] model_dump_with_feature_map = booster.getModelDump("air.csv", false);
//        System.out.println(departureDate+" "+departureCityName+" "+arrivalCityName);
        return (List<Map<String, Object>>) jdbcTemplate.queryForList(querySQL);
    }

    // 获取航班信息，未指定航空公司按价格降序排序
    @RequestMapping(value = "/matchedSynDesc")
    @ResponseBody
    public List<Map<String, Object>> AirlineSynDescInfo(HttpServletRequest request, HttpServletResponse response,
                                                    @RequestParam(value = "departureDate") String departureDate,
                                                    @RequestParam(value = "departureCityName") String departureCityName,
                                                    @RequestParam(value = "arrivalCityName") String arrivalCityName) throws SQLException {
        String querySQL = "SELECT * FROM dwd_scheduledflight where departureDate = '" + departureDate +
                "' and departureCityName = '" + departureCityName +
                "' and arrivalCityName = '" + arrivalCityName + "'order by price desc;";
        // dump without feature map
//        String[] model_dump = booster.getModelDump(null, false);
//// dump with feature map
//        String[] model_dump_with_feature_map = booster.getModelDump("air.csv", false);
//        System.out.println(departureDate+" "+departureCityName+" "+arrivalCityName);
        return (List<Map<String, Object>>) jdbcTemplate.queryForList(querySQL);
    }

    // 指定航空公司，按时间升序排序
    @RequestMapping(value = "/chosenTimeAsc")
    @ResponseBody
    public List<Map<String, Object>> AirChosenTimeInfo(HttpServletRequest request, HttpServletResponse response,
                                                       @RequestParam(value = "departureDate") String departureDate,
                                                       @RequestParam(value = "departureCityName") String departureCityName,
                                                       @RequestParam(value = "arrivalCityName") String arrivalCityName,
                                                       @RequestParam(value = "airlineName") String airlineName) throws SQLException {
        String querySQL = "SELECT * FROM dwd_scheduledflight where departureDate = '" + departureDate +
                "' and departureCityName = '" + departureCityName +
                "' and arrivalCityName = '" + arrivalCityName +
                "' and airlineName = '" + airlineName + "'order by arrivalTime asc;";
        System.out.println(departureDate+" "+departureCityName+" "+arrivalCityName+" "+airlineName);
        return (List<Map<String, Object>>) jdbcTemplate.queryForList(querySQL);
    }

    // 指定航空公司，按时间降序排序
    @RequestMapping(value = "/chosenTimeDesc")
    @ResponseBody
    public List<Map<String, Object>> AirChosenTimeDInfo(HttpServletRequest request, HttpServletResponse response,
                                                       @RequestParam(value = "departureDate") String departureDate,
                                                       @RequestParam(value = "departureCityName") String departureCityName,
                                                       @RequestParam(value = "arrivalCityName") String arrivalCityName,
                                                       @RequestParam(value = "airlineName") String airlineName) throws SQLException {
        String querySQL = "SELECT * FROM dwd_scheduledflight where departureDate = '" + departureDate +
                "' and departureCityName = '" + departureCityName +
                "' and arrivalCityName = '" + arrivalCityName +
                "' and airlineName = '" + airlineName + "'order by arrivalTime desc;";
        System.out.println(departureDate+" "+departureCityName+" "+arrivalCityName+" "+airlineName);
        return (List<Map<String, Object>>) jdbcTemplate.queryForList(querySQL);
    }

    // 指定航空公司，按综合升序排序
    @RequestMapping(value = "/chosenSynAsc")
    @ResponseBody
    public List<Map<String, Object>> AirChosenSynInfo(HttpServletRequest request, HttpServletResponse response,
                                                       @RequestParam(value = "departureDate") String departureDate,
                                                       @RequestParam(value = "departureCityName") String departureCityName,
                                                       @RequestParam(value = "arrivalCityName") String arrivalCityName,
                                                       @RequestParam(value = "airlineName") String airlineName) throws SQLException {
        String querySQL = "SELECT * FROM dwd_scheduledflight where departureDate = '" + departureDate +
                "' and departureCityName = '" + departureCityName +
                "' and arrivalCityName = '" + arrivalCityName +
                "' and airlineName = '" + airlineName + "'order by price asc;";
        // dump without feature map
//        String[] model_dump = booster.getModelDump(null, false);
//// dump with feature map
//        String[] model_dump_with_feature_map = booster.getModelDump("air.csv", false);
//        System.out.println(departureDate+" "+departureCityName+" "+arrivalCityName);
        System.out.println(departureDate+" "+departureCityName+" "+arrivalCityName+" "+airlineName);
        return (List<Map<String, Object>>) jdbcTemplate.queryForList(querySQL);
    }

    // 指定航空公司，按综合降序排序
    @RequestMapping(value = "/chosenSynDesc")
    @ResponseBody
    public List<Map<String, Object>> AirChosenDSynInfo(HttpServletRequest request, HttpServletResponse response,
                                                      @RequestParam(value = "departureDate") String departureDate,
                                                      @RequestParam(value = "departureCityName") String departureCityName,
                                                      @RequestParam(value = "arrivalCityName") String arrivalCityName,
                                                      @RequestParam(value = "airlineName") String airlineName) throws SQLException {
        String querySQL = "SELECT * FROM dwd_scheduledflight where departureDate = '" + departureDate +
                "' and departureCityName = '" + departureCityName +
                "' and arrivalCityName = '" + arrivalCityName +
                "' and airlineName = '" + airlineName + "'order by price desc;";
        // dump without feature map
//        String[] model_dump = booster.getModelDump(null, false);
//// dump with feature map
//        String[] model_dump_with_feature_map = booster.getModelDump("air.csv", false);
//        System.out.println(departureDate+" "+departureCityName+" "+arrivalCityName);
        System.out.println(departureDate+" "+departureCityName+" "+arrivalCityName+" "+airlineName);
        return (List<Map<String, Object>>) jdbcTemplate.queryForList(querySQL);
    }
}
