[TestClass]
public class UserTests
{
    //Method to test UserAccessor.GetUser()
    [TestMethod]
        public void TestGetUser()
        {
            string testUsername = "woodlover";
            string testPassword = "crafty123";

            string testUsername2 = "zenBuilder";
            string testPassword2 = "peacefulplace";

            var userAccessor = new UserAccessor();

            OnlineShoppingApp.Models.User result = userAccessor.GetUser(testUsername, testPassword);
            OnlineShoppingApp.Models.User result2 = userAccessor.GetUser(testUsername2, testPassword2);
            
            Assert.IsNotNull(result);
            Assert.AreEqual(3, result.UserId);
            Assert.AreEqual(8, result2.UserId);
        }

        [TestMethod]
        // Method to test UserAccessor.Register()
        public void TestRegister()
        {
            string testUsername = "JCI01";
            string testPassword = "password123";

            string testUsername2 = "CowsonWin";
            string testPassword2 = "NuggetsIn6";

            var userAccessor = new UserAccessor();

            userAccessor.Register(testUsername, testPassword);
            userAccessor.Register(testUsername2, testPassword2);

            OnlineShoppingApp.Models.User result = userAccessor.GetUser(testUsername, testPassword);
            OnlineShoppingApp.Models.User result2 = userAccessor.GetUser(testUsername2, testPassword2);
            
            Assert.IsNotNull(result);
            Assert.AreEqual(11, result.UserId);
            Assert.AreEqual(12, result2.UserId);
        }

        [TestMethod]
        // Method to test ViewSearch()
        public void TestViewSearch()
        {
            string testSearch = "chair";
            string testSearch2 = "ra";

            var userManager = new UserManager();

            List<Product> result = userManager.ViewSearch(testSearch);
            List<Product> result2 = userManager.ViewSearch(testSearch2);
            
            Assert.AreEqual(2, result.Count);
            Assert.AreEqual("Swivel Office Chair", result[0].Name);
            Assert.AreEqual("Leather Swivel Barrel Chair", result[1].Name);

            Assert.AreEqual(7, result2.Count);
            Assert.AreEqual("Deskora", result2[1].ManInfo);
            Assert.AreEqual(219.99, result2[4].Price);
        }
}
