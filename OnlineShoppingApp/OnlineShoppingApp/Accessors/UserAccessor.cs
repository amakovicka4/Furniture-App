using Microsoft.Data.SqlClient;
using OnlineShoppingApp.Models;

public class UserAccessor : IUserAccessor
{
    public User? GetUser(string username, string password){
        var productAccessor = new ProductAccessor();
        User? user = null;
        SqlConnection conn = productAccessor.GetConnection();
        if (conn != null){
            string query = "SELECT * FROM APP_USER WHERE username = @username AND password = @password";
            SqlCommand command = new SqlCommand(query, conn);
            command.Parameters.AddWithValue("@username", username);
            command.Parameters.AddWithValue("@password", password);
            SqlDataReader reader = command.ExecuteReader();
            while(reader.Read()){
                user = new User{
                    UserId = reader.GetInt32(0),
                    Username = reader.GetString(2),
                    Password = reader.GetString(3)
                    // TODO: Add Address and PaymentInfo
                };
            }
        }
        return user;
    }

    public IResult Register(string username, string password){
        
        var productAccessor = new ProductAccessor();
        SqlConnection conn = productAccessor.GetConnection();
        if(conn != null && (username != null) && (password != null)){
            string query = "INSERT INTO dbo.app_user(username, password) VALUES (@username,@password)";
            SqlCommand command = new SqlCommand(query, conn);
            command.Parameters.AddWithValue("@username",username);
            command.Parameters.AddWithValue("@password",password);
            if(command.ExecuteNonQuery() > 0){
                return Results.Ok(new{success = true,message = "Registration Successful. Please login with new account credentials"});
            } else {
                return Results.Problem("Unable to Register User. Please Try Again");
            }
        } else {
            return Results.BadRequest();
        }
    }


}