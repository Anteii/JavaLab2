package com.example.lab2.controller;

import com.example.lab2.dto.BookDto;
import com.example.lab2.model.Book;
import com.example.lab2.repository.BookRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/book")
public class BookController {

    final BookRepository bookRepository;

    public BookController(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @GetMapping
    public String index(){
        return "books";
    }

    @GetMapping("/getAllBooks")
    @ResponseBody
    public List<Book> getAllBooks(){
        return bookRepository.findAll();
    }

    @GetMapping("/edit")
    public String editBook(){
        return "editBook";
    }

    @PostMapping("/create")
    @ResponseBody
    public void createBook(@RequestBody BookDto bookDto){
        Book book = new Book(bookDto.getTitle(), bookDto.getAuthorName(), bookDto.getGenre(), bookDto.getPrice());
        bookRepository.save(book);
    }

    @PostMapping("/update")
    @ResponseBody
    public void updateBook(@RequestBody Book book){
        bookRepository.save(book);
    }

    @DeleteMapping("/delete")
    @ResponseBody
    public void deleteBook(@RequestBody Integer id){
        bookRepository.deleteById(id);
    }
}
