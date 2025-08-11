using OnlineShoppingApp.Models;

[TestClass]
public class CartTests
{
    // Method to test GetCart()
    [TestMethod]
    public void TestGetCart()
    {
        int testUserId = 2;
        string expectedFirstProductName = "Blox Series Planter Box";
        string expectedSecondProductName = "Swivel Office Chair";
        string expectedSecondManInfo = "FormaEdge";
        string expectedFirstSKU = "ACC-001";


        var cartAccessor = new CartAccessor();
        List<OnlineShoppingApp.Models.Product> results = cartAccessor.ViewCart(testUserId);

        Assert.IsNotNull(results);
        Assert.IsTrue(results.Count > 0, "No products were returned for the cart.");

        OnlineShoppingApp.Models.Product secondProduct = results[1];
        OnlineShoppingApp.Models.Product firstProduct = results[0];
        Assert.AreEqual(expectedSecondProductName, secondProduct.Name);
        Assert.AreEqual(expectedSecondManInfo, secondProduct.ManInfo);
        Assert.AreEqual(expectedFirstProductName, firstProduct.Name);
        Assert.AreEqual(expectedFirstSKU, firstProduct.Sku);

    }

    // Method to test AddProduct()
    [TestMethod]
    public void TestAddProduct()
    {
        int testCartId = 2;
        List<int> testProductIds = new List<int> {2, 4};
        
        string expectedProductName = "Alburna Desk";
        string expectedProductName2 = "Vahl Solid Wood Tray";
        
        var cartEngine = new CartEngine();
        cartEngine.AddProducts(testCartId, testProductIds);

        var cartAccessor = new CartAccessor();
        List<OnlineShoppingApp.Models.Product> results = cartAccessor.ViewCart(testCartId);
        
        Assert.IsTrue(results.Any(product => product.Name == expectedProductName), "Expected to find a product named 'Alburna Desk'.");
        Assert.IsTrue(results.Any(product => product.Name == expectedProductName2), "Expected to find a product named 'Vahl Solid Wood Tray'.");
    }

    // Method to test RemoveProduct()
    [TestMethod]
    public void TestRemoveProduct()
    {
        int testCartId = 2;
        int testProductId = 2;
        int testProductId2 = 4;
        
        string expectedProductName = "Alburna Desk";
        string expectedProductName2 = "Vahl Solid Wood Tray";
        var cartAccessor = new CartAccessor();
        
        List<OnlineShoppingApp.Models.Product> before = cartAccessor.ViewCart(testCartId);

        var cartEngine = new CartEngine();
        cartEngine.RemoveProduct(testCartId, testProductId2);
        
        List<OnlineShoppingApp.Models.Product> after = cartAccessor.ViewCart(testCartId);
        
        Assert.AreNotEqual(before.Count, after.Count);
    }
    //Method to test CartTotal()
    [TestMethod]
    public void TestCartTotal()
    {
        int testCartId = 2; 
        double expectedTotal = 359.98; 

        var cartEngine = new CartEngine();
        double actualTotal = cartEngine.CartTotal(testCartId);

        Assert.AreEqual(expectedTotal, actualTotal, 0.01, "Cart total does not match expected value.");
    }
    // Method to test Checkout
    [TestMethod]
    public void TestCheckout()
    {
        int testCartId = 2; 
        double expectedTotal = 359.98; 

        var cartEngine = new CartEngine();
        cartEngine.Checkout(testCartId);

        var productAccessor = new ProductAccessor();
    using (SqlConnection conn = productAccessor.GetConnection())
    {
        if (conn != null)
        {
            string query = @"
                SELECT TOP 1 app_user_id, payment_id, total, date
                FROM checkout
                WHERE app_user_id = (SELECT app_user_id FROM cart WHERE cart_id = @CartId)
                ORDER BY date DESC;";

            using (SqlCommand cmd = new SqlCommand(query, conn))
            {
                cmd.Parameters.AddWithValue("@CartId", testCartId);
                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    Assert.IsTrue(reader.Read(), "No checkout record found.");

                    int userId = reader.GetInt32(0);
                    int paymentId = reader.GetInt32(1);
                    double actualTotal = reader.GetDouble(2);
                    string checkoutDate = reader.GetString(3);

                    Assert.AreEqual(expectedTotal, actualTotal, 0.01, "Cart total does not match expected value.");
                }
            }
        }
    }
    }
}