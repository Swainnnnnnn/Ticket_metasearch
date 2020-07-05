package com.team06.ticketmetasearch.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.Map;

@Controller
@RequestMapping
public class BaseInfoController {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    // 返回城市集合
    @GetMapping("/cityList")
    @ResponseBody
    public ArrayList<Map<String, Object>> DisplayCity() {
        String querySQL = "SELECT cityname FROM dwd_city;";
        return (ArrayList<Map<String, Object>>) jdbcTemplate.queryForList(querySQL);
    }

    // 返回航空公司集合
    @GetMapping("/airlineList")
    @ResponseBody
    public ArrayList<Map<String, Object>> DisplayAirline() {
        String querySQL = "SELECT airlineName from dwd_airline";
        return (ArrayList<Map<String, Object>>) jdbcTemplate.queryForList(querySQL);
    }
}
