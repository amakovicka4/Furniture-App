using Microsoft.Data.SqlClient;
using OnlineShoppingApp.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

public class ProductAccessor : IConnectionAccessor, IProductAccessor
{
    public SqlConnection GetConnection()
    {
        Console.WriteLine("Getting Connection");

<<<<<<< HEAD:OnlineShoppingApp/OnlineShoppingApp/Accesors/ProductAccesor.cs
        string connectionString = "Server=AIDEN-DELL\\SQLEXPRESS;Database=CSCE361OnlineShoppingApp;Trusted_Connection=True;Encrypt=False;";
=======
        string connectionString = "Server=localhost\\SQLEXPRESS;Database=402Furn;Trusted_Connection=True;TrustServerCertificate=True;";
>>>>>>> aa7848c550a7cc397f0f3fb52b4a598a20c10919:OnlineShoppingApp/OnlineShoppingApp/Accessors/ProductAccessor.cs
        SqlConnection conn = new SqlConnection(connectionString);

        try
        {
            Console.WriteLine("Opening Connection");
            conn.Open();
            Console.WriteLine("Connection was successful");
            return conn;
        }
        catch (Exception e)
        {
            Console.WriteLine("Unable to connect to the database");
            Console.WriteLine(e.Message);
        }

        return null;
    }

    public Product GetProduct(int product_id)
    {
        using (var conn = GetConnection())
        {
            if (conn != null)
            {
                string query = "SELECT * FROM product WHERE product_id = @product_id";
                SqlCommand command = new SqlCommand(query, conn);
                command.Parameters.AddWithValue("@product_id", product_id);
                SqlDataReader reader = command.ExecuteReader();

                if (reader.Read())
                {
                    return new Product
                    {
                        Id = reader.GetInt32(reader.GetOrdinal("product_id")),
                        Name = reader.GetString(reader.GetOrdinal("name")),
                        Description = reader.IsDBNull(reader.GetOrdinal("description")) ? "" : reader.GetString(reader.GetOrdinal("description")),
<<<<<<< HEAD:OnlineShoppingApp/OnlineShoppingApp/Accesors/ProductAccesor.cs
                        Price = reader.IsDBNull(reader.GetOrdinal("price")) ? 0 : (double)reader.GetDecimal(reader.GetOrdinal("price")),
=======
                        Price = reader.IsDBNull(reader.GetOrdinal("price")) ? 0 : Convert.ToDouble(reader.GetValue(reader.GetOrdinal("price"))),
>>>>>>> aa7848c550a7cc397f0f3fb52b4a598a20c10919:OnlineShoppingApp/OnlineShoppingApp/Accessors/ProductAccessor.cs
                        ManInfo = reader.IsDBNull(reader.GetOrdinal("man_info")) ? "" : reader.GetString(reader.GetOrdinal("man_info")),
                        Dimensions = reader.IsDBNull(reader.GetOrdinal("dimensions")) ? "" : reader.GetString(reader.GetOrdinal("dimensions")),
                        Weight = reader.IsDBNull(reader.GetOrdinal("weight")) ? 0 : reader.GetDouble(reader.GetOrdinal("weight")),
                        Rating = reader.IsDBNull(reader.GetOrdinal("rating")) ? 0 : reader.GetDouble(reader.GetOrdinal("rating")),
                        Sku = reader.IsDBNull(reader.GetOrdinal("sku")) ? "" : reader.GetString(reader.GetOrdinal("sku")),
                        Image = reader.IsDBNull(reader.GetOrdinal("image")) ? "" : reader.GetString(reader.GetOrdinal("image")),
                        Category = new Category
                        {
                            CategoryId = 0,
                            Name = reader.IsDBNull(reader.GetOrdinal("category")) ? "" : reader.GetString(reader.GetOrdinal("category"))
                        }
                    };
                }
            }

            return null;
        }
    }

    public List<Product> GetProductsByCategory(string categoryName)
    {
        var products = new List<Product>();

        using (var conn = GetConnection())
        {
            if (conn != null)
            {
                string query = @"
                    SELECT 
                        product_id, name, price, man_info, description,
                        dimensions, weight, rating, sku, category, image
                    FROM product
                    WHERE LOWER(category) = LOWER(@categoryName)";

                SqlCommand command = new SqlCommand(query, conn);
                command.Parameters.AddWithValue("@categoryName", categoryName);
                SqlDataReader reader = command.ExecuteReader();

                while (reader.Read())
                {
                    var product = new Product
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

                    products.Add(product);
                }
            }
        }

        return products;
    }

    public List<Product> GetAllProducts()
    {
        var products = new List<Product>();

        using (var conn = GetConnection())
        {
            if (conn != null)
            {
                string query = @"
                    SELECT 
                        product_id, name, price, man_info, description,
                        dimensions, weight, rating, sku, category, image
                    FROM product";

                SqlCommand command = new SqlCommand(query, conn);
                SqlDataReader reader = command.ExecuteReader();

                while (reader.Read())
                {
                    var product = new Product
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

                    products.Add(product);
                }
            }
        }

        return products;
    }


    public List<Product> GetFeaturedProducts()
    {
        var conn = GetConnection();
        var products = new List<Product>();

        if (conn != null)
        {
            string query = "SELECT * FROM product WHERE featured = 1";
            SqlCommand command = new SqlCommand(query, conn);
            SqlDataReader reader = command.ExecuteReader();

            while (reader.Read())
            {
                products.Add(new Product
                {
                    Id = reader.GetInt32(reader.GetOrdinal("product_id")),
                    Name = reader.GetString(reader.GetOrdinal("name")),
                    Description = reader.IsDBNull(reader.GetOrdinal("description")) ? "" : reader.GetString(reader.GetOrdinal("description")),
                    Price = Convert.ToDouble(reader.GetValue(reader.GetOrdinal("price"))),
                    ManInfo = reader.GetString(reader.GetOrdinal("man_info")),
                    Dimensions = reader.GetString(reader.GetOrdinal("dimensions")),
                    Weight = reader.GetDouble(reader.GetOrdinal("weight")),
                    Rating = reader.GetDouble(reader.GetOrdinal("rating")),
                    Sku = reader.GetString(reader.GetOrdinal("SKU")),
                    Image = reader.IsDBNull(reader.GetOrdinal("image")) ? "" : reader.GetString(reader.GetOrdinal("image")),
                    Category = new Category
                    {
                        CategoryId = 0,
                        Name = reader.GetString(reader.GetOrdinal("category"))
                    }
                });
            }
        }

        return products;
    }

}
