using System.Data.SqlTypes;
using OnlineShoppingApp.Models;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using System.Drawing;

public class CartAccessor : ICartPersisting
{
    public async Task Persist(int cartId)
    {
        throw new NotImplementedException();
    }

    public List<Product> ViewCart(int userId)
    {
        var productAccessor = new ProductAccessor();
        SqlConnection conn = productAccessor.GetConnection();
        List<Product> products = new List<Product>();
        if (conn != null)
        {
            string query = """
            SELECT 
                P.product_id,
                P.name,
                P.price,
                P.man_info,
                P.description,
                P.dimensions,
                P.weight,
                P.rating,
                P.SKU,
                P.category,
                P.image
            FROM cart C
            JOIN cart_item I ON C.cart_id = I.cart_id
            JOIN product P ON I.product_id = P.product_id
            WHERE C.app_user_id = @app_user_id AND status = 'active'
            """;
            SqlCommand command = new SqlCommand(query, conn);
            command.Parameters.AddWithValue("@app_user_id", userId);
            SqlDataReader reader = command.ExecuteReader();
            while (reader.Read())
            {
                var product = new Product
                    {
                        Id = reader.GetInt32(0),
                        Name = reader.GetString(1),
                        Price = (double)reader.GetDouble(2),
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
        return products;
    }
}