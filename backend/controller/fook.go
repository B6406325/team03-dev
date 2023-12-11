package controller

import (
	"net/http"

	"github.com/B6406325/team03/entity"
	"github.com/gin-gonic/gin"
)

func ListUser(c *gin.Context) {
	var users []entity.User
	if err := entity.DB().Raw("SELECT * FROM users").Scan(&users).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": users})
}

func ListMovies(c *gin.Context) {
	var movies []entity.Movie
	if err := entity.DB().Preload("Categories").Preload("Soundtrack").Preload("Target").Raw("SELECT * FROM movies").Find(&movies).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": movies})
}

func DeleteMovieById(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM movies WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "movie not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

func GetMovieById(c *gin.Context) {
	var movie entity.Movie
	id := c.Param("id")
	if err := entity.DB().Preload("Categories").Preload("Soundtrack").Preload("Target").Raw("SELECT * FROM movies WHERE id = ?", id).Find(&movie).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": movie})
}

func UpdateMovie(c *gin.Context) {
	var movie entity.Movie
	var result entity.Movie
	if err := c.ShouldBindJSON(&movie); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", movie.ID).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "movie not found"})
		return
	}
	if err := entity.DB().Save(&movie).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": movie})
}

func ListCategories(c *gin.Context) {
	var categories []entity.Categories
	if err := entity.DB().Raw("SELECT * FROM Categories").Scan(&categories).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": categories})
}

func ListSoundtrack(c *gin.Context) {
	var soundtrack []entity.Soundtrack
	if err := entity.DB().Raw("SELECT * FROM Soundtracks").Scan(&soundtrack).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": soundtrack})
}

func ListTarget(c *gin.Context) {
	var target []entity.Target
	if err := entity.DB().Raw("SELECT * FROM Targets").Scan(&target).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": target})
}

func CreateMovie(c *gin.Context) {
	var movie entity.Movie
	var categories entity.Categories
	var target entity.Target
	var soundtrack entity.Soundtrack
	if err := c.ShouldBindJSON(&movie); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", movie.CategoriesID).First(&categories); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "categories not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", movie.TargetID).First(&target); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "target not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", movie.SoundtrackID).First(&soundtrack); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "soundtrack not found"})
		return
	}

	m := entity.Movie{
		Categories:   categories,
		Target:       target,
		Soundtrack:   soundtrack,
		Title:        movie.Title,
		Description:  movie.Description,
		Duration:     movie.Duration,
		ReleaseDate:  movie.ReleaseDate,
		Cast:         movie.Cast,
		Image:        movie.Image,
		CategoriesID: movie.CategoriesID,
		SoundtrackID: movie.SoundtrackID,
		TargetID:     movie.TargetID,
	}

	if err := entity.DB().Create(&movie).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": m})
}
