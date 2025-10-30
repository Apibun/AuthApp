using AuthApp.Models.ViewModel;
using AuthApp.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

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
                    SameSite = SameSiteMode.None,
                    Expires = DateTime.Now.AddMinutes(30),
                });

                return Ok(new
                {
                    message = "Login successful",
                });
            }
            return Unauthorized(new { message = "Invalid credentials" });
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            Response.Cookies.Delete("access_token", new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Expires = DateTime.Now.AddDays(-1),
            });
            return Ok(new { message = "Logout successful" });
        }

        [Authorize]
        [HttpGet("profile")]
        public async Task<IActionResult> GetUserProfile()
        {
            var userName = User.Identity?.Name;
            if (userName != null)
            {
                return Ok(new
                {
                    user_name = userName,
                    roles = User.Claims.Where(c => c.Type == ClaimTypes.Role).Select(r => r.Value).ToArray()
                });
            }
            return Unauthorized(new { message = "User not authenticated" });
        }
    }
}