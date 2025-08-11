using System;
using System.Data.SqlClient;
using Microsoft.AspNetCore.Http.HttpResults;
using OnlineShoppingApp.Models;


public class UserManager : IUserAccount, IUserProducts
{

    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly UserAccessor _userAccessor;

    public UserManager(IHttpContextAccessor httpContextAccessor, UserAccessor userAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
        _userAccessor = userAccessor;
    }
    public IResult Login(string username, string password)
    {
       
       User? user = _userAccessor.GetUser(username, password);
       if(user != null)
       { 
        _httpContextAccessor.HttpContext?.Session.SetString("userName", username);
         return Results.Ok(new { user, success = true, message = "Login Successful"});
       }
       return Results.Unauthorized();
    }

    public IResult Logout()
    {
        _httpContextAccessor.HttpContext?.Session.Clear();
        return Results.Ok(new{success = true});
    }

    public void ViewAccountInfo(int userId)
    {
        //TODO:Implement Method
    }

    public void AddProduct(int productID, int cartId)
    {
        //TODO:Implement Method
    }

    public void ViewCategory(int categoryId)
    {
        //TODO:Implement Method
    }

    public List<Product> ViewSearch(string searchString)
    {
        var productAccessor = new ProductAccessor();
        List<Product> results = new List<Product>();

        using (SqlConnection conn = productAccessor.GetConnection())
        {
            if (conn != null)
            {
                string query = @"
                    SELECT product_id, name, price, man_info, description, dimensions, weight, rating, sku, category, image
                    FROM product
                    WHERE name LIKE @Search OR category LIKE @Search OR man_info LIKE @Search;";

                using (SqlCommand command = new SqlCommand(query, conn))
                {
                    command.Parameters.AddWithValue("@Search", "%" + searchString + "%");

                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            Product product = new Product
                            {
                                Id = reader.GetInt32(0),
                                Name = reader.GetString(1),
                                Price = Convert.ToDouble(reader.GetValue(2)),
                                ManInfo = reader.GetString(3),
                                Description = reader.GetString(4),
                                Dimensions = reader.GetString(5),
                                Weight = reader.GetDouble(6),
                                Rating = reader.GetDouble(7),
                                Sku = reader.GetString(8),
                                Category = new Category { Name = reader.GetString(9) },
                                Image = reader.IsDBNull(10) ? "" : reader.GetString(10)
                            };
                            results.Add(product);
                        }
                    }
                }
            }
        }

        return results;
    }
}