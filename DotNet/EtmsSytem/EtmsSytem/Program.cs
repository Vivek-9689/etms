
using EtmsSytem.Models;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

namespace EtmsSytem
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();


            builder.Services.AddDbContext<EtmsystemContext>(options =>
            {
                var con = builder.Configuration.GetConnectionString("EtmsConStr");
                options.UseMySql(con, ServerVersion.AutoDetect(con));
            });
            builder.Services.AddControllers().AddJsonOptions(x =>
           x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles
           );

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().SetIsOriginAllowed(o => true).AllowCredentials());

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
           
        }
    }
}
