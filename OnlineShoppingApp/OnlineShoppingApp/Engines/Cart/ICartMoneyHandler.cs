using System;

public interface ICartMoneyHandler
{
    void Checkout(int cartId);

    double CartTotal(int cartId);
}


