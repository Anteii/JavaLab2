package com.example.lab2.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import java.util.Objects;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Purchase {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "buy_book_id", nullable = false)
    private Integer id;
    @Basic
    @Column(name = "book_id", nullable = true)
    private Integer bookId;
    @Basic
    @Column(name = "client_id", nullable = true)
    private Integer clientId;
    @Basic
    @Column(name = "amount", nullable = false)
    private Integer amount;

    public Purchase(Integer bookId, Integer clientId, Integer amount) {
        this.bookId = bookId;
        this.clientId = clientId;
        this.amount = amount;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Purchase purchase = (Purchase) o;

        if (!Objects.equals(id, purchase.id)) return false;
        if (!Objects.equals(bookId, purchase.bookId)) return false;
        if (!Objects.equals(clientId, purchase.clientId)) return false;
        return Objects.equals(amount, purchase.amount);
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (bookId != null ? bookId.hashCode() : 0);
        result = 31 * result + (clientId != null ? clientId.hashCode() : 0);
        result = 31 * result + (amount != null ? amount.hashCode() : 0);
        return result;
    }
}
