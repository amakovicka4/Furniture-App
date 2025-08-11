using System;

public interface IUserAccount
{
    IResult Login(string username, string password);

    IResult Logout();

    void ViewAccountInfo(int userId);

}
