using OnlineShoppingApp.Models;

public interface IUserAccessor {

    User? GetUser(string username, string password);

    IResult Register(string username, string password);

}