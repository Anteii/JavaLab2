package com.example.lab2.controller;

import com.example.lab2.dto.ClientDto;
import com.example.lab2.dto.PurchaseDto;
import com.example.lab2.model.Client;
import com.example.lab2.model.Purchase;
import com.example.lab2.repository.PurchaseRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/purchase")
public class PurchaseController {
    final PurchaseRepository purchaseRepository;

    public PurchaseController(PurchaseRepository purchaseRepository) {
        this.purchaseRepository = purchaseRepository;
    }

    @GetMapping
    public String index(){
        return "purchases";
    }

    @GetMapping("/getAllPurchases")
    @ResponseBody
    List<Purchase> getAllPurchases(){
        return purchaseRepository.findAll();
    }

    @GetMapping("/edit")
    public String editPurchase(){
        return "editPurchase";
    }

    @PostMapping("/create")
    @ResponseBody
    public void createPurchase(@RequestBody PurchaseDto purchaseDto){
        Purchase purchase = new Purchase(purchaseDto.getBookId(), purchaseDto.getClientId(), purchaseDto.getAmount());
        purchaseRepository.save(purchase);
    }

    @PostMapping("/update")
    @ResponseBody
    public void updateClient(@RequestBody Purchase purchase){
        purchaseRepository.save(purchase);
    }

    @DeleteMapping("/delete")
    @ResponseBody
    public void deleteClient(@RequestBody Integer id){
        purchaseRepository.deleteById(id);
    }
}