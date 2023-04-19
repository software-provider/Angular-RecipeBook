using Microsoft.EntityFrameworkCore.Migrations;

namespace Application.DataAccessLayer.Migrations
{
    public partial class AddIsActiveFieldForApplicationUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(name: "IsActive", table: "AspNetUsers", nullable: false, defaultValue: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(name: "IsActive", table: "AspNetUsers");
        }
    }
}
