using AuthApp.Models.ViewModel;
using AuthApp.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AuthApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly ITokenService _tokenService;

        public AccountController(ITokenService tokenService)
        {
            _tokenService = tokenService;
        }

        // POST api/account
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginViewModel login)
        {
            if (login == null) return BadRequest("Invalid client request");

            if (login.UserName == "admin" && login.Password == "password1234")
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, login.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(ClaimTypes.Role, "Admin")
                };

                var accessToken = _tokenService.GenerateAccessToken(claims);

                Response.Cookies.Append("access_token", accessToken, new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.Strict,
                    Expires = DateTimeOffset.UtcNow.AddMinutes(10)
                });

                return Ok(new
                {
                    message = "Login successful",
                    user_name = login.UserName,
                    roles = new[] { "Admin" }
                });
            }
            return Unauthorized(new { message = "Invalid credentials" });
        }
    }
}