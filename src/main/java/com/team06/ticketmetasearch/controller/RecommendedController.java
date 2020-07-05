package com.team06.ticketmetasearch.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/recommended")
public class RecommendedController {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    // 获取航班信息，未指定航空公司
    @RequestMapping(value = "/matchedInfo")
    @ResponseBody
    public List<Map<String, Object>> AirlineInfo(HttpServletRequest request, HttpServletResponse response,
                                                 @RequestParam(value = "departureDate")String departureDate,
                                                 @RequestParam(value = "departureCityName")String departureCityName,
                                                 @RequestParam(value = "arrivalCityName")String arrivalCityName) throws SQLException {
//        List<Map<String, Object>> resList = new ArrayList<Map<String, Object>>();
        PreparedStatement statement = null;
//        ResultSet resultSet = null;
        String querySQL = "SELECT * FROM dwd_scheduledflight where departureDate = ? and departureCityName = ? and arrivalCityName = ?;";
        statement.setString(1,departureDate);
        statement.setString(2,departureCityName);
        statement.setString(3,arrivalCityName);
//        resultSet = statement.executeQuery();
//        // 处理查询结果（将查询结果转换成List<Map>格式
//        ResultSetMetaData rsmd = resultSet.getMetaData();
//        while(resultSet.next()) {
//            Map map = new HashMap();
//            for(int i = 0; i < rsmd.getColumnCount(); i++) {
//                String columnName = rsmd.getColumnName(i+1);
//                map.put(columnName,resultSet.getString(columnName));
//            }
//            resList.add(map);
//        }
//        return resList;
        return (List<Map<String, Object>>) jdbcTemplate.queryForList(querySQL);
    }
}
