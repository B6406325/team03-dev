package controller

import (
	"net/http"
	"github.com/asaskevich/govalidator"
	"github.com/B6406325/team03/entity"
	"github.com/gin-gonic/gin"
)

func CreateReview(c *gin.Context) {
    var review entity.Review

    if err := c.ShouldBindJSON(&review); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    // Check if the user has already reviewed the movie
    var existingReview  entity.Review
    if err := entity.DB().Where("user_id = ? AND movie_id = ?", review.UserID,review.MovieID).First(&existingReview).Error; err == nil {
        // If a review already exists for the user and movie, return an error
        c.JSON(http.StatusBadRequest, gin.H{"error": "User has already reviewed this movie"})
        return
    }

    
    _, err := govalidator.ValidateStruct(review)
    
	if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
    
	// ค้นหา gender ด้วย id
	var genre entity.Genre
	entity.DB().First(&genre, review.GenreID)
	if genre.ID == 0 {
        c.JSON(http.StatusNotFound, gin.H{"error": "genre not found"})
		return
	}
    
    if err := entity.DB().Create(&review).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    
    c.JSON(http.StatusOK, gin.H{"data": "review completed"})
}

func ListReview(c *gin.Context) {
    var reviews []entity.Review

    if err := entity.DB().Preload("Rating").Preload("Genre").Preload("User").Preload("Movie").Raw("SELECT * FROM reviews").Find(&reviews).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"data": reviews})
}

func GetReviewByMovieID(c *gin.Context) {
    var review []entity.Review

    MovieID := c.Param("MovieID")

    if err := entity.DB().Preload("Rating").Preload("Genre").Preload("User").Preload("Movie").Raw("SELECT * FROM reviews WHERE movie_id = ? ORDER BY updated_at DESC", MovieID).Find(&review).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"data": review})
}

func GetReviewByUserID(c *gin.Context) {
    var review entity.Review

    ID := c.Param("UserID")

    if err := entity.DB().Raw("SELECT * FROM reviews WHERE user_id = ? ", ID).Scan(&review).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"data": review})
}

func UpdateReview(c *gin.Context) {

    var review entity.Review
    var result entity.Review
    if err := c.ShouldBindJSON(&review); err != nil {
    c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
    return
    
    }
    if tx := entity.DB().Where("id = ?", review.ID).First(&result); tx.RowsAffected == 0 { 
    c.JSON(http.StatusBadRequest, gin.H{"error": "review not found"})
    return
    
    }
    if err := entity.DB().Save(&review).Error; err != nil {
    c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
    return
    }
    c.JSON(http.StatusOK, gin.H{"data": review})
    
}

func DeleteReviewByUserID(c *gin.Context) {

    id := c.Param("id")
    if tx := entity.DB().Exec("DELETE FROM reviews WHERE user_id = ?", id); tx.RowsAffected == 0 {
    c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
    return
    }
    c.JSON(http.StatusOK, gin.H{"data": id})
    
}

func ListRating(c *gin.Context) {

    var ratings []entity.Rating
    
    if err := entity.DB().Raw("SELECT * FROM ratings").Scan(&ratings).Error; err != nil {
    
    c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
    return
    }
    
    c.JSON(http.StatusOK, gin.H{"data": ratings})
    
}

func ListGenre(c *gin.Context) {

    var genres []entity.Genre
    
    if err := entity.DB().Raw("SELECT * FROM genres").Scan(&genres).Error; err != nil {
    
    c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
    return
    }
    
    c.JSON(http.StatusOK, gin.H{"data": genres})
    
}


func ListMovie(c *gin.Context) {
    var movies []entity.Movie

    if err := entity.DB().Raw("SELECT * FROM movies").Scan(&movies).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"data": movies})
}

func GetMovieByID(c *gin.Context) {
    var movie []entity.Movie
    id := c.Param("id")
    if err := entity.DB().Raw("SELECT * FROM movies WHERE id = ?", id).Scan(&movie).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    c.JSON(http.StatusOK, gin.H{"data": movie})
}


