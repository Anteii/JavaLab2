package com.example.lab2.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class MainController {

    @GetMapping("/main")
    public String main(){
        return "main";
    }

    @GetMapping()
    public String index(){
        return "index";
    }

}
