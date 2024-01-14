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
	r.DELETE("/user/:id", controller.DeleteUserById)
	r.GET("/userid/:id", controller.GetUserById)
	r.PATCH("/user", controller.UpdateUser)
	r.GET("/subscribes", controller.ListSubscribe)


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

	//Account
	r.GET("/packages", controller.GetPackageInfo)
	r.GET("/userinfo/:id", controller.GetUserInfo)
	r.GET("/userpackage/:id", controller.GetUserPackageInfo)
	r.GET("/userbill/:id", controller.GetUserBill)
	r.PATCH("/cancel-subscription/:id", controller.CancelSubscription)
	r.PATCH("/userinfo", controller.PatchUserInfo)

	//Review
	r.GET("/genres", controller.ListGenre)
	r.GET("/ratings", controller.ListRating)
	r.GET("/reviews", controller.ListReview)
	r.GET("/review/:MovieID", controller.GetReviewByMovieID)
	r.GET("/getreview/:UserID", controller.GetReviewByUserID)
	r.POST("/review", controller.CreateReview)
	r.PATCH("/updatereview", controller.UpdateReview)
	r.DELETE("/reviews/:id", controller.DeleteReviewByUserID)

	//History
	r.POST("/createHistory", controller.CreateHistory)
	r.GET("/listHistoryByUserId/:UserID", controller.ListHistoryByUserID)
	r.DELETE("/deleteHistory/:id", controller.DeleteHistoryByMovieID)




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
