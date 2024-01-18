package controller

import(
	"net/http"
	"time"

	"github.com/B6406325/team03/entity"
	"github.com/asaskevich/govalidator"
	
	"github.com/gin-gonic/gin"
)

func CreateReview(c *gin.Context) {
	var review entity.Review
	var movie entity.Movie
	var user entity.User
	var rating entity.Rating
	var genre entity.Genre

	// bind เข้าตัวแปร user
	if err := c.ShouldBindJSON(&review); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db, err := entity.SetupDatabase()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	_, err = govalidator.ValidateStruct(review)

	if err != nil {
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

	// ค้นหา Movie ด้วย id
	db.First(&movie, review.MovieID)
	if movie.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "movie not found"})
		return
	}
	// // ค้นหา User ด้วย id
	db.First(&user, review.UserID)
	if user.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "user not found"})
		return
	}

	// ค้นหา Rating ด้วย id
	db.First(&rating, review.RatingID)
	if rating.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "rating not found"})
		return
	}
	db.First(&genre, review.GenreID)
	if genre.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "genre not found"})
		return
	}

	r := entity.Review{
		Movie: movie,
		User: user,
		Rating: rating,
		Genre: genre,
		ReviewText: review.ReviewText,
		DateTime: time.Now().Local(),
		MovieID: review.MovieID,
		UserID: review.UserID,
		RatingID: review.RatingID,
		GenreID: review.GenreID,
	}

	// บันทึก
	if err := db.Create(&r).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Created success", "data": r})
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
//======================================= History ======================================================
func CreateHistory(c *gin.Context) {
	var history entity.History
	var movie entity.Movie
	var user entity.User
	
	// bind เข้าตัวแปร history
	if err := c.ShouldBindJSON(&history); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db, err := entity.SetupDatabase()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	_, err = govalidator.ValidateStruct(history)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา Movie ด้วย id
	db.First(&movie, history.MovieID)
	if movie.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "movie not found"})
		return
	}
	// // ค้นหา User ด้วย id
	db.First(&user, history.UserID)
	if user.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "user not found"})
		return
	}

		// Check if there is an existing history with the same MovieID
		var existingHistory entity.History
		if err := entity.DB().Where("movie_id = ?", history.MovieID).First(&existingHistory).Error; err == nil {
			// If the history already exists, update the DateTime
			existingHistory.DateTime = time.Now().Local()
	
			if err := entity.DB().Save(&existingHistory).Error; err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				return
			}
	
			c.JSON(http.StatusOK, gin.H{"data": existingHistory})
			return
		}

	h := entity.History{
		Movie: movie,
		User: user,
		DateTime: time.Now().Local(),
		MovieID: history.MovieID,
		UserID: history.UserID,
	}	

	if err := db.Create(&h).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "History saved", "data": h})
}

func ListHistoryByUserID(c *gin.Context) {
    var history []entity.History

    id := c.Param("UserID")

    if err := entity.DB().Preload("User").Preload("Movie").Raw("SELECT * FROM histories WHERE user_id = ? ORDER BY updated_at DESC", id).Find(&history).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"data": history})
}

func DeleteHistoryByMovieID(c *gin.Context) {

    id := c.Param("id")
    if tx := entity.DB().Exec("DELETE FROM histories WHERE movie_id = ?", id); 
	tx.RowsAffected == 0 {
    c.JSON(http.StatusBadRequest, gin.H{"error": "history not found"})
    return
    }
    c.JSON(http.StatusOK, gin.H{"data": id})
    
}
