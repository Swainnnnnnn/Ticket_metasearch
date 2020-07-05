package com.team06.ticketmetasearch.controller;

import org.apache.spark.SparkConf;
import org.apache.spark.api.java.JavaSparkContext;

public class SparkExample {
    public static void main(String[] args)  {
        System.setProperty("hadoop.home.dir", "E:\\hadoop-2.9.2");
        // 1. 创建spark的配置
        SparkConf sparkConf = new SparkConf().setMaster("local").setAppName("sample");
        // 2. 根据配置生成spark的上下文
        JavaSparkContext ctx = new JavaSparkContext(sparkConf);
        // 测试集和训练集3:7
        ctx.stop();
    }
}
