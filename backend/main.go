package main

import (
	"github.com/B6406325/team03/controller"
	"github.com/B6406325/team03/entity"
	"github.com/gin-gonic/gin"
)

const PORT = "8080"

func main() {
	entity.SetupDatabase()
	r := gin.Default()
	r.Use(CORSMiddleware())
	r.POST("user", controller.CreateUser)
	r.GET("/user/:email/:password", controller.GetUserToLogin)
	r.GET("/gender", controller.ListGenders)
	r.GET("/prefix", controller.ListPrefix)
	r.GET("/movies", controller.ListMovies)
	r.GET("/users", controller.ListUser)
	r.DELETE("movie/:id", controller.DeleteMovieById)
	r.Run("localhost: " + PORT)

}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE, PATCH")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	}
}
