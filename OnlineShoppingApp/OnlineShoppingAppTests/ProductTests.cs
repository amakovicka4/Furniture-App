
[TestClass]
public class ProductTests
{
    [TestMethod]
        public void TestGetProduct()
        {
            
            int testProductId = 1; 
            string expectedName = "Blox Series Planter Box";
            double expectedPrice = 149.99;

            var productAccessor = new ProductAccessor();

            OnlineShoppingApp.Models.Product result = productAccessor.GetProduct(testProductId);

            
            Assert.IsNotNull(result);
            Assert.AreEqual(expectedName, result.Name);
            Assert.AreEqual(expectedPrice, result.Price);
        }

        [TestMethod]
        public void TestGetProduct2()
        {
            int testProductId = 6; 
            string expectedDescription = "A mid-century swivel chair crafted from solid wood and genuine leather, offering 360° movement, plush comfort, and timeless style";
            string expectedSKU = "CHR-002";

            var productAccessor = new ProductAccessor();

            OnlineShoppingApp.Models.Product result = productAccessor.GetProduct(testProductId);

            
            Assert.IsNotNull(result);
            Assert.AreEqual(expectedDescription, result.Description);
            Assert.AreEqual(expectedSKU, result.Sku);
        }

        [TestMethod]
        public void TestGetProductByCategory()
        {
            string testCategory = "Office"; 
            double expectedFirstProductWeight = 20.5;
            string expectedSecondProductName = "Alburna Desk";
            double expectedSecondProductPrice = 399.99;


            var productAccessor = new ProductAccessor();
            List<OnlineShoppingApp.Models.Product> products = productAccessor.GetProductsByCategory(testCategory);

            Assert.IsNotNull(products);
            Assert.IsTrue(products.Count > 0, "No products were returned for the category.");

            OnlineShoppingApp.Models.Product secondProduct = products[1];
            OnlineShoppingApp.Models.Product firstProduct = products[0];
            Assert.AreEqual(expectedSecondProductName, secondProduct.Name);
            Assert.AreEqual(expectedSecondProductPrice, secondProduct.Price);
            Assert.AreEqual(expectedFirstProductWeight, firstProduct.Weight);
        }
}
