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
	r.GET("/statususer", controller.ListStatusUser)
	r.GET("/movies", controller.ListMovies)
	r.GET("/users", controller.ListUser)

	//payment
	r.POST("/payment/:UserID/:PackageID", controller.UserPaymentCreate)
	r.GET("/admin/payment", controller.PaymentAdmin)
	r.GET("/admin/payment/:ID", controller.AllowedPayment)
	r.GET("/admin/subscribe/:UserID" ,controller.UpdateSubscribe)
	r.GET("/admin/payment2/:ID", controller.NotAllowedPayment)
	r.GET("/admin/subscribe2/:UserID" ,controller.UpdateSubscribe2)
	r.GET("/login/subscribe/:UserID" ,controller.SubscribeCheck)
	r.GET("payment/:UserID",controller.GetUserbyid)
	r.GET("payment/package/:PackageID",controller.GetPackagebyid)


	r.DELETE("/movie/:id", controller.DeleteMovieById)
	r.PATCH("/movie", controller.UpdateMovie)
	r.GET("/movie/:id", controller.GetMovieById)
	r.GET("/categories", controller.ListCategories)
	r.GET("/soundtrack", controller.ListSoundtrack)
	r.GET("/target", controller.ListTarget)
	r.POST("/movie", controller.CreateMovie)
	r.GET("/packages", controller.GetPackageInfo)
	r.GET("/userinfo/:id", controller.GetUserInfo)
	r.PATCH("/userinfo", controller.PatchUserInfo)
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
