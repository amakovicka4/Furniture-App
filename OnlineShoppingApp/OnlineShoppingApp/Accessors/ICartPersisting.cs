using System;
using OnlineShoppingApp.Models;

public interface ICartPersisting
{
    Task Persist(int cartId);

    List<Product> ViewCart(int userId);
}
