package com.team06.ticketmetasearch.domain;

/**
 * @date：2020/07/04
 * @parm: 航空公司，航班班次，起飞日，起飞时间，到达日，到达时间，离开地城市名，
 * 离开地机场名，离开第三字码，目的地城市名，目的地机场名，目的地三字码
 */
public class flight {
    String airlineName;
    String flightNumber;
    String departureDate;
    String departureTime;
    String arrivalDate;
    String arrivalTime;
    String departureCityName;
    String departureAirportName;
    String departurecityTlc;
    String arrivalCityName;
    String arrivalAirportName;
    String arrivalcityTlc;

    public String getAirlineName() {
        return airlineName;
    }

    public void setAirlineName(String airlineName) {
        this.airlineName = airlineName;
    }

    public String getFlightNumber() {
        return flightNumber;
    }

    public void setFlightNumber(String flightNumber) {
        this.flightNumber = flightNumber;
    }

    public String getDepartureDate() {
        return departureDate;
    }

    public void setDepartureDate(String departureDate) {
        this.departureDate = departureDate;
    }

    public String getDepartureTime() {
        return departureTime;
    }

    public void setDepartureTime(String departureTime) {
        this.departureTime = departureTime;
    }

    public String getArrivalDate() {
        return arrivalDate;
    }

    public void setArrivalDate(String arrivalDate) {
        this.arrivalDate = arrivalDate;
    }

    public String getArrivalTime() {
        return arrivalTime;
    }

    public void setArrivalTime(String arrivalTime) {
        this.arrivalTime = arrivalTime;
    }

    public String getDepartureCityName() {
        return departureCityName;
    }

    public void setDepartureCityName(String departureCityName) {
        this.departureCityName = departureCityName;
    }

    public String getDepartureAirportName() {
        return departureAirportName;
    }

    public void setDepartureAirportName(String departureAirportName) {
        this.departureAirportName = departureAirportName;
    }

    public String getDeparturecityTlc() {
        return departurecityTlc;
    }

    public void setDeparturecityTlc(String departurecityTlc) {
        this.departurecityTlc = departurecityTlc;
    }

    public String getArrivalCityName() {
        return arrivalCityName;
    }

    public void setArrivalCityName(String arrivalCityName) {
        this.arrivalCityName = arrivalCityName;
    }

    public String getArrivalAirportName() {
        return arrivalAirportName;
    }

    public void setArrivalAirportName(String arrivalAirportName) {
        this.arrivalAirportName = arrivalAirportName;
    }

    public String getArrivalcityTlc() {
        return arrivalcityTlc;
    }

    public void setArrivalcityTlc(String arrivalcityTlc) {
        this.arrivalcityTlc = arrivalcityTlc;
    }
};
