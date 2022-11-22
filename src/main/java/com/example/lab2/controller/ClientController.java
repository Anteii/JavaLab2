package com.example.lab2.controller;

import com.example.lab2.dto.BookDto;
import com.example.lab2.dto.ClientDto;
import com.example.lab2.model.Book;
import com.example.lab2.model.Client;
import com.example.lab2.repository.ClientRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/client")
public class ClientController {
    final ClientRepository clientRepository;

    public ClientController(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    @GetMapping
    public String index(){
        return "clients";
    }

    @GetMapping("/getAllClients")
    @ResponseBody
    List<Client> getAllClients(){
        return clientRepository.findAll();
    }

    @GetMapping("/edit")
    public String editClient(){
        return "editClient";
    }

    @PostMapping("/create")
    @ResponseBody
    public void createClient(@RequestBody ClientDto clientDto){
        Client client = new Client(clientDto.getName(), clientDto.getCity(), clientDto.getEmail());
        clientRepository.save(client);
    }

    @PostMapping("/update")
    @ResponseBody
    public void updateClient(@RequestBody Client client){
        clientRepository.save(client);
    }

    @DeleteMapping("/delete")
    @ResponseBody
    public void deleteClient(@RequestBody Integer id){
        clientRepository.deleteById(id);
    }
}