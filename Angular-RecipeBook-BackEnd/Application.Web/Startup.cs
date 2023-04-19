using Application.Core.AppSettingsConfiguration;
using Application.Core.AppSettingsConfiguration.Enums;
using Application.Core.AppSettingsConfiguration.Models;
using Application.DataAccessLayer.Context;
using Application.Web.Core.Configurations;
using Application.Web.Core.Extensions;
using Application.Web.Core.Providers;
using Application.Web.Core.Swagger;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;

namespace Application.Web
{
    public class Startup
    {
        private readonly IConfiguration _configuration;

        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<CorsConfigurationModel>(_configuration.GetSection(AppSettingsConfiguration.GetConfigurationType(ConfigurationType.CorsConfiguration)));

            services.AddDbContext<RecipeBookDbContext>(options =>
                options.UseSqlServer(
                    _configuration.GetConnectionString("DevConnection")
                )
            );

            services.ConfigureReadOnlyDbContext();
            services.ConfigureMediatR();

            services.AddHttpContextAccessor();

            services.ConfigureAuthService();
            services.ConfigureApplicationCookies();

            services.ConfigureSwaggerServices();

            services.AddScopedServices();

            services.AddCors();
            services.AddControllers();

            services.AddSwaggerGen();
        }

        public void Configure(IApplicationBuilder app, IApiVersionDescriptionProvider provider, IOptions<CorsConfigurationModel> corsConfiguration)
        {
            app.AddApiExceptionHandler();

            app.UseCors(builder => builder.WithOrigins(corsConfiguration.Value.SpecifiedOrigins)
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials());

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.ConfigureSwagger(provider);

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
