using System.Data.SqlTypes;
using OnlineShoppingApp.Models;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using System.Drawing;

public class CartEngine : ICartModification, ICartMoneyHandler
{
    public void Persist(int cartId)
    {
        //TODO:Implement Method
    }

    public void ViewCart(int userId)
    {
        //TODO:Implement Method
    }

    public void AddProducts(int cartId, List<int> productIds)
    {
        var productAccessor = new ProductAccessor();
        using (SqlConnection conn = productAccessor.GetConnection())
        {
            List<Product> products = new List<Product>();
            if (conn != null)
            {
                foreach (int productId in productIds)
                {
                    string insertQuery = @"
                    INSERT INTO cart_item (cart_id, product_id)
                    VALUES (@CartId, @ProductId);"; 

                    using (SqlCommand command = new SqlCommand(insertQuery, conn))
                    {
                        command.Parameters.AddWithValue("@CartId", cartId);
                        command.Parameters.AddWithValue("@ProductId", productId);
                        command.ExecuteNonQuery();
                    }
                }
            }
        }
    }

    public void RemoveProduct(int cartId, int productId)
    {
        var productAccessor = new ProductAccessor();
        using (SqlConnection conn = productAccessor.GetConnection())
        {

            if (conn != null)
            {
                string deleteQuery = @"
            DELETE FROM cart_item
            WHERE cart_id = @CartId AND product_id = @ProductId;";

                using (SqlCommand command = new SqlCommand(deleteQuery, conn))
                {
                    command.Parameters.AddWithValue("@CartId", cartId);
                    command.Parameters.AddWithValue("@ProductId", productId);
                    command.ExecuteNonQuery();
                }
            }
        }
    }

    public void Checkout(int cartId)
    {
        double total = CartTotal(cartId);
        int paymentId;
        var productAccessor = new ProductAccessor();
        using (SqlConnection conn = productAccessor.GetConnection())
        {
        if (conn != null)
        {
            int userId;
            string getUserQuery = "SELECT app_user_id FROM cart WHERE cart_id = @CartId;";
            using (SqlCommand getUserCmd = new SqlCommand(getUserQuery, conn))
            {
                getUserCmd.Parameters.AddWithValue("@CartId", cartId);
                object userResult = getUserCmd.ExecuteScalar();
                if (userResult != null)
                {
                    userId = Convert.ToInt32(userResult);
                }
                else
                {
                    throw new Exception("Cart not found.");
                }
            }

            string getPaymentQuery = @"
                SELECT payment_id, number, name, expiration_date, pin 
                FROM payment 
                WHERE app_user_id = @UserId;";

            using (SqlCommand getPaymentCmd = new SqlCommand(getPaymentQuery, conn))
            {
                getPaymentCmd.Parameters.AddWithValue("@UserId", userId);
                using (SqlDataReader reader = getPaymentCmd.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        paymentId = reader.GetInt32(0);
                        string cardNumber = reader.GetString(1);
                        string cardholder = reader.GetString(2);
                        string expirationDate = reader.GetString(3);
                        string pin = reader.GetString(4);

                        // ProcessPayment(cardNumber, cardHolder, expirationDate, billingAddress)

                        Console.WriteLine("Payment Processed");
                        
                    }
                    else
                    {
                        throw new Exception("No payment information found for user.");
                    }
                }
            }

            string insertCheckoutQuery = @"
                INSERT INTO checkout (app_user_id, payment_id, date, total)
                VALUES (@UserId, @PaymentId, @Date, @Total);";
            using (SqlCommand insertCmd = new SqlCommand(insertCheckoutQuery, conn))
            {
                insertCmd.Parameters.AddWithValue("@UserId", userId);
                insertCmd.Parameters.AddWithValue("@PaymentId", paymentId);
                insertCmd.Parameters.AddWithValue("@Date", DateTime.Now.ToString());
                insertCmd.Parameters.AddWithValue("@Total", total);
                insertCmd.ExecuteNonQuery();
            }

            Console.WriteLine("Checkout completed.");
        }
    }
    }

    public double CartTotal(int cartId)
    {
        var productAccessor = new ProductAccessor();
        SqlConnection conn = productAccessor.GetConnection();
        double total = 0;

        if (conn != null)
        {
            string query = @"
        SELECT SUM(P.price) AS Total
        FROM cart_item CI
        JOIN product P ON CI.product_id = P.product_id
        WHERE CI.cart_id = @CartId;";

            using (SqlCommand command = new SqlCommand(query, conn))
            {
                command.Parameters.AddWithValue("@CartId", cartId);
                object result = command.ExecuteScalar();
                if (result != null)
                {
                    total = Convert.ToDouble(result);
                }
            }
        }

        return total;
    }
}


