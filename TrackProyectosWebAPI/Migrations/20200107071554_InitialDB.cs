using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace TrackProyectos.Migrations
{
    public partial class InitialDB : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Proyectos",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<string>(type: "nvarchar(30)", nullable: false),
                    Descripcion = table.Column<string>(type: "nvarchar(200)", nullable: true),
                    FechaInicio = table.Column<DateTime>(type: "date", nullable: false),
                    FechaFinalizacion = table.Column<DateTime>(type: "date", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Proyectos", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Proyectos");
        }
    }
}
