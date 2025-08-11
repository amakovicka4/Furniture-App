using Microsoft.AspNetCore.Mvc;
using OnlineShoppingApp.Models;

public interface IProductAccessor
{
    Product GetProduct(int product_id);
    List<Product> GetProductsByCategory(string categoryName);
    List<Product> GetFeaturedProducts();

    List<Product> GetAllProducts();
} 
